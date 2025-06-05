
import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: true,
    },
})

const User: Model<IUser> = mongoose.models.user || mongoose.model('user', userSchema);

export default User;
