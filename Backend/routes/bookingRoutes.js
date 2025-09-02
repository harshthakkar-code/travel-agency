const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authenticateToken } = require('../middleware/firebaseAuth');

const { createBooking, getBookings, updateBooking, deleteBooking, getUserBookings, getBookingById } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', authenticateToken, createBooking);
router.get('/', authenticateToken, getBookings);
router.get('/:id', authenticateToken, getUserBookings);
router.get('/booking/:id', authenticateToken, getBookingById);
router.put('/:id', authenticateToken, updateBooking);
router.delete('/:id', authenticateToken, deleteBooking);

module.exports = router;
