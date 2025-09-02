const admin = require('../config/firebase-admin');
const firestore = admin.firestore();

// Register user (Firebase Auth + Firestore for additional data)
exports.registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, mobile, country, city } = req.body;

    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: `${firstName} ${lastName}`,
      emailVerified: false
    });

    // Set default role using custom claims
    await admin.auth().setCustomUserClaims(userRecord.uid, { 
      role: 'user' 
    });

    // Save additional user info to Firestore
    await firestore.collection('users').doc(userRecord.uid).set({
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      country: country,
      city: city,
      createdAt: new Date()
    });

    res.status(201).json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Keep your existing authUser function...
exports.authUser = async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    res.json({
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email,
      role: decodedToken.role || 'user',
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
exports.registerUserProfile = async (req, res) => {
  try {
    const { uid, email, displayName, firstName, lastName, mobile, country, city } = req.body;

    // Verify the user exists in Firebase Auth
    const firebaseUser = await admin.auth().getUser(uid);
    if (!firebaseUser) {
      return res.status(400).json({ message: 'Firebase user not found' });
    }

    // Update display name in Firebase Auth
    if (displayName) {
      await admin.auth().updateUser(uid, {
        displayName: displayName
      });
    }

    // Set default role using custom claims
    await admin.auth().setCustomUserClaims(uid, { 
      role: 'user' 
    });

    // Check if profile already exists in Firestore
    const userDoc = await firestore.collection('users').doc(uid).get();
    if (userDoc.exists) {
      return res.status(400).json({ message: 'User profile already exists' });
    }

    // Save additional user info to Firestore
    await firestore.collection('users').doc(uid).set({
      firstName: firstName || '',
      lastName: lastName || '',
      mobile: mobile || '',
      country: country || '',
      city: city || '',
      createdAt: new Date()
    });

    res.status(201).json({
      uid: uid,
      email: email,
      displayName: displayName,
      message: 'User profile registered successfully'
    });
  } catch (error) {
    console.error('Profile registration error:', error);
    res.status(500).json({ message: error.message });
  }
};
