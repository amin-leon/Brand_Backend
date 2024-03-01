import jwt, {Secret} from 'jsonwebtoken';

export interface userData{
    id: string,
    role: string,
    firstName: string,
    secondName: string
}

export class JWT{
    static generateToken(data: userData, exp='1d'){
        const ScreteKey: Secret = process.env.SECRET_KEY as string;
        return jwt.sign(data, ScreteKey, {expiresIn: exp});
    }
}