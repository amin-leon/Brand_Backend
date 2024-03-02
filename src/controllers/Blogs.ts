import { Request, Response } from "express";
import Blogs from "../models/Blogs";



interface Blog {
    title: string,
    category: string,
    desc: string,
    tag: string,
    image?: string,

}

export default class BlogsController {
    static async createNewBlog(req: Request, res: Response){
        try {
            const { title, category, desc, tag, image }: Blog = req.body;

            if(!title || !category || !desc || !tag ){
                return res.status(400).json({
                    status: "Bad Request",
                    Message: "Missing required fields"
                });
            }

            // blog object
            const newBlog = new Blogs({
                title: title,
                category: category,
                desc: desc,
                tag: tag,
                image: image
            })

            // save new blog
            await newBlog.save();
             return res.status(201).json({
                status: 'success',
                Message: "New blog created !"
             })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Fail",
                Message: "Blog not created :)"
            })
        }
    }

    // Update blog
    static async updateBlog(req: Request, res: Response) {
        try {
            req.body as Blog;
            const {id}  = req.params;

            // find related blog
            const foundBlogAndUpdate = await Blogs.findByIdAndUpdate(id, req.body, {new: true});
            if (!foundBlogAndUpdate) {
                return res.status(404).json({
                    status: "Not found",
                    Message: "Blog not found :)"
                })
            }
            return res.status(200).json({
                status: "Success",
                Message: "Blog Successful updated"
            })

        } catch (error) {
            return res.status(500).json(
                {
                    Status: "Fail",
                    Message: "Blog not updated"
                }
            )
        }
    }

    // delete blog

    static async deleteBlog(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const foundBlog = await Blogs.findById(id)
            if(!foundBlog){
                return res.status(404).json({
                    status: "Not found",
                    Message:"Blog Not found :)"
                })
            }

            // remove this blog with id
            await Blogs.findByIdAndDelete(id);
            return res.status(200).json({
                status: "OK",
                Message: "Blog deleted !",
                id: id
            })
        } catch (error) {
            return res.status(500).json({
                status: "Fail",
                Message: "Fail to delete blog"
            })
        }
    }

    // like a blog

    static async likeBlog(req: Request, res: Response) {
        try {
            const {email}  = req.body;
            const {id} = req.params;
    
            // find blog
            const foundBlog = await Blogs.findById(id)
            if(!foundBlog){
                return res.status(404).json({
                    status: "Not found",
                    Message: "Blog Not found"
                })
            }
    
            const hasLiked = foundBlog.likes.includes(email);
            if(hasLiked) {
                return res.status(403).json({
                    status: "Forbidden",
                    Message: "You have already liked to this blog :)"
                })
            }
    
            // like
            foundBlog.likes.push({email})
            await foundBlog.save()
    
            return res.status(200).json({
                status: "OK",
                Message: "You liked Blog"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Fail",
                Message: "Oops! , unable to like"
            })
        }
    }

    // comment

    static async commentBlog(req: Request, res: Response) {
        try {
            const {email, comment}  = req.body;
            const {id} = req.params;
    
            // find blog
            const foundBlog = await Blogs.findById(id)
            if(!foundBlog){
                return res.status(404).json({
                    status: "Not found",
                    Message: "Blog Not found"
                })
            }   
            // comment on blog
            if(!email || !comment) {
                return res.status(400).json({
                    status:"Bad request",
                    Message: "Missing value for fields"
                })
            }
            foundBlog.comments.push({email, comment});
            await foundBlog.save()
    
            return res.status(200).json({
                status: "OK",
                Message: "Blog commented"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Fail",
                Message: "Oops! , unable to comment"
            })
        }
    }
}