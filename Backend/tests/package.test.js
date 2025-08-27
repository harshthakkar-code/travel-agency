// tests/packageController.unit.test.js
const httpMocks = require('node-mocks-http');
const Package = require('../models/Package');
const packageController = require('../controllers/packageController'); // adjust path if needed

jest.mock('../models/Package');

describe('Package Controller - unit', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPackage', () => {
    it('creates package successfully when no program provided', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { title: 'Trip', status: 'Active' },
      });
      const res = httpMocks.createResponse();

      // Mock "new Package(req.body).save()"
      Package.mockImplementation(function (body) {
        return {
          ...body,
          save: jest.fn().mockResolvedValue({ _id: 'p1', ...body }),
        };
      });

      await packageController.createPackage(req, res);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({ _id: 'p1', title: 'Trip', status: 'Active' });
    });

    it('rejects invalid program array (missing activities array)', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: {
          title: 'Trip',
          program: [{ city: 'Goa', activities: 'not-an-array' }],
        },
      });
      const res = httpMocks.createResponse();

      await packageController.createPackage(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({
        message: 'Invalid program structure. Each city must have a name and activities array.',
      });
    });

    it('rejects program where a city ends up with zero activities after filtering', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: {
          title: 'Trip',
          program: [{ city: 'Goa', activities: ['', '  '] }],
        },
      });
      const res = httpMocks.createResponse();

      await packageController.createPackage(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({
        message: 'City "Goa" must have at least one activity.',
      });
    });

    it('accepts program with activities (filters empties)', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: {
          title: 'Trip',
          program: [{ city: 'Goa', activities: ['Beach', '', '  ', 'Cruise'] }],
        },
      });
      const res = httpMocks.createResponse();

      Package.mockImplementation(function (body) {
        return {
          ...body,
          save: jest.fn().mockResolvedValue({
            _id: 'p2',
            ...body,
            program: [{ city: 'Goa', activities: ['Beach', 'Cruise'] }],
          }),
        };
      });

      await packageController.createPackage(req, res);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({
        _id: 'p2',
        title: 'Trip',
        program: [{ city: 'Goa', activities: ['Beach', 'Cruise'] }],
      });
    });

    it('returns 400 on save error', async () => {
      const req = httpMocks.createRequest({ method: 'POST', body: { title: 'Trip' } });
      const res = httpMocks.createResponse();

      Package.mockImplementation(function () {
        return {
          save: jest.fn().mockRejectedValue(new Error('Save failed')),
        };
      });

      await packageController.createPackage(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ message: 'Save failed' });
    });
  });

  describe('getPackages (paginated)', () => {
    it('returns filtered and paginated packages', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        query: { status: 'Active', page: '1', limit: '2' },
      });
      const res = httpMocks.createResponse();

      Package.countDocuments.mockResolvedValue(3);
      // Chainable Mongoose query mock
      const chain = {
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([{ _id: 'a' }, { _id: 'b' }]),
      };
      Package.find.mockReturnValue(chain);

      await packageController.getPackages(req, res);

      expect(Package.countDocuments).toHaveBeenCalledWith({ status: 'Active' });
      expect(Package.find).toHaveBeenCalledWith({ status: 'Active' });
      expect(chain.skip).toHaveBeenCalledWith(0); // (page 1 - 1) * 2
      expect(chain.limit).toHaveBeenCalledWith(2);
      expect(chain.sort).toHaveBeenCalledWith({ createdAt: -1 });

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({
        packages: [{ _id: 'a' }, { _id: 'b' }],
        totalPages: Math.ceil(3 / 2),
        currentPage: 1,
      });
    });

    it('returns 500 on error', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        query: { page: '1', limit: '2' },
      });
      const res = httpMocks.createResponse();

      Package.countDocuments.mockRejectedValue(new Error('DB error'));

      await packageController.getPackages(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ message: 'DB error' });
    });
  });

  describe('getPackageById', () => {
    it('returns a package when found', async () => {
      const req = httpMocks.createRequest({ method: 'GET', params: { id: 'p1' } });
      const res = httpMocks.createResponse();

      Package.findById.mockResolvedValue({ _id: 'p1', title: 'Trip' });

      await packageController.getPackageById(req, res);

      expect(Package.findById).toHaveBeenCalledWith('p1');
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ _id: 'p1', title: 'Trip' });
    });

    it('returns 404 when not found', async () => {
      const req = httpMocks.createRequest({ method: 'GET', params: { id: 'missing' } });
      const res = httpMocks.createResponse();

      Package.findById.mockResolvedValue(null);

      await packageController.getPackageById(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: 'Package not found' });
    });

    it('returns 500 on error', async () => {
      const req = httpMocks.createRequest({ method: 'GET', params: { id: 'p1' } });
      const res = httpMocks.createResponse();

      Package.findById.mockRejectedValue(new Error('DB error'));

      await packageController.getPackageById(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ message: 'DB error' });
    });
  });

  describe('updatePackage', () => {
    it('updates package and returns updated object', async () => {
      const req = httpMocks.createRequest({
        method: 'PUT',
        params: { id: 'p1' },
        body: { title: 'Updated' },
      });
      const res = httpMocks.createResponse();

      Package.findByIdAndUpdate.mockResolvedValue({ _id: 'p1', title: 'Updated' });

      await packageController.updatePackage(req, res);

      expect(Package.findByIdAndUpdate).toHaveBeenCalledWith('p1', { title: 'Updated' }, { new: true });
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ _id: 'p1', title: 'Updated' });
    });

    it('returns 400 on update error', async () => {
      const req = httpMocks.createRequest({
        method: 'PUT',
        params: { id: 'p1' },
        body: { title: 'Updated' },
      });
      const res = httpMocks.createResponse();

      Package.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'));

      await packageController.updatePackage(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ message: 'Update failed' });
    });
  });

  describe('deletePackage', () => {
    it('deletes package and returns success message', async () => {
      const req = httpMocks.createRequest({ method: 'DELETE', params: { id: 'p1' } });
      const res = httpMocks.createResponse();

      Package.findByIdAndDelete.mockResolvedValue({ _id: 'p1' });

      await packageController.deletePackage(req, res);

      expect(Package.findByIdAndDelete).toHaveBeenCalledWith('p1');
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ message: 'Package deleted' });
    });

    it('returns 400 on delete error', async () => {
      const req = httpMocks.createRequest({ method: 'DELETE', params: { id: 'p1' } });
      const res = httpMocks.createResponse();

      Package.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'));

      await packageController.deletePackage(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ message: 'Delete failed' });
    });
  });

  describe('uploadImage', () => {
    it('returns 400 when no file uploaded', () => {
      const req = httpMocks.createRequest({ method: 'POST' });
      const res = httpMocks.createResponse();

      packageController.uploadImage(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ message: 'No file uploaded' });
    });

    it('returns imageUrl when file present', () => {
      const req = httpMocks.createRequest({
        method: 'POST',
      });
      req.file = { location: 'http://example.com/image.jpg' };
      const res = httpMocks.createResponse();

      packageController.uploadImage(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ imageUrl: 'http://example.com/image.jpg' });
    });
  });
});
