const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authenticateToken } = require('../middleware/firebaseAuth');
const { adminOnly } = require('../middleware/adminMiddleware');
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonialController');

const router = express.Router();

router.get('/', getTestimonials);

// Admin authenticateTokened routes
router.post('/', authenticateToken, adminOnly, createTestimonial);
router.put('/:id', authenticateToken, adminOnly, updateTestimonial);
router.delete('/:id', authenticateToken, adminOnly, deleteTestimonial);

module.exports = router;
