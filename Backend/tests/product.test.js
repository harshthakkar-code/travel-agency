const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');

// Mock Product model methods
jest.mock('../models/Product');

// Mock auth and admin middlewares for test
jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { _id: 'user1', role: 'admin' };
    next();
  },
}));
jest.mock('../middleware/adminMiddleware', () => ({
  adminOnly: (req, res, next) => next(),
}));

describe('Product API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const products = [{ title: 'Product 1' }, { title: 'Product 2' }];
      Product.find.mockResolvedValue(products);

      const res = await request(app).get('/api/products');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(products);
    });

    it('should return 500 on error', async () => {
      Product.find.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/api/products');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return product by id', async () => {
      const product = { _id: '1', title: 'Product 1' };
      Product.findById.mockResolvedValue(product);

      const res = await request(app).get('/api/products/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(product);
    });

    it('should return 404 if product not found', async () => {
      Product.findById.mockResolvedValue(null);

      const res = await request(app).get('/api/products/invalid');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Product not found');
    });

    it('should return 500 on error', async () => {
      Product.findById.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/api/products/1');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const productData = { title: 'New Product', price: 100 };
      Product.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(productData),
      }));

      const res = await request(app)
        .post('/api/products')
        .send(productData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(productData);
    });

    it('should return 400 on save error', async () => {
      Product.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Save failed')),
      }));

      const res = await request(app)
        .post('/api/products')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Save failed');
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update product and return updated object', async () => {
      const updatedProduct = { _id: '1', title: 'Updated Product', price: 150 };
      Product.findByIdAndUpdate.mockResolvedValue(updatedProduct);

      const res = await request(app)
        .put('/api/products/1')
        .send({ title: 'Updated Product', price: 150 });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedProduct);
    });

    it('should return 400 on update error', async () => {
      Product.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'));

      const res = await request(app).put('/api/products/1').send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Update failed');
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete product and return success message', async () => {
      Product.findByIdAndDelete.mockResolvedValue();

      const res = await request(app).delete('/api/products/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Product deleted');
    });

    it('should return 400 on delete error', async () => {
      Product.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'));

      const res = await request(app).delete('/api/products/1');

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Delete failed');
    });
  });
});
