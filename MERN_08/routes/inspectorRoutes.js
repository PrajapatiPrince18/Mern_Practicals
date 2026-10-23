const express = require('express');
const router = express.Router();

/**
 * @desc Echo and inspect full HTTP request structure
 * Demonstrates: req.headers, req.query, req.params, req.body, req.ip, req.method
 */
router.all('/inspect', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'HTTP Request Inspection Matrix',
    protocol: req.protocol,
    httpVersion: req.httpVersion,
    method: req.method,
    originalUrl: req.originalUrl,
    path: req.path,
    ip: req.ip || req.connection.remoteAddress,
    queryParameters: req.query,
    headersReceived: {
      host: req.headers.host,
      userAgent: req.headers['user-agent'],
      contentType: req.headers['content-type'],
      apiKey: req.headers['x-api-key'] || 'Not Sent',
      customUserRole: req.headers['x-user-role'] || 'Not Sent'
    },
    bodyPayload: req.body,
    serverTimestamp: new Date().toISOString()
  });
});

/**
 * @desc Demonstrate intentional middleware error triggers
 */
router.get('/simulate-error', (req, res, next) => {
  const errorType = req.query.type || 'standard';
  if (errorType === 'bad-request') {
    const err = new Error('Simulated 400 Bad Request: Malformed query payload');
    err.statusCode = 400;
    return next(err);
  }
  if (errorType === 'unauthorized') {
    const err = new Error('Simulated 401 Unauthorized: Session token expired');
    err.statusCode = 401;
    return next(err);
  }
  const err = new Error('Simulated 500 Uncaught Server Exception');
  err.statusCode = 500;
  next(err);
});

module.exports = router;
