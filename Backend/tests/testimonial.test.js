const request = require('supertest');
const app = require('../app');
const Testimonial = require('../models/Testimonial');

// Mock Testimonial model methods
jest.mock('../models/Testimonial');

// Mock auth and admin middlewares for testing
jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { _id: 'user1', role: 'admin' }; // simulate admin user
    next();
  },
}));

jest.mock('../middleware/adminMiddleware', () => ({
  adminOnly: (req, res, next) => next(),
}));

describe('Testimonial API', () => {
  afterEach(() => {
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
      const testimonialData = { name: 'John', message: 'Excellent!', role: 'Customer' };
      Testimonial.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(testimonialData),
      }));

      const res = await request(app)
        .post('/api/testimonials')
        .send(testimonialData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(testimonialData);
    });

    it('should return 400 on save error', async () => {
      Testimonial.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Save failed')),
      }));

      const res = await request(app)
        .post('/api/testimonials')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Save failed');
    });
  });

  describe('PUT /api/testimonials/:id', () => {
    it('should update testimonial and return updated', async () => {
      const updatedTestimonial = { _id: 't1', name: 'John', message: 'Updated!' };
      Testimonial.findByIdAndUpdate.mockResolvedValue(updatedTestimonial);

      const res = await request(app)
        .put('/api/testimonials/t1')
        .send({ message: 'Updated!' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedTestimonial);
    });

    it('should return 400 on update error', async () => {
      Testimonial.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'));

      const res = await request(app).put('/api/testimonials/t1').send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Update failed');
    });
  });

  describe('DELETE /api/testimonials/:id', () => {
    it('should delete testimonial and return success message', async () => {
      Testimonial.findByIdAndDelete.mockResolvedValue();

      const res = await request(app).delete('/api/testimonials/t1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Testimonial deleted');
    });

    it('should return 400 on delete error', async () => {
      Testimonial.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'));

      const res = await request(app).delete('/api/testimonials/t1');

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Delete failed');
    });
  });
});
