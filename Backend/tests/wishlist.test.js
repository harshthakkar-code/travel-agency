const wishlistController = require('../controllers/wishlistController');
const Wishlist = require('../models/Wishlist');

// Mock dependencies
jest.mock('../models/Wishlist');

describe('Wishlist Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      user: {
        _id: 'testUserId',
        uid: 'testUserId',
        name: 'Test User',
        email: 'test@example.com'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  describe('getWishlist', () => {
    it('should return wishlist with populated packages when exists', async () => {
      const mockWishlist = {
        _id: 'wishlist123',
        user: 'testUserId',
        packages: [
          {
            _id: 'package1',
            title: 'Adventure Package 1',
            price: 299,
            description: 'Amazing adventure'
          },
          {
            _id: 'package2',
            title: 'Cultural Package 2',
            price: 199,
            description: 'Cultural experience'
          }
        ]
      };

      const mockQuery = {
        populate: jest.fn().mockResolvedValue(mockWishlist)
      };

      Wishlist.findOne.mockReturnValue(mockQuery);

      await wishlistController.getWishlist(req, res);

      expect(Wishlist.findOne).toHaveBeenCalledWith({ user: 'testUserId' });
      expect(mockQuery.populate).toHaveBeenCalledWith('packages');
      expect(res.json).toHaveBeenCalledWith(mockWishlist);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return empty wishlist structure when none exists', async () => {
      const mockQuery = {
        populate: jest.fn().mockResolvedValue(null)
      };

      Wishlist.findOne.mockReturnValue(mockQuery);

      await wishlistController.getWishlist(req, res);

      expect(res.json).toHaveBeenCalledWith({ 
        user: 'testUserId', 
        packages: [] 
      });
    });

    it('should handle database connection errors', async () => {
      const error = new Error('Database connection failed');
      const mockQuery = {
        populate: jest.fn().mockRejectedValue(error)
      };

      Wishlist.findOne.mockReturnValue(mockQuery);

      await wishlistController.getWishlist(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle findOne throwing error', async () => {
      const error = new Error('Query failed');
      Wishlist.findOne.mockImplementation(() => {
        throw error;
      });

      await wishlistController.getWishlist(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle populate errors', async () => {
      const error = new Error('Population failed');
      const mockQuery = {
        populate: jest.fn().mockRejectedValue(error)
      };

      Wishlist.findOne.mockReturnValue(mockQuery);

      await wishlistController.getWishlist(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle missing user in request', async () => {
      req.user = undefined;

      await wishlistController.getWishlist(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('_id')
      }));
    });

    it('should return wishlist with empty packages array', async () => {
      const mockWishlist = {
        _id: 'wishlist123',
        user: 'testUserId',
        packages: []
      };

      const mockQuery = {
        populate: jest.fn().mockResolvedValue(mockWishlist)
      };

      Wishlist.findOne.mockReturnValue(mockQuery);

      await wishlistController.getWishlist(req, res);

      expect(res.json).toHaveBeenCalledWith(mockWishlist);
    });
  });

  describe('addToWishlist', () => {
    beforeEach(() => {
      req.body = { packageId: 'package123' };
    });

    it('should add package to existing wishlist when not already present', async () => {
      const existingWishlist = {
        _id: 'wishlist123',
        user: 'testUserId',
        packages: ['package456'],
        save: jest.fn().mockResolvedValue(true)
      };

      // Mock includes method
      existingWishlist.packages.includes = jest.fn().mockReturnValue(false);

      Wishlist.findOne.mockResolvedValue(existingWishlist);

      await wishlistController.addToWishlist(req, res);

      expect(Wishlist.findOne).toHaveBeenCalledWith({ user: 'testUserId' });
      expect(existingWishlist.packages.includes).toHaveBeenCalledWith('package123');
      expect(existingWishlist.packages).toContain('package123');
      expect(existingWishlist.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(existingWishlist);
    });

    it('should not add duplicate package to wishlist', async () => {
      const existingWishlist = {
        _id: 'wishlist123',
        user: 'testUserId',
        packages: ['package123'], // Package already exists
        save: jest.fn().mockResolvedValue(true)
      };

      existingWishlist.packages.includes = jest.fn().mockReturnValue(true);

      Wishlist.findOne.mockResolvedValue(existingWishlist);

      await wishlistController.addToWishlist(req, res);

      expect(existingWishlist.packages.includes).toHaveBeenCalledWith('package123');
      expect(existingWishlist.packages).toHaveLength(1);
      expect(existingWishlist.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(existingWishlist);
    });

    it('should create new wishlist when none exists', async () => {
      Wishlist.findOne.mockResolvedValue(null);

      const newWishlist = {
        user: 'testUserId',
        packages: ['package123'],
        save: jest.fn().mockResolvedValue(true)
      };

      newWishlist.packages.includes = jest.fn().mockReturnValue(false);

      Wishlist.mockImplementation(() => newWishlist);

      await wishlistController.addToWishlist(req, res);

      expect(Wishlist).toHaveBeenCalledWith({ 
        user: 'testUserId', 
        packages: [] 
      });
      expect(newWishlist.packages).toContain('package123');
      expect(newWishlist.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(newWishlist);
    });

    it('should handle save errors for existing wishlist', async () => {
      const error = new Error('Save operation failed');
      const existingWishlist = {
        packages: [],
        save: jest.fn().mockRejectedValue(error)
      };

      existingWishlist.packages.includes = jest.fn().mockReturnValue(false);
      Wishlist.findOne.mockResolvedValue(existingWishlist);

      await wishlistController.addToWishlist(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle save errors for new wishlist', async () => {
      const error = new Error('Save operation failed');
      Wishlist.findOne.mockResolvedValue(null);

      const newWishlist = {
        packages: [],
        save: jest.fn().mockRejectedValue(error)
      };

      newWishlist.packages.includes = jest.fn().mockReturnValue(false);
      Wishlist.mockImplementation(() => newWishlist);

      await wishlistController.addToWishlist(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle database findOne errors', async () => {
      const error = new Error('Database query failed');
      Wishlist.findOne.mockRejectedValue(error);

      await wishlistController.addToWishlist(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle missing packageId in request body', async () => {
      req.body = {}; // Missing packageId

      const existingWishlist = {
        packages: [],
        save: jest.fn().mockResolvedValue(true)
      };

      existingWishlist.packages.includes = jest.fn().mockReturnValue(false);
      Wishlist.findOne.mockResolvedValue(existingWishlist);

      await wishlistController.addToWishlist(req, res);

      expect(existingWishlist.packages).toContain(undefined);
      expect(res.json).toHaveBeenCalledWith(existingWishlist);
    });

    it('should handle missing user in request', async () => {
      req.user = undefined;

      await wishlistController.addToWishlist(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('_id')
      }));
    });

    it('should add multiple different packages to wishlist', async () => {
      const existingWishlist = {
        packages: ['package456', 'package789'],
        save: jest.fn().mockResolvedValue(true)
      };

      existingWishlist.packages.includes = jest.fn().mockReturnValue(false);
      Wishlist.findOne.mockResolvedValue(existingWishlist);

      await wishlistController.addToWishlist(req, res);

      expect(existingWishlist.packages).toContain('package123');
      expect(existingWishlist.packages).toHaveLength(3);
    });
  });

  describe('removeFromWishlist', () => {
    beforeEach(() => {
      req.params.packageId = 'package123';
    });

    it('should remove package from wishlist successfully', async () => {
      const mockWishlist = {
        _id: 'wishlist123',
        user: 'testUserId',
        packages: [
          { toString: () => 'package123' },
          { toString: () => 'package456' }
        ],
        save: jest.fn().mockResolvedValue(true)
      };

      Wishlist.findOne.mockResolvedValue(mockWishlist);

      await wishlistController.removeFromWishlist(req, res);

      expect(Wishlist.findOne).toHaveBeenCalledWith({ user: 'testUserId' });
      expect(mockWishlist.packages).toHaveLength(1);
      expect(mockWishlist.packages.some(pkg => pkg.toString() === 'package123')).toBe(false);
      expect(mockWishlist.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockWishlist);
    });

    it('should return 404 when wishlist not found', async () => {
      Wishlist.findOne.mockResolvedValue(null);

      await wishlistController.removeFromWishlist(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Wishlist not found' });
    });

    it('should handle removal of non-existent package', async () => {
      const mockWishlist = {
        packages: [
          { toString: () => 'package456' },
          { toString: () => 'package789' }
        ],
        save: jest.fn().mockResolvedValue(true)
      };

      Wishlist.findOne.mockResolvedValue(mockWishlist);

      await wishlistController.removeFromWishlist(req, res);

      expect(mockWishlist.packages).toHaveLength(2); // No change
      expect(mockWishlist.save).toHaveBeenCalled();
    });

    it('should handle database findOne errors', async () => {
      const error = new Error('Database query failed');
      Wishlist.findOne.mockRejectedValue(error);

      await wishlistController.removeFromWishlist(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle save errors', async () => {
      const error = new Error('Save operation failed');
      const mockWishlist = {
        packages: [{ toString: () => 'package123' }],
        save: jest.fn().mockRejectedValue(error)
      };

      Wishlist.findOne.mockResolvedValue(mockWishlist);

      await wishlistController.removeFromWishlist(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should remove all instances of the same package', async () => {
      const mockWishlist = {
        packages: [
          { toString: () => 'package123' },
          { toString: () => 'package456' },
          { toString: () => 'package123' }
        ],
        save: jest.fn().mockResolvedValue(true)
      };

      Wishlist.findOne.mockResolvedValue(mockWishlist);

      await wishlistController.removeFromWishlist(req, res);

      expect(mockWishlist.packages).toHaveLength(1);
      expect(mockWishlist.packages[0].toString()).toBe('package456');
    });

    it('should handle empty wishlist packages array', async () => {
      const mockWishlist = {
        packages: [],
        save: jest.fn().mockResolvedValue(true)
      };

      Wishlist.findOne.mockResolvedValue(mockWishlist);

      await wishlistController.removeFromWishlist(req, res);

      expect(mockWishlist.packages).toHaveLength(0);
      expect(mockWishlist.save).toHaveBeenCalled();
    });

    it('should handle missing packageId parameter', async () => {
      req.params.packageId = undefined;

      const mockWishlist = {
        packages: [{ toString: () => 'package123' }],
        save: jest.fn().mockResolvedValue(true)
      };

      Wishlist.findOne.mockResolvedValue(mockWishlist);

      await wishlistController.removeFromWishlist(req, res);

      // Should filter out packages that match undefined
      expect(mockWishlist.packages).toHaveLength(1);
    });

    it('should handle missing user in request', async () => {
      req.user = undefined;

      await wishlistController.removeFromWishlist(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('_id')
      }));
    });
  });
});
