import mongoose ,{Schema, Model, Document} from "mongoose";


type TLikes = {
    email: string
}

type TComments = {
    email: string,
    comment: string
}

interface IBlog extends Document{
    tiitle: string,
    category: string,
    desc: string,
    tag: string,
    image?: string,
    likes: TLikes[],
    comments: TComments[],
    createdAt: string
}



const BlogSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        require: true
    },
    image: {
        type: String,
    },
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [{email: String, comment: String}],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Blogs: Model<IBlog> = mongoose.model<IBlog>("Blogs", BlogSchema);

export default Blogs;