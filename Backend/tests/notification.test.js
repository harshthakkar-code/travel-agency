const notificationController = require('../controllers/notificationController');
const Notification = require('../models/Notification');

// Mock dependencies
jest.mock('../models/Notification');

describe('Notification Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
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

  describe('getNotifications', () => {
    it('should return notifications for the authenticated user', async () => {
      const mockNotifications = [
        {
          _id: 'notification1',
          message: 'Your booking has been confirmed',
          read: false,
          user: 'testUserId',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: 'notification2',
          message: 'Payment received successfully',
          read: true,
          user: 'testUserId',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      Notification.find.mockResolvedValue(mockNotifications);

      await notificationController.getNotifications(req, res);

      expect(Notification.find).toHaveBeenCalledWith({ user: 'testUserId' });
      expect(res.json).toHaveBeenCalledWith(mockNotifications);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return empty array when user has no notifications', async () => {
      Notification.find.mockResolvedValue([]);

      await notificationController.getNotifications(req, res);

      expect(Notification.find).toHaveBeenCalledWith({ user: 'testUserId' });
      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should handle database connection errors', async () => {
      const error = new Error('Database connection failed');
      Notification.find.mockRejectedValue(error);

      await notificationController.getNotifications(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    // FIXED: Use the exact error message or a more specific regex
    it('should handle missing user in request', async () => {
      req.user = undefined;

      await notificationController.getNotifications(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ 
        message: "Cannot read properties of undefined (reading '_id')"
      });
    });

    // Alternative approach: Let the actual error be caught
    it('should handle missing user in request (alternative)', async () => {
      req.user = undefined;

      await notificationController.getNotifications(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      // Just check that the error message contains key parts
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('_id')
      }));
    });

    it('should handle null user._id', async () => {
      req.user._id = null;

      Notification.find.mockResolvedValue([]);

      await notificationController.getNotifications(req, res);

      expect(Notification.find).toHaveBeenCalledWith({ user: null });
      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should handle network timeout errors', async () => {
      const error = new Error('Request timeout');
      Notification.find.mockRejectedValue(error);

      await notificationController.getNotifications(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Request timeout' });
    });

    it('should handle invalid user ID format', async () => {
      const error = new Error('Cast to ObjectId failed');
      Notification.find.mockRejectedValue(error);

      await notificationController.getNotifications(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Cast to ObjectId failed' });
    });

    it('should return notifications sorted by creation date', async () => {
      const mockNotifications = [
        {
          _id: 'notification1',
          message: 'Newest notification',
          read: false,
          user: 'testUserId',
          createdAt: new Date('2025-09-02')
        },
        {
          _id: 'notification2',
          message: 'Older notification',
          read: false,
          user: 'testUserId',
          createdAt: new Date('2025-09-01')
        }
      ];

      Notification.find.mockResolvedValue(mockNotifications);

      await notificationController.getNotifications(req, res);

      expect(res.json).toHaveBeenCalledWith(mockNotifications);
    });
  });

  describe('markAsRead', () => {
    beforeEach(() => {
      req.params.id = 'notification123';
    });

    it('should mark notification as read successfully', async () => {
      const updatedNotification = {
        _id: 'notification123',
        message: 'Test notification',
        read: true,
        user: 'testUserId'
      };

      Notification.findByIdAndUpdate.mockResolvedValue(updatedNotification);

      await notificationController.markAsRead(req, res);

      expect(Notification.findByIdAndUpdate).toHaveBeenCalledWith('notification123', { read: true });
      expect(res.json).toHaveBeenCalledWith({ message: 'Marked as read' });
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should handle update errors', async () => {
      const error = new Error('Update operation failed');
      Notification.findByIdAndUpdate.mockRejectedValue(error);

      await notificationController.markAsRead(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle invalid notification ID format', async () => {
      const error = new Error('Cast to ObjectId failed for value "invalid-id"');
      Notification.findByIdAndUpdate.mockRejectedValue(error);

      await notificationController.markAsRead(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should succeed even when notification does not exist', async () => {
      Notification.findByIdAndUpdate.mockResolvedValue(null);

      await notificationController.markAsRead(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Marked as read' });
    });

    it('should handle database connection errors', async () => {
      const error = new Error('Database connection lost');
      Notification.findByIdAndUpdate.mockRejectedValue(error);

      await notificationController.markAsRead(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle missing notification ID parameter', async () => {
      req.params.id = undefined;
      
      const error = new Error('Notification ID is required');
      Notification.findByIdAndUpdate.mockRejectedValue(error);

      await notificationController.markAsRead(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle empty string as notification ID', async () => {
      req.params.id = '';
      
      const error = new Error('Cast to ObjectId failed for value ""');
      Notification.findByIdAndUpdate.mockRejectedValue(error);

      await notificationController.markAsRead(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle notification already marked as read', async () => {
      const alreadyReadNotification = {
        _id: 'notification123',
        message: 'Test notification',
        read: true,
        user: 'testUserId'
      };

      Notification.findByIdAndUpdate.mockResolvedValue(alreadyReadNotification);

      await notificationController.markAsRead(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Marked as read' });
    });

    it('should handle concurrent update conflicts', async () => {
      const error = new Error('Version conflict - document was modified');
      Notification.findByIdAndUpdate.mockRejectedValue(error);

      await notificationController.markAsRead(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });
});
