import mongoose, { Model, Document, Schema } from "mongoose";

interface IMessages extends Document {
    messages: string[];
    read?: boolean;
    email: string;
    sentAt?: Date;
    names?: string
}

const MessagesSchema = new Schema({
    messages: {
        type: [String],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
    names: {
        type: String,
        required: true
    }
});

const Messages: Model<IMessages> = mongoose.model<IMessages>("Messages", MessagesSchema);

export default Messages;
