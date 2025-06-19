import express from "express";
import {
    generatePromptResponseChatGpt,
    generatePromptResponseGemini,
} from "../controllers/promptResponse.controllers.js";

const promptResponseRouter = express.Router();

promptResponseRouter.post("/gemini", generatePromptResponseGemini);
promptResponseRouter.post("/chatgpt", generatePromptResponseChatGpt);

export default promptResponseRouter;
