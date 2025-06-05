import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI || '');
        console.log(`Connected to MnogoDB 🎉 ${connection.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default connectMongoDB;