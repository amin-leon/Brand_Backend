const sendMessage = {
    tags: ['Messages'],
    description: 'Send a message',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Hello, this is a message',
                        },
                        email: {
                            type: 'string',
                            example: 'example@example.com',
                        },
                        names: {
                            type: 'string',
                            example: 'Peter Leon',
                        },
                    },
                    required: ['message', 'email', 'names'],
                },
            },
        },
    },
    responses: {
        201: {
            description: 'Created',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            Message: {
                                type: 'string',
                                example: 'Message sent!',
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
                            Message: {
                                type: 'string',
                                example: 'Message not sent :)',
                            },
                        },
                    },
                },
            },
        },
    },
};


const getAllMessages = {
    tags: ['Messages'],
    description: 'Get all messages',
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
                            content: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: {
                                            type: 'string',
                                            example: '611f504f713b60719cb4f2bd',
                                        },
                                        messages: {
                                            type: 'array',
                                            items: {
                                                type: 'string',
                                                example: 'Hello, this is a message',
                                            },
                                        },
                                        email: {
                                            type: 'string',
                                            example: 'example@example.com',
                                        },
                                        names: {
                                            type: 'string',
                                            example: 'Peter Leon',
                                        },
                                        createdAt: {
                                            type: 'string',
                                            example: '2024-04-07T08:55:43.544Z',
                                        },
                                        updatedAt: {
                                            type: 'string',
                                            example: '2024-04-07T08:55:43.544Z',
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
                            Message: {
                                type: 'string',
                                example: 'No Message found :)',
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
                                example: 'Fail to Fetch Message :)',
                            },
                        },
                    },
                },
            },
        },
    },
};


const deleteMessage = {
    tags: ['Messages'],
    description: 'Delete a message by ID',
    parameters: [
        {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID of the message to delete',
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
                            Message: {
                                type: 'string',
                                example: 'Message deleted successfully',
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
                                example: 'Message not Found',
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
                                example: 'Fail to delete message',
                            },
                        },
                    },
                },
            },
        },
    },
};


const readMessage = {
    tags: ['Messages'],
    description: 'Mark a message as read',
    parameters: [
        {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID of the message to mark as read',
            schema: {
                type: 'string',
            },
        },
    ],
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        read: {
                            type: 'boolean',
                            example: true,
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
                                example: 'You have Read this message',
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
                                example: 'Bad request',
                            },
                            Message: {
                                type: 'string',
                                example: 'Missing or invalid \'read\' field value',
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
                                example: 'Message not found',
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
                                example: 'Error',
                            },
                            Message: {
                                type: 'string',
                                example: 'Failed to update message',
                            },
                        },
                    },
                },
            },
        },
    },
};



export const messageDocs = {
    '/messages/new': {
        post: sendMessage,
    },
    '/messages/all': {
        get: {
            ...getAllMessages,
            security: [{ bearerAuth: [] }]
        },
    },
    '/messages/delete/{id}': {
        delete: {
            ...deleteMessage,
            security: [{ bearerAuth: [] }]
        },
    },
    '/messages/read/{id}': {
        put: readMessage,
    },
};
