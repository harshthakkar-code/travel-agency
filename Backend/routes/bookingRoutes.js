const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createBooking, getBookings, updateBooking, deleteBooking, getUserBookings, getBookingById } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, getBookings);
router.get('/:id', protect, getUserBookings);
router.get('/booking/:id', protect, getBookingById);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
