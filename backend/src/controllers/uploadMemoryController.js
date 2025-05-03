import { getDb } from "../config/db.js";
import { s3 } from "../utils/s3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ObjectId } from "mongodb";

function getBase64Buffer(dataUrl) {
  // Remove data URL prefix and decode base64
  const base64 = dataUrl.split(",")[1];
  return Buffer.from(base64, "base64");
}

export async function uploadMemory(req, res) {
  try {
    const { title, description, takenDay, takenMonth, takenYear, image } =
      req.body;
    // Convert date fields to numbers
    const day = parseInt(takenDay, 10);
    const month = parseInt(takenMonth, 10);
    const year = parseInt(takenYear, 10);

    if (
      !title ||
      !description ||
      isNaN(day) ||
      isNaN(month) ||
      isNaN(year) ||
      !image
    ) {
      return res
        .status(400)
        .json({ error: "Missing or invalid required fields" });
    }
    // Upload image to S3
    const buffer = getBase64Buffer(image);
    const fileName = `memory-${Date.now()}.jpg`;
    const bucket = process.env.AWS_S3_BUCKET;
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: fileName,
        Body: buffer,
        ContentType: "image/jpeg",
      })
    );
    const s3Url = `https://${bucket}.s3.us-east-1.amazonaws.com/${fileName}`;
    const db = getDb();
    const memory = {
      title,
      description,
      takenDay: day,
      takenMonth: month,
      takenYear: year,
      imageUrl: s3Url,
      createdAt: new Date(),
    };
    const result = await db.collection("Photos").insertOne(memory);
    res.status(201).json({
      message: "Memory uploaded successfully",
      memory: { ...memory, _id: result.insertedId },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getAllMemories(req, res) {
  try {
    const db = getDb();
    const { year } = req.query;
    const filter = year && year !== "all" ? { takenYear: parseInt(year) } : {};
    console.log(filter);
    const photos = await db
      .collection("Photos")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({ photos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getMemoryYears(req, res) {
  try {
    const db = getDb();
    const years = await db.collection("Photos").distinct("takenYear");
    years.sort((a, b) => b - a); // Descending order
    console.log(years);
    res.status(200).json({ years });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getMemoryById(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res
        .status(400)
        .json({ error: "Missing or invalid required fields" });
    }

    const db = getDb();
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (e) {
      return res.status(400).json({ error: e.getMessage() });
    }

    const memory = await db.collection("Photos").findOne({ _id: objectId });

    console.log(memory);

    if (!memory) {
      return res.status(404).json({ error: "Memory not found" });
    }

    res.status(200).json(memory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getMemoryByDate(req, res) {
  try {
    const { day, month, year, id } = req.query;
    const db = getDb();
    const memories = await db
      .collection("Photos")
      .find({
        takenDay: parseInt(day),
        takenMonth: parseInt(month),
        takenYear: parseInt(year),
        _id: { $ne: id },
      })
      .toArray();
    res.status(200).json({ memories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
