import { Response, Request } from "express";
import Messages from "../models/Messages";
import { MessagesTypes } from "../types/Messages";


// User Registration
export default class MessagesController {
    static async sendMessage(req: Request, res: Response){
        try {
            const { subject, message, email }: MessagesTypes = req.body;
            if(!subject || !message || !email){
               return res.status(400).json({
                    status: "Bad request",
                    message: "Nissing fields value!"
                })
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
            return res.status(500).json({
                Message: "Messeage sent !",
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
            res.status(404).json({
                Message: "No Message  :)"
            })
          }
          return res.status(200).json({
            status: "sucess",
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
            console.log(error.message);
            return res.status(500).json({
                status: "Fail",
                Message: "Fail to delete message"
            })
        }
    }

        // Read message
        static async readMessage(req: Request, res: Response) {
            try {
               const {read} =req.body;
              const {id} = req.params;
    
              if(!read){
                return res.status(400).json({
                    status: "Bad request",
                    Message: "Missing field value"
                })
              }

             const readM =  await Messages.findByIdAndUpdate(id, req.body, {new: true});
             if (!readM) {
                return res.status(500).json({
                    Message: "Fail to update",
                })
             }
                return res.status(200).json({
                    status: "sucess",
                    Message: "You have Read this message"
                  });
            } catch (error: any) {
                console.log(error);
              return res.status(500).json({
                message: "Enable to read this message",
              });
            }
          }

}