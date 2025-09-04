const request = require('supertest');

// Mock Firebase Admin SDK with inline functions
jest.mock('../config/firebase-admin', () => {
  const mockDoc = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockCollection = {
    doc: jest.fn(() => mockDoc),
  };

  const mockFirestore = {
    collection: jest.fn(() => mockCollection),
  };

  const mockAuth = {
    verifyIdToken: jest.fn(),
    updateUser: jest.fn(),
    setCustomUserClaims: jest.fn(),
    getUser: jest.fn(),
    createUser: jest.fn(),
  };

  return {
    auth: jest.fn(() => mockAuth),
    firestore: jest.fn(() => mockFirestore),
    __mockAuth: mockAuth,
    __mockFirestore: mockFirestore,
    __mockDoc: mockDoc,
    __mockCollection: mockCollection,
  };
});

// Mock Firebase Client SDK
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
}));

const app = require('../app');
const admin = require('../config/firebase-admin');
const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');

describe('Auth API', () => {
  let mockAuth;
  let mockFirestore;
  let mockDoc;
  let mockCollection;

  beforeEach(() => {
    // Get mock references from the mocked module
    mockAuth = admin.__mockAuth;
    mockFirestore = admin.__mockFirestore;
    mockDoc = admin.__mockDoc;
    mockCollection = admin.__mockCollection;

    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup admin to return our mock functions
    admin.auth.mockReturnValue(mockAuth);
    admin.firestore.mockReturnValue(mockFirestore);
    
    // Reset firestore chain
    mockFirestore.collection.mockReturnValue(mockCollection);
    mockCollection.doc.mockReturnValue(mockDoc);
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user and return user info with token', async () => {
      // Mock Firebase client auth
      const mockUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
        getIdToken: jest.fn().mockResolvedValue('mock-id-token'),
      };

      const mockUserCredential = {
        user: mockUser,
      };

      createUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);

      // Mock admin SDK calls
      mockAuth.updateUser.mockResolvedValue({});
      mockAuth.setCustomUserClaims.mockResolvedValue({});
      mockDoc.set.mockResolvedValue({});

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123',
          mobile: '1234567890',
          country: 'USA',
          city: 'NYC',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('uid', 'test-uid-123');
      expect(res.body).toHaveProperty('email', 'john@example.com');
      expect(res.body).toHaveProperty('displayName', 'John Doe');
      expect(res.body).toHaveProperty('token', 'mock-id-token');
      expect(res.body).toHaveProperty('role', 'user');
      expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should return 500 if user already exists', async () => {
      const firebaseError = new Error('Firebase: Error (auth/email-already-in-use).');
      firebaseError.code = 'auth/email-already-in-use';
      
      createUserWithEmailAndPassword.mockRejectedValue(firebaseError);

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123',
          mobile: '1234567890',
          country: 'USA',
          city: 'NYC',
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Firebase: Error (auth/email-already-in-use).');
    });

    it('should return 500 on Firebase updateUser error', async () => {
      const mockUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
        getIdToken: jest.fn().mockResolvedValue('mock-id-token'),
      };

      const mockUserCredential = {
        user: mockUser,
      };

      createUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);
      mockAuth.updateUser.mockRejectedValue(new Error('Update user failed'));

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123',
          mobile: '1234567890',
          country: 'USA',
          city: 'NYC',
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Update user failed');
    });

    it('should return 500 on setCustomUserClaims error', async () => {
      const mockUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
        getIdToken: jest.fn().mockResolvedValue('mock-id-token'),
      };

      const mockUserCredential = {
        user: mockUser,
      };

      createUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);
      mockAuth.updateUser.mockResolvedValue({});
      mockAuth.setCustomUserClaims.mockRejectedValue(new Error('Set claims failed'));

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123',
          mobile: '1234567890',
          country: 'USA',
          city: 'NYC',
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Set claims failed');
    });

    it('should return 500 on Firestore set error', async () => {
      const mockUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
        getIdToken: jest.fn().mockResolvedValue('mock-id-token'),
      };

      const mockUserCredential = {
        user: mockUser,
      };

      createUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);
      mockAuth.updateUser.mockResolvedValue({});
      mockAuth.setCustomUserClaims.mockResolvedValue({});
      mockDoc.set.mockRejectedValue(new Error('Firestore set failed'));

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123',
          mobile: '1234567890',
          country: 'USA',
          city: 'NYC',
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Firestore set failed');
    });

    it('should return 500 on getIdToken error', async () => {
      const mockUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
        getIdToken: jest.fn().mockRejectedValue(new Error('Get token failed')),
      };

      const mockUserCredential = {
        user: mockUser,
      };

      createUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);
      mockAuth.updateUser.mockResolvedValue({});
      mockAuth.setCustomUserClaims.mockResolvedValue({});
      mockDoc.set.mockResolvedValue({});

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123',
          mobile: '1234567890',
          country: 'USA',
          city: 'NYC',
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Get token failed');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user and return token', async () => {
      const mockUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
        displayName: 'John Doe',
        getIdToken: jest.fn().mockResolvedValue('mock-id-token'),
      };

      const mockUserCredential = {
        user: mockUser,
      };

      const mockDecodedToken = {
        uid: 'test-uid-123',
        email: 'john@example.com',
        role: 'user',
      };

      const mockUserDoc = {
        exists: true,
        data: jest.fn().mockReturnValue({
          firstName: 'John',
          lastName: 'Doe',
          mobile: '1234567890',
          country: 'USA',
          city: 'NYC',
        }),
      };

      signInWithEmailAndPassword.mockResolvedValue(mockUserCredential);
      mockAuth.verifyIdToken.mockResolvedValue(mockDecodedToken);
      mockDoc.get.mockResolvedValue(mockUserDoc);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'john@example.com', password: 'password123' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('uid', 'test-uid-123');
      expect(res.body).toHaveProperty('email', 'john@example.com');
      expect(res.body).toHaveProperty('name', 'John Doe');
      expect(res.body).toHaveProperty('role', 'user');
      expect(res.body).toHaveProperty('token', 'mock-id-token');
      expect(res.body).toHaveProperty('message', 'Login successful');
    });

    it('should return 401 if invalid credentials', async () => {
      const firebaseError = new Error('Firebase: Error (auth/invalid-credential).');
      firebaseError.code = 'auth/invalid-credential';
      
      signInWithEmailAndPassword.mockRejectedValue(firebaseError);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'john@example.com', password: 'wrongpassword' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Firebase: Error (auth/invalid-credential).');
    });

    it('should return 401 if user not found', async () => {
      const firebaseError = new Error('Firebase: Error (auth/user-not-found).');
      firebaseError.code = 'auth/user-not-found';
      
      signInWithEmailAndPassword.mockRejectedValue(firebaseError);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'notfound@example.com', password: 'password123' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Firebase: Error (auth/user-not-found).');
    });

    it('should handle user with no Firestore data', async () => {
      const mockUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
        displayName: null,
        getIdToken: jest.fn().mockResolvedValue('mock-id-token'),
      };

      const mockUserCredential = {
        user: mockUser,
      };

      const mockDecodedToken = {
        uid: 'test-uid-123',
        email: 'john@example.com',
        role: 'user',
      };

      const mockUserDoc = {
        exists: false,
        data: jest.fn().mockReturnValue({}),
      };

      signInWithEmailAndPassword.mockResolvedValue(mockUserCredential);
      mockAuth.verifyIdToken.mockResolvedValue(mockDecodedToken);
      mockDoc.get.mockResolvedValue(mockUserDoc);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'john@example.com', password: 'password123' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('uid', 'test-uid-123');
      // expect(res.body).toHaveProperty('name', ' '); // firstName + lastName will be empty
    });

    it('should return 401 on verifyIdToken error', async () => {
      const mockUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
        displayName: 'John Doe',
        getIdToken: jest.fn().mockResolvedValue('mock-id-token'),
      };

      const mockUserCredential = {
        user: mockUser,
      };

      signInWithEmailAndPassword.mockResolvedValue(mockUserCredential);
      mockAuth.verifyIdToken.mockRejectedValue(new Error('Token verification failed'));

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'john@example.com', password: 'password123' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Token verification failed');
    });

    it('should return 401 on Firestore get error', async () => {
      const mockUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
        displayName: 'John Doe',
        getIdToken: jest.fn().mockResolvedValue('mock-id-token'),
      };

      const mockUserCredential = {
        user: mockUser,
      };

      const mockDecodedToken = {
        uid: 'test-uid-123',
        email: 'john@example.com',
        role: 'user',
      };

      signInWithEmailAndPassword.mockResolvedValue(mockUserCredential);
      mockAuth.verifyIdToken.mockResolvedValue(mockDecodedToken);
      mockDoc.get.mockRejectedValue(new Error('Firestore get failed'));

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'john@example.com', password: 'password123' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Firestore get failed');
    });
  });

  describe('POST /api/auth/register-profile', () => {
    it('should register user profile successfully', async () => {
      const mockFirebaseUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
      };

      const mockUserDoc = {
        exists: false,
      };

      mockAuth.getUser.mockResolvedValue(mockFirebaseUser);
      mockAuth.updateUser.mockResolvedValue({});
      mockAuth.setCustomUserClaims.mockResolvedValue({});
      mockDoc.get.mockResolvedValue(mockUserDoc);
      mockDoc.set.mockResolvedValue({});

      const res = await request(app)
        .post('/api/auth/register-profile')
        .send({
          uid: 'test-uid-123',
          email: 'john@example.com',
          displayName: 'John Doe',
          firstName: 'John',
          lastName: 'Doe',
          mobile: '1234567890',
          country: 'USA',
          city: 'NYC',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('uid', 'test-uid-123');
      expect(res.body).toHaveProperty('email', 'john@example.com');
      expect(res.body).toHaveProperty('displayName', 'John Doe');
      expect(res.body).toHaveProperty('message', 'User profile registered successfully');
    });

    it('should register user profile successfully without displayName', async () => {
      const mockFirebaseUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
      };

      const mockUserDoc = {
        exists: false,
      };

      mockAuth.getUser.mockResolvedValue(mockFirebaseUser);
      mockAuth.setCustomUserClaims.mockResolvedValue({});
      mockDoc.get.mockResolvedValue(mockUserDoc);
      mockDoc.set.mockResolvedValue({});

      const res = await request(app)
        .post('/api/auth/register-profile')
        .send({
          uid: 'test-uid-123',
          email: 'john@example.com',
          firstName: 'John',
          lastName: 'Doe',
          mobile: '1234567890',
          country: 'USA',
          city: 'NYC',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('uid', 'test-uid-123');
      expect(res.body).toHaveProperty('email', 'john@example.com');
    });

    it('should return 400 if Firebase user not found', async () => {
      mockAuth.getUser.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/auth/register-profile')
        .send({
          uid: 'invalid-uid',
          email: 'john@example.com',
          displayName: 'John Doe',
          firstName: 'John',
          lastName: 'Doe',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Firebase user not found');
    });

    it('should return 400 if profile already exists', async () => {
      const mockFirebaseUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
      };

      const mockUserDoc = {
        exists: true,
      };

      mockAuth.getUser.mockResolvedValue(mockFirebaseUser);
      mockDoc.get.mockResolvedValue(mockUserDoc);

      const res = await request(app)
        .post('/api/auth/register-profile')
        .send({
          uid: 'test-uid-123',
          email: 'john@example.com',
          displayName: 'John Doe',
          firstName: 'John',
          lastName: 'Doe',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'User profile already exists');
    });

    it('should return 500 on getUser error', async () => {
      mockAuth.getUser.mockRejectedValue(new Error('Get user failed'));

      const res = await request(app)
        .post('/api/auth/register-profile')
        .send({
          uid: 'test-uid-123',
          email: 'john@example.com',
          displayName: 'John Doe',
          firstName: 'John',
          lastName: 'Doe',
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Get user failed');
    });

    it('should return 500 on updateUser error', async () => {
      const mockFirebaseUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
      };

      mockAuth.getUser.mockResolvedValue(mockFirebaseUser);
      mockAuth.updateUser.mockRejectedValue(new Error('Update user failed'));

      const res = await request(app)
        .post('/api/auth/register-profile')
        .send({
          uid: 'test-uid-123',
          email: 'john@example.com',
          displayName: 'John Doe',
          firstName: 'John',
          lastName: 'Doe',
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Update user failed');
    });

    it('should return 500 on setCustomUserClaims error in profile', async () => {
      const mockFirebaseUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
      };

      mockAuth.getUser.mockResolvedValue(mockFirebaseUser);
      mockAuth.updateUser.mockResolvedValue({});
      mockAuth.setCustomUserClaims.mockRejectedValue(new Error('Set claims failed'));

      const res = await request(app)
        .post('/api/auth/register-profile')
        .send({
          uid: 'test-uid-123',
          email: 'john@example.com',
          displayName: 'John Doe',
          firstName: 'John',
          lastName: 'Doe',
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Set claims failed');
    });

    it('should return 500 on Firestore get error in profile', async () => {
      const mockFirebaseUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
      };

      mockAuth.getUser.mockResolvedValue(mockFirebaseUser);
      mockAuth.updateUser.mockResolvedValue({});
      mockAuth.setCustomUserClaims.mockResolvedValue({});
      mockDoc.get.mockRejectedValue(new Error('Firestore get failed'));

      const res = await request(app)
        .post('/api/auth/register-profile')
        .send({
          uid: 'test-uid-123',
          email: 'john@example.com',
          displayName: 'John Doe',
          firstName: 'John',
          lastName: 'Doe',
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Firestore get failed');
    });

    it('should return 500 on Firestore set error in profile', async () => {
      const mockFirebaseUser = {
        uid: 'test-uid-123',
        email: 'john@example.com',
      };

      const mockUserDoc = {
        exists: false,
      };

      mockAuth.getUser.mockResolvedValue(mockFirebaseUser);
      mockAuth.updateUser.mockResolvedValue({});
      mockAuth.setCustomUserClaims.mockResolvedValue({});
      mockDoc.get.mockResolvedValue(mockUserDoc);
      mockDoc.set.mockRejectedValue(new Error('Firestore set failed'));

      const res = await request(app)
        .post('/api/auth/register-profile')
        .send({
          uid: 'test-uid-123',
          email: 'john@example.com',
          displayName: 'John Doe',
          firstName: 'John',
          lastName: 'Doe',
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Firestore set failed');
    });
  });

  describe('POST /api/auth/admin/create-user', () => {
    it('should create user via admin successfully', async () => {
      const mockUserRecord = {
        uid: 'admin-created-uid',
        email: 'admin@example.com',
        displayName: 'Admin User',
      };

      mockAuth.createUser.mockResolvedValue(mockUserRecord);
      mockAuth.setCustomUserClaims.mockResolvedValue({});
      mockDoc.set.mockResolvedValue({});

      // Mock the middleware by setting req.user
      const mockReq = {
        body: {
          email: 'admin@example.com',
          password: 'password123',
          firstName: 'Admin',
          lastName: 'User',
          mobile: '1234567890',
          country: 'USA',
          city: 'NYC',
        },
        user: { role: 'admin' },
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const { adminCreateUser } = require('../controllers/authController');
      await adminCreateUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        uid: 'admin-created-uid',
        email: 'admin@example.com',
        displayName: 'Admin User',
        message: 'User created successfully by admin',
      });
    });

    it('should return 500 on admin creation error', async () => {
      const firebaseError = new Error('Admin creation failed');
      mockAuth.createUser.mockRejectedValue(firebaseError);

      const mockReq = {
        body: {
          email: 'admin@example.com',
          password: 'password123',
          firstName: 'Admin',
          lastName: 'User',
        },
        user: { role: 'admin' },
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const { adminCreateUser } = require('../controllers/authController');
      await adminCreateUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Admin creation failed',
      });
    });

    it('should return 500 on setCustomUserClaims error in admin create', async () => {
      const mockUserRecord = {
        uid: 'admin-created-uid',
        email: 'admin@example.com',
        displayName: 'Admin User',
      };

      mockAuth.createUser.mockResolvedValue(mockUserRecord);
      mockAuth.setCustomUserClaims.mockRejectedValue(new Error('Set claims failed'));

      const mockReq = {
        body: {
          email: 'admin@example.com',
          password: 'password123',
          firstName: 'Admin',
          lastName: 'User',
        },
        user: { role: 'admin' },
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const { adminCreateUser } = require('../controllers/authController');
      await adminCreateUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Set claims failed',
      });
    });

    it('should return 500 on Firestore set error in admin create', async () => {
      const mockUserRecord = {
        uid: 'admin-created-uid',
        email: 'admin@example.com',
        displayName: 'Admin User',
      };

      mockAuth.createUser.mockResolvedValue(mockUserRecord);
      mockAuth.setCustomUserClaims.mockResolvedValue({});
      mockDoc.set.mockRejectedValue(new Error('Firestore set failed'));

      const mockReq = {
        body: {
          email: 'admin@example.com',
          password: 'password123',
          firstName: 'Admin',
          lastName: 'User',
        },
        user: { role: 'admin' },
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const { adminCreateUser } = require('../controllers/authController');
      await adminCreateUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Firestore set failed',
      });
    });
  });
});
