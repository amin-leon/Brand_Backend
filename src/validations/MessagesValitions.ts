import joi from "joi";

interface IMessages {
    subject: String,
    message: String, 
    email: String,
}

const messageSchema = joi.object<IMessages>({
    subject:joi.string().required().min(5).max(60),
    message:joi.string().required().min(5).max(600),
    email:joi.string().required().email(),
});

export default messageSchema;


