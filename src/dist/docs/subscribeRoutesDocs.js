"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeRoutesDocs = void 0;
const subscribe = {
    tags: ['Subscribers'],
    description: 'Subscribe to receive updates',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            example: 'example@example.com',
                        },
                    },
                    required: ['email'],
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
                            Message: {
                                type: 'string',
                                example: 'You have Already Subscribed!',
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
                            message: {
                                type: 'string',
                                example: 'Missing fields value!',
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
                                example: 'Subscribution Not sent :)',
                            },
                        },
                    },
                },
            },
        },
    },
};
const getAllSubs = {
    tags: ['Subscribers'],
    description: 'Get all subscribers',
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
                            Subs: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        email: {
                                            type: 'string',
                                            example: 'john.doe@example.com',
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
                                example: 'No Subs  :)',
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
                                example: 'Fail to Fetch allSubs :)',
                            },
                        },
                    },
                },
            },
        },
    },
};
const deleteSub = {
    tags: ['Subscribers'],
    description: 'Delete a subscriber',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'ID of the subscriber to delete',
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
                            Message: {
                                type: 'string',
                                example: 'Sub deleted successfully',
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
                                example: 'Fail to delete sub',
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.subscribeRoutesDocs = {
    '/subscribers/subscribe': {
        post: subscribe,
    },
    '/subscribers/all': {
        get: Object.assign(Object.assign({}, getAllSubs), { security: [{ bearerAuth: [] }] }),
    },
    '/subscribers/delete/{id}': {
        delete: Object.assign(Object.assign({}, deleteSub), { security: [{ bearerAuth: [] }] }),
    },
};
