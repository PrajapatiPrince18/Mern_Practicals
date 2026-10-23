/**
 * Validation Middleware for Request Parameters, Query and Body
 */
const validateIdParam = (req, res, next) => {
  const { id } = req.params;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId) || numericId <= 0) {
    return res.status(400).json({
      success: false,
      message: `Invalid ID parameter: "${id}". Expected a positive integer.`
    });
  }

  req.numericId = numericId;
  next();
};

const validateUserBody = (req, res, next) => {
  const { name, email, role, department } = req.body;
  const errors = [];

  if (!name || name.trim().length < 3) {
    errors.push('Field "name" is required and must be at least 3 characters.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Valid "email" address is required.');
  }

  const validRoles = ['admin', 'editor', 'viewer'];
  if (!role || !validRoles.includes(role.toLowerCase())) {
    errors.push(`Field "role" must be one of: [${validRoles.join(', ')}]`);
  }

  if (!department || department.trim().length < 2) {
    errors.push('Field "department" is required.');
  }

  if (errors.length > 0) {
    return res.status(422).json({
      success: false,
      message: 'Request Body Validation Failed',
      errors
    });
  }

  next();
};

module.exports = { validateIdParam, validateUserBody };
