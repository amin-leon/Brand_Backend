"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectDocs = void 0;
const addNewProject = {
    tags: ['Projects'],
    description: 'Add a new project',
    requestBody: {
        required: true,
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            example: 'Project Title',
                        },
                        category: {
                            type: 'string',
                            example: 'Web Development',
                        },
                        description: {
                            type: 'string',
                            example: 'Project Description',
                        },
                        link: {
                            type: 'string',
                            example: 'https://example.com',
                        },
                        image: {
                            type: 'string',
                            format: 'binary',
                            description: 'Image file for the project',
                        },
                    },
                },
            },
        },
    },
    responses: {
        201: {
            description: 'OK',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                example: 'success',
                            },
                            Message: {
                                type: 'string',
                                example: 'Project added',
                            },
                        },
                    },
                },
            },
        },
        400: {
            description: 'Bad request',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                example: 'Bad Request',
                            },
                            message: {
                                type: 'string',
                                example: 'Validation error message',
                            },
                            res: {
                                type: 'object',
                                properties: {
                                    title: {
                                        type: 'string',
                                        example: 'Project Title',
                                    },
                                    category: {
                                        type: 'string',
                                        example: 'Web Development',
                                    },
                                    description: {
                                        type: 'string',
                                        example: 'Project Description',
                                    },
                                    link: {
                                        type: 'string',
                                        example: 'https://example.com',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: 'Internal server error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                example: 'Fail',
                            },
                            Message: {
                                type: 'string',
                                example: 'Project Not added :)',
                            },
                        },
                    },
                },
            },
        },
    },
};
const updateProject = {
    tags: ['Projects'],
    description: 'Update an existing project',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'ID of the project to update',
            required: true,
            schema: {
                type: 'string',
            },
        },
    ],
    requestBody: {
        required: true,
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            example: 'Updated Project Title',
                        },
                        category: {
                            type: 'string',
                            example: 'Updated Web Development',
                        },
                        description: {
                            type: 'string',
                            example: 'Updated Project Description',
                        },
                        link: {
                            type: 'string',
                            example: 'https://updated-example.com',
                        },
                        image: {
                            type: 'string',
                            format: 'binary',
                            description: 'Updated image file for the project',
                        },
                    },
                },
            },
        },
    },
    responses: {
        200: {
            description: 'OK',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                example: 'Success',
                            },
                            Message: {
                                type: 'string',
                                example: 'Project successfully updated',
                            },
                        },
                    },
                },
            },
        },
        404: {
            description: 'Not found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                example: 'Not found',
                            },
                            Message: {
                                type: 'string',
                                example: 'Project not found :)',
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: 'Internal server error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            Status: {
                                type: 'string',
                                example: 'Fail',
                            },
                            Message: {
                                type: 'string',
                                example: 'Project not updated',
                            },
                        },
                    },
                },
            },
        },
    },
};
const deleteProject = {
    tags: ['Projects'],
    description: 'Delete an existing project',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'ID of the project to delete',
            required: true,
            schema: {
                type: 'string',
            },
        },
    ],
    responses: {
        200: {
            description: 'OK',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                example: 'OK',
                            },
                            Message: {
                                type: 'string',
                                example: 'Project deleted !',
                            },
                            id: {
                                type: 'string',
                                example: 'project_id',
                            },
                        },
                    },
                },
            },
        },
        404: {
            description: 'Not found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                example: 'Not found',
                            },
                            Message: {
                                type: 'string',
                                example: 'Project not found :)',
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: 'Internal server error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                example: 'Fail',
                            },
                            Message: {
                                type: 'string',
                                example: 'Fail to delete project',
                            },
                        },
                    },
                },
            },
        },
    },
};
const getAllProjects = {
    tags: ['Projects'],
    description: 'Get all projects',
    responses: {
        200: {
            description: 'OK',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                example: 'success',
                            },
                            data: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: {
                                            type: 'string',
                                            example: 'project_id',
                                        },
                                        title: {
                                            type: 'string',
                                            example: 'Project Title',
                                        },
                                        category: {
                                            type: 'string',
                                            example: 'Project Category',
                                        },
                                        description: {
                                            type: 'string',
                                            example: 'Project Description',
                                        },
                                        link: {
                                            type: 'string',
                                            example: 'Project Link',
                                        },
                                        image: {
                                            type: 'string',
                                            example: 'Project Image URL',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        404: {
            description: 'Not found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                example: 'Not found',
                            },
                            Message: {
                                type: 'string',
                                example: 'No Projects found :)',
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: 'Internal server error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                example: 'Fail',
                            },
                            message: {
                                type: 'string',
                                example: 'Unable to display Projects:)',
                            },
                        },
                    },
                },
            },
        },
    },
};
const getSingleProject = {
    tags: ['Projects'],
    description: 'Get a single project by ID',
    parameters: [
        {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID of the project to retrieve',
            schema: {
                type: 'string',
            },
        },
    ],
    responses: {
        200: {
            description: 'OK',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                example: 'success',
                            },
                            userInfo: {
                                type: 'object',
                                properties: {
                                    _id: {
                                        type: 'string',
                                        example: 'project_id',
                                    },
                                    title: {
                                        type: 'string',
                                        example: 'Project Title',
                                    },
                                    category: {
                                        type: 'string',
                                        example: 'Project Category',
                                    },
                                    description: {
                                        type: 'string',
                                        example: 'Project Description',
                                    },
                                    link: {
                                        type: 'string',
                                        example: 'Project Link',
                                    },
                                    image: {
                                        type: 'string',
                                        example: 'Project Image URL',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        404: {
            description: 'Not found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            Message: {
                                type: 'string',
                                example: 'No Project Found :)',
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: 'Internal server error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Unable to find Project :)',
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.projectDocs = {
    '/projects/add': {
        post: Object.assign(Object.assign({}, addNewProject), { security: [{ bearerAuth: [] }] }),
    },
    '/projects/edit/{id}': {
        put: Object.assign(Object.assign({}, updateProject), { security: [{ bearerAuth: [] }] }),
    },
    '/projects/remove/{id}': {
        delete: Object.assign(Object.assign({}, deleteProject), { security: [{ bearerAuth: [] }] }),
    },
    '/projects/all': {
        get: getAllProjects,
    },
    '/projects/{id}': {
        get: getSingleProject,
    },
};
