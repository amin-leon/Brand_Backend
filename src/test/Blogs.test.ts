import request from 'supertest';
import app from '../index';
import Blogs from '../models/Blogs';
import mongoose from 'mongoose';


describe('Blogs Controller', () => {
  it('should return status code 201 if new blog is created successfully', async () => {

        // Make the request with supertest
        const res = await request(app)
        .post('/blogs/new')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
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
    const res = await request(app)
      .post('/blogs/new')
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
      .send({
        title: "Leon is good dev"
      });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('Bad Request');
  });

  it('should return status code 500 if an error occurs during blog creation', async () => {
    // Mocking an error during blog creation
    jest.spyOn(Blogs.prototype, 'save').mockRejectedValueOnce(new Error());
        const res = await request(app)
      .post('/blogs/new')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
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
            id: '606a74b3f84c3c0015c285d9'
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

        const res = await request(app)
            .put(`/blogs/update/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
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

        const res = await request(app)
            .put(`/blogs/update/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
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

        jest.spyOn(Blogs, 'findByIdAndUpdate').mockRejectedValueOnce(new Error('Database Error'));

        const res = await request(app)
            .put(`/blogs/update/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
            .send(reqBody);

        expect(res.status).toBe(500);
        expect(res.body.Status).toBe('Fail');
        expect(res.body.Message).toBe('Blog not updated');
    });
});

describe('Delete Blog - /DELETE', () => {
  it('should return status code 200 if blog is deleted successfully', async () => {
      // Insert test data into the database
      const newBlog = await Blogs.create({ 
          title: 'Test Blog',
          category: 'Technology',
          desc: 'This is a test blog',
          tag: 'test'
      });

    
      const res = await request(app)
          .delete(`/blogs/delete/${newBlog._id}`)
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(200);
      expect(res.body.Message).toBe('Blog deleted successfully');
      expect(res.body.status).toBe('OK');
  });

  it('should return status code 404 if blog does not exist', async () => {
      const nonExistingId = new mongoose.Types.ObjectId();
    
      const res = await request(app)
          .delete(`/blogs/delete/${nonExistingId}`)
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(404);
      expect(res.body.Message).toBe('Blog not found');
  });

  it('should return status code 500 if an error occurs while deleting blog', async () => {
      jest.spyOn(Blogs, 'findByIdAndDelete').mockRejectedValueOnce(new Error());
    
      
      const newBlog = await Blogs.create({ 
          title: 'Test Blog',
          category: 'Technology',
          desc: 'This is a test blog',
          tag: 'test'
      });
      
      const res = await request(app)
          .delete(`/blogs/delete/${newBlog._id}`)
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(500);
      expect(res.body.Message).toBe('Fail to delete blog');
  });
});

describe('Like Blog - /POST', () => {
  it('should return status code 200 if blog is liked successfully', async () => {
      const newBlog = await Blogs.create({ 
          title: 'Test Blog',
          category: 'Technology',
          desc: 'This is a test blog',
          tag: 'test',
          likes: []
      });

      const email = 'test@example.com';
      const res = await request(app)
          .put(`/blogs/blog/like/${newBlog._id}`)
          .send({ email });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("OK")
      expect(res.body.Message).toBe('You liked Blog');

      // Check if the blog's likes array contains the email
      const updatedBlog = await Blogs.findById(newBlog._id);
      expect(updatedBlog!.likes).toContain(email);
  });

  it('should return status code 404 if blog does not exist', async () => {
      const nonExistingId = new mongoose.Types.ObjectId();
      const email = 'test@example.com';
      const res = await request(app)
          .put(`/blogs/blog/like/${nonExistingId}`)
          .send({ email });

      expect(res.status).toBe(404);
      expect(res.body.status).toBe("Not found")
      expect(res.body.Message).toBe('Blog Not found');
  });

  it('should return status code 403 if user has already liked the blog', async () => {
      const existingBlog = await Blogs.create({ 
          title: 'Test Blog',
          category: 'Technology',
          desc: 'This is a test blog',
          tag: 'test',
          likes: ['test@example.com']
      });

      const email = 'test@example.com';
      const res = await request(app)
          .put(`/blogs/blog/like/${existingBlog._id}`)
          .send({ email });

      expect(res.status).toBe(403);
      expect(res.body.status).toBe('Forbidden')
      expect(res.body.Message).toBe('You have already liked to this blog :)');
  });

  it('should return status code 500 if an error occurs while liking the blog', async () => {
      jest.spyOn(Blogs.prototype, 'save').mockRejectedValueOnce(new Error());
      const newBlog = await Blogs.create({ 
          title: 'Test Blog',
          category: 'Technology',
          desc: 'This is a test blog',
          tag: 'test',
          likes: []
      });

      const email = 'test@example.com';
      const res = await request(app)
          .put(`/blogs/blog/like/${newBlog._id}`)
          .send({ email });

      expect(res.status).toBe(500);
      expect(res.body.status).toBe('Fail');
      expect(res.body.Message).toBe('Oops! , unable to like');
  });
});

describe('Comment Blog - /POST', () => {
  it('should return status code 200 if comment is added successfully', async () => {
      const newBlog = await Blogs.create({ 
          title: 'Test Blog',
          category: 'Technology',
          desc: 'This is a test blog',
          tag: 'test',
          comments: []
      });

      const email = 'test@example.com';
      const comment = 'This is a test comment';
      const res = await request(app)
          .put(`/blogs/blog/comment/${newBlog._id}`)
          .send({ email, comment });

      expect(res.status).toBe(200);
      expect(res.body.Message).toBe('Blog commented');
  });

  it('should return status code 404 if blog does not exist', async () => {
      const nonExistingId = new mongoose.Types.ObjectId();
      const email = 'test@example.com';
      const comment = 'This is a test comment';
      const res = await request(app)
          .put(`/blogs/blog/comment/${nonExistingId}`)
          .send({ email, comment });

      expect(res.status).toBe(404);
      expect(res.body.Message).toBe('Blog Not found');
  });

  it('should return status code 400 if required fields are missing', async () => {
      const newBlog = await Blogs.create({ 
          title: 'Test Blog',
          category: 'Technology',
          desc: 'This is a test blog',
          tag: 'test',
          comments: []
      });

      const res = await request(app)
          .put(`/blogs/blog/comment/${newBlog._id}`)
          .send({
            email: "leon@gmail.com"
          });

      expect(res.status).toBe(400);
      expect(res.body.Message).toBe('Missing value for fields');
  });

  it('should return status code 500 if an error occurs while commenting on the blog', async () => {
      jest.spyOn(Blogs.prototype, 'save').mockRejectedValueOnce(new Error());
      const newBlog = await Blogs.create({ 
          title: 'Test Blog',
          category: 'Technology',
          desc: 'This is a test blog',
          tag: 'test',
          comments: []
      });

      const email = 'test@example.com';
      const comment = 'This is a test comment';
      const res = await request(app)
          .put(`/blogs/blog/comment/${newBlog._id}`)
          .send({ email, comment });

      expect(res.status).toBe(500);
      expect(res.body.Message).toBe('Oops! , unable to comment');
  });
});

describe('Get All Blogs - /GET', () => {
  beforeEach(async () => {
    await Blogs.deleteMany({});
  })
  it('should return status code 200 and all blogs if there are blogs in the database', async () => {
      await Blogs.create({ 
          title: 'Blog 1',
          category: 'Technology',
          desc: 'Description of Blog 1',
          tag: 'tag1',
          image: 'image1.jpg'
      });
      await Blogs.create({ 
          title: 'Blog 2',
          category: 'Science',
          desc: 'Description of Blog 2',
          tag: 'tag2',
          image: 'image2.jpg'
      });

      const res = await request(app).get('/blogs/all');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
  });

  it('should return status code 404 if there are no blogs in the database', async () => {
      const res = await request(app).get('/blogs/all');

      expect(res.status).toBe(404);
      expect(res.body.Message).toBe('No blogs found :)');
  });

  it('should return status code 500 if an error occurs while fetching blogs', async () => {
      jest.spyOn(Blogs, 'find').mockRejectedValueOnce(new Error("Error"));

      const res = await request(app).get('/blogs/all');

      expect(res.status).toBe(500);
      expect(res.body.status).toBe('status');
      expect(res.body.message).toBe('Unable to display Blogs:)');
  });
});



