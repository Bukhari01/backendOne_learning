import mongoose from "mongoose";
import Admin from "../models/admin.model";

const ConnectToDB = async() => {
    try {
        let M = mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/backendOne');
        await M;
        console.log("Connected to database");
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

export default ConnectToDB;
