const userRegistrationNLogin = require("./users"),
chatAPIs = require("./chat")

let apis = {
    ...userRegistrationNLogin,
    ...chatAPIs
};

let configurations = {
    swagger: "2.0",
    info: {
        title: "ExpressJS Backend Assignment",
        description: "",
        version: "1.0",
    },
    produces: ["application/json"],
    basePath: "/api/v1",
    securityDefinitions: {
        "auth-token": {
            type: "apiKey",
            in: "header",
            name: "x-access-token",
        },
    },
    security: [
        {
            "auth-token": []
        },
    ],
    schemes: ["http", "https"],
    paths: apis,
};
module.exports = configurations;
