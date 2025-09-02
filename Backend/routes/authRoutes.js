// const express = require('express');
// const router = express.Router();
// const { registerUser, authUser } = require('../controllers/authController');
// const { authenticateToken } = require('../middleware/firebaseAuth');

// router.post('/register', registerUser);
// router.post('/login', authUser);

// // Protected route example
// router.get('/profile', authenticateToken, (req, res) => {
//   res.json({ user: req.user });
// });

// module.exports = router;
const express = require('express');
const router = express.Router();

// Import your controller functions
const { registerUser, authUser ,registerUserProfile } = require('../controllers/authController');

// ✅ ADD THIS TO DEBUG
console.log('registerUser:', registerUser); // Should log [Function: registerUser]
console.log('authUser:', authUser); // Should log [Function: authUser]

// Only use them if they're functions
if (typeof registerUser === 'function') {
  router.post('/register', registerUser);
} else {
  console.error('registerUser is not a function!');
}

if (typeof authUser === 'function') {
  router.post('/login', authUser);
} else {
  console.error('authUser is not a function!');
}
router.post('/register-profile', registerUserProfile);

module.exports = router;
