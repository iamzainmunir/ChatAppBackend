module.exports = {
    "/sendMessage": {
            post: {
                tags: ["Chat API's"],
                summary: "It will send message",
                description: "It will register user",
                operationId: "send_message",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        description: "Send Message",
                        required: true,
                        schema: {
                        type: "object",
                        properties: {
                                message: {
                                    type: "string",
                                    example: "Text message"
                                },
                                receiver: {
                                    type: "string",
                                    example: "<mongoose-object-id>"
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
    "/fetchMessage/{userId}": {
            get: {
                tags: ["Chat API's"],
                summary: "It will fetch messages",
                description: "It will fetch all messages of provided user",
                operationId: "user_login",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "userId",
                        schema: { type: "string", example: "<mongoose_object_id>" },
                        description: "User id to fetch conversation of that user",
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