const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authenticateToken } = require('../middleware/firebaseAuth');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

// Get all users (Admin only)
router.get('/', authenticateToken, getUsers);

// Get single user
router.get('/:id', authenticateToken, getUserById);

// Update user
router.put('/:id', authenticateToken, updateUser);

// Delete user
router.delete('/:id', authenticateToken, deleteUser);

module.exports = router;
