const userRegistration = {
    tags:['User'],
    description:"Register a new user",
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        firstName:{
                            type:"string",
                            example:"John"
                        },
                        secondName:{
                            type:"string",
                            example:"Doe"
                        },
                        email:{
                            type:"string",
                            example:"john.doe@example.com"
                        },
                        password:{
                            type:"string",
                            example:"Password@123"
                        }
                    }
                }
            }
        }
    },
    responses:{
        201:{
            description:"User Registration goes Well",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        properties:{
                            status:{
                                type:"string",
                                example:"success"
                            },
                            message:{
                                type:"string",
                                example:"User Registration goes Well kbx"
                            }
                        }
                    }
                }
            }
        },
        400:{
            description:"Bad request",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        properties:{
                            status:{
                                type:"string",
                                example:"error"
                            },
                            message:{
                                type:"string",
                                example:"Bad request, please check your input data"
                            }
                        }
                    }
                }
            }
        },
        500:{
            description:"Internal server error",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        properties:{
                            status:{
                                type:"string",
                                example:"error"
                            },
                            message:{
                                type:"string",
                                example:"Internal server error, please try again later"
                            }
                        }
                    }
                }
            }
        }
    }
};

const getAllUsers = {
    tags:['User'],
    description:"Get all users",
    security: [
        {
            bearerAuth: []
        }
    ],
    responses:{
        200:{
            description:"OK",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        properties:{
                            status:{
                                type:"string",
                                example:"success"
                            },
                            data:{
                                type:"array",
                                items:{
                                    type:"object",
                                    properties:{
                                        firstName:{
                                            type:"string"
                                        },
                                        secondName:{
                                            type:"string"
                                        },
                                        email:{
                                            type:"string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        404:{
            description:"No User Found",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        properties:{
                            Message:{
                                type:"string",
                                example:"No User Found :)"
                            }
                        }
                    }
                }
            }
        },
        500:{
            description:"Internal server error",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        properties:{
                            message:{
                                type:"string",
                                example:"Fail to fetch users"
                            }
                        }
                    }
                }
            }
        }
    }
};

const updateUser = {
    tags: ['User'],
    description: "Update an existing user",
    parameters: [
        {
            name: "id",
            in: "path",
            description: "ID of the user to update",
            required: true,
            schema: {
                type: "string"
            }
        }
    ],
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        firstName: {
                            type: "string"
                        },
                        secondName: {
                            type: "string"
                        },
                        email: {
                            type: "string"
                        },
                        password: {
                            type: "string"
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            status: {
                                type: "string",
                                example: "success"
                            },
                            message: {
                                type: "string",
                                example: "User updated successfully"
                            },
                            userInfo: {
                                type: "object",
                                properties: {
                                    // Define user properties here
                                }
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            status: {
                                type: "string",
                                example: "error"
                            },
                            message: {
                                type: "string",
                                example: "Validation error"
                            }
                        }
                    }
                }
            }
        },
        404: {
            description: "User Not found",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            status: {
                                type: "string",
                                example: "error"
                            },
                            message: {
                                type: "string",
                                example: "User not found"
                            }
                        }
                    }
                }
            }
        },
        500: {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            status: {
                                type: "string",
                                example: "error"
                            },
                            message: {
                                type: "string",
                                example: "Internal server error"
                            }
                        }
                    }
                }
            }
        }
    }
};


const deleteUser = {
    tags: ['User'],
    description: "Delete an existing user",
    parameters: [
        {
            name: "id",
            in: "path",
            description: "ID of the user to delete",
            required: true,
            schema: {
                type: "string"
            }
        }
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            Message: {
                                type: "string",
                                example: "User deleted successfully"
                            },
                            deleted: {
                                type: "object",
                                properties: {
                                    // Define user properties here
                                }
                            }
                        }
                    }
                }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            Message: {
                                type: "string",
                                example: "User not found"
                            }
                        }
                    }
                }
            }
        },
        500: {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            Message: {
                                type: "string",
                                example: "Internal server error"
                            }
                        }
                    }
                }
            }
        }
    }
};


const getSingleUser = {
    tags: ['User'],
    description: "Get information about a single user",
    parameters: [
        {
            name: "id",
            in: "path",
            description: "ID of the user to retrieve",
            required: true,
            schema: {
                type: "string"
            }
        }
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            status: {
                                type: "string",
                                example: "success"
                            },
                            userInfo: {
                                type: "object",
                                properties: {
                                    // Define user properties here
                                }
                            }
                        }
                    }
                }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            status: {
                                type: "string",
                                example: "error"
                            },
                            message: {
                                type: "string",
                                example: "User not found"
                            }
                        }
                    }
                }
            }
        },
        500: {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            status: {
                                type: "string",
                                example: "error"
                            },
                            message: {
                                type: "string",
                                example: "Internal server error"
                            }
                        }
                    }
                }
            }
        }
    }
};


export const userRouteDocs = {
    "/users/register": {
        post: userRegistration
    },
    "/users": {
        get: {
            ...getAllUsers,
            security: [{ bearerAuth: [] }]
        },
    },
    "/users/user/update/{id}": {
        put: updateUser
    },
    "/users/delete/{id}": {
        delete: {
            ...deleteUser,
            security: [{ bearerAuth: [] }]
        }
    },
    "/users/user/{id}": {
        get: getSingleUser
    }
};


