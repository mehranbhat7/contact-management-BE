const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMessage = err.message || 'Something went wrong!';

  // Only send stack trace in development
  const errorResponse = {
    message: errMessage,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  res.status(errStatus).json(errorResponse);
};

module.exports = errorHandler;
