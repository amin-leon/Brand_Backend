const createNewBlog = {
    tags: ['Blog'],
    description: "Create a new blog post",
    requestBody: {
        required: true,
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        category: { type: "string" },
                        desc: { type: "string" },
                        tag: { type: "string" },
                        image: { type: "string", format: "binary" }
                    }
                }
            }
        }
    },
    responses: {
        201: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            status: { type: "string", example: "success" },
                            Message: { type: "string", example: "New blog created !" }
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
                            status: { type: "string", example: "error" },
                            message: { type: "string", example: "Validation error message" }
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
                            status: { type: "string", example: "error" },
                            message: { type: "string", example: "Blog not created :(" }
                        }
                    }
                }
            }
        }
    }
};

const updateBlog = {
    tags: ['Blog'],
    description: "Update an existing blog post",
    parameters: [
        {
            name: "id",
            in: "path",
            description: "ID of the blog post to update",
            required: true,
            schema: {
                type: "string"
            }
        }
    ],
    requestBody: {
        required: true,
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        category: { type: "string" },
                        desc: { type: "string" },
                        tag: { type: "string" },
                        image: { type: "string", format: "binary" }
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
                            status: { type: "string", example: "Success" },
                            Message: { type: "string", example: "Blog successfully updated" }
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
                            status: { type: "string", example: "Not found" },
                            Message: { type: "string", example: "Blog not found :(" }
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
                            status: { type: "string", example: "Fail" },
                            Message: { type: "string", example: "Blog not updated" }
                        }
                    }
                }
            }
        }
    }
};


const deleteBlog = {
    tags: ['Blog'],
    description: "Delete an existing blog post",
    parameters: [
        {
            name: "id",
            in: "path",
            description: "ID of the blog post to delete",
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
                            status: { type: "string", example: "OK" },
                            Message: { type: "string", example: "Blog deleted successfully" }
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
                            status: { type: "string", example: "Not found" },
                            Message: { type: "string", example: "Blog with ID not found" }
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
                            status: { type: "string", example: "Fail" },
                            Message: { type: "string", example: "Failed to delete blog" }
                        }
                    }
                }
            }
        }
    }
};

const getAllBlogs = {
    tags: ['Blog'],
    description: "Get all blogs",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            status: { type: "string", example: "success" },
                            data: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        // Add properties of the Blog model here
                                    }
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
                            Message: { type: "string", example: "No blogs found :)" }
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
                            status: { type: "string", example: "status" },
                            message: { type: "string", example: "Unable to display Blogs:)" }
                        }
                    }
                }
            }
        }
    }
};


const getSingleBlog = {
    tags: ['Blog'],
    description: "Get a single blog by ID",
    parameters: [
        {
            name: "id",
            in: "path",
            description: "ID of the blog",
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
                            status: { type: "string", example: "success" },
                            userInfo: {
                                type: "object",
                                properties: {
                                    // Add properties of the Blog model here
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
                            status: { type: "string", example: "Not found" },
                            Message: { type: "string", example: "No Blog Found :)" }
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
                            status: { type: "string", example: "Fail" },
                            message: { type: "string", example: "Unable to find Blog :)" }
                        }
                    }
                }
            }
        }
    }
};

const commentBlog = {
    tags: ['Blog'],
    description: "Comment on a blog",
    parameters: [
        {
            name: "id",
            in: "path",
            description: "ID of the blog",
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
                        email: { type: "string", example: "example@example.com" },
                        comment: { type: "string", example: "Great blog post!" },
                        posterNames: { type: "string", example: "example kim" }
                    },
                    required: ["email", "comment"]
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
                            status: { type: "string", example: "OK" },
                            Message: { type: "string", example: "Blog commented" }
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
                            status: { type: "string", example: "Bad request" },
                            Message: { type: "string", example: "Missing value for fields" }
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
                            status: { type: "string", example: "Not found" },
                            Message: { type: "string", example: "Blog Not found" }
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
                            status: { type: "string", example: "Fail" },
                            Message: { type: "string", example: "Oops! , unable to comment" }
                        }
                    }
                }
            }
        }
    }
};

const likeBlog = {
    tags: ['Blog'],
    description: "Like or Unlike a blog",
    parameters: [
        {
            name: "id",
            in: "path",
            description: "ID of the blog",
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
                        email: { type: "string", example: "example@example.com" }
                    },
                    required: ["email"]
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
                            status: { type: "string", example: "OK" },
                            Message: { type: "string", example: "You liked Blog" },
                            foundBlog: { type: "object" }
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
                            status: { type: "string", example: "Not found" },
                            Message: { type: "string", example: "Blog Not found" }
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
                            status: { type: "string", example: "Fail" },
                            Message: { type: "string", example: "Oops! , unable to like" }
                        }
                    }
                }
            }
        }
    }
};


export const blogsRoutesDocs = {
    "/blogs/new": {
        post: {
            ...createNewBlog,
            security: [{ bearerAuth: [] }]
        }
    },
    "/blogs/update/{id}": {
        put: {
            ...updateBlog,
            security: [{ bearerAuth: [] }]
        }
    },
    "/blogs/delete/{id}": {
        delete: {
            ...deleteBlog,
            security: [{ bearerAuth: [] }]
        }
    },
    "/blogs/all": {
        get: getAllBlogs
    },
    "/blogs/{id}": {
        get: getSingleBlog
    },
    "/blogs/blog/comment/{id}": {
        put: {
            ...commentBlog,
            security: [{ bearerAuth: [] }]
        }
    },
    "/blogs/blog/like/{id}": {
        put: likeBlog
    },
};
