import request from 'supertest';
import app from '../index';
import Projects from '../models/Projects';
import mongoose from 'mongoose';


describe('Projects Controller', () => {
  it('should return status code 201 if new project is created successfully', async () => {

        // Make the request with supertest
        const res = await request(app)
        .post('/projects/add')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
        .send({
          title: 'Test Blog',
          category: 'Technology',
          description: 'This is a test blog',
          link: 'www.test.com',
          image: 'image.jpg'
        });
  
      // Assert the response
      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.Message).toBe('Project added');

  });

  it('should return status code 400 if request body is invalid', async () => {
    const res = await request(app)
      .post('/projects/add')
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
      .send({
        title: "Shopify"
      });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('Bad Request');
  });

  it('should return status code 500 if an error occurs during project add', async () => {
    // Mocking an error during project addition
    jest.spyOn(Projects.prototype, 'save').mockRejectedValueOnce(new Error());
        const res = await request(app)
      .post('/projects/add')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
      .send({
        title: 'Test Blog',
        category: 'Technology',
        description: 'This is a test blog',
        link: 'www.test.com'
      });

    expect(res.status).toBe(500);
    expect(res.body.status).toBe('Fail');
    expect(res.body.Message).toBe('Project Not added :)');
  });
});

describe('Projects Controller - Update Project', () => {
    it('should return status code 200 and success message if project is updated successfully', async () => {
        // Mock request body and params
        const reqBody = {
            title: 'Test Blog',
            category: 'Technology',
            description: 'This is a test project',
            link: 'www.test.com'
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };

        // Mock the update operation to return a modified project
        jest.spyOn(Projects, 'findByIdAndUpdate').mockResolvedValueOnce({ 
            _id: reqParams.id,
            title: reqBody.title,
            description: reqBody.description,
            category: reqBody.category,
            link: reqBody.link,
            image: 'updated_image_path.jpg'
        });

        const res = await request(app)
            .put(`/projects/edit/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
            .send(reqBody);

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('Success');
        expect(res.body.Message).toBe('Project Successful updated');
    });

    it('should return status code 404 and message if project is not found', async () => {
        // Mock request body and params
        const reqBody = {
            title: 'Test Blog',
            category: 'Technology',
            description: 'This is a test project',
            link: 'www.test.com'
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };

        jest.spyOn(Projects, 'findByIdAndUpdate').mockResolvedValueOnce(null);

        const res = await request(app)
            .put(`/projects/edit/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
            .send(reqBody);

        expect(res.status).toBe(404);
        expect(res.body.status).toBe('Not found');
        expect(res.body.Message).toBe('Project not found :)');
    });

    it('should return status code 500 and message if an error occurs during project update', async () => {
        // Mock request body and params
        const reqBody = {
            title: 'Test Blog',
            category: 'Technology',
            description: 'This is a test project',
            link: 'www.test.com'
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };

        jest.spyOn(Projects, 'findByIdAndUpdate').mockRejectedValueOnce(new Error('Database Error'));

        const res = await request(app)
            .put(`/projects/edit/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
            .send(reqBody);

        expect(res.status).toBe(500);
        expect(res.body.Status).toBe('Fail');
        expect(res.body.Message).toBe('Project not updated');
    });
});

describe('Delete Blog - /DELETE', () => {
  it('should return status code 200 if blog is deleted successfully', async () => {
      // Insert test data into the database
      const newProject = await Projects.create({ 
        title: 'Test Blog',
        category: 'Technology',
        description: 'This is a test project',
        link: 'www.test.com'
      });

    
      const res = await request(app)
          .delete(`/projects/remove/${newProject._id}`)
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(200);
      expect(res.body.Message).toBe('Project deleted !');
      expect(res.body.status).toBe('OK');
  });

  it('should return status code 404 if project does not exist', async () => {
      const nonExistingId = new mongoose.Types.ObjectId();
    
      const res = await request(app)
          .delete(`/projects/remove/${nonExistingId}`)
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(404);
      expect(res.body.status).toBe('OK');
      expect(res.body.Message).toBe('Project Not found :)');
  });

  it('should return status code 500 if an error occurs while deleting project', async () => {
      jest.spyOn(Projects, 'findByIdAndDelete').mockRejectedValueOnce(new Error());
    
      
      const newProject = await Projects.create({ 
        title: 'Test Blog',
        category: 'Technology',
        description: 'This is a test project',
        link: 'www.test.com'
      });
      
      const res = await request(app)
          .delete(`/projects/remove/${newProject._id}`)
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(500);
      expect(res.body.Message).toBe('Fail to delete project');
  });
});


describe('Get All Projects - /GET', () => {
  beforeEach(async () => {
    await Projects.deleteMany({});
  })
  it('should return status code 200 and all projects if there are projects in the database', async () => {
      await Projects.create({ 
        title: 'Test Blog',
        category: 'Technology',
        description: 'This is a test project',
        link: 'www.test.com',
        image: 'image2.jpg'
      });
      await Projects.create({ 
        title: 'Test Blog',
        category: 'Technology',
        description: 'This is a test project',
        link: 'www.test.com',
        image: 'image2.jpg'
      });

      const res = await request(app).get('/projects/all');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
  });

  it('should return status code 404 if there are no projects in the database', async () => {
      const res = await request(app).get('/projects/all');

      expect(res.status).toBe(404);
      expect(res.body.Message).toBe('No Project Found :)');
  });

  it('should return status code 500 if an error occurs while fetching blogs', async () => {
      jest.spyOn(Projects, 'find').mockRejectedValueOnce(new Error("Error"));

      const res = await request(app).get('/projects/all');

      expect(res.status).toBe(500);
      expect(res.body.status).toBe('status');
      expect(res.body.message).toBe('Unable to display Projects:)');
  });
});

describe('Get Single Project - /GET', () => {
    beforeEach(async () => {
      await Projects.deleteMany({});
    });
  
    it('should return status code 200 and the project if it exists', async () => {
      const project = await Projects.create({ 
        title: 'Test Project',
        category: 'Technology',
        description: 'This is a test project',
        link: 'www.test.com',
        image: 'image.jpg'
      });
  
      const res = await request(app).get(`/projects/${project._id}`);
  
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('sucess');
    });
  
    it('should return status code 404 if the project does not exist', async () => {
        const nonExistingId = new mongoose.Types.ObjectId();
  
      const res = await request(app).get(`/projects/${nonExistingId}`);
  
      expect(res.status).toBe(404);
      expect(res.body.Message).toBe('No Project Found :)');
    });
  
    it('should return status code 500 if an error occurs while fetching the project', async () => {
      jest.spyOn(Projects, 'findOne').mockRejectedValueOnce(new Error("Error"));
  
      const res = await request(app).get('/projects/609cbbed1c5eac47d8f6e95c');
  
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Unable to find Project :)');
    });
  });
  



