import dotenv from "dotenv";
import app from "./app.js";
import dbConnect from "./config/dbConnect.config.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`Server running locally on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();