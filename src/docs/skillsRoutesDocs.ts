const addNewSkill = {
    tags: ['Skills'],
    description: 'Add a new skill',
    requestBody: {
        required: true,
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Title of the skill',
                            example: 'Skill Title',
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the skill',
                            example: 'Skill Description',
                        },
                        percent: {
                            type: 'number',
                            description: 'Percentage of proficiency in the skill',
                            example: 90,
                        },
                        icon: {
                            type: 'string',
                            format: 'binary',
                            description: 'Icon image for the skill',
                        },
                    },
                },
            },
        },
    },
    responses: {
        201: {
            description: 'Success',
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
                                example: 'New skill added',
                            },
                        },
                    },
                },
            },
        },
        400: {
            description: 'Bad Request',
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
            description: 'Internal Server Error',
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
                                example: 'Skill not added :)',
                            },
                        },
                    },
                },
            },
        },
    },
};


const updateSkill = {
    tags: ['Skills'],
    description: 'Update an existing skill',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'ID of the skill to update',
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
                            description: 'Title of the skill',
                            example: 'Updated Skill Title',
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the skill',
                            example: 'Updated Skill Description',
                        },
                        percent: {
                            type: 'number',
                            description: 'Percentage of proficiency in the skill',
                            example: 95,
                        },
                        icon: {
                            type: 'string',
                            format: 'binary',
                            description: 'Icon image for the skill',
                        },
                    },
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Success',
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
                                example: 'Skill successfully updated',
                            },
                        },
                    },
                },
            },
        },
        404: {
            description: 'Not Found',
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
                                example: 'Skill not found :)',
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: 'Internal Server Error',
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
                                example: 'Skill not updated',
                            },
                        },
                    },
                },
            },
        },
    },
};


const deleteSkill = {
    tags: ['Skills'],
    description: 'Delete a skill',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'ID of the skill to delete',
            required: true,
            schema: {
                type: 'string',
            },
        },
    ],
    responses: {
        200: {
            description: 'Success',
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
                                example: 'Skill deleted !',
                            },
                            id: {
                                type: 'string',
                                example: '123456',
                            },
                        },
                    },
                },
            },
        },
        404: {
            description: 'Not Found',
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
                                example: 'Skill not found :)',
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: 'Internal Server Error',
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
                                example: 'Fail to delete Skill',
                            },
                        },
                    },
                },
            },
        },
    },
};


const getSkillById = {
    tags: ['Skills'],
    description: 'Get a single skill by ID',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'ID of the skill to fetch',
            required: true,
            schema: {
                type: 'string',
            },
        },
    ],
    responses: {
        200: {
            description: 'Success',
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
                                type: 'object',
                                properties: {
                                    _id: {
                                        type: 'string',
                                        example: '123456',
                                    },
                                    title: {
                                        type: 'string',
                                        example: 'Skill Title',
                                    },
                                    description: {
                                        type: 'string',
                                        example: 'Skill Description',
                                    },
                                    percent: {
                                        type: 'number',
                                        example: 80,
                                    },
                                    icon: {
                                        type: 'string',
                                        example: 'path/to/icon',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        404: {
            description: 'Not Found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            Message: {
                                type: 'string',
                                example: 'Skill not found :)',
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                example: 'error',
                            },
                            message: {
                                type: 'string',
                                example: 'Unable to get Skill details :(',
                            },
                        },
                    },
                },
            },
        },
    },
};

const getAllSkills = {
    tags: ['Skills'],
    description: 'Get all skills',
    responses: {
        200: {
            description: 'Success',
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
                                            example: '123456',
                                        },
                                        title: {
                                            type: 'string',
                                            example: 'Skill Title',
                                        },
                                        description: {
                                            type: 'string',
                                            example: 'Skill Description',
                                        },
                                        percent: {
                                            type: 'number',
                                            example: 80,
                                        },
                                        icon: {
                                            type: 'string',
                                            example: 'path/to/icon',
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
            description: 'Not Found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            Message: {
                                type: 'string',
                                example: 'No skills found :)',
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                example: 'error',
                            },
                            message: {
                                type: 'string',
                                example: 'Unable to display Skills:)',
                            },
                        },
                    },
                },
            },
        },
    },
};



export const skillDocs = {
    '/skills/new': {
        post: {
            ...addNewSkill,
            security: [{ bearerAuth: [] }]
        },
    },
    '/skills/edit/{id}': {
        put: {
            ...updateSkill,
            security: [{ bearerAuth: [] }]
        },
    },
    '/skills/delete/{id}': {
        delete: {...deleteSkill,
            security: [{ bearerAuth: [] }]
        },
    },
    '/skills/{id}': {
        get: getSkillById,
    },
    '/skills/all': {
        get: getAllSkills,
    },
};
