import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose
            .connect(process.env.MONGO_URI)
            .then(() =>
                console.log("Connected to Construction Agent Database!"),
            );
    } catch (error) {
        console.log("Unable to connect to Construction Agent Database", error);
        process.exit(1);
    }
};

export default dbConnect;
