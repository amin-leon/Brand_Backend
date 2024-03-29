import { Response, Request } from "express";
import { SubscribersTypes } from "../types/Subscribers";
import Subscribers from "../models/Subscribers";


// User Registration
export default class SubscribersController {
    static async subscribe(req: Request, res: Response){
        try {
            const { email }: SubscribersTypes = req.body;
            if(!email){
               return res.status(400).json({
                    status: "Bad request",
                    message: "Mssing fields value!"
                })
            }

            const alreadySub = await Subscribers.findOne({email: email});
            if(alreadySub){
                return res.status(200).json({
                    Message: "You have Already Subsribed!"
                })
            }

            // new message object
            const newSub = new Subscribers({email});
            // save sub 
            await newSub.save();
            return res.status(500).json({
                Message: "Your Subscribution sent !",
            })
        } catch (error) {
           return res.status(500).json({
              Message: "Subscribution Not sent :)"
            })
        }
    }

    // Get all Subscribers
    static async getAllSubs(req: Request, res: Response) {
        try {
          const allSubs = await Subscribers.find();
          if(!allSubs){
            res.status(404).json({
                Message: "No Subs  :)"
            })
          }
          return res.status(200).json({
            status: "sucess",
            Subs: allSubs,
          });
        } catch (error) {
           return res.status(500).json({
            message: "Fail to Fetch allSubs :)",
          });
        }
      }
    
    // delete message
    static async deleteSub(req: Request, res: Response){
        try {
            const {id} = req.params;

            // check if sub exist
            const existSub = await Subscribers.findById(id);
            if(!existSub){
               return res.status(404).json({
                    Message: "Message not Found"
                })
            }

            // delete message
            await Subscribers.findByIdAndDelete(id);
            return res.status(200).json({
                Message: "Sub deleted successfully",
            })

        } catch (error: any) {
            console.log(error.message);
            return res.status(500).json({
                status: "Fail",
                Message: "Fail to delete sub"
            })
        }
    }

}