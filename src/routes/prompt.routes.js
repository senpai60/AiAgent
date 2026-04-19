import { Router } from "express";
import {
  getAiResponse,
  getAiStreamResponse,
} from "../controller/prompt.controller.js";

const router = Router();

router.post("/prompt", getAiResponse);
router.get("/prompt-stream", getAiStreamResponse);

export default router;
