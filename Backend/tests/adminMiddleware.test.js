// tests/adminMiddleware.test.js
const { adminOnly } = require('../middleware/adminMiddleware');

describe('adminOnly middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('calls next when user is admin', () => {
    req.user = { role: 'admin' };

    adminOnly(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('returns 403 when user is missing', () => {
    req.user = undefined;

    adminOnly(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied: Admins only' });
  });

  it('returns 403 when user role is not admin', () => {
    req.user = { role: 'user' };

    adminOnly(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied: Admins only' });
  });

  it('returns 403 when user object exists but role is missing', () => {
    req.user = {};

    adminOnly(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied: Admins only' });
  });
});
