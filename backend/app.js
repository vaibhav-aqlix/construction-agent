import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import promptResponseRouter from "./routes/promptResponse.routes.js";
import sendEmailsRouter from "./routes/sendEmails.routes.js";
import {authMiddleware} from "./middlewares/auth.middlewares.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/test", (req, res) => {
    res.status(200).json("Construction Agent Server active.")
})

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/search-vendors", authMiddleware, promptResponseRouter);
app.use("/api/v1/send-emails", authMiddleware, sendEmailsRouter);

export default app;
