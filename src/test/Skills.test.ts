import request from 'supertest';
import app from '../index';
import Skills from '../models/Skills';
import mongoose from 'mongoose';


describe('Skills Controller', () => {
  it('should return status code 201 if new skill is created successfully', async () => {

        // Make the request with supertest
        const res = await request(app)
        .post('/skills/new')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
        .send({
          title: 'Test Blog',
          description: 'This is a test skill',
          percent: 90
        });
  
      // Assert the response
      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.Message).toBe('new Skill added');

  });

  it('should return status code 400 if request body is invalid', async () => {
    const res = await request(app)
      .post('/skills/new')
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
      .send({
        title: "React js"
      });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('Bad Request');
  });

  it('should return status code 500 if an error occurs during blog creation', async () => {
    // Mocking an error during blog creation
    jest.spyOn(Skills.prototype, 'save').mockRejectedValueOnce(new Error());
        const res = await request(app)
      .post('/blogs/new')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
      .send({
        title: 'Test Blog',
        description: 'This is a test skill',
        percent: 90
      });

    expect(res.status).toBe(500);
    expect(res.body.status).toBe('Fail');
    expect(res.body.Message).toBe('new Skill Not added :)');
  });
});

describe('Skills Controller - Update Skill', () => {
    it('should return status code 200 and success message if skill is updated successfully', async () => {
        // Mock request body and params
        const reqBody = {
            title: 'Test Blog',
            description: 'This is a test skill',
            percent: 90
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };

        // Mock the update operation to return a modified skill
        jest.spyOn(Skills, 'findByIdAndUpdate').mockResolvedValueOnce({ 
            _id: reqParams.id,
            title: 'Test Blog',
            description: 'This is a test skill',
            percent: 90,
            icon: 'updated_image_path.jpg'
        });

        const res = await request(app)
            .put(`/skills/edit/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
            .send(reqBody);

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('Success');
        expect(res.body.Message).toBe('Skill Successful updated');
    });

    it('should return status code 404 and message if skill is not found', async () => {
        // Mock request body and params
        const reqBody = {
            title: 'Test Blog',
            description: 'This is a test skill',
            percent: 90,
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };

        jest.spyOn(Skills, 'findByIdAndUpdate').mockResolvedValueOnce(null);

        const res = await request(app)
            .put(`/skills/edit/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
            .send(reqBody);

        expect(res.status).toBe(404);
        expect(res.body.status).toBe('Not found');
        expect(res.body.Message).toBe('Skill not found :)');
    });

    it('should return status code 500 and message if an error occurs during skill update', async () => {
        // Mock request body and params
        const reqBody = {
            title: 'Test Blog',
            description: 'This is a test skill',
            percent: 90,
        };
        const reqParams = {
            id: '606a74b3f84c3c0015c285d9'
        };

        jest.spyOn(Skills, 'findByIdAndUpdate').mockRejectedValueOnce(new Error('Database Error'));

        const res = await request(app)
            .put(`/skills/edit/${reqParams.id}`)
            .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
            .send(reqBody);

        expect(res.status).toBe(500);
        expect(res.body.Status).toBe('Fail');
        expect(res.body.Message).toBe('Skill not updated');
    });
});

describe('Delete Blog - /DELETE', () => {
  it('should return status code 200 if skill is deleted successfully', async () => {
      // Insert test data into the database
      const newBlog = await Skills.create({ 
        title: 'Test Skill',
        description: 'This is a test skill',
        percent: 90,
      });

    
      const res = await request(app)
          .delete(`/skills/delete/${newBlog._id}`)
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(200);
      expect(res.body.Message).toBe('Skill deleted !');
      expect(res.body.status).toBe('OK');
  });

  it('should return status code 404 if skill does not exist', async () => {
      const nonExistingId = new mongoose.Types.ObjectId();
    
      const res = await request(app)
          .delete(`/skills/delete/${nonExistingId}`)
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(404);
      expect(res.body.Message).toBe('Skill Not found :)');
  });

  it('should return status code 500 if an error occurs while deleting blog', async () => {
      jest.spyOn(Skills, 'findByIdAndDelete').mockRejectedValueOnce(new Error());
    
      
      const newSkill = await Skills.create({ 
        title: 'Test Skill',
        description: 'This is a test skill',
        percent: 90,
      });
      
      const res = await request(app)
          .delete(`/skills/delete/${newSkill._id}`)
          .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`);

      expect(res.status).toBe(500);
      expect(res.body.Message).toBe('Fail to delete Skill');
  });
});


describe('Get All Skills - /GET', () => {
  beforeEach(async () => {
    await Skills.deleteMany({});
  })
  it('should return status code 200 and all blogs if there are blogs in the database', async () => {
      await Skills.create({ 
        title: 'Test Skill',
        description: 'This is a test skill',
        percent: 90,
        icon: 'image1.jpg'
      });
      await Skills.create({ 
        title: 'Test Skill',
        description: 'This is a test skill',
        percent: 90,
        icon: 'image2.jpg'
      });

      const res = await request(app).get('/skills/all');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('sucess');
  });

  it('should return status code 404 if there are no skills in the database', async () => {
      const res = await request(app).get('/skills/all');

      expect(res.status).toBe(404);
      expect(res.body.Message).toBe('No skills found :)');
  });

  it('should return status code 500 if an error occurs while fetching skills', async () => {
      jest.spyOn(Skills, 'find').mockRejectedValueOnce(new Error("Error"));

      const res = await request(app).get('/skills/all');

      expect(res.status).toBe(500);
      expect(res.body.status).toBe('status');
      expect(res.body.message).toBe('Unable to display Skills:)');
  });
});



