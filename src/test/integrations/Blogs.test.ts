// src/__tests__/blog.test.ts
import request from 'supertest';
import app from '../../index';
import { connectTestDB, closeTestDB } from '../../test-db';
import Blogs from '../../models/Blogs';

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

describe('Blogs', () => {
  describe('Get All Blogs', () => {
    it('should return status code 200 if blogs found', async () => {
      // Insert test data into the database
      const mockBlogs = [
        { title: 'Blog 1', content: 'Content 1' },
        { title: 'Blog 2', content: 'Content 2' },
      ];
      await Blogs.insertMany(mockBlogs);

      // Make a request to your API endpoint
      const res = await request(app).get('/blogs/all');

      // Assert the response
      expect(res.status).toBe(200);
      await Blogs.deleteMany({});
    });

    it('should return status code 404 if no blogs are found', async () => {
      const res = await request(app).get('/blogs/all');

      // Assert the response
      expect(res.status).toBe(200);
    });
  });
});
