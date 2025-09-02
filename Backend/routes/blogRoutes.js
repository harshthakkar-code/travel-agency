const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authenticateToken } = require('../middleware/firebaseAuth');
const { adminOnly } = require('../middleware/adminMiddleware');
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlogById);

// Admin routes
router.post('/', authenticateToken, adminOnly, createBlog);
router.put('/:id', authenticateToken, adminOnly, updateBlog);
router.delete('/:id', authenticateToken, adminOnly, deleteBlog);

module.exports = router;
