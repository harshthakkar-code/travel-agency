const commentController = require('../controllers/commentController');
const Comment = require('../models/Comment');

// Mock dependencies
jest.mock('../models/Comment');

describe('Comment Controller', () => {
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

  describe('createComment', () => {
    beforeEach(() => {
      req.body = {
        postTitle: 'Test Blog Post',
        message: 'This is a great post!'
      };
    });

    it('should create a new comment successfully', async () => {
      const savedComment = {
        _id: 'comment123',
        postTitle: 'Test Blog Post',
        message: 'This is a great post!',
        user: 'testUserId',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const mockCommentInstance = {
        save: jest.fn().mockResolvedValue(savedComment)
      };

      Comment.mockImplementation(() => mockCommentInstance);

      await commentController.createComment(req, res);

      expect(Comment).toHaveBeenCalledWith({
        postTitle: 'Test Blog Post',
        message: 'This is a great post!',
        user: 'testUserId'
      });
      expect(mockCommentInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(savedComment);
    });

    it('should handle validation errors for missing required fields', async () => {
      req.body = { postTitle: 'Test Post' }; // Missing message
      
      const error = new Error('Comment validation failed: message: Path `message` is required.');
      const mockCommentInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Comment.mockImplementation(() => mockCommentInstance);

      await commentController.createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle missing postTitle validation', async () => {
      req.body = { message: 'Great post!' }; // Missing postTitle
      
      const error = new Error('Comment validation failed: postTitle: Path `postTitle` is required.');
      const mockCommentInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Comment.mockImplementation(() => mockCommentInstance);

      await commentController.createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle empty string validation', async () => {
      req.body = { postTitle: '', message: '' };
      
      const error = new Error('Validation error: Fields cannot be empty');
      const mockCommentInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Comment.mockImplementation(() => mockCommentInstance);

      await commentController.createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle database save errors', async () => {
      const error = new Error('Database connection failed');
      const mockCommentInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Comment.mockImplementation(() => mockCommentInstance);

      await commentController.createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    // FIXED: Updated error message for newer Node.js versions
    it('should handle missing user in request', async () => {
      req.user = undefined;
      
      // Use the actual error message that Node.js throws
      const error = new Error("Cannot read properties of undefined (reading '_id')");
      const mockCommentInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Comment.mockImplementation(() => mockCommentInstance);

      await commentController.createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    // Alternative approach: Test the actual behavior instead of specific error message
    it('should handle missing user in request (alternative)', async () => {
      req.user = undefined;

      // Let the actual error be thrown and caught
      await commentController.createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      // Just check that an error message exists, not the exact text
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('_id')
      }));
    });

    it('should create comment with long message', async () => {
      const longMessage = 'This is a very long comment message that exceeds normal length to test if the system can handle lengthy comments properly.'.repeat(5);
      req.body.message = longMessage;

      const savedComment = {
        _id: 'comment123',
        postTitle: 'Test Blog Post',
        message: longMessage,
        user: 'testUserId'
      };

      const mockCommentInstance = {
        save: jest.fn().mockResolvedValue(savedComment)
      };

      Comment.mockImplementation(() => mockCommentInstance);

      await commentController.createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(savedComment);
    });
  });

  describe('getComments', () => {
    it('should return all comments with populated user info', async () => {
      const mockComments = [
        {
          _id: 'comment1',
          postTitle: 'Blog Post 1',
          message: 'Great article!',
          user: { name: 'John Doe', email: 'john@example.com' },
          createdAt: new Date()
        },
        {
          _id: 'comment2',
          postTitle: 'Blog Post 2',
          message: 'Very informative!',
          user: { name: 'Jane Smith', email: 'jane@example.com' },
          createdAt: new Date()
        }
      ];

      const mockQuery = {
        populate: jest.fn().mockResolvedValue(mockComments)
      };

      Comment.find.mockReturnValue(mockQuery);

      await commentController.getComments(req, res);

      expect(Comment.find).toHaveBeenCalledWith();
      expect(mockQuery.populate).toHaveBeenCalledWith('user', 'name email');
      expect(res.json).toHaveBeenCalledWith(mockComments);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return empty array when no comments exist', async () => {
      const mockQuery = {
        populate: jest.fn().mockResolvedValue([])
      };

      Comment.find.mockReturnValue(mockQuery);

      await commentController.getComments(req, res);

      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should handle database connection errors', async () => {
      const error = new Error('Database connection failed');
      const mockQuery = {
        populate: jest.fn().mockRejectedValue(error)
      };

      Comment.find.mockReturnValue(mockQuery);

      await commentController.getComments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle populate errors', async () => {
      const error = new Error('Population failed');
      const mockQuery = {
        populate: jest.fn().mockRejectedValue(error)
      };

      Comment.find.mockReturnValue(mockQuery);

      await commentController.getComments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle Comment.find throwing error', async () => {
      const error = new Error('Find operation failed');
      Comment.find.mockImplementation(() => {
        throw error;
      });

      await commentController.getComments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should return comments with null user references', async () => {
      const mockComments = [
        {
          _id: 'comment1',
          postTitle: 'Blog Post 1',
          message: 'Great article!',
          user: null, // User might be deleted
          createdAt: new Date()
        }
      ];

      const mockQuery = {
        populate: jest.fn().mockResolvedValue(mockComments)
      };

      Comment.find.mockReturnValue(mockQuery);

      await commentController.getComments(req, res);

      expect(res.json).toHaveBeenCalledWith(mockComments);
    });
  });

  describe('deleteComment', () => {
    beforeEach(() => {
      req.params.id = 'comment123';
    });

    it('should delete comment successfully', async () => {
      const deletedComment = {
        _id: 'comment123',
        postTitle: 'Deleted Post',
        message: 'This will be deleted'
      };

      Comment.findByIdAndDelete.mockResolvedValue(deletedComment);

      await commentController.deleteComment(req, res);

      expect(Comment.findByIdAndDelete).toHaveBeenCalledWith('comment123');
      expect(res.json).toHaveBeenCalledWith({ message: 'Comment deleted' });
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should handle deletion errors', async () => {
      const error = new Error('Delete operation failed');
      Comment.findByIdAndDelete.mockRejectedValue(error);

      await commentController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle invalid ObjectId format', async () => {
      const error = new Error('Cast to ObjectId failed for value "invalid-id"');
      Comment.findByIdAndDelete.mockRejectedValue(error);

      await commentController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should succeed even when comment does not exist', async () => {
      Comment.findByIdAndDelete.mockResolvedValue(null);

      await commentController.deleteComment(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Comment deleted' });
    });

    it('should handle database connection errors during deletion', async () => {
      const error = new Error('Database connection lost');
      Comment.findByIdAndDelete.mockRejectedValue(error);

      await commentController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle missing comment ID parameter', async () => {
      req.params.id = undefined;
      
      const error = new Error('Comment ID is required');
      Comment.findByIdAndDelete.mockRejectedValue(error);

      await commentController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle empty string as comment ID', async () => {
      req.params.id = '';
      
      const error = new Error('Cast to ObjectId failed for value ""');
      Comment.findByIdAndDelete.mockRejectedValue(error);

      await commentController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });
});
