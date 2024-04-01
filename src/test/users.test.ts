import request from 'supertest';
import app from '../index';
import Users from '../models/Users'; // assuming the model file is named 'Users.ts'
import mongoose from 'mongoose';

describe("Register User Controller", () =>{
    beforeEach(async () => {
        await Users.deleteMany({});
    });
    afterEach(async () => {
        await Users.deleteMany({});
    });
    describe("Register a user -/POST", () => {
        it("should return 201 if user is well registered", async () => {
            const res = await request(app)
                .post("/users/register")
                .send({
                  firstName: 'John',
                  secondName: 'Doe',
                  email: 'john.doe@example.com',
                  password: 'Password@123'
                });
    
            expect(res.status).toBe(201);
            expect(res.body.Message).toBe("User Registration  goes Well");
        });
    
        it("should return 400 if request body is invalid", async () => {
            const res = await request(app)
                .post("/users/register")
                .send({
                    names: "Hello my friend",
                    email: "leon@gmail.com",
                });
    
            expect(res.status).toBe(400);
            expect(res.body.status).toBe("Bad request");
            expect(res.body.Message).toBe("Missing Field(s)");
        });
    
        it("should return 500 if an error occurs during message creation", async () => {
            jest.spyOn(Users.prototype, 'save').mockRejectedValueOnce(new Error());
    
            const res = await request(app)
                .post("/users/register")
                .send({
                  firstName: 'John',
                  secondName: 'Doe',
                  email: 'john.doe@example.com',
                  password: 'Password@123'
                });
    
            expect(res.status).toBe(500);
            expect(res.body.Message).toBe("User Not Registered");
        });
    });

    describe("Get Users -/GET", () => {
      beforeEach(async () => {
          await Users.deleteMany({});
      });
  
      it("should return status code 200 and Users if users are found", async () => {

        await Users.create({ 
              firstName: 'Leon',
              secondName: 'peter',
              email: 'leon@example.com',
              password: 'Password@123'
          
        });
        await Users.create({ 
          firstName: 'Leon',
          secondName: 'peter',
          email: 'leonpizzo@example.com',
          password: 'Password@123'
      
        });
  
          const res = await request(app)
              .get('/users')
              .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
  
          expect(res.status).toBe(200);
          expect(res.body.status).toBe("success");
      });
  
      it("should return status code 500 if an error occurs while fetching messages", async () => {
          jest.spyOn(Users, 'find').mockRejectedValueOnce(new Error());
  
          const res = await request(app)
              .get('/users')
              .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
  
          expect(res.status).toBe(500);
          expect(res.body.message).toBe("Fail to fetch users");
      });
  
      it("should return status code 404 if no users are found", async () => {
          const res = await request(app)
              .get('/users')
              .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
  
          expect(res.status).toBe(404);
          expect(res.body.Message).toBe("No User Found :)");
      });
  });
  

  describe('Delete User - /DELETE', () => {
    beforeEach(async () => {
        await Users.deleteMany({});
    });

    it('should return status code 204 if user is deleted successfully', async () => {
        const newUser = await Users.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });

        const res = await request(app)
            .delete(`/users/delete/${newUser._id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({});
    });

    it('should return status code 404 if user does not exist', async () => {
        const newUser = await Users.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });

        const res = await request(app)
            .delete(`/users/delete/${newUser._id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

        expect(res.status).toBe(404);
        expect(res.body.Message).toBe('User not Found');
    });

    it('should return status code 500 if an error occurs while deleting user', async () => {
        jest.spyOn(Users, 'findByIdAndDelete').mockRejectedValueOnce(new Error());

        const newUser = await Users.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });
        const res = await request(app)
            .delete(`/users/delete/${newUser._id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

        expect(res.status).toBe(500);
        expect(res.body.Message).toBe('Fail to delete user');
    });
});


describe('Update User - /PUT', () => {
  beforeEach(async () => {
      await Users.deleteMany({});
  });

  it('should return status code 200 and updated user info if user is updated successfully', async () => {
      const newUser = await Users.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });
      const updatedInfo = { firstName: 'Jane', secondName: 'Doe', email: 'jane.doe@example.com', password: 'NewPassword@123' };

      const res = await request(app)
          .put(`/users/update/${newUser._id}`)
          .send(updatedInfo)
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(200);
      expect(res.body.Message).toBe('User updated Well !');
  });

  it('should return status code 404 if user does not exist', async () => {
      const userId = new mongoose.Types.ObjectId();
      const res = await request(app)
          .put(`/users/update/${userId}`)
          .send({ firstName: 'Jane', secondName: 'Doe', email: 'jane.doe@example.com', password: 'NewPassword@123' })
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(404);
      expect(res.body.Message).toBe('User not found !');
  });

  it('should return status code 400 if request body is invalid', async () => {
      const newUser = await Users.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });
      const invalidInfo = {  lsyy: 'Doe', email: 'jane.doe@example.com', password: 'NewPassword@123' };

      const res = await request(app)
          .put(`/users/update/${newUser._id}`)
          .send(invalidInfo)
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe('Bad request');
  });

  it('should return status code 500 if an error occurs while updating user', async () => {
      jest.spyOn(Users, 'findByIdAndUpdate').mockRejectedValueOnce(new Error());

      const newUser = await Users.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });
      const res = await request(app)
          .put(`/users/update/${newUser._id}`)
          .send({ firstName: 'Jane', secondName: 'Doe', email: 'jane.doe@example.com', password: 'NewPassword@123' })
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(500);
      expect(res.body.Message).toBe('Internal Server Error');
  });
});


describe('Get Single User - /GET', () => {
  beforeEach(async () => {
      await Users.deleteMany({});
  });

  it('should return status code 200 and user info if user is found', async () => {
      const newUser = await Users.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });

      const res = await request(app)
          .get(`/users/${newUser._id}`)
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
  });

  it('should return status code 404 if user does not exist', async () => {
      const userId = new mongoose.Types.ObjectId();

      const res = await request(app)
          .get(`/users/${userId}`)
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(404);
      expect(res.body.Message).toBe('No User Found :)');
  });

  it('should return status code 500 if an error occurs while fetching user', async () => {
      jest.spyOn(Users, 'findOne').mockRejectedValueOnce(new Error());

      const newUser = await Users.create({ firstName: 'John', secondName: 'Doe', email: 'john.doe@example.com', password: 'Password@123' });
      const res = await request(app)
          .get(`/users/${newUser._id}`)
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Fail to fecth user');
  });
});

})

