import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const { connection } = await mongoose.connect(process.env.DB_URI);
        console.log(`Database connected with ${connection.host}`);
    }catch(err){
        console.log("Mongo connection error:", err.message);
    }
}

export default connectDB;