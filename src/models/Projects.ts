import mongoose, {Model, Document, Schema} from "mongoose";

type Lang = {
    langName: string
}

interface IProjects extends Document{
    title: String,
    description: String, 
    category: String,
    image?: String,
    link: String,
    languages: Lang[]
}

const projectsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    languages: {
        type: String,
        default: "None"
    },
    image: {
        type: String,
    },
})

const Projects: Model<IProjects> = mongoose.model<IProjects>("Projects", projectsSchema);

export default Projects;