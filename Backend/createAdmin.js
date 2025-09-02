const admin = require('./config/firebase-admin'); // Use your existing firebase-admin config

async function createFirstAdmin() {
  try {
    console.log('Creating admin user...');
    
    // Create admin user
    const userRecord = await admin.auth().createUser({
      email: 'admin@test.com',
      password: 'Test@123',
      displayName: 'Admin User',
      emailVerified: true
    });
    
    console.log('User created with UID:', userRecord.uid);
    
    // Set admin role using custom claims
    await admin.auth().setCustomUserClaims(userRecord.uid, { 
      role: 'admin' 
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('Email:', userRecord.email);
    console.log('UID:', userRecord.uid);
    console.log('Role: admin');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

createFirstAdmin();
