import {Request, Response} from 'express';
import { SkillsTypes } from '../types/Skills';
import Skills from '../models/Skills';
import skillSchema from '../validations/SkillsValidations';

export default class SkillsController {
    static async addNewSkill(req: Request, res: Response) {
        try {
            const {title, description, percent}: SkillsTypes = req.body;
            const icon = req.file? req.file.path : null;
    
            // validations
            const { error } = skillSchema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: error.details[0].message,
                });
            }
    
            // Project object
            const newSkill = new Skills({
                title,
                description,
                percent,
                icon
            });
    
            // save
            await newSkill.save()
            return res.status(201).json({
                status: "success",
                Message: "new Skill added",
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Fail",
                Message: " new Skill Not added :)"
            })
        }
    }

        // Update Skill
        static async updateSkill(req: Request, res: Response) {
            try {
                const {title, description, percent}: SkillsTypes = req.body;
                const {id}  = req.params;
                const icon = req.file? req.file.path: null
    
                // find related blog
                const foundSkillAndUpdate = await Skills.findByIdAndUpdate(id, {title, description, percent, icon}, {new: true});
                if (!foundSkillAndUpdate) {
                    return res.status(404).json({
                        status: "Not found",
                        Message: "Skill not found :)"
                    })
                }
                return res.status(200).json({
                    status: "Success",
                    Message: "Skill Successful updated"
                })
    
            } catch (error) {
                return res.status(500).json(
                    {
                        Status: "Fail",
                        Message: "Skill not updated"
                    }
                )
            }
        }

    // Skill delete
    static async deleteSkill(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const foundSkill = await Skills.findById(id)
            if(!foundSkill){
                return res.status(404).json({
                    status: "Not found",
                    Message:"Skill Not found :)"
                })
            }

            // remove this skill with id
            await Skills.findByIdAndDelete(id);
            return res.status(200).json({
                status: "OK",
                Message: "Skill deleted !",
                id: id
            })
        } catch (error) {
            return res.status(500).json({
                status: "Fail",
                Message: "Fail to delete Skill"
            })
        }
    }

    
    // Get all Skills
    static async getAllSkills(req: Request, res: Response) {
        try {
          const allSkills = await Skills.find();
          if(!allSkills){
            res.status(404).json({
                Message: "No Skill Found :)"
            })
          }
           res.status(200).json({
            status: "sucess",
            data: allSkills,
          });
        } catch (error) {
          res.status(500).json({
            status: "status",
            message: "Unable to display Skills:)",
          });
        }
      }
}