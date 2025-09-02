// routes/reviewRoutes.js
const express = require('express');
const { authenticateToken } = require('../middleware/firebaseAuth');
const { adminOnly } = require('../middleware/adminMiddleware');
const {
  getReviews,
  createReview,
  deleteReview,
  getUserReviews,
} = require('../controllers/reviewController');

const router = express.Router();

// Public: get reviews (optionally filtered)
router.get('/', getReviews);

// Protected routes 
router.get('/user', authenticateToken, getUserReviews);
router.post('/', authenticateToken, createReview);
router.delete('/:id', authenticateToken, deleteReview);

module.exports = router;
