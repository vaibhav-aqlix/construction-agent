import express from "express";
import { sendEmails } from "../controllers/sendEmails.controllers.js";

const sendEmailsRouter = express.Router();

sendEmailsRouter.post("/vendors", sendEmails);

export default sendEmailsRouter;
