const { StatusCodes } = require("http-status-codes");

class ServiceError extends Error {
    
    constructor(
        name = "Error",
        message = "Something Went Wrong",
        explanation = "Service Layer Error",
        statusCodes = StatusCodes.INTERNAL_SERVER_ERROR
    ){

        super();

        this.name = name;
        this.message = message;
        this.explanation = explanation;
        this.statusCodes = statusCodes;
    }

}

module.exports = ServiceError;