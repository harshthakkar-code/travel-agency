const request = require('supertest');
const app = require('../app');
const Booking = require('../models/Booking');

// Mock Booking model methods
jest.mock('../models/Booking');

// Mock auth middleware to bypass auth checks for testing
jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    // Mock user info in request for protected routes
    req.user = { _id: 'user1' };
    next();
  },
}));

describe('Booking API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/bookings', () => {
    it('should create a new booking and return it', async () => {
      const bookingData = { package: { packageId: 'pkg1' }, userId: 'user1' };
      const savedBooking = { _id: '1', ...bookingData, user: 'user1' };

      Booking.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(savedBooking),
      }));

      const res = await request(app).post('/api/bookings').send(bookingData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(savedBooking);
    });

    it('should return 400 on booking save error', async () => {
      Booking.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Save failed')),
      }));

      const res = await request(app).post('/api/bookings').send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Save failed');
    });
  });

  describe('GET /api/bookings', () => {
    it('should return all bookings with populated user info', async () => {
      const bookings = [{ _id: '1', user: { name: 'John', email: 'john@example.com' } }];
      Booking.find.mockReturnValue({ populate: jest.fn().mockResolvedValue(bookings) });

      const res = await request(app).get('/api/bookings');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(bookings);
    });

    it('should return 500 on error', async () => {
      Booking.find.mockReturnValue({ populate: jest.fn().mockRejectedValue(new Error('DB error')) });

      const res = await request(app).get('/api/bookings');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('GET /api/bookings/:id (getUserBookings)', () => {
    it('should return bookings for the logged-in user', async () => {
      const userBookings = [{ _id: '1', userId: 'user1' }];
      Booking.find.mockResolvedValue(userBookings);

      const res = await request(app).get('/api/bookings/user1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(userBookings);
      expect(Booking.find).toHaveBeenCalledWith({ userId: 'user1' });
    });

    it('should return 500 on error', async () => {
      Booking.find.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/api/bookings/user1');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('GET /api/bookings/booking/:id (getBookingById)', () => {
    it('should return booking by id if found', async () => {
      const booking = { _id: '1', package: { packageId: 'pkg1' } };
      Booking.findById.mockResolvedValue(booking);

      const res = await request(app).get('/api/bookings/booking/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(booking);
    });

    it('should return 404 if booking not found', async () => {
      Booking.findById.mockResolvedValue(null);

      const res = await request(app).get('/api/bookings/booking/1');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Booking not found');
    });

    it('should return 500 on error', async () => {
      Booking.findById.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/api/bookings/booking/1');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('PUT /api/bookings/:id', () => {
    it('should update and return the booking', async () => {
      const updatedBooking = { _id: '1', status: 'Confirmed' };
      Booking.findByIdAndUpdate.mockResolvedValue(updatedBooking);

      const res = await request(app).put('/api/bookings/1').send({ status: 'Confirmed' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedBooking);
    });

    it('should return 400 on update error', async () => {
      Booking.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'));

      const res = await request(app).put('/api/bookings/1').send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Update failed');
    });
  });

  describe('DELETE /api/bookings/:id', () => {
    it('should delete the booking and return success message', async () => {
      Booking.findByIdAndDelete.mockResolvedValue();

      const res = await request(app).delete('/api/bookings/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Booking deleted');
    });

    it('should return 400 on delete error', async () => {
      Booking.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'));

      const res = await request(app).delete('/api/bookings/1');

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Delete failed');
    });
  });
});
