import * as joi from 'joi';
 
 interface IUser {
    firstName: string;
    secondName: string;
    email: string;
    password?: string;
    role?: string;
  }

  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/

const userSchema = joi.object<IUser>({
    firstName: joi.string().required(),
    secondName: joi.string().required(),
    email: joi.string().required().email(),
    role: joi.string(),
    password: joi.string().pattern(passwordRegex)
})

export default userSchema;



  