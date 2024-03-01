import mongoose ,{Schema, Model, Document} from "mongoose";

interface IBlog extends Document{
    title: string,
    blogDesc: string,
    category: string,
    tags: string,
    image?: string
}

const BlogSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    blogDesc: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    tags: {
        type: String,
        require: true
    },
    image: {
        type: String,
    }
})

const Blogs: Model<IBlog> = mongoose.model<IBlog>("Blogs", BlogSchema);

export default Blogs