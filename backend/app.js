import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import promptResponseRouter from "./routes/promptResponse.routes.js";
import sendEmailsRouter from "./routes/sendEmails.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/search-vendors", promptResponseRouter);
app.use("/api/v1/send-emails", sendEmailsRouter);

export default app;
