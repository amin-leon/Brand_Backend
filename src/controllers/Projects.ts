import {Request, Response} from 'express';
import { ProjectTypes } from '../types/Project';
import Projects from '../models/Projects';
import projectSchema from '../validations/projectsValidations';

export default class ProjectsController {
    static async addNewProject(req: Request, res: Response) {
        try {
            const {title, category, description, link}: ProjectTypes = req.body;
            const image = req.file? req.file.path : null;
            
            // validations
            const { error } = projectSchema.validate({title, description, category, image, link});
            if (error) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: error.details[0].message,
                    res: req.body
                });
            }
    
            // Project object
            const newProject = new Projects({
                title,
                category,
                description,
                link,
                image
            });
    
            // save
            await newProject.save()
            return res.status(201).json({
                status: "success",
                Message: "Project added",
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Fail",
                Message: "Project Not added :)"
            })
        }
    }

        // Update project
        static async updateProject(req: Request, res: Response) {
            try {
                const {title, description, category, link}: ProjectTypes = req.body;
                const {id}  = req.params;
                const image = req.file? req.file.path: null;


                // validations
                // const { error } = projectSchema.validate({title, description, category, image, link});
                // if (error) {
                //     return res.status(400).json({
                //         status: "Bad Request",
                //         message: error.details[0].message,
                //     });
                // }
    
                // find related blog
                const foundProjectAndUpdate = await Projects.findByIdAndUpdate(id, {title, description, category, image, link}, {new: true});
                if (!foundProjectAndUpdate) {
                    return res.status(404).json({
                        status: "Not found",
                        Message: "Project not found :)",
                        foundProjectAndUpdate
                    })
                }
                return res.status(200).json({
                    status: "Success",
                    Message: "Project Successful updated"
                })
    
            } catch (error) {
                return res.status(500).json(
                    {
                        Status: "Fail",
                        Message: "Project not updated"
                    }
                )
            }
        }

    // Project delete
    static async deleteProject(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const foundProject = await Projects.findById(id)
            if(!foundProject){
                return res.status(404).json({
                    status: "Not found",
                    Message:"Project Not found :)"
                })
            }

            // remove this blog with id
            await Projects.findByIdAndDelete(id);
            return res.status(200).json({
                status: "OK",
                Message: "Project deleted !",
                id: id
            })
        } catch (error) {
            return res.status(500).json({
                status: "Fail",
                Message: "Fail to delete project"
            })
        }
    }

    
    // Get all users
    static async getAllProjects(req: Request, res: Response) {
        try {
          const allprojects = await Projects.find();
          if (allprojects.length === 0) {
            return res.status(404).json({
                Message: "No Projects found :)"
            });
        }
           return res.status(200).json({
            status: "success",
            data: allprojects,
          });
        } catch (error) {
          return res.status(500).json({
            status: "status",
            message: "Unable to display Projects:)",
          });
        }
      }

    // Get signgleproject
    static async getSingleProject(req: Request, res: Response) {
        try {
          const {id} = req.params;
          const singleProject = await Projects.findOne({_id: id});
          if(!singleProject){
            return res.status(404).json({
                Message: "No Project Found :)"
            })
          }
           return res.status(200).json({
            status: "sucess",
            userInfo: singleProject,
          });
        } catch (error: any) {
          return res.status(500).json({
            message: "Unable to find Project :)",
          });
        }
      }
}