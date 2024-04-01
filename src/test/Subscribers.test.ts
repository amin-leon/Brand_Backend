import request from 'supertest';
import app from '../index';
import Subs from '../models/Subscribers';
import mongoose from 'mongoose';

describe("Subscribers Controller", () =>{
    beforeEach(async () => {
        await Subs.deleteMany({});
    });
    afterEach(async () => {
        await Subs.deleteMany({});
    });
    
    describe("Subscribe - /POST", () => {
        it("should return 201 if subscription is successful", async () => {
            const res = await request(app)
                .post("/subscribers/subscribe")
                .send({
                    email: "leon@gmail.com",
                });
    
            expect(res.status).toBe(201);
            expect(res.body.Message).toBe("Your Subscribution sent !");
        });
    
        it("should return 400 if request body is invalid", async () => {
            const res = await request(app)
                .post("/subscribers/subscribe")
                .send({
                    names: "Hello my friend",
                });
    
            expect(res.status).toBe(400);
            expect(res.body.status).toBe("Bad request");
        });
    
        it("should return 500 if an error occurs during subscription creation", async () => {
            jest.spyOn(Subs.prototype, 'save').mockRejectedValueOnce(new Error());
    
            const res = await request(app)
                .post("/subscribers/subscribe")
                .send({
                    email: "leon@gmail.com",
                });
    
            expect(res.status).toBe(500);
            expect(res.body.Message).toBe("Subscribution Not sent :)");
        });
    });
    
    describe("Get all subscribers -/GET", () => {
        beforeEach(async () => {
            await Subs.deleteMany({});
        });
    
        it("should return status code 200 and subs if subscribers are found", async () => {
            const mockSubscribers = [
                { email: 'test1@example.com' },
                { email: 'test2@example.com' },
            ];
            await Subs.insertMany(mockSubscribers);
    
            const res = await request(app)
                .get('/subscribers/all')
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
    
            expect(res.status).toBe(200);
            expect(res.body.status).toBe("sucess");
        });
    
        it("should return status code 500 if an error occurs while fetching subs", async () => {
            jest.spyOn(Subs, 'find').mockRejectedValueOnce(new Error());
    
            const res = await request(app)
                .get('/subscribers/all')
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
    
            expect(res.status).toBe(500);
            expect(res.body.message).toBe("Fail to Fetch allSubs :)");
        });
    
        it("should return status code 404 if no subscribers are found", async () => {
            const res = await request(app)
                .get('/subscribers/all')
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
    
            expect(res.status).toBe(404);
            expect(res.body.Message).toBe("No Subs :)");
        });
    });
    

    describe('Delete sub - /DELETE', () => {
        // beforeEach(async () => {
        //     await Messages.deleteMany({});
        // });
        it('should return status code 200 if sub is deleted successfully', async () => {
            // Insert test data into the database
            const newMessage = await Subs.create({ email: 'test@example.com' });

             
            const res = await request(app)
              .delete(`/subscribers/delete/${newMessage._id}`)
              .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
      
            expect(res.status).toBe(200);
            expect(res.body.Message).toBe('Sub deleted successfully');
        });
      
        it('should return status code 404 if message does not exist', async () => {
            const newMessage  = new mongoose.Types.ObjectId();
            const res = await request(app)
              .delete(`/subscribers/delete/${newMessage}`)
              .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
      
            expect(res.status).toBe(404);
            expect(res.body.Message).toBe('Subs not Found');
        });
      
        it('should return status code 500 if an error occurs while deleting sub', async () => {
            jest.spyOn(Subs, 'findByIdAndDelete').mockRejectedValueOnce(new Error());
            
            const newMessage = await Subs.create({email: 'test@example.com' });
            const res = await request(app)
            .delete(`/subscribers/delete/${newMessage._id}`)
              .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
      
            expect(res.status).toBe(500);
            expect(res.body.Message).toBe('Fail to delete sub');
          });
    });
})
