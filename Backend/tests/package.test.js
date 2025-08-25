const request = require('supertest');
const app = require('../app');
const Package = require('../models/Package');

// Mock Package model
jest.mock('../models/Package');

// Mock middlewares (auth & admin) to bypass security for testing
jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { _id: 'user1', role: 'admin' }; // simulate admin user
    next();
  },
}));
jest.mock('../middleware/adminMiddleware', () => ({
  adminOnly: (req, res, next) => next(),
}));

// Mock upload middleware (for image upload route)
jest.mock('../middleware/uploadImage', () => ({
  single: () => (req, res, next) => {
    // Mock an uploaded file object
    req.file = { location: 'http://example.com/image.jpg' };
    next();
  },
}));

describe('Package API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/packages', () => {
    it('should create a new package', async () => {
      const pkgData = { title: 'Package 1' };
      Package.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(pkgData),
      }));

      const res = await request(app)
        .post('/api/packages')
        .send(pkgData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(pkgData);
    });

    it('should return 400 on save error', async () => {
      Package.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Save failed')),
      }));

      const res = await request(app)
        .post('/api/packages')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Save failed');
    });
  });

  describe('GET /api/packages', () => {
    it('should return paginated packages filtered by status', async () => {
      const pkgs = [{ title: 'Package 1' }, { title: 'Package 2' }];
      Package.countDocuments.mockResolvedValue(2);
      const mockFind = {
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(pkgs),
      };
      Package.find.mockReturnValue(mockFind);

      const res = await request(app).get('/api/packages?status=Active&page=1&limit=2');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        packages: pkgs,
        totalPages: 1,
        currentPage: 1,
      });
      expect(Package.find).toHaveBeenCalledWith({ status: 'Active' });
      expect(Package.countDocuments).toHaveBeenCalledWith({ status: 'Active' });
    });

    it('should return 500 on error', async () => {
      Package.countDocuments.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/api/packages');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('GET /api/packages/:id', () => {
    it('should return single package by id', async () => {
      const pkg = { _id: '1', title: 'Package 1' };
      Package.findById.mockResolvedValue(pkg);

      const res = await request(app).get('/api/packages/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(pkg);
    });

    it('should return 404 if package not found', async () => {
      Package.findById.mockResolvedValue(null);

      const res = await request(app).get('/api/packages/invalid');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Package not found');
    });

    it('should return 500 on error', async () => {
      Package.findById.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/api/packages/1');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('PUT /api/packages/:id', () => {
    it('should update package and return updated object', async () => {
      const updatedPkg = { _id: '1', title: 'Updated Package' };
      Package.findByIdAndUpdate.mockResolvedValue(updatedPkg);

      const res = await request(app)
        .put('/api/packages/1')
        .send({ title: 'Updated Package' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedPkg);
    });

    it('should return 400 on update error', async () => {
      Package.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'));

      const res = await request(app).put('/api/packages/1').send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Update failed');
    });
  });

  describe('DELETE /api/packages/:id', () => {
    it('should delete package and return success message', async () => {
      Package.findByIdAndDelete.mockResolvedValue();

      const res = await request(app).delete('/api/packages/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Package deleted');
    });

    it('should return 400 on delete error', async () => {
      Package.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'));

      const res = await request(app).delete('/api/packages/1');

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Delete failed');
    });
  });

  describe('POST /api/packages/upload-image', () => {
    it('should upload an image and return URL', async () => {
      const res = await request(app)
        .post('/api/packages/upload-image')
        .attach('image', Buffer.from('some image content'), 'image.jpg');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('imageUrl', 'http://example.com/image.jpg');
    });

    it('should return 400 if no file uploaded', async () => {
  let server;
  let uploadModule;

  await jest.isolateModulesAsync(async () => {
    // Mock upload middleware to simulate missing file
    jest.resetModules();
    jest.mock('../middleware/uploadImage', () => ({
      single: () => (req, res, next) => {
        req.file = undefined; // no file uploaded
        next();
      },
    }));

    uploadModule = require('../middleware/uploadImage');
    server = require('../app'); // re-import app after mock applied

    const supertest = require('supertest');
    const res = await supertest(server).post('/api/packages/upload-image');

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'No file uploaded');
  });
});

  });

});
