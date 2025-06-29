import mongoose from "mongoose";

 const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            
        })
        console.log('connected to database successfully');
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
        
    }
}

export default connectDB;

