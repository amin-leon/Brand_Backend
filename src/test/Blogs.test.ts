import request from 'supertest';
import app from '../index';
import Blogs from '../models/Blogs';


describe('Blogs Controller', () => {
  it('should return status code 201 if new blog is created successfully', async () => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUwOWViMWZlMDA3ZjZhMTc5MDBhZTIiLCJmaXJzdE5hbWUiOiJucGMiLCJzZWNvbmROYW1lIjoiTlBDIGNvbGxhZ2UiLCJlbWFpbCI6Im5wY0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRKSXJ4TWJ6VVJIQlJad3k5Q2dBM3NPak1RWVdlTGIzMjhpLmtzV0d3WFoyaGs0VDVtbElvZSIsIl9fdiI6MCwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzA5ODA0NDU0LCJleHAiOjE3MDk4OTA4NTR9.XeTY0cs4X0wy1sh83Jw7SsgLm32e39LFMe12RDSnBso';

        // Make the request with supertest
        const res = await request(app)
        .post('/blogs/new')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Blog',
          category: 'Technology',
          desc: 'This is a test blog',
          tag: 'test'
        });
  
      // Assert the response
      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.Message).toBe('New blog created !');

  });

  it('should return status code 400 if request body is invalid', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUwOWViMWZlMDA3ZjZhMTc5MDBhZTIiLCJmaXJzdE5hbWUiOiJucGMiLCJzZWNvbmROYW1lIjoiTlBDIGNvbGxhZ2UiLCJlbWFpbCI6Im5wY0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRKSXJ4TWJ6VVJIQlJad3k5Q2dBM3NPak1RWVdlTGIzMjhpLmtzV0d3WFoyaGs0VDVtbElvZSIsIl9fdiI6MCwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzA5ODA0NDU0LCJleHAiOjE3MDk4OTA4NTR9.XeTY0cs4X0wy1sh83Jw7SsgLm32e39LFMe12RDSnBso';

    const res = await request(app)
      .post('/blogs/new')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "Leon is good dev"
      });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('Bad Request');
  });

  it('should return status code 500 if an error occurs during blog creation', async () => {
    // Mocking an error during blog creation
    jest.spyOn(Blogs.prototype, 'save').mockRejectedValueOnce(new Error());
    
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUwOWViMWZlMDA3ZjZhMTc5MDBhZTIiLCJmaXJzdE5hbWUiOiJucGMiLCJzZWNvbmROYW1lIjoiTlBDIGNvbGxhZ2UiLCJlbWFpbCI6Im5wY0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRKSXJ4TWJ6VVJIQlJad3k5Q2dBM3NPak1RWVdlTGIzMjhpLmtzV0d3WFoyaGs0VDVtbElvZSIsIl9fdiI6MCwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzA5ODA0NDU0LCJleHAiOjE3MDk4OTA4NTR9.XeTY0cs4X0wy1sh83Jw7SsgLm32e39LFMe12RDSnBso';
    const res = await request(app)
      .post('/blogs/new')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Blog',
        category: 'Technology',
        desc: 'This is a test blog',
        tag: 'test'
      });

    expect(res.status).toBe(500);
    expect(res.body.status).toBe('Fail');
    expect(res.body.Message).toBe('Blog not created :)');
  });
});

describe('Blogs Controller - Update Blog', () => {
    it('should return status code 200 and success message if blog is updated successfully', async () => {
        // Mock request body and params
        const reqBody = {
            title: 'Updated Blog Title',
            desc: 'Updated Blog Description',
            category: 'Updated Category',
            tag: 'updated'
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9' // Assuming this is a valid blog ID in the database
        };

        // Mock the update operation to return a modified blog
        jest.spyOn(Blogs, 'findByIdAndUpdate').mockResolvedValueOnce({ 
            _id: reqParams.id,
            title: reqBody.title,
            desc: reqBody.desc,
            category: reqBody.category,
            tag: reqBody.tag,
            image: 'updated_image_path.jpg'
        });
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUwOWViMWZlMDA3ZjZhMTc5MDBhZTIiLCJmaXJzdE5hbWUiOiJucGMiLCJzZWNvbmROYW1lIjoiTlBDIGNvbGxhZ2UiLCJlbWFpbCI6Im5wY0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRKSXJ4TWJ6VVJIQlJad3k5Q2dBM3NPak1RWVdlTGIzMjhpLmtzV0d3WFoyaGs0VDVtbElvZSIsIl9fdiI6MCwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzA5ODA0NDU0LCJleHAiOjE3MDk4OTA4NTR9.XeTY0cs4X0wy1sh83Jw7SsgLm32e39LFMe12RDSnBso';

        const res = await request(app)
            .put(`/blogs/update/${reqParams.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(reqBody);

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('Success');
        expect(res.body.Message).toBe('Blog Successful updated');
    });

    it('should return status code 404 and message if blog is not found', async () => {
        // Mock request body and params
        const reqBody = {
            title: 'Updated Blog Title',
            desc: 'Updated Blog Description',
            category: 'Updated Category',
            tag: 'updated'
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };

        jest.spyOn(Blogs, 'findByIdAndUpdate').mockResolvedValueOnce(null);
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUwOWViMWZlMDA3ZjZhMTc5MDBhZTIiLCJmaXJzdE5hbWUiOiJucGMiLCJzZWNvbmROYW1lIjoiTlBDIGNvbGxhZ2UiLCJlbWFpbCI6Im5wY0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRKSXJ4TWJ6VVJIQlJad3k5Q2dBM3NPak1RWVdlTGIzMjhpLmtzV0d3WFoyaGs0VDVtbElvZSIsIl9fdiI6MCwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzA5ODA0NDU0LCJleHAiOjE3MDk4OTA4NTR9.XeTY0cs4X0wy1sh83Jw7SsgLm32e39LFMe12RDSnBso';

        const res = await request(app)
            .put(`/blogs/update/${reqParams.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(reqBody);

        expect(res.status).toBe(404);
        expect(res.body.status).toBe('Not found');
        expect(res.body.Message).toBe('Blog not found :)');
    });

    it('should return status code 500 and message if an error occurs during blog update', async () => {
        // Mock request body and params
        const reqBody = {
            title: 'Updated Blog Title',
            desc: 'Updated Blog Description',
            category: 'Updated Category',
            tag: 'updated'
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };

        // Mock the update operation to throw an error
        jest.spyOn(Blogs, 'findByIdAndUpdate').mockRejectedValueOnce(new Error('Database Error'));
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUwOWViMWZlMDA3ZjZhMTc5MDBhZTIiLCJmaXJzdE5hbWUiOiJucGMiLCJzZWNvbmROYW1lIjoiTlBDIGNvbGxhZ2UiLCJlbWFpbCI6Im5wY0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRKSXJ4TWJ6VVJIQlJad3k5Q2dBM3NPak1RWVdlTGIzMjhpLmtzV0d3WFoyaGs0VDVtbElvZSIsIl9fdiI6MCwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzA5ODA0NDU0LCJleHAiOjE3MDk4OTA4NTR9.XeTY0cs4X0wy1sh83Jw7SsgLm32e39LFMe12RDSnBso';

        const res = await request(app)
            .put(`/blogs/update/${reqParams.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(reqBody);

        expect(res.status).toBe(500);
        expect(res.body.Status).toBe('Fail');
        expect(res.body.Message).toBe('Blog not updated');
    });
});

