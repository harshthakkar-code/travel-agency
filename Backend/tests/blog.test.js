const request = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');

// Mock Blog model methods
jest.mock('../models/Blog');

// Mock auth middleware to bypass auth checks for testing
jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => next(),
}));
jest.mock('../middleware/adminMiddleware', () => ({
  adminOnly: (req, res, next) => next(),
}));

describe('Blog API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/blogs', () => {
    it('should return all blogs', async () => {
      const blogs = [{ title: 'Blog 1' }, { title: 'Blog 2' }];
      Blog.find.mockResolvedValue(blogs);

      const res = await request(app).get('/api/blogs');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(blogs);
    });

    it('should return 500 on error', async () => {
      Blog.find.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/api/blogs');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('GET /api/blogs/:id', () => {
    it('should return blog by id', async () => {
      const blog = { _id: '1', title: 'Blog 1' };
      Blog.findById.mockResolvedValue(blog);

      const res = await request(app).get('/api/blogs/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(blog);
    });

    it('should return 404 if blog not found', async () => {
      Blog.findById.mockResolvedValue(null);

      const res = await request(app).get('/api/blogs/1');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Blog not found');
    });

    it('should return 500 on error', async () => {
      Blog.findById.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/api/blogs/1');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('POST /api/blogs', () => {
    it('should create a new blog and return it', async () => {
      const blogData = { title: 'New Blog', content: 'Content' };
      const savedBlog = { _id: '1', ...blogData };
      // Mock new Blog instance and save method
      Blog.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(savedBlog),
      }));

      const res = await request(app).post('/api/blogs').send(blogData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(savedBlog);
    });

    it('should return 400 on validation or save error', async () => {
      Blog.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Validation error')),
      }));

      const res = await request(app).post('/api/blogs').send({ title: '' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Validation error');
    });
  });

  describe('PUT /api/blogs/:id', () => {
    it('should update and return the blog', async () => {
      const updatedBlog = { _id: '1', title: 'Updated Blog' };
      Blog.findByIdAndUpdate.mockResolvedValue(updatedBlog);

      const res = await request(app).put('/api/blogs/1').send({ title: 'Updated Blog' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedBlog);
    });

    it('should return 400 on update error', async () => {
      Blog.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'));

      const res = await request(app).put('/api/blogs/1').send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Update failed');
    });
  });

  describe('DELETE /api/blogs/:id', () => {
    it('should delete the blog and return success message', async () => {
      Blog.findByIdAndDelete.mockResolvedValue();

      const res = await request(app).delete('/api/blogs/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Blog deleted');
    });

    it('should return 400 on delete error', async () => {
      Blog.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'));

      const res = await request(app).delete('/api/blogs/1');

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Delete failed');
    });
  });
});
