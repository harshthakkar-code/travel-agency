const bookingController = require('../controllers/bookingController');
const Booking = require('../models/Booking');

// Mock dependencies
jest.mock('../models/Booking');

describe('Booking Controller', () => {
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

  describe('createBooking', () => {
    it('should create a new booking successfully', async () => {
      const bookingData = {
        package: {
          packageId: 'pkg123',
          packageTitle: 'Test Package',
          destination: 'Paris',
          tripDuration: '7 days',
          travelDate: '2025-12-01',
          groupSize: 2,
          packagePrice: 150000
        },
        billingAddress: {
          country: 'USA',
          city: 'New York',
          street1: '123 Main St'
        },
        pricing: {
          packageCost: 150000,
          totalCost: 165000
        }
      };

      req.body = bookingData;
      
      const savedBooking = {
        _id: 'booking123',
        ...bookingData,
        user: 'testUserId',
        userId: 'testUserId',
        status: 'Pending'
      };

      const mockBookingInstance = {
        save: jest.fn().mockResolvedValue(savedBooking)
      };

      Booking.mockImplementation(() => mockBookingInstance);

      await bookingController.createBooking(req, res);

      expect(Booking).toHaveBeenCalledWith({
        ...bookingData,
        user: 'testUserId'
      });
      expect(mockBookingInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(savedBooking);
    });

    it('should handle booking creation errors', async () => {
      const error = new Error('Validation failed');
      const mockBookingInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Booking.mockImplementation(() => mockBookingInstance);

      await bookingController.createBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle missing required fields', async () => {
      req.body = {}; // Empty body
      
      const error = new Error('Package information is required');
      const mockBookingInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Booking.mockImplementation(() => mockBookingInstance);

      await bookingController.createBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('getBookings', () => {
    it('should return all bookings with populated user info', async () => {
      const mockBookings = [
        {
          _id: 'booking1',
          package: { packageTitle: 'Package 1' },
          user: { name: 'John Doe', email: 'john@example.com' }
        },
        {
          _id: 'booking2',
          package: { packageTitle: 'Package 2' },
          user: { name: 'Jane Smith', email: 'jane@example.com' }
        }
      ];

      const mockQuery = {
        populate: jest.fn().mockResolvedValue(mockBookings)
      };

      Booking.find.mockReturnValue(mockQuery);

      await bookingController.getBookings(req, res);

      expect(Booking.find).toHaveBeenCalledWith();
      expect(mockQuery.populate).toHaveBeenCalledWith('user', 'name email');
      expect(res.json).toHaveBeenCalledWith(mockBookings);
    });

    it('should handle database errors', async () => {
      const error = new Error('Database connection failed');
      const mockQuery = {
        populate: jest.fn().mockRejectedValue(error)
      };

      Booking.find.mockReturnValue(mockQuery);

      await bookingController.getBookings(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should return empty array when no bookings exist', async () => {
      const mockQuery = {
        populate: jest.fn().mockResolvedValue([])
      };

      Booking.find.mockReturnValue(mockQuery);

      await bookingController.getBookings(req, res);

      expect(res.json).toHaveBeenCalledWith([]);
    });
  });

  describe('updateBooking', () => {
    beforeEach(() => {
      req.params.id = 'booking123';
      req.body = { status: 'Confirmed' };
    });

    it('should update booking successfully', async () => {
      const updatedBooking = {
        _id: 'booking123',
        status: 'Confirmed',
        package: { packageTitle: 'Test Package' }
      };

      Booking.findByIdAndUpdate.mockResolvedValue(updatedBooking);

      await bookingController.updateBooking(req, res);

      expect(Booking.findByIdAndUpdate).toHaveBeenCalledWith(
        'booking123',
        { status: 'Confirmed' },
        { new: true }
      );
      expect(res.json).toHaveBeenCalledWith(updatedBooking);
    });

    it('should handle update errors', async () => {
      const error = new Error('Update failed');
      Booking.findByIdAndUpdate.mockRejectedValue(error);

      await bookingController.updateBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle invalid booking ID', async () => {
      const error = new Error('Cast to ObjectId failed');
      Booking.findByIdAndUpdate.mockRejectedValue(error);

      await bookingController.updateBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('getUserBookings', () => {
    it('should return bookings for the authenticated user', async () => {
      const userBookings = [
        {
          _id: 'booking1',
          userId: 'testUserId',
          package: { packageTitle: 'User Package 1' },
          status: 'Confirmed'
        },
        {
          _id: 'booking2',
          userId: 'testUserId',
          package: { packageTitle: 'User Package 2' },
          status: 'Pending'
        }
      ];

      Booking.find.mockResolvedValue(userBookings);

      await bookingController.getUserBookings(req, res);

      expect(Booking.find).toHaveBeenCalledWith({ userId: 'testUserId' });
      expect(res.json).toHaveBeenCalledWith(userBookings);
    });

    it('should return empty array when user has no bookings', async () => {
      Booking.find.mockResolvedValue([]);

      await bookingController.getUserBookings(req, res);

      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should handle database errors', async () => {
      const error = new Error('Database error');
      Booking.find.mockRejectedValue(error);

      await bookingController.getUserBookings(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle missing user ID', async () => {
      req.user._id = undefined;
      
      await bookingController.getUserBookings(req, res);

      expect(Booking.find).toHaveBeenCalledWith({ userId: undefined });
    });
  });

  describe('getBookingById', () => {
    beforeEach(() => {
      req.params.id = 'booking123';
    });

    it('should return booking by id when found', async () => {
      const booking = {
        _id: 'booking123',
        package: {
          packageTitle: 'Test Package',
          destination: 'Paris'
        },
        status: 'Confirmed',
        userId: 'testUserId'
      };

      Booking.findById.mockResolvedValue(booking);

      await bookingController.getBookingById(req, res);

      expect(Booking.findById).toHaveBeenCalledWith('booking123');
      expect(res.json).toHaveBeenCalledWith(booking);
    });

    it('should return 404 when booking not found', async () => {
      Booking.findById.mockResolvedValue(null);

      await bookingController.getBookingById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Booking not found' });
    });

    it('should handle database errors', async () => {
      const error = new Error('Database error');
      Booking.findById.mockRejectedValue(error);

      await bookingController.getBookingById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle invalid ObjectId format', async () => {
      const error = new Error('Cast to ObjectId failed');
      Booking.findById.mockRejectedValue(error);

      await bookingController.getBookingById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('deleteBooking', () => {
    beforeEach(() => {
      req.params.id = 'booking123';
    });

    it('should delete booking successfully', async () => {
      Booking.findByIdAndDelete.mockResolvedValue({
        _id: 'booking123',
        status: 'Cancelled'
      });

      await bookingController.deleteBooking(req, res);

      expect(Booking.findByIdAndDelete).toHaveBeenCalledWith('booking123');
      expect(res.json).toHaveBeenCalledWith({ message: 'Booking deleted' });
    });

    it('should handle deletion errors', async () => {
      const error = new Error('Delete failed');
      Booking.findByIdAndDelete.mockRejectedValue(error);

      await bookingController.deleteBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle invalid booking ID', async () => {
      const error = new Error('Cast to ObjectId failed');
      Booking.findByIdAndDelete.mockRejectedValue(error);

      await bookingController.deleteBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should succeed even when booking does not exist', async () => {
      Booking.findByIdAndDelete.mockResolvedValue(null);

      await bookingController.deleteBooking(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Booking deleted' });
    });
  });
});
