import mongoose, {model, models, Schema} from "mongoose";

const NoteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const NoteModel = models.notes || model("notes", NoteSchema);

export default NoteModel;