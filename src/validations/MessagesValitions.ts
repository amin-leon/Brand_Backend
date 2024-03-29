import joi from "joi";

interface IMessages {
    message: String, 
    email: String,
    names: String
}

const messageSchema = joi.object<IMessages>({
    message:joi.string().required().min(5).max(600),
    email:joi.string().required().email(),
    names:joi.string().required(),
});

export default messageSchema;


