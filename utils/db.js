import mongoose from "mongoose";

let isConnected = false; // check conn status


export const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('mongodb is already connected ✅');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'promptify',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true
        console.log("mongodb connected ✅");
    } catch (error) {
        console.log("❌" + error);
    }
}