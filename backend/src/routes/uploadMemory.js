import express from "express";
import {
  uploadMemory,
  getAllMemories,
  getMemoryYears,
} from "../controllers/uploadMemoryController.js";

const router = express.Router();

router.post("/upload-memory", uploadMemory);
router.get("/memories", getAllMemories);
router.get("/memory-years", getMemoryYears);

export default router;
