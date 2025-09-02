// In routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/firebaseAuth');
const { adminOnly } = require('../middleware/adminMiddleware');
const admin = require('../config/firebase-admin');

const firestore = admin.firestore();

router.get('/firebase-users', authenticateToken, adminOnly, async (req, res) => {
  try {
    // Get all Firebase Auth users
    const listUsersResult = await admin.auth().listUsers(1000);
    
    // Get all user documents from Firestore
    const usersSnapshot = await firestore.collection('users').get();
    const firestoreUsers = {};
    
    usersSnapshot.forEach(doc => {
      firestoreUsers[doc.id] = doc.data();
    });

    // Merge Firebase Auth and Firestore data
    const users = listUsersResult.users.map(user => {
      const firestoreData = firestoreUsers[user.uid] || {};
      
      // Use Firestore data first, then fallback to Firebase Auth, then N/A
      return {
        _id: user.uid,
        firstName: firestoreData.firstName || 
                   user.displayName?.split(' ')[0] || 
                   'No Name',
        lastName: firestoreData.lastName || 
                  user.displayName?.split(' ')[1] || 
                  '',
        email: user.email,
        mobile: firestoreData.mobile || 
                user.phoneNumber || 
                'Not Provided',
        country: firestoreData.country || 'Not Provided',
        city: firestoreData.city || 'Not Provided',
        role: user.customClaims?.role || 'user',
        emailVerified: user.emailVerified,
        createdAt: user.metadata.creationTime,
        hasProfile: !!firestoreData.firstName // Indicates if Firestore profile exists
      };
    });
    
    res.json({
      users: users,
      totalUsers: users.length
    });
  } catch (error) {
    console.error('Error fetching Firebase users:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
