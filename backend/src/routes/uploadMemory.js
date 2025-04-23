import express from "express";
import { uploadMemory } from "../controllers/uploadMemoryController.js";

const router = express.Router();

router.post("/upload-memory", uploadMemory);

export default router;
