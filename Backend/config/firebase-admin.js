const admin = require('firebase-admin');
const path = require('path');

// const serviceAccount = require('../config/firebase-service-account.json');
const serviceAccount = require(path.join(process.cwd(), 'firebase-service-account.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID,
});
const firestore = admin.firestore();

module.exports = admin;
