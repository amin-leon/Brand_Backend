"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const userRegistration_1 = require("./docs/userRegistration");
const blogsRoutesDocs_1 = require("./docs/blogsRoutesDocs");
const subscribeRoutesDocs_1 = require("./docs/subscribeRoutesDocs");
const messagesRoutesDocs_1 = require("./docs/messagesRoutesDocs");
const projectsRoutesDocs_1 = require("./docs/projectsRoutesDocs");
const skillsRoutesDocs_1 = require("./docs/skillsRoutesDocs");
const options = {
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
        paths: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, userRegistration_1.userRouteDocs), blogsRoutesDocs_1.blogsRoutesDocs), subscribeRoutesDocs_1.subscribeRoutesDocs), messagesRoutesDocs_1.messageDocs), projectsRoutesDocs_1.projectDocs), skillsRoutesDocs_1.skillDocs),
    },
    apis: ['./routes/*.ts'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
