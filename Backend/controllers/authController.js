const admin = require('../config/firebase-admin');
const firestore = admin.firestore();

// Add Firebase client SDK for server-side auth
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const { initializeApp } = require('firebase/app');

// Initialize Firebase client SDK on server
const firebaseClientConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

const clientApp = initializeApp(firebaseClientConfig, 'client');
const clientAuth = getAuth(clientApp);

// Modified login function - calls Firebase on backend
exports.authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Sign in with Firebase on server-side (this makes the third-party calls)
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    const user = userCredential.user;
    
    // Get ID token and verify it to get custom claims
    const idToken = await user.getIdToken();
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Get additional user data from Firestore
    const userDoc = await firestore.collection('users').doc(user.uid).get();
    const userData = userDoc.exists ? userDoc.data() : {};
    
    res.json({
      uid: user.uid,
      email: user.email,
      name: user.displayName || `${userData.firstName} ${userData.lastName}`,
      role: decodedToken.role || 'user',
      token: idToken,
      message: 'Login successful'
    });
    
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: error.message || 'Login failed' });
  }
};

// Modified register function - calls Firebase on backend
exports.registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, mobile, country, city } = req.body;

    // Create user with Firebase client SDK on server (this makes the third-party calls)
    const userCredential = await createUserWithEmailAndPassword(clientAuth, email, password);
    const user = userCredential.user;
    
    // Update display name using admin SDK
    await admin.auth().updateUser(user.uid, {
      displayName: `${firstName} ${lastName}`
    });

    // Set default role using custom claims
    await admin.auth().setCustomUserClaims(user.uid, {
      role: 'user'
    });

    // Save additional user info to Firestore
    await firestore.collection('users').doc(user.uid).set({
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      country: country,
      city: city,
      createdAt: new Date()
    });

    // Get token for immediate login
    const idToken = await user.getIdToken();

    res.status(201).json({
      uid: user.uid,
      email: user.email,
      displayName: `${firstName} ${lastName}`,
      token: idToken,
      role: 'user',
      message: 'User registered successfully'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Keep existing registerUserProfile function
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

// Add this new function for admin user creation (doesn't log in the created user)
exports.adminCreateUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, mobile, country, city } = req.body;

    // Create user in Firebase Authentication using Admin SDK only
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

    // Return user info WITHOUT token (so no automatic login)
    res.status(201).json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      message: 'User created successfully by admin'
    });

  } catch (error) {
    console.error('Admin user creation error:', error);
    res.status(500).json({ message: error.message });
  }
};

