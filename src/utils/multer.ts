import {  Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) =>{
        cb(null, 'uploads/');
    },
    filename: (req: Request, file, cb) =>{
        cb(null, file.originalname);
    }
})

 const upload = multer({storage})

 export default upload