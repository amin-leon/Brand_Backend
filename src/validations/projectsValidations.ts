import joi from "joi";

interface IProject {
    title: String,
    description: String, 
    category: String,
    image: String,
    link: String,
}

const projectSchema = joi.object<IProject>({
    title:joi.string().required().min(5).max(60),
    category:joi.string().required(),
    description:joi.string().required().min(5).max(600),
    image:joi.string().required(),
    link:joi.string().required(),
});

export default projectSchema;


