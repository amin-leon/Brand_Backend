import request from 'supertest';
import app from '../index'; 
import Users from '../models/Users'; 

describe('Login Users - /POST', () => {
    beforeEach(async () => {
        await Users.deleteMany({})
    })

    it('should return status code 404 if the users does not exist', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: 'nonexistent@example.com', password: 'password' });

        expect(res.status).toBe(404);
        expect(res.body.Message).toBe('Account does not exist');
    });

    it('should return status code 401 if the password is incorrect', async () => {
        await Users.create({
            firstName: "Leon",
            secondName: "Alvin",
            email: 'test@example.com',
            password: 'password'
        });

        const res = await request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'wrongpassword' });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Password incorrect :)');
    });

    it('should return status code 500 if an error occurs while logging in', async () => {
        jest.spyOn(Users, 'findOne').mockRejectedValueOnce(new Error('Database error'));

        const res = await request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'password' });

        expect(res.status).toBe(500);
        expect(res.body.Message).toBe('Fail to login');
    });
});
