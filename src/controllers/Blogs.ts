import { Request, Response } from "express";


interface Blog {
    title: string,
}

export default class BlogsController {
    static async createNewBlog(req: Request, res: Response){
        //
    }
}