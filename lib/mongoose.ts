import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {

    if (isConnected) return;

    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`);
        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
};
