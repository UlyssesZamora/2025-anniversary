import { getDb } from "../config/db.js";
import { s3 } from "../utils/s3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

function getBase64Buffer(dataUrl) {
  // Remove data URL prefix and decode base64
  const base64 = dataUrl.split(",")[1];
  return Buffer.from(base64, "base64");
}

export async function uploadMemory(req, res) {
  try {
    const { title, description, takenDay, takenMonth, takenYear, image } =
      req.body;
    if (
      !title ||
      !description ||
      !takenDay ||
      !takenMonth ||
      !takenYear ||
      !image
    ) {
      return res.status(400).json({ error: "Missing required fields" });
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
    const s3Url = `https://${bucket}.s3.amazonaws.com/${fileName}`;
    const db = getDb();
    const memory = {
      title,
      description,
      takenDay,
      takenMonth,
      takenYear,
      imageUrl: s3Url,
      createdAt: new Date(),
    };
    const result = await db.collection("photos").insertOne(memory);
    res.status(201).json({
      message: "Memory uploaded successfully",
      memory: { ...memory, _id: result.insertedId },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
