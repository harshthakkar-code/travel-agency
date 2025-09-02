const admin = require('../config/firebase-admin');
const firestore = admin.firestore();

// Get all users with Firebase Auth + Firestore data
exports.getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    
    // Get all Firebase Auth users
    const listUsersResult = await admin.auth().listUsers(1000);
    
    // Get all user documents from Firestore
    const usersSnapshot = await firestore.collection('users').get();
    const firestoreUsers = {};
    
    usersSnapshot.forEach(doc => {
      firestoreUsers[doc.id] = doc.data();
    });

    // Merge Firebase Auth and Firestore data
    let users = listUsersResult.users.map(user => {
      const firestoreData = firestoreUsers[user.uid] || {};
      
      return {
        _id: user.uid,
        firstName: firestoreData.firstName || user.displayName?.split(' ')[0] || 'N/A',
        lastName: firestoreData.lastName || user.displayName?.split(' ')[1] || 'N/A',
        email: user.email,
        mobile: firestoreData.mobile || 'N/A',
        phone: firestoreData.phone || 'N/A',
        country: firestoreData.country || 'N/A',
        city: firestoreData.city || 'N/A',
        role: user.customClaims?.role || 'user',
        emailVerified: user.emailVerified,
        dateOfBirth: firestoreData.dateOfBirth || null,
        createdAt: user.metadata.creationTime,
      };
    });
    
    // Filter by role if specified
    if (role) {
      users = users.filter(user => user.role === role);
    }
    
    res.json({
      totalUsers: users.length,
      users: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get single user by Firebase UID
exports.getUserById = async (req, res) => {
  try {
    const uid = req.params.id;
    
    // Get Firebase Auth user
    const firebaseUser = await admin.auth().getUser(uid);
    
    // Get Firestore document
    const firestoreDoc = await firestore.collection('users').doc(uid).get();
    const firestoreData = firestoreDoc.exists ? firestoreDoc.data() : {};
    
    const userData = {
      _id: firebaseUser.uid,
      firstName: firestoreData.firstName || firebaseUser.displayName?.split(' ')[0] || 'N/A',
      lastName: firestoreData.lastName || firebaseUser.displayName?.split(' ')[1] || 'N/A',
      email: firebaseUser.email,
      mobile: firestoreData.mobile || '',
      phone: firestoreData.phone || '',
      country: firestoreData.country || '',
      city: firestoreData.city || '',
      role: firebaseUser.customClaims?.role || 'user',
      dateOfBirth: firestoreData.dateOfBirth || null,
      emailVerified: firebaseUser.emailVerified,
    };
    
    res.json(userData);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Update user in both Firebase Auth and Firestore
exports.updateUser = async (req, res) => {
  try {
    const uid = req.params.id;
    const { firstName, lastName, email, mobile, phone, country, city, role, dateOfBirth } = req.body;
    
    // Update Firebase Auth user (email, displayName)
    const authUpdates = {};
    if (email) authUpdates.email = email;
    if (firstName && lastName) authUpdates.displayName = `${firstName} ${lastName}`;
    
    if (Object.keys(authUpdates).length > 0) {
      await admin.auth().updateUser(uid, authUpdates);
    }
    
    // Update custom claims (role)
    if (role) {
      await admin.auth().setCustomUserClaims(uid, { role });
    }
    
    // Update Firestore document
    const firestoreUpdates = {};
    if (firstName !== undefined) firestoreUpdates.firstName = firstName;
    if (lastName !== undefined) firestoreUpdates.lastName = lastName;
    if (mobile !== undefined) firestoreUpdates.mobile = mobile;
    if (phone !== undefined) firestoreUpdates.phone = phone;
    if (country !== undefined) firestoreUpdates.country = country;
    if (city !== undefined) firestoreUpdates.city = city;
    if (dateOfBirth !== undefined) firestoreUpdates.dateOfBirth = dateOfBirth;
    
    if (Object.keys(firestoreUpdates).length > 0) {
      await firestore.collection('users').doc(uid).set(firestoreUpdates, { merge: true });
    }
    
    // Get updated user data
    const updatedUser = await admin.auth().getUser(uid);
    const updatedFirestoreDoc = await firestore.collection('users').doc(uid).get();
    const updatedFirestoreData = updatedFirestoreDoc.exists ? updatedFirestoreDoc.data() : {};
    
    const responseData = {
      _id: updatedUser.uid,
      firstName: updatedFirestoreData.firstName || updatedUser.displayName?.split(' ')[0] || 'N/A',
      lastName: updatedFirestoreData.lastName || updatedUser.displayName?.split(' ')[1] || 'N/A',
      email: updatedUser.email,
      mobile: updatedFirestoreData.mobile || '',
      phone: updatedFirestoreData.phone || '',
      country: updatedFirestoreData.country || '',
      city: updatedFirestoreData.city || '',
      role: updatedUser.customClaims?.role || 'user',
      dateOfBirth: updatedFirestoreData.dateOfBirth || null,
    };
    
    res.json(responseData);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete user from both Firebase Auth and Firestore
exports.deleteUser = async (req, res) => {
  try {
    const uid = req.params.id;
    
    // Delete from Firebase Auth
    await admin.auth().deleteUser(uid);
    
    // Delete from Firestore
    await firestore.collection('users').doc(uid).delete();
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({ message: 'User not found' });
    }
    console.error('Error deleting user:', error);
    res.status(500).json({ message: error.message });
  }
};
