const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authenticateToken } = require('../middleware/firebaseAuth');

const {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} = require('../controllers/wishlistController');

const router = express.Router();

router.get('/', authenticateToken, getWishlist);
router.post('/', authenticateToken, addToWishlist);
router.delete('/:packageId', authenticateToken, removeFromWishlist);

module.exports = router;
