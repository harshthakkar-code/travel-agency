const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

// Get all users (Admin only)
router.get('/', protect, getUsers);

// Get single user
router.get('/:id', protect, getUserById);

// Update user
router.put('/:id', protect, updateUser);

// Delete user
router.delete('/:id', protect, deleteUser);

module.exports = router;
