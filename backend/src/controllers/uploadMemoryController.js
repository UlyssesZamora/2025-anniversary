import { getDb } from "../config/db.js";

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
    const db = getDb();
    const memory = {
      title,
      description,
      takenDay,
      takenMonth,
      takenYear,
      image,
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
