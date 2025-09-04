const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/firebaseAuth');
const { adminOnly } = require('../middleware/adminMiddleware');

// Import your controller functions
const { registerUser, authUser, registerUserProfile , adminCreateUser} = require('../controllers/authController');

// Remove debug logs and conditional checks
router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/register-profile', registerUserProfile);

// Admin route to create user
router.post('/admin/create-user', authenticateToken, adminOnly, adminCreateUser);
// Protected route example
router.get('/profile', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
