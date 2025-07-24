import mongoose from "mongoose";

const ConnectToDB = async() => {
    try {
        let M = mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017');
        await M;
        //console.log(M)
    
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

export default ConnectToDB;
