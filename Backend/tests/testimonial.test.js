const request = require('supertest');

// Mock Firebase authentication middleware first
jest.mock('../middleware/firebaseAuth', () => ({
  authenticateToken: (req, res, next) => {
    req.user = { uid: 'user1', role: 'admin' }; // simulate authenticated admin user
    next();
  },
}));

jest.mock('../middleware/adminMiddleware', () => ({
  adminOnly: (req, res, next) => {
    // Simulate admin check passed
    next();
  },
}));

// Mock the Testimonial model properly with correct naming
jest.mock('../models/Testimonial', () => {
  const mockSave = jest.fn();
  const mockFind = jest.fn();
  const mockFindByIdAndUpdate = jest.fn();
  const mockFindByIdAndDelete = jest.fn();

  // Create the mock constructor
  const mockTestimonialConstructor = jest.fn().mockImplementation((data) => ({
    ...data,
    save: mockSave,
  }));

  // Add static methods to the constructor
  mockTestimonialConstructor.find = mockFind;
  mockTestimonialConstructor.findByIdAndUpdate = mockFindByIdAndUpdate;
  mockTestimonialConstructor.findByIdAndDelete = mockFindByIdAndDelete;

  return mockTestimonialConstructor;
});

// Import after mocking
const app = require('../app');
const Testimonial = require('../models/Testimonial');

describe('Testimonial API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/testimonials', () => {
    it('should get all testimonials', async () => {
      const testimonials = [
        { _id: 't1', name: 'John', message: 'Great service!' },
        { _id: 't2', name: 'Jane', message: 'Wonderful experience!' },
      ];

      Testimonial.find.mockResolvedValue(testimonials);

      const res = await request(app).get('/api/testimonials');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(testimonials);
      expect(Testimonial.find).toHaveBeenCalledTimes(1);
    });

    it('should return 500 on error', async () => {
      Testimonial.find.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/api/testimonials');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('POST /api/testimonials', () => {
    it('should create a new testimonial', async () => {
      const testimonialData = { 
        _id: 't1',
        name: 'John', 
        message: 'Excellent!', 
        role: 'Customer' 
      };

      // Mock the save method to return the testimonial data
      const mockTestimonialInstance = {
        save: jest.fn().mockResolvedValue(testimonialData),
      };

      Testimonial.mockImplementation(() => mockTestimonialInstance);

      const res = await request(app)
        .post('/api/testimonials')
        .send({ name: 'John', message: 'Excellent!', role: 'Customer' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(testimonialData);
      expect(Testimonial).toHaveBeenCalledWith({
        name: 'John',
        message: 'Excellent!',
        role: 'Customer'
      });
      expect(mockTestimonialInstance.save).toHaveBeenCalledTimes(1);
    });

    it('should return 400 on validation error', async () => {
      const mockTestimonialInstance = {
        save: jest.fn().mockRejectedValue(new Error('Validation failed')),
      };

      Testimonial.mockImplementation(() => mockTestimonialInstance);

      const res = await request(app)
        .post('/api/testimonials')
        .send({ name: 'John', message: 'Excellent!', role: 'Customer' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Validation failed');
    });

    it('should return 400 on save error', async () => {
      const mockTestimonialInstance = {
        save: jest.fn().mockRejectedValue(new Error('Save failed')),
      };

      Testimonial.mockImplementation(() => mockTestimonialInstance);

      const res = await request(app)
        .post('/api/testimonials')
        .send({ name: 'John', message: 'Excellent!', role: 'Customer' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Save failed');
    });
  });

  describe('PUT /api/testimonials/:id', () => {
    it('should update testimonial and return updated', async () => {
      const updatedTestimonial = { 
        _id: 't1', 
        name: 'John', 
        message: 'Updated!',
        role: 'Customer'
      };

      Testimonial.findByIdAndUpdate.mockResolvedValue(updatedTestimonial);

      const res = await request(app)
        .put('/api/testimonials/t1')
        .send({ message: 'Updated!' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedTestimonial);
      expect(Testimonial.findByIdAndUpdate).toHaveBeenCalledWith(
        't1',
        { message: 'Updated!' },
        { new: true }
      );
    });

    it('should return 400 on update error', async () => {
      Testimonial.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'));

      const res = await request(app)
        .put('/api/testimonials/t1')
        .send({ message: 'Updated!' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Update failed');
    });

    it('should return 200 when testimonial not found', async () => {
      Testimonial.findByIdAndUpdate.mockResolvedValue(null);

      const res = await request(app)
        .put('/api/testimonials/nonexistent')
        .send({ message: 'Updated!' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toBe(null);
    });
  });

  describe('DELETE /api/testimonials/:id', () => {
    it('should delete testimonial and return success message', async () => {
      Testimonial.findByIdAndDelete.mockResolvedValue({
        _id: 't1',
        name: 'John',
        message: 'Great service!'
      });

      const res = await request(app).delete('/api/testimonials/t1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Testimonial deleted');
      expect(Testimonial.findByIdAndDelete).toHaveBeenCalledWith('t1');
    });

    it('should return 400 on delete error', async () => {
      Testimonial.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'));

      const res = await request(app).delete('/api/testimonials/t1');

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Delete failed');
    });

    it('should handle deletion of non-existent testimonial', async () => {
      Testimonial.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app).delete('/api/testimonials/nonexistent');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Testimonial deleted');
    });
  });
});
