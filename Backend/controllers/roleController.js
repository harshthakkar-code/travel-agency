const admin = require('../config/firebase-admin');

// Set user role (admin only)
exports.setUserRole = async (req, res) => {
  try {
    const { uid, role } = req.body;
    
    // Check if current user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    // Validate role
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    // Set custom claims
    await admin.auth().setCustomUserClaims(uid, { role });
    
    res.json({ message: `Role '${role}' set successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Firebase users (admin only)
exports.getFirebaseUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const listUsersResult = await admin.auth().listUsers(1000);
    const users = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: user.customClaims?.role || 'user',
      emailVerified: user.emailVerified
    }));
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
