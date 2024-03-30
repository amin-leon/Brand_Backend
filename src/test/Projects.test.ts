import request from 'supertest';
import app from '../index';

describe('ProjectsController', () => {
    describe('addNewProject', () => {
        it('should add a new project and return status 201', async () => {
            const projectData = {
                title: 'New Project',
                category: 'Category',
                description: 'Description',
                link: 'http://example.com',
                image:"echnology.jpeg"
            };

            const response = await request(app)
                .post('/projects/add')
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
                .send(projectData)


            expect(response.status).toBe(201);
            expect(response.body.status).toBe('success');
            expect(response.body.Message).toBe('Project added');
        });

        it('should return status 400 if request body is invalid', async () => {
            const invalidProjectData = {
                title: 'New Project',
                category: 'Category',
                description: 'Description',
                image:"echnology.jpeg"
            };

            const response = await request(app)
                .post('/projects/add')
                .send(invalidProjectData)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)

            expect(response.status).toBe(400);
            expect(response.body.status).toBe('Bad Request');
            expect(response.body.message).toBe('"link" is required');
        });
    });

    describe('updateProject', () => {
        it('should update an existing project and return status 200', async () => {
            // Assuming 'projectId' is a valid project ID in your database
            const projectId = '609cbbed1c5eac47d8f6e95c';
            const updatedProjectData = {
                title: 'Updated Project',
                category: 'Updated Category',
                description: 'Updated Description',
                link: 'http://updated.example.com',
                image:"echnology.jpeg"
            };

            const response = await request(app)
                .put(`/projects/edit/${projectId}`)
                .send(updatedProjectData)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('Success');
            expect(response.body.Message).toBe('Project Successful updated');
        });

        // Add more test cases for validation errors, etc.
    });

    describe('deleteProject', () => {
        it('should delete an existing project and return status 200', async () => {
            // Assuming 'projectId' is a valid project ID in your database
            const projectId = '609cbbed1c5eac47d8f6e95c';

            const response = await request(app)
                .delete(`/projects/remove/${projectId}`)
                .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('OK');
            expect(response.body.Message).toBe('Project deleted !');
        });

        // Add more test cases for handling non-existent project IDs, etc.
    });

    describe('getAllProjects', () => {
        it('should return status 200 and all projects', async () => {
            const response = await request(app)
                .get('/projects/all')

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
        });

        // Add more test cases for edge cases, etc.
    });

    describe('getSingleProject', () => {
        it('should return status 200 and a single project', async () => {
            const projectId = '609cbbed1c5eac47d8f6e95c';

            const response = await request(app)
                .get(`/projects/${projectId}`);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
        });

        // Add more test cases for non-existent project IDs, etc.
    });
});
