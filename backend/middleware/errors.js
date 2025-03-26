const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    console.log(err); 

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message, 
        });
    }

    // Mode production
    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err };

        // Wrong Mongoose Object ID Error
        if(err.name == 'CastError') {
            const message = `Resource not found. Invalid ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        // Handling Mongoose Validation Error
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map( value => value.message);
            error = new ErrorHandler(message, 400)
        }

        error.message = err.message;

        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({
                success: false,
                message: messages.length > 1 ? messages : messages[0], 
            });
        }

        return res.status(error.statusCode).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}