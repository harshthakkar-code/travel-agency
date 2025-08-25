const request = require('supertest');
const app = require('../app');
const Comment = require('../models/Comment');

// Mock Comment model methods
jest.mock('../models/Comment');

// Mock auth middleware to bypass auth for testing, injecting fake user
jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { _id: 'user1' };
    next();
  },
}));

describe('Comment API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/comments', () => {
    it('should create a new comment and return it', async () => {
      const commentData = { postTitle: 'Test Post', message: 'Great post!' };
      const savedComment = { _id: '1', ...commentData, user: 'user1' };

      Comment.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(savedComment),
      }));

      const res = await request(app).post('/api/comments').send(commentData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(savedComment);
    });

    it('should return 400 on save error', async () => {
      Comment.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Save failed')),
      }));

      const res = await request(app).post('/api/comments').send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Save failed');
    });
  });

  describe('GET /api/comments', () => {
    it('should return all comments with populated user info', async () => {
      const comments = [
        { _id: '1', postTitle: 'Post 1', user: { name: 'John', email: 'john@example.com' }, message: 'Nice!' },
      ];
      Comment.find.mockReturnValue({ populate: jest.fn().mockResolvedValue(comments) });

      const res = await request(app).get('/api/comments');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(comments);
    });

    it('should return 500 on error', async () => {
      Comment.find.mockReturnValue({ populate: jest.fn().mockRejectedValue(new Error('DB error')) });

      const res = await request(app).get('/api/comments');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('DELETE /api/comments/:id', () => {
    it('should delete comment and return success message', async () => {
      Comment.findByIdAndDelete.mockResolvedValue();

      const res = await request(app).delete('/api/comments/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Comment deleted');
    });

    it('should return 400 on delete error', async () => {
      Comment.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'));

      const res = await request(app).delete('/api/comments/1');

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Delete failed');
    });
  });
});
