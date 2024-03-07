import { Response, Request } from "express";
import Messages from "../models/Messages";
import { MessagesTypes } from "../types/Messages";
import messageSchema from "../validations/MessagesValitions";


// User Registration
export default class MessagesController {
    static async sendMessage(req: Request, res: Response){
        try {
            const { subject, message, email }: MessagesTypes = req.body;
            
            // validations
            const { error } = messageSchema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: error.details[0].message,
                });
            }

            // new message object
            const newMessage = new Messages(
                {
                    message,
                    subject,
                    email
                }
            );
            // save message 
            await newMessage.save();
            return res.status(201).json({
                Message: "Message sent !",
            })
        } catch (error) {
           return res.status(500).json({
              Message: "Message Not sent :)"
            })
        }
    }

    // Get all Messages
    static async getAllMessages(req: Request, res: Response) {
        try {
          const allMessages = await Messages.find();
          if(!allMessages){
            return res.status(404).json({
                Message: "No Message  :)"
            })
          }
          return res.status(200).json({
            status: "success",
            content: allMessages,
          });
        } catch (error) {
           return res.status(500).json({
            message: "Fail to Fetch Message :)",
          });
        }
      }
    
    // delete message
    static async deleteMessage(req: Request, res: Response){
        try {
            const {id} = req.params;

            // check if user exist
            const existMessage = await Messages.findById(id);
            if(!existMessage){
               return res.status(404).json({
                    Message: "Message not Found"
                })
            }

            // delete message
            await Messages.findByIdAndDelete(id);
            return res.status(200).json({
                Message: "Message deleted successfully",
            })

        } catch (error: any) {
            return res.status(500).json({
                status: "Fail",
                Message: "Fail to delete message"
            })
        }
    }

        // Read message
            static async readMessage(req: Request, res: Response) {
                try {
                    const { read } = req.body;
                    const { id } = req.params;
        
                    if (typeof read !== 'boolean') {
                        return res.status(400).json({
                            status: "Bad request",
                            Message: "Missing or invalid 'read' field value"
                        });
                    }
        
                    const updatedMessage = await Messages.findByIdAndUpdate(id, { read }, { new: true });
        
                    if (!updatedMessage) {
                        return res.status(404).json({
                            status: "Not found",
                            Message: "Message not found"
                        });
                    }
        
                    return res.status(200).json({
                        status: "Success",
                        Message: "You have Read this message"
                    });
                } catch (error: any) {
                    return res.status(500).json({
                        status: "Error",
                        Message: "Failed to update message"
                    });
                }
            }
        }
