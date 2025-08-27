const httpMocks = require('node-mocks-http');
const User = require('../models/User');
const userController = require('../controllers/userController'); // adjust path if different

jest.mock('../models/User');

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('returns users with optional role filter and total count', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users',
        query: { role: 'user' },
      });
      const res = httpMocks.createResponse();

      const mockUsers = [{ _id: 'u1', firstName: 'A' }, { _id: 'u2', firstName: 'B' }];
      // Mock chained .select on find
      const selectMock = jest.fn().mockResolvedValue(mockUsers);
      User.find.mockReturnValue({ select: selectMock });
      User.countDocuments.mockResolvedValue(2);

      await userController.getUsers(req, res);

      expect(User.find).toHaveBeenCalledWith({ role: 'user' });
      expect(selectMock).toHaveBeenCalledWith('-password');
      expect(User.countDocuments).toHaveBeenCalledWith({ role: 'user' });

      expect(res.statusCode).toBe(200);
      const data = res._getJSONData();
      expect(data).toEqual({ totalUsers: 2, users: mockUsers });
    });

    it('returns users without filter', async () => {
      const req = httpMocks.createRequest({ method: 'GET', url: '/api/users', query: {} });
      const res = httpMocks.createResponse();

      const mockUsers = [];
      const selectMock = jest.fn().mockResolvedValue(mockUsers);
      User.find.mockReturnValue({ select: selectMock });
      User.countDocuments.mockResolvedValue(0);

      await userController.getUsers(req, res);

      expect(User.find).toHaveBeenCalledWith({});
      expect(selectMock).toHaveBeenCalledWith('-password');
      expect(User.countDocuments).toHaveBeenCalledWith({});

      expect(res.statusCode).toBe(200);
      const data = res._getJSONData();
      expect(data).toEqual({ totalUsers: 0, users: [] });
    });

    it('handles server error', async () => {
      const req = httpMocks.createRequest({ method: 'GET', url: '/api/users' });
      const res = httpMocks.createResponse();

      User.find.mockImplementation(() => { throw new Error('DB error'); });

      await userController.getUsers(req, res);

      expect(res.statusCode).toBe(500);
      const data = res._getJSONData();
      expect(data).toHaveProperty('message', 'DB error');
    });
  });

  describe('getUserById', () => {
    it('returns user by id', async () => {
      const req = httpMocks.createRequest({ method: 'GET', params: { id: 'u1' } });
      const res = httpMocks.createResponse();

      const selectMock = jest.fn().mockResolvedValue({ _id: 'u1', firstName: 'A' });
      User.findById.mockReturnValue({ select: selectMock });

      await userController.getUserById(req, res);

      expect(User.findById).toHaveBeenCalledWith('u1');
      expect(selectMock).toHaveBeenCalledWith('-password');
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ _id: 'u1', firstName: 'A' });
    });

    it('returns 404 if not found', async () => {
      const req = httpMocks.createRequest({ method: 'GET', params: { id: 'missing' } });
      const res = httpMocks.createResponse();

      const selectMock = jest.fn().mockResolvedValue(null);
      User.findById.mockReturnValue({ select: selectMock });

      await userController.getUserById(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toHaveProperty('message', 'User not found');
    });

    it('handles server error', async () => {
      const req = httpMocks.createRequest({ method: 'GET', params: { id: 'u1' } });
      const res = httpMocks.createResponse();

      User.findById.mockImplementation(() => { throw new Error('DB error'); });

      await userController.getUserById(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toHaveProperty('message', 'DB error');
    });
  });

  describe('updateUser', () => {
    it('updates provided fields and returns updated user', async () => {
      const req = httpMocks.createRequest({
        method: 'PUT',
        params: { id: 'u1' },
        body: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          mobile: '9999999999',
          country: 'IN',
          city: 'Mumbai',
          dateOfBirth: '1990-01-01',
          role: 'admin',
        },
      });
      const res = httpMocks.createResponse();

      const mockUser = {
        _id: 'u1',
        save: jest.fn().mockResolvedValue({
          _id: 'u1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          mobile: '9999999999',
          country: 'IN',
          city: 'Mumbai',
          dateOfBirth: '1990-01-01',
          role: 'admin',
        }),
      };
      User.findById.mockResolvedValue(mockUser);

      await userController.updateUser(req, res);

      // Fields assigned
      expect(mockUser.firstName).toBe('John');
      expect(mockUser.lastName).toBe('Doe');
      expect(mockUser.email).toBe('john@example.com');
      expect(mockUser.mobile).toBe('9999999999');
      expect(mockUser.country).toBe('IN');
      expect(mockUser.city).toBe('Mumbai');
      expect(mockUser.dateOfBirth).toBe('1990-01-01');
      expect(mockUser.role).toBe('admin');
      expect(mockUser.save).toHaveBeenCalled();

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({
        _id: 'u1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        mobile: '9999999999',
        country: 'IN',
        city: 'Mumbai',
        dateOfBirth: '1990-01-01',
        role: 'admin',
      });
    });

    it('returns 404 when user not found', async () => {
      const req = httpMocks.createRequest({ method: 'PUT', params: { id: 'missing' }, body: {} });
      const res = httpMocks.createResponse();

      User.findById.mockResolvedValue(null);

      await userController.updateUser(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toHaveProperty('message', 'User not found');
    });

    it('handles server error', async () => {
      const req = httpMocks.createRequest({ method: 'PUT', params: { id: 'u1' }, body: {} });
      const res = httpMocks.createResponse();

      User.findById.mockImplementation(() => { throw new Error('DB error'); });

      await userController.updateUser(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toHaveProperty('message', 'DB error');
    });

    it('updates only provided fields (partial update)', async () => {
      const req = httpMocks.createRequest({
        method: 'PUT',
        params: { id: 'u1' },
        body: { city: 'Pune' },
      });
      const res = httpMocks.createResponse();

      const mockUser = {
        _id: 'u1',
        city: 'Old',
        save: jest.fn().mockResolvedValue({ _id: 'u1', city: 'Pune' }),
      };
      User.findById.mockResolvedValue(mockUser);

      await userController.updateUser(req, res);

      expect(mockUser.city).toBe('Pune');
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ _id: 'u1', city: 'Pune' });
    });
  });

  describe('deleteUser', () => {
    it('deletes user and returns success message', async () => {
      const req = httpMocks.createRequest({ method: 'DELETE', params: { id: 'u1' } });
      const res = httpMocks.createResponse();

      User.findByIdAndDelete.mockResolvedValue({ _id: 'u1' });

      await userController.deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('u1');
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ message: 'User removed' });
    });

    it('returns 404 when user not found', async () => {
      const req = httpMocks.createRequest({ method: 'DELETE', params: { id: 'missing' } });
      const res = httpMocks.createResponse();

      User.findByIdAndDelete.mockResolvedValue(null);

      await userController.deleteUser(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toHaveProperty('message', 'User not found');
    });

    it('handles server error', async () => {
      const req = httpMocks.createRequest({ method: 'DELETE', params: { id: 'u1' } });
      const res = httpMocks.createResponse();

      User.findByIdAndDelete.mockImplementation(() => { throw new Error('DB error'); });

      await userController.deleteUser(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toHaveProperty('message', 'DB error');
    });
  });
});
