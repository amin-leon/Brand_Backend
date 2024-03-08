import request from 'supertest';
import app from '../index';
import Messages from '../models/Messages';
import mongoose from 'mongoose';

describe("Messages Controller", () =>{
    beforeEach(async () => {
        await Messages.deleteMany({});
    });
    afterEach(async () => {
        await Messages.deleteMany({});
    });
    describe("Send Messages -/POST", () => {
        it("should return 201 if message is sent successfully", async () => {
            const res = await request(app)
                .post("/messages/new")
                .send({
                    subject: "Hello my friend",
                    message: "shgdhsgdhsgdh",
                    email: "leon@gmail.com",
                });
    
            expect(res.status).toBe(201);
            expect(res.body.Message).toBe("Message sent !");
        });
    
        it("should return 400 if request body is invalid", async () => {
            const res = await request(app)
                .post("/messages/new")
                .send({
                    subject: "Hello my friend",
                    email: "leon@gmail.com",
                });
    
            expect(res.status).toBe(400);
            expect(res.body.status).toBe("Bad Request");
            expect(res.body.message).toBe('"message" is required');
        });
    
        it("should return 500 if an error occurs during message creation", async () => {
            jest.spyOn(Messages.prototype, 'save').mockRejectedValueOnce(new Error());
    
            const res = await request(app)
                .post("/messages/new")
                .send({
                    subject: "Hello my friend",
                    message: "shgdhsgdhsgdh",
                    email: "leon@gmail.com",
                });
    
            expect(res.status).toBe(500);
            expect(res.body.Message).toBe("Message Not sent :)");
        });
    });
    describe("Get Messages -/GET", () => {
        beforeEach(async () => {
            await Messages.deleteMany({});
        });
    
        it("should return status code 200 and messages if messages are found", async () => {
            const mockMessages = [
                { subject: 'Message 1', message: 'Content 1', email: 'test1@example.com' },
                { subject: 'Message 2', message: 'Content 2', email: 'test2@example.com' },
            ];
            await Messages.insertMany(mockMessages);

            const res = await request(app)
              .get('/messages/all')
              .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
    
            expect(res.status).toBe(200);
            expect(res.body.status).toBe("success");
        });
    
        it("should return status code 500 if an error occurs while fetching messages", async () => {
            // Mocking an error while fetching messages
            jest.spyOn(Messages, 'find').mockRejectedValueOnce(new Error());

    
            const res = await request(app)
               .get('/messages/all')
               .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
    
            // Assert the response
            expect(res.status).toBe(500);
            expect(res.body.message).toBe("Fail to Fetch Message :)");
        });
    });

    describe('Delete Message - /DELETE', () => {
        // beforeEach(async () => {
        //     await Messages.deleteMany({});
        // });
        it('should return status code 200 if message is deleted successfully', async () => {
            // Insert test data into the database
            const newMessage = await Messages.create({ subject: 'Test Subject', message: 'Test Message', email: 'test@example.com' });

             
            const res = await request(app)
              .delete(`/messages/delete/${newMessage._id}`)
              .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
      
            expect(res.status).toBe(200);
            expect(res.body.Message).toBe('Message deleted successfully');
        });
      
        it('should return status code 404 if message does not exist', async () => {
            const newMessage  = new mongoose.Types.ObjectId();
            const res = await request(app)
              .delete(`/messages/delete/${newMessage}`)
              .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
      
            expect(res.status).toBe(404);
            expect(res.body.Message).toBe('Message not Found');
        });
      
        it('should return status code 500 if an error occurs while deleting message', async () => {
            jest.spyOn(Messages, 'findByIdAndDelete').mockRejectedValueOnce(new Error());
            
            const newMessage = await Messages.create({ subject: 'Test Subject', message: 'Test Message', email: 'test@example.com' });
            const res = await request(app)
            .delete(`/messages/delete/${newMessage._id}`)
              .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
      
            expect(res.status).toBe(500);
            expect(res.body.Message).toBe('Fail to delete message');
          });
    });

    describe("Read Message - /PUT", () => {
        it("should return status code 200 and success message when message is successfully marked as read", async () => {
            const newMessage = await Messages.create({
                subject: 'Test Subject',
                message: 'Test Message',
                email: 'test@example.com'
            });
    
            const res = await request(app)
                .put(`/messages/read/${newMessage._id}`)
                .send({ read: true });
    
            expect(res.status).toBe(200);
            expect(res.body.status).toBe("Success");
            expect(res.body.Message).toBe("You have Read this message");
            });
    
        it("should return status code 400 and error message when 'read' field is missing in request body", async () => {
                // Create a new message to test
                const newMessage = await Messages.create({
                    subject: 'Test Subject',
                    message: 'Test Message',
                    email: 'test@example.com'
                });
    
                // Make a request with missing 'read' field
                const res = await request(app)
                    .put(`/messages/read/${newMessage._id}`)
                    .send({});
    
                // Assert the response
                expect(res.status).toBe(400);
                expect(res.body.status).toBe("Bad request");
                expect(res.body.Message).toBe("Missing or invalid 'read' field value");
            });
    
        it("should return status code 404 and error message when Fail to update as read", async () => {
                // Make a request with an invalid message ID
                const randomId =new  mongoose.Types.ObjectId();
                const res = await request(app)
                    .put(`/messages/read/${randomId}`)
                    .send({ read: true });
    
                // Assert the response
                expect(res.status).toBe(404);
                expect(res.body.Message).toBe("Message not found");
        });

        it("should return status code 500 if an error occurs while reading", async () => {
            // Mocking an error while updating message
            jest.spyOn(Messages, 'findByIdAndUpdate').mockRejectedValueOnce(new Error());
        
            const newMessage = await Messages.create({
                subject: 'Test Subject',
                message: 'Test Message',
                email: 'test@example.com'
            });
        
            // Make a request to mark the message as read
            const res = await request(app)
                .put(`/messages/read/${newMessage._id}`)
                .send({ read: true });
        
            expect(res.status).toBe(500);
            expect(res.body.status).toBe("Error");
            expect(res.body.Message).toBe("Failed to update message");
        });
        
        });
})
