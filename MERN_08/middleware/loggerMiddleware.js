/**
 * Application-level Logging Middleware
 * Attaches request timestamp and tracks execution time
 */
const loggerMiddleware = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    console.log(
      `[${req.requestTime}] ${req.method} ${req.originalUrl} -> ${logColor}${res.statusCode}\x1b[0m (${duration}ms)`
    );
  });

  next();
};

module.exports = loggerMiddleware;
