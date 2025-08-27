// tests/authMiddleware.test.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

jest.mock('jsonwebtoken');
jest.mock('../models/User');

describe('protect middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('responds 401 when no Authorization header', async () => {
    await protect(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, no token' });
  });

  it('responds 401 when Authorization header does not start with Bearer', async () => {
    req.headers.authorization = 'Token abc.def.ghi';

    await protect(req, res, next);

    // No token extracted -> same branch as missing token
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, no token' });
  });

  it('responds 401 when jwt.verify throws (invalid/expired token)', async () => {
    req.headers.authorization = 'Bearer invalid.token';
    jwt.verify.mockImplementation(() => {
      throw new Error('invalid token');
    });

    await protect(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('invalid.token', process.env.JWT_SECRET);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, token failed' });
  });

  it('attaches user to req and calls next on valid token', async () => {
    req.headers.authorization = 'Bearer valid.token';
    jwt.verify.mockReturnValue({ id: 'user123' });

    // Mock chained call: User.findById(...).select('-password')
    const selectMock = jest.fn().mockResolvedValue({ _id: 'user123', email: 'test@example.com' });
    User.findById.mockReturnValue({ select: selectMock });

    await protect(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('valid.token', process.env.JWT_SECRET);
    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(selectMock).toHaveBeenCalledWith('-password');
    expect(req.user).toEqual({ _id: 'user123', email: 'test@example.com' });
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
