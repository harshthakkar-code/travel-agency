const request = require('supertest');
const app = require('../app');
const Notification = require('../models/Notification');

// Mock Notification model methods
jest.mock('../models/Notification');

// Mock auth middleware to bypass auth and add fake user
jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { _id: 'user1' };
    next();
  },
}));

describe('Notification API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/notifications', () => {
    it('should return notifications for the logged-in user', async () => {
      const notifications = [{ _id: '1', message: 'Test message', read: false, user: 'user1' }];
      Notification.find.mockResolvedValue(notifications);

      const res = await request(app).get('/api/notifications');

      expect(Notification.find).toHaveBeenCalledWith({ user: 'user1' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(notifications);
    });

    it('should return 500 on error', async () => {
      Notification.find.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/api/notifications');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('PUT /api/notifications/:id/read', () => {
    it('should mark notification as read', async () => {
      Notification.findByIdAndUpdate.mockResolvedValue(true);

      const res = await request(app).put('/api/notifications/1/read');

      expect(Notification.findByIdAndUpdate).toHaveBeenCalledWith('1', { read: true });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Marked as read');
    });

    it('should return 400 on update error', async () => {
      Notification.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'));

      const res = await request(app).put('/api/notifications/1/read');

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Update failed');
    });
  });
});
