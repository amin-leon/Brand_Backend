import { Request, Response } from "express";
import Blogs from "../models/Blogs";
import Blog from "../types/Blog";
import blogSchema from "../validations/BlogValidations";


export default class BlogsController {
    static async createNewBlog(req: Request, res: Response){
        try {
            const { title, category, desc, tag }: Blog = req.body;
            const image = req.file? req.file.path: null

            const { error } = blogSchema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: error.details[0].message,
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
            return res.status(500).json({
                status: "Fail",
                Message: "Blog not created :)"
            })
        }
    }

    // Update blog
    static async updateBlog(req: Request, res: Response) {
        try {
            const {title, desc, category, tag}: Blog = req.body;
            const {id}  = req.params;
            const image = req.file? req.file.path: null

            // find related blog
            const foundBlogAndUpdate = await Blogs.findByIdAndUpdate(id, {tag, image, desc, title, category}, {new: true});
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
            const { id } = req.params;
            const foundBlog = await Blogs.findById(id)
            if (!foundBlog) {
                return res.status(404).json({
                    status: "Not found",
                    Message: "Blog with ID not found"
                })
            }
    
            // remove this blog with id
            await Blogs.findByIdAndDelete(id);
            return res.status(200).json({
                status: "OK",
                Message: "Blog deleted successfully",
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "Fail",
                Message: "Failed to delete blog"
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
            foundBlog.likes.push(email)
            await foundBlog.save()
    
            return res.status(200).json({
                status: "OK",
                Message: "You liked Blog",
                foundBlog
            })
        } catch (error) {
            return res.status(500).json({
                status: "Fail",
                Message: "Oops! , unable to like"
            })
        }
    }

    // comment

    static async commentBlog(req: Request, res: Response) {
        try {
            const {email, comment, posterNames}  = req.body;
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
            foundBlog.comments.push({email, comment, posterNames});
            await foundBlog.save()
    
            return res.status(200).json({
                status: "OK",
                Message: "Blog commented"
            })
        } catch (error) {
            return res.status(500).json({
                status: "Fail",
                Message: "Oops! , unable to comment"
            })
        }
    }

        
    // Get all blogs
    static async getAllBlogs(req: Request, res: Response) {
        try {
          const allBlogs = await Blogs.find();
          if (allBlogs.length === 0) {
            return res.status(404).json({
                Message: "No blogs found :)"
            });
        }
           return res.status(200).json({
            status: "success",
            data: allBlogs,
          });
        } catch (error) {
          return res.status(500).json({
            status: "status",
            message: "Unable to display Blogs:)",
          });
        }
      }

    // Get signgle Blog
    static async getSingleBlog(req: Request, res: Response) {
        try {
          const {id} = req.params;
          const singleBlog = await Blogs.findOne({_id: id});
          if(!singleBlog){
            return res.status(404).json({
                status: "Not found",
                Message: "No Blog Found :)"
            })
          }
           return res.status(200).json({
            status: "success",
            userInfo: singleBlog,
          });
        } catch (error) {
          return res.status(500).json({
            status: "Fail",
            message: "Unable to find Blog :)",
          });
        }
      }
}