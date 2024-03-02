import mongoose, {Model, Document, Schema} from "mongoose";


interface IMessages extends Document{
    subject: String,
    message: String, 
    read: Boolean,
    email: String,
}

const MessagesSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
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
        default: Date.now()
    },
})

const Messages: Model<IMessages> = mongoose.model<IMessages>("Messages", MessagesSchema);

export default Messages;