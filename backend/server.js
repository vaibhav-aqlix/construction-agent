import dotenv from "dotenv";
import app from "./app.js";
import dbConnect from "./config/dbConnect.config.js";

dotenv.config();

const port = process.env.PORT || 5500;

dbConnect().then(() => {
    app.listen(port, () =>
        console.log(`Construction Agent Server running on port ${port}.`),
    );
});
