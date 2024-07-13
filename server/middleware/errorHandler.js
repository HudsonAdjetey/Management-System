const { logEvent } = require("../middleware/logger");

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err?.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    // TODO:check up for error code for castError

    statusCode = 404;
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
  } else if (err.code === 11000 || err.name === "MongoError") {
    statusCode = 400;
    message = "Duplicate key error";
  } else if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Unauthorized access";
  } else if (err.name === "SyntaxError") {
    statusCode = 400;
    message = "Invalid JSON format in request body";
  } else if (err.name === "RangeError") {
    statusCode = 400;
    message = "Out of range error";
  }
  // Log the error details
  logEvent(
    `${err.message}\t${req.method}\t${req.originalUrl}\t${statusCode}`,
    "errorLog.log"
  );

  // Send error response
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
