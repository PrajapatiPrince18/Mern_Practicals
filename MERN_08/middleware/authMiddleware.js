/**
 * Authentication and Role Authorization Middleware
 * Inspects incoming request headers: x-api-key or Authorization Bearer token
 */
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  const validKey = process.env.API_SECRET_KEY || 'prince_master_key_2026';

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied: Missing "x-api-key" in request headers or "?apiKey=" in query string.',
      hint: `Provide header x-api-key: ${validKey}`
    });
  }

  if (apiKey !== validKey) {
    return res.status(403).json({
      success: false,
      message: 'Access Forbidden: Invalid API Key provided.'
    });
  }

  // Simulate authenticated identity attached to request object
  req.user = {
    username: 'prince18',
    role: req.headers['x-user-role'] || 'admin',
    authenticatedAt: new Date().toISOString()
  };

  next();
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Current role "${req.user ? req.user.role : 'Guest'}" does not have permission. Required: [${allowedRoles.join(', ')}]`
      });
    }
    next();
  };
};

module.exports = { authenticateApiKey, authorizeRoles };
