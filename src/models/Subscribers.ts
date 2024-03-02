import mongoose, {Model, Document, Schema} from "mongoose";


interface ISub extends Document{
    email: String,
}

const SubscribersSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    subAt: {
        type: Date,
        default: Date.now()
    },
})

const Subscribers: Model<ISub> = mongoose.model<ISub>("Subscribers", SubscribersSchema);

export default Subscribers;