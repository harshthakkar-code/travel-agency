const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

jest.mock('../models/User');

jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    // default to a user, override in specific tests if needed
    req.user = { _id: 'user1', role: 'admin' };
    next();
  },
}));

describe('User API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/users', () => {
    it('should return all users with optional role filter', async () => {
      const users = [
        { _id: '1', firstName: 'John', email: 'john@example.com' },
        { _id: '2', firstName: 'Jane', email: 'jane@example.com' }
      ];
      User.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(users),
      });
      User.countDocuments.mockResolvedValue(users.length);

      const res = await request(app).get('/api/users?role=admin');

      expect(User.find).toHaveBeenCalledWith({ role: 'admin' });
      expect(User.countDocuments).toHaveBeenCalledWith({ role: 'admin' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('totalUsers', users.length);
      expect(res.body).toHaveProperty('users', users);
    });

    it('should return 500 on error', async () => {
      User.find.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error('DB error')),
      });

      const res = await request(app).get('/api/users');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by id', async () => {
      const user = { _id: '1', firstName: 'John', email: 'john@example.com' };
      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(user),
      });

      const res = await request(app).get('/api/users/1');

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(user);
    });

    it('should return 404 if user not found', async () => {
      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const res = await request(app).get('/api/users/invalid');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });

    it('should return 500 on error', async () => {
      User.findById.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error('DB error')),
      });

      const res = await request(app).get('/api/users/1');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update user details', async () => {
      const reqBody = {
        firstName: 'Updated',
        lastName: 'User',
        email: 'updated@example.com',
        mobile: '1234567890',
        country: 'Country',
        city: 'City',
        dateOfBirth: '1990-01-01',
        role: 'admin'
      };
      const mockUserInstance = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        mobile: '9876543210',
        country: 'OldCountry',
        city: 'OldCity',
        dateOfBirth: '1980-01-01',
        role: 'user',
        save: jest.fn().mockResolvedValue({ _id: '1', ...reqBody }),
      };
      User.findById.mockResolvedValue(mockUserInstance);

      const res = await request(app)
        .put('/api/users/1')
        .send(reqBody);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(mockUserInstance.save).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expect.objectContaining(reqBody));
    });

    it('should return 404 if user to update not found', async () => {
      User.findById.mockResolvedValue(null);

      const res = await request(app)
        .put('/api/users/invalid')
        .send({ firstName: 'Test' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });

    it('should return 500 on error', async () => {
      User.findById.mockRejectedValue(new Error('DB error'));

      const res = await request(app)
        .put('/api/users/1')
        .send({ firstName: 'Test' });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      User.findByIdAndDelete.mockResolvedValue({ _id: '1' });

      const res = await request(app).delete('/api/users/1');

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'User removed');
    });

    it('should return 404 if user to delete not found', async () => {
      User.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app).delete('/api/users/invalid');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });

    it('should return 500 on error', async () => {
      User.findByIdAndDelete.mockRejectedValue(new Error('DB error'));

      const res = await request(app).delete('/api/users/1');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });
});
