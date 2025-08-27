// tests/review.test.js

const request = require('supertest');

// Important: do NOT import app at module top for tests that need per-test middleware overrides
// For most tests we use the default (admin) middleware mock below and import app once.
let app;

// Model mocks
const Review = require('../models/Review');
const User = require('../models/User');

jest.mock('../models/Review');
jest.mock('../models/User');

// Default auth middleware mock: admin user
jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { _id: 'user1', role: 'admin' };
    next();
  },
}));

beforeAll(() => {
  // Import app once under default (admin) middleware
  app = require('../app');
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Review API', () => {
  describe('GET /api/reviews', () => {
    it('should return reviews without filters', async () => {
      const reviews = [{ _id: '1', comment: 'Good', rating: 5 }];
      Review.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue(reviews),
      });

      const res = await request(app).get('/api/reviews');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(reviews);
      expect(Review.find).toHaveBeenCalledWith({});
    });

    it('should filter by productId and packageId', async () => {
      Review.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue([]),
      });

      const res = await request(app).get('/api/reviews?productId=prod1&packageId=pkg1');

      expect(res.statusCode).toBe(200);
      expect(Review.find).toHaveBeenCalledWith({ product: 'prod1', package: 'pkg1' });
    });

    it('should return 500 on error', async () => {
      Review.find.mockImplementation(() => {
        throw new Error('err');
      });

      const res = await request(app).get('/api/reviews');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('POST /api/reviews', () => {
    it('should create a new review', async () => {
      // Ensure duplicate check returns null
      Review.findOne.mockResolvedValue(null);

      // Mock chained findById().select('firstName lastName')
      const selectMock = jest.fn().mockResolvedValue({ firstName: 'John', lastName: 'Doe' });
      User.findById.mockReturnValue({ select: selectMock });

      // Mock instance save
      Review.prototype.save = jest.fn().mockResolvedValue({
        _id: 'review1',
        rating: 4,
        comment: 'Nice',
        userName: 'John Doe',
      });

      const res = await request(app)
        .post('/api/reviews')
        .send({ package: 'pkg1', rating: 4, comment: 'Nice' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('userName', 'John Doe');
      expect(Review.findOne).toHaveBeenCalledWith({ user: 'user1', package: 'pkg1' });
      expect(User.findById).toHaveBeenCalledWith('user1');
      expect(selectMock).toHaveBeenCalledWith('firstName lastName');
      expect(Review.prototype.save).toHaveBeenCalled();
    });

    it('should not create review if duplicate', async () => {
      Review.findOne.mockResolvedValue({ _id: 'existingReview' });

      const res = await request(app)
        .post('/api/reviews')
        .send({ package: 'pkg1', rating: 5 });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });

    it('should return 400 on create error', async () => {
      Review.findOne.mockImplementation(() => {
        throw new Error('fail');
      });

      const res = await request(app)
        .post('/api/reviews')
        .send({ package: 'pkg1', rating: 5 });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/reviews/:id', () => {
    it('should delete review as admin', async () => {
      const mockReview = {
        _id: 'review1',
        user: 'user1',
        remove: jest.fn().mockResolvedValue(),
      };
      Review.findById.mockResolvedValue(mockReview);

      const res = await request(app).delete('/api/reviews/review1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Review deleted');
      expect(Review.findById).toHaveBeenCalledWith('review1');
      expect(mockReview.remove).toHaveBeenCalled();
    });

    it('should forbid deletion if not admin or owner', async () => {
      // For this test, re-require app with a non-admin user via module isolation
      jest.resetModules();

      // Re-mock models for this isolated module load
      const mockFindById = jest.fn().mockResolvedValue({
        _id: 'review1',
        user: { equals: jest.fn().mockReturnValue(false) }, // not the same user
        remove: jest.fn(), // should not be called
      });

      jest.doMock('../models/Review', () => ({
        __esModule: true,
        default: {},
        findById: mockFindById,
      }));

      // Non-admin user in this isolated app instance
      jest.doMock('../middleware/authMiddleware', () => ({
        protect: (req, res, next) => {
          req.user = { _id: 'differentUser', role: 'user' };
          next();
        },
      }));

      const isolatedApp = require('../app');

      const res = await request(isolatedApp).delete('/api/reviews/review1');

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('message');
    });

    it('should return 404 if review not found', async () => {
      Review.findById.mockResolvedValue(null);

      const res = await request(app).delete('/api/reviews/nonexistent');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Review not found');
    });

    it('should return 500 on error', async () => {
      Review.findById.mockImplementation(() => {
        throw new Error('fail');
      });

      const res = await request(app).delete('/api/reviews/any');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message');
    });
  });
});
