/**
 * Central Error-Handling Middleware (4 parameters)
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

  console.error(`[Error Handler] ${err.name || 'Error'}: ${err.message}`);

  res.status(statusCode).json({
    success: false,
    error: {
      type: err.name || 'ApplicationError',
      message: err.message || 'An unexpected internal server error occurred.',
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString()
    }
  });
};

module.exports = errorHandler;
