module.exports = {
    "/user/registration": {
        post: {
            tags: ["User Registration / Login"],
            summary: "It will register user",
            description: "It will register user",
            operationId: "user_register",
            consumes: ["application/json"],
            produces: ["application/json"],
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "User Registration",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            displayName: {
                                type: "string",
                                example: "Zain Munir"
                            },
                            email: {
                                type: "string",
                                example: "example@gmail.com"
                            },
                            password: {
                                type: "string",
                                example: "password"
                            }
                        }
                    }
                }
            ],
            responses: {
                400: {
                    description: "Unauthorized"
                },
                403: {
                    description: "Invalid input"
                }
            }
        },
    },
    "/user/login": {
        post: {
            tags: ["User Registration / Login"],
            summary: "It will login user",
            description: "It will login user",
            operationId: "user_login",
            consumes: ["application/json"],
            produces: ["application/json"],
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "User Login",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            email: {
                                type: "string",
                                example: "example@gmail.com"
                            },
                            password: {
                                type: "string",
                                example: "password"
                            }
                        }
                    }
                }
            ],
            responses: {
                400: {
                    description: "Unauthorized"
                },
                403: {
                    description: "Invalid input"
                }
            }
        }
    },
    "/user/list/{userId}": {
        get: {
            tags: ["User List API"],
            summary: "It will fetch user list",
            description: "It will fetch user list",
            operationId: "user_list",
            consumes: ["application/json"],
            produces: ["application/json"],
            parameters: [
                {
                    in: "path",
                    name: "userId",
                    schema: { type: "string", example: "<mongoose-object-id>" },
                    description: "Fetch all users except this user",
                },
                {
                    in: "query",
                    name: "name",
                    schema: { type: "string", example: "Zain Munir" },
                    description: "Name to search specific user",
                }
            ],
            responses: {
                400: {
                    description: "Unauthorized"
                },
                403: {
                    description: "Invalid input"
                }
            }
        }
    }
}