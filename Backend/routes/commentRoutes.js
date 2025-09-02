const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authenticateToken } = require('../middleware/firebaseAuth');
const { createComment, getComments, deleteComment } = require('../controllers/commentController');
const router = express.Router();

router.post('/', authenticateToken, createComment);
router.get('/', getComments);
router.delete('/:id', authenticateToken, deleteComment);

module.exports = router;
