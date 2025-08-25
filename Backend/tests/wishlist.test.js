const request = require('supertest');
const app = require('../app');
const Wishlist = require('../models/Wishlist');

jest.mock('../models/Wishlist');

jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { _id: 'user1' }; // mock logged-in user
    next();
  },
}));

describe('Wishlist API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/wishlist', () => {
    it('should return wishlist with packages populated', async () => {
      const wishlist = {
        user: 'user1',
        packages: [{ _id: 'pkg1', title: 'Package 1' }],
      };
      Wishlist.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(wishlist),
      });

      const res = await request(app).get('/api/wishlist');

      expect(Wishlist.findOne).toHaveBeenCalledWith({ user: 'user1' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(wishlist);
    });

    it('should return empty wishlist if none found', async () => {
      Wishlist.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });

      const res = await request(app).get('/api/wishlist');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ user: 'user1', packages: [] });
    });

    it('should return 500 on error', async () => {
      Wishlist.findOne.mockReturnValue({
        populate: jest.fn().mockRejectedValue(new Error('DB error')),
      });

      const res = await request(app).get('/api/wishlist');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('POST /api/wishlist', () => {
    it('should add package to wishlist and return updated wishlist', async () => {
      const wishlistInstance = {
        user: 'user1',
        packages: [],
        save: jest.fn().mockResolvedValue(true),
      };
      Wishlist.findOne.mockResolvedValue(wishlistInstance);

      // mock includes to return false so new package is added
      wishlistInstance.packages.includes = jest.fn().mockReturnValue(false);

      const res = await request(app)
        .post('/api/wishlist')
        .send({ packageId: 'newPkg' });

      expect(Wishlist.findOne).toHaveBeenCalledWith({ user: 'user1' });
      expect(wishlistInstance.packages.includes).toHaveBeenCalledWith('newPkg');
      expect(wishlistInstance.packages).toContain('newPkg');
      expect(wishlistInstance.save).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      // Check that response body has expected keys and package added
      expect(res.body.packages).toContain('newPkg');
      expect(res.body.user).toBeDefined();
    });

    it('should create wishlist if none exists and add package', async () => {
      Wishlist.findOne.mockResolvedValue(null);

      // Mock Wishlist constructor and save method
      const saveMock = jest.fn().mockResolvedValue(true);
      const wishlistMockInstance = {
        packages: ['newPkg'],
        save: saveMock,
      };
      const wishlistConstructorMock = jest.fn(() => wishlistMockInstance);
      Wishlist.mockImplementation(wishlistConstructorMock);

      const res = await request(app)
        .post('/api/wishlist')
        .send({ packageId: 'newPkg' });

      expect(wishlistConstructorMock).toHaveBeenCalledWith({ user: 'user1', packages: [] });
      expect(saveMock).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res.body.packages).toContain('newPkg');
    });

    it('should return 400 on error', async () => {
      Wishlist.findOne.mockRejectedValue(new Error('DB error'));

      const res = await request(app).post('/api/wishlist').send({ packageId: 'pkg1' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('DELETE /api/wishlist/:packageId', () => {
    it('should remove package from wishlist and return updated wishlist', async () => {
      const wishlistInstance = {
        packages: ['pkg1', 'pkg2'],
        save: jest.fn().mockResolvedValue(true),
      };
      Wishlist.findOne.mockResolvedValue(wishlistInstance);

      const res = await request(app).delete('/api/wishlist/pkg1');

      expect(Wishlist.findOne).toHaveBeenCalledWith({ user: 'user1' });
      expect(wishlistInstance.packages).not.toContain('pkg1');
      expect(wishlistInstance.save).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      // Check that response body packages array excludes removed package
      expect(res.body.packages).not.toContain('pkg1');
    });

    it('should return 404 if wishlist not found', async () => {
      Wishlist.findOne.mockResolvedValue(null);

      const res = await request(app).delete('/api/wishlist/pkg1');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Wishlist not found');
    });

    it('should return 400 on error', async () => {
      Wishlist.findOne.mockRejectedValue(new Error('DB error'));

      const res = await request(app).delete('/api/wishlist/pkg1');

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });
});
