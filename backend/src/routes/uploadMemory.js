import express from "express";
import {
  uploadMemory,
  getAllMemories,
} from "../controllers/uploadMemoryController.js";

const router = express.Router();

router.post("/upload-memory", uploadMemory);
router.get("/memories", getAllMemories);

export default router;
