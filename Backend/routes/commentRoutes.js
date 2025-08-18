const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createComment, getComments, deleteComment } = require('../controllers/commentController');
const router = express.Router();

router.post('/', protect, createComment);
router.get('/', getComments);
router.delete('/:id', protect, deleteComment);

module.exports = router;
