const reviewController = require('../controllers/reviewController');
const Review = require('../models/Review');
const admin = require('../config/firebase-admin');

// Mock dependencies
jest.mock('../models/Review');
jest.mock('../config/firebase-admin', () => ({
  auth: jest.fn()
}));

describe('Review Controller', () => {
  let req, res, mockAuth;

  beforeEach(() => {
    req = {
      body: {},
      query: {},
      params: {},
      user: {
        uid: 'testUserId',
        role: 'user',
        name: 'Test User',
        email: 'test@example.com'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    // Setup mock auth function
    mockAuth = {
      getUser: jest.fn()
    };
    admin.auth.mockReturnValue(mockAuth);

    jest.clearAllMocks();
  });

  describe('getReviews', () => {
    it('should get all reviews without filters', async () => {
      const mockReviews = [
        { _id: '1', comment: 'Great product', rating: 5 },
        { _id: '2', comment: 'Good service', rating: 4 }
      ];

      const mockQuery = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockReviews)
      };

      Review.find.mockReturnValue(mockQuery);

      await reviewController.getReviews(req, res);

      expect(Review.find).toHaveBeenCalledWith({});
      expect(mockQuery.populate).toHaveBeenCalledWith('product', 'name');
      expect(mockQuery.populate).toHaveBeenCalledWith('package', 'packageTitle');
      expect(mockQuery.sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(res.json).toHaveBeenCalledWith(mockReviews);
    });

    it('should filter reviews by productId', async () => {
      req.query.productId = 'product123';
      
      const mockQuery = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([])
      };

      Review.find.mockReturnValue(mockQuery);

      await reviewController.getReviews(req, res);

      expect(Review.find).toHaveBeenCalledWith({ product: 'product123' });
    });

    it('should filter reviews by packageId', async () => {
      req.query.packageId = 'package123';
      
      const mockQuery = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([])
      };

      Review.find.mockReturnValue(mockQuery);

      await reviewController.getReviews(req, res);

      expect(Review.find).toHaveBeenCalledWith({ package: 'package123' });
    });

    it('should filter reviews by both productId and packageId', async () => {
      req.query.productId = 'product123';
      req.query.packageId = 'package123';
      
      const mockQuery = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([])
      };

      Review.find.mockReturnValue(mockQuery);

      await reviewController.getReviews(req, res);

      expect(Review.find).toHaveBeenCalledWith({ 
        product: 'product123', 
        package: 'package123' 
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Database connection failed');
      Review.find.mockImplementation(() => {
        throw error;
      });

      await reviewController.getReviews(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('createReview', () => {
    beforeEach(() => {
      req.body = {
        product: 'productId123',
        package: 'packageId123',
        rating: 5,
        comment: 'Excellent service!'
      };
    });

    it('should create a new review successfully with Firebase displayName', async () => {
      Review.findOne.mockResolvedValue(null);
      
      const mockFirebaseUser = {
        displayName: 'Firebase User'
      };
      mockAuth.getUser.mockResolvedValue(mockFirebaseUser);

      const mockSavedReview = {
        _id: 'reviewId123',
        user: 'testUserId',
        userName: 'Firebase User',
        product: 'productId123',
        package: 'packageId123',
        rating: 5,
        comment: 'Excellent service!',
        populate: jest.fn().mockReturnThis()
      };

      const mockReviewInstance = {
        save: jest.fn().mockResolvedValue(mockSavedReview)
      };

      Review.mockImplementation(() => mockReviewInstance);

      await reviewController.createReview(req, res);

      expect(Review.findOne).toHaveBeenCalledWith({
        user: 'testUserId',
        package: 'packageId123'
      });
      expect(mockReviewInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockSavedReview);
    });

    it('should create review with Firebase user without displayName', async () => {
      Review.findOne.mockResolvedValue(null);
      
      const mockFirebaseUser = {
        displayName: null
      };
      mockAuth.getUser.mockResolvedValue(mockFirebaseUser);

      const mockSavedReview = {
        populate: jest.fn().mockReturnThis()
      };

      const mockReviewInstance = {
        save: jest.fn().mockResolvedValue(mockSavedReview)
      };

      Review.mockImplementation(() => mockReviewInstance);

      await reviewController.createReview(req, res);

      expect(mockReviewInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should return 400 if user already reviewed the package', async () => {
      const existingReview = { _id: 'existingId' };
      Review.findOne.mockResolvedValue(existingReview);

      await reviewController.createReview(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "You have already submitted a review for this package."
      });
    });

    it('should use fallback userName when Firebase getUser fails', async () => {
      Review.findOne.mockResolvedValue(null);
      mockAuth.getUser.mockRejectedValue(new Error('Firebase error'));

      const mockSavedReview = {
        populate: jest.fn().mockReturnThis()
      };

      const mockReviewInstance = {
        save: jest.fn().mockResolvedValue(mockSavedReview)
      };

      Review.mockImplementation(() => mockReviewInstance);

      await reviewController.createReview(req, res);

      expect(mockReviewInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should use user email as fallback userName when name is undefined', async () => {
      Review.findOne.mockResolvedValue(null);
      req.user.name = undefined;
      mockAuth.getUser.mockRejectedValue(new Error('Firebase error'));

      const mockSavedReview = {
        populate: jest.fn().mockReturnThis()
      };

      const mockReviewInstance = {
        save: jest.fn().mockResolvedValue(mockSavedReview)
      };

      Review.mockImplementation(() => mockReviewInstance);

      await reviewController.createReview(req, res);

      expect(mockReviewInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should use Anonymous User as final fallback', async () => {
      Review.findOne.mockResolvedValue(null);
      req.user.name = undefined;
      req.user.email = undefined;
      mockAuth.getUser.mockRejectedValue(new Error('Firebase error'));

      const mockSavedReview = {
        populate: jest.fn().mockReturnThis()
      };

      const mockReviewInstance = {
        save: jest.fn().mockResolvedValue(mockSavedReview)
      };

      Review.mockImplementation(() => mockReviewInstance);

      await reviewController.createReview(req, res);

      expect(mockReviewInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should handle database save errors', async () => {
      Review.findOne.mockResolvedValue(null);
      mockAuth.getUser.mockResolvedValue({ displayName: 'Test' });

      const error = new Error('Save failed');
      const mockReviewInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Review.mockImplementation(() => mockReviewInstance);

      await reviewController.createReview(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle errors in findOne', async () => {
      const error = new Error('Database error');
      Review.findOne.mockRejectedValue(error);

      await reviewController.createReview(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle populate errors after save', async () => {
      Review.findOne.mockResolvedValue(null);
      mockAuth.getUser.mockResolvedValue({ displayName: 'Test' });

      const mockSavedReview = {
        populate: jest.fn().mockRejectedValue(new Error('Populate failed'))
      };

      const mockReviewInstance = {
        save: jest.fn().mockResolvedValue(mockSavedReview)
      };

      Review.mockImplementation(() => mockReviewInstance);

      await reviewController.createReview(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Populate failed' });
    });
  });

  describe('deleteReview', () => {
    beforeEach(() => {
      req.params.id = 'reviewId123';
    });

    it('should delete review when user is admin', async () => {
      req.user.role = 'admin';
      const mockReview = {
        _id: 'reviewId123',
        user: 'otherUserId'
      };

      Review.findById.mockResolvedValue(mockReview);
      Review.findByIdAndDelete.mockResolvedValue(true);

      await reviewController.deleteReview(req, res);

      expect(Review.findByIdAndDelete).toHaveBeenCalledWith('reviewId123');
      expect(res.json).toHaveBeenCalledWith({ message: 'Review deleted successfully' });
    });

    it('should delete review when user owns the review', async () => {
      const mockReview = {
        _id: 'reviewId123',
        user: 'testUserId'
      };

      Review.findById.mockResolvedValue(mockReview);
      Review.findByIdAndDelete.mockResolvedValue(true);

      await reviewController.deleteReview(req, res);

      expect(Review.findByIdAndDelete).toHaveBeenCalledWith('reviewId123');
      expect(res.json).toHaveBeenCalledWith({ message: 'Review deleted successfully' });
    });

    it('should return 404 if review not found', async () => {
      Review.findById.mockResolvedValue(null);

      await reviewController.deleteReview(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Review not found' });
    });

    it('should return 403 if user is not authorized', async () => {
      const mockReview = {
        _id: 'reviewId123',
        user: 'otherUserId'
      };

      Review.findById.mockResolvedValue(mockReview);

      await reviewController.deleteReview(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Not authorized to delete this review' 
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Database error');
      Review.findById.mockRejectedValue(error);

      await reviewController.deleteReview(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('getUserReviews', () => {
    it('should get reviews for the authenticated user', async () => {
      const mockReviews = [
        { _id: '1', comment: 'My review 1', user: 'testUserId' },
        { _id: '2', comment: 'My review 2', user: 'testUserId' }
      ];

      const mockQuery = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockReviews)
      };

      Review.find.mockReturnValue(mockQuery);

      await reviewController.getUserReviews(req, res);

      expect(Review.find).toHaveBeenCalledWith({ user: 'testUserId' });
      expect(mockQuery.populate).toHaveBeenCalledWith('product', 'name');
      expect(mockQuery.populate).toHaveBeenCalledWith('package', 'packageTitle');
      expect(mockQuery.sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(res.json).toHaveBeenCalledWith(mockReviews);
    });

    it('should handle database errors', async () => {
      const error = new Error('Database connection failed');
      Review.find.mockImplementation(() => {
        throw error;
      });

      await reviewController.getUserReviews(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should return empty array when user has no reviews', async () => {
      const mockQuery = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([])
      };

      Review.find.mockReturnValue(mockQuery);

      await reviewController.getUserReviews(req, res);

      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
});
