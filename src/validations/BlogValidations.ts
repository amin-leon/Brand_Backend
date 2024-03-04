import joi from "joi";

interface IBlog {
    title:String,
    category:String,
    desc:String,
    tag:String,
}

const blogSchema = joi.object<IBlog>({
    title:joi.string().required().min(5).max(60),
    category:joi.string().required(),
    desc:joi.string().required().min(50).max(600),
    tag:joi.string().required()
});

export default blogSchema;
