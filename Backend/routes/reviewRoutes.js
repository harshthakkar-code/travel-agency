const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getReviews,
  createReview,
  deleteReview
} = require('../controllers/reviewController');

const router = express.Router();

// Public: get reviews (optionally filtered)
router.get('/', getReviews);

// Protected: create and delete review
router.post('/', protect, createReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
