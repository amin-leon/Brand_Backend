import joi from "joi";

interface ISkills {
    title: String,
    description: String, 
    percent: Number,
    icon?: String,
}

const skillSchema = joi.object<ISkills>({
    title:joi.string().required().min(3).max(60),
    description:joi.string().required().min(5).max(200),
    icon:joi.string(),
    percent:joi.number().required(),
});

export default skillSchema;


