const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '..', 'data', 'users.json');

const getUsersData = () => {
  try {
    const raw = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

const saveUsersData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
};

/**
 * @desc Filter, search, and paginate users from query params
 * Demonstrates req.query parsing
 */
const getAllUsers = (req, res) => {
  let users = getUsersData();
  const { department, role, search, status, limit, page } = req.query;

  if (department) {
    users = users.filter((u) => u.department.toLowerCase() === department.toLowerCase());
  }

  if (role) {
    users = users.filter((u) => u.role.toLowerCase() === role.toLowerCase());
  }

  if (status) {
    users = users.filter((u) => u.status.toLowerCase() === status.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    users = users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }

  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedUsers = users.slice(startIndex, startIndex + limitNum);

  res.status(200).json({
    success: true,
    totalRecords: users.length,
    returnedCount: paginatedUsers.length,
    currentPage: pageNum,
    filtersApplied: { department, role, search, status },
    data: paginatedUsers
  });
};

/**
 * @desc Get user by ID
 * Demonstrates req.params parsing
 */
const getUserById = (req, res) => {
  const users = getUsersData();
  const user = users.find((u) => u.id === req.numericId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${req.numericId} not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
};

/**
 * @desc Create user
 * Demonstrates req.body parsing + middleware validation
 */
const createUser = (req, res) => {
  const users = getUsersData();
  const { name, email, role, department, status = 'active' } = req.body;

  const existingEmail = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existingEmail) {
    return res.status(409).json({
      success: false,
      message: `Email "${email}" is already registered.`
    });
  }

  const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = {
    id: nextId,
    username: email.split('@')[0],
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: role.toLowerCase(),
    department: department.trim(),
    status: status.toLowerCase(),
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsersData(users);

  res.status(201).json({
    success: true,
    message: 'User created successfully.',
    data: newUser
  });
};

/**
 * @desc Update user
 * Demonstrates PUT request with body & params
 */
const updateUser = (req, res) => {
  const users = getUsersData();
  const index = users.findIndex((u) => u.id === req.numericId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${req.numericId} not found for update.`
    });
  }

  const { name, role, department, status } = req.body;
  users[index] = {
    ...users[index],
    name: name ? name.trim() : users[index].name,
    role: role ? role.toLowerCase() : users[index].role,
    department: department ? department.trim() : users[index].department,
    status: status ? status.toLowerCase() : users[index].status,
    updatedAt: new Date().toISOString()
  };

  saveUsersData(users);

  res.status(200).json({
    success: true,
    message: 'User updated successfully.',
    data: users[index]
  });
};

/**
 * @desc Delete user
 * Demonstrates DELETE request with role authorization
 */
const deleteUser = (req, res) => {
  const users = getUsersData();
  const user = users.find((u) => u.id === req.numericId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${req.numericId} not found.`
    });
  }

  const filtered = users.filter((u) => u.id !== req.numericId);
  saveUsersData(filtered);

  res.status(200).json({
    success: true,
    message: `User "${user.name}" (ID: ${user.id}) has been removed.`,
    data: user
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
