const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

// Mock generateToken to return a fixed token string
jest.mock('../utils/generateToken', () => jest.fn(() => 'test-token'));

// Mock User model methods
jest.mock('../models/User');

describe('Auth API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user and return user info with token', async () => {
      User.findOne.mockResolvedValue(null);  // No existing user
      User.create.mockResolvedValue({
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123',
          mobile: '1234567890',
          phone: '0987654321',
          country: 'USA',
          city: 'NYC',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id', '1');
      expect(res.body).toHaveProperty('name', 'John Doe');
      expect(res.body).toHaveProperty('email', 'john@example.com');
      expect(res.body).toHaveProperty('token', 'test-token');
    });

    it('should return 400 if user already exists', async () => {
      User.findOne.mockResolvedValue({ email: 'john@example.com' }); // User exists

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123',
          mobile: '1234567890',
          phone: '0987654321',
          country: 'USA',
          city: 'NYC',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'User already exists');
    });

    it('should return 500 on server error', async () => {
      User.findOne.mockRejectedValue(new Error('DB error'));

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123',
          mobile: '1234567890',
          phone: '0987654321',
          country: 'USA',
          city: 'NYC',
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user and return token', async () => {
      // Mock user document with matchPassword method
      const mockUser = {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'user',
        matchPassword: jest.fn().mockResolvedValue(true),
      };
      User.findOne.mockResolvedValue(mockUser);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'john@example.com', password: 'password123' });

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(mockUser.matchPassword).toHaveBeenCalledWith('password123');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('_id', '1');
      expect(res.body).toHaveProperty('name', 'John Doe');
      expect(res.body).toHaveProperty('email', 'john@example.com');
      expect(res.body).toHaveProperty('role', 'user');
      expect(res.body).toHaveProperty('token', 'test-token');
    });

    it('should return 401 if invalid email or password', async () => {
      const mockUser = {
        matchPassword: jest.fn().mockResolvedValue(false),
      };
      User.findOne.mockResolvedValue(mockUser);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'john@example.com', password: 'wrongpassword' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid email or password');
    });

    it('should return 401 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'notfound@example.com', password: 'password123' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid email or password');
    });

    it('should return 500 on server error', async () => {
      User.findOne.mockRejectedValue(new Error('DB error'));

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'john@example.com', password: 'password123' });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });
});
