import swaggerJsdoc from 'swagger-jsdoc';
import { userRouteDocs } from './docs/userRegistration';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Brand - Backend Api',
            version: '1.0.0',
            description: 'API documentation for Node TypeScript',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        paths: {
            ...userRouteDocs,
        },
    },
    apis: ['./routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
