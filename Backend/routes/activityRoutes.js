const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/firebaseAuth');
const { adminOnly } = require('../middleware/adminMiddleware');

const {
  trackActivity,
  getUserActivities,
  getAllActivities,
  getActivityAnalytics,
  getUserActivitySummary  // Add this
} = require('../controllers/activityController');

// Track activity (authenticated users)
router.post('/track', authenticateToken, trackActivity);

// Get specific user activities (admin only)
router.get('/user/:userId', authenticateToken, adminOnly, getUserActivities);

// Get user activity summary (admin only) - Add this route
router.get('/user/:userId/summary', authenticateToken, adminOnly, getUserActivitySummary);

// Get all activities (admin only)
router.get('/all', authenticateToken, adminOnly, getAllActivities);

// Get activity analytics (admin only)
router.get('/analytics', authenticateToken, adminOnly, getActivityAnalytics);

module.exports = router;
