import express from "express";
import {
  uploadMemory,
  getAllMemories,
  getMemoryYears,
  getMemoryById,
  getMemoryByDate,
} from "../controllers/uploadMemoryController.js";

const router = express.Router();

router.post("/upload-memory", uploadMemory);
router.get("/memories", getAllMemories);
router.get("/memory-years", getMemoryYears);
router.get("/getMemory", getMemoryById);
router.get("/getMemoryByDate", getMemoryByDate);
export default router;
