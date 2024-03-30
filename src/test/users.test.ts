import request from 'supertest';
import app from '../index'; // assuming your app file is named 'index.ts'
import Users from '../models/Users'; // assuming the model file is named 'Users.ts'

describe('User Registration', () => {
    beforeEach(async () => {
        await Users.deleteMany({})
    })
  it('should return status code 201 and a success message if registration is successful', async () => {
    const newUser = {
      firstName: 'John',
      secondName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password@123'
    };

    const res = await request(app)
      .post('/users/register')
      .send(newUser);

    expect(res.status).toBe(201);
    expect(res.body.Message).toBe('User Registration  goes Well');
  });

  it('should return status code 400 and a message if email already exists', async () => {
    await Users.create({
        firstName: 'John',
        secondName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password@123',
      }) 

    const existingUser = {
      firstName: 'John',
      secondName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password@123',
    };

    const res = await request(app)
      .post('/users/register')
      .send(existingUser);

    expect(res.status).toBe(400);
    expect(res.body.Message).toBe('Email already exist !');
  });

  it('should return status code 400 and a message if request body is invalid', async () => {
    const invalidUser = {
      firstName: 'John',
      email: 'john.doe@example.com',
      password: 'Password@123'
    };

    const res = await request(app)
      .post('/users/register')
      .send(invalidUser);

    expect(res.status).toBe(400);
    expect(res.body.Message).toBe('Missing Field(s)');
  });

  it('should return status code 500 and a message if an error occurs during registration', async () => {
    jest.spyOn(Users.prototype, 'save').mockRejectedValueOnce(new Error("Error found"));

    const newUser = {
      firstName: 'John',
      secondName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password@123'
    };

    const res = await request(app)
      .post('/users/register')
      .send(newUser);

    expect(res.status).toBe(500);
    expect(res.body.Message).toBe('User Not Registered');
  });
});


describe('Get All Users - /GET', () => {
  beforeEach(async () => {
    await Users.deleteMany({});
  })
  it('should return status code 200 and all users if users exist in the database', async () => {
    const testUsers = [
      { firstName: 'John', secondName: 'Doe', email: 'john@example.com', password: 'password1', role: 'user' },
      { firstName: 'Jane', secondName: 'Doe', email: 'jane@example.com', password: 'password2', role: 'admin' }
    ];
    await Users.create(testUsers);

    const res = await request(app)
       .get('/users')
       .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
  });

  it('should return status code 500 if an error occurs while fetching users', async () => {
    jest.spyOn(Users, 'find').mockRejectedValueOnce(new Error('Database error'));

    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Fail to fetch users');
  });
});
