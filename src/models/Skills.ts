import mongoose, {Model, Document, Schema} from "mongoose";


interface ISkills extends Document{
    title: String,
    description: String, 
    percent: Number,
    icon?: String,
}

const skillsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    percent: {
        type: Number,
        required: true
    },
    icon: {
        type: String,
    },
})

const Skills: Model<ISkills> = mongoose.model<ISkills>("Skills", skillsSchema);

export default Skills;