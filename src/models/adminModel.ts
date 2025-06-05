
import mongoose, { Document, Model, Schema } from "mongoose";

interface IAdmin extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
}

const userSchema: Schema<IAdmin> = new mongoose.Schema({
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
    role:{
        type: String,
        required: false,
    }
})

const Admin: Model<IAdmin> = mongoose.models.admin || mongoose.model('admin', userSchema);

export default Admin;
