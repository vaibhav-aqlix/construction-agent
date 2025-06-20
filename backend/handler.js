import dotenv from "dotenv";
import serverless from "serverless-http";
import app from "./app.js";
import dbConnect from "./config/dbConnect.config.js";

dotenv.config();

let dbConnected = false;
const connectDB = async () => {
  if (!dbConnected) {
    await dbConnect();
    dbConnected = true;
  }
};

// app.use(async (req, res, next) => {
//   await connectDB();
//   next();
// });

const wrapped = serverless(app);

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectDB();
  return wrapped(event, context);
};