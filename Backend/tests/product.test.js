const productController = require('../controllers/productController');
const Product = require('../models/Product');

// Mock dependencies
jest.mock('../models/Product');

describe('Product Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      user: {
        _id: 'adminUserId',
        role: 'admin',
        name: 'Admin User',
        email: 'admin@example.com'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should return all products successfully', async () => {
      const mockProducts = [
        {
          _id: 'product1',
          title: 'Adventure Package 1',
          price: 299,
          description: 'Amazing adventure package',
          category: 'Adventure'
        },
        {
          _id: 'product2',
          title: 'Cultural Package 2',
          price: 199,
          description: 'Cultural experience package',
          category: 'Culture'
        }
      ];

      Product.find.mockResolvedValue(mockProducts);

      await productController.getProducts(req, res);

      expect(Product.find).toHaveBeenCalledWith();
      expect(res.json).toHaveBeenCalledWith(mockProducts);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return empty array when no products exist', async () => {
      Product.find.mockResolvedValue([]);

      await productController.getProducts(req, res);

      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should handle database connection errors', async () => {
      const error = new Error('Database connection failed');
      Product.find.mockRejectedValue(error);

      await productController.getProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle network timeout errors', async () => {
      const error = new Error('Network timeout');
      Product.find.mockRejectedValue(error);

      await productController.getProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Network timeout' });
    });

    it('should handle query parsing errors', async () => {
      const error = new Error('Query parsing failed');
      Product.find.mockRejectedValue(error);

      await productController.getProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Query parsing failed' });
    });
  });

  describe('getProductById', () => {
    beforeEach(() => {
      req.params.id = 'product123';
    });

    it('should return product when found', async () => {
      const mockProduct = {
        _id: 'product123',
        title: 'Test Product',
        price: 299,
        description: 'Test Description',
        category: 'Adventure',
        images: ['image1.jpg', 'image2.jpg'],
        features: ['feature1', 'feature2']
      };

      Product.findById.mockResolvedValue(mockProduct);

      await productController.getProductById(req, res);

      expect(Product.findById).toHaveBeenCalledWith('product123');
      expect(res.json).toHaveBeenCalledWith(mockProduct);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 404 when product not found', async () => {
      Product.findById.mockResolvedValue(null);

      await productController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
    });

    it('should handle database errors', async () => {
      const error = new Error('Database error');
      Product.findById.mockRejectedValue(error);

      await productController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle invalid ObjectId format', async () => {
      const error = new Error('Cast to ObjectId failed');
      Product.findById.mockRejectedValue(error);

      await productController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle empty product ID', async () => {
      req.params.id = '';
      
      const error = new Error('Cast to ObjectId failed for value ""');
      Product.findById.mockRejectedValue(error);

      await productController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle undefined product ID', async () => {
      req.params.id = undefined;
      
      const error = new Error('Cast to ObjectId failed for value "undefined"');
      Product.findById.mockRejectedValue(error);

      await productController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('createProduct', () => {
    beforeEach(() => {
      req.body = {
        title: 'New Adventure Package',
        price: 399,
        description: 'Amazing new adventure package',
        category: 'Adventure',
        duration: '5 days',
        location: 'Nepal'
      };
    });

    it('should create a new product successfully', async () => {
      const savedProduct = {
        _id: 'newProduct123',
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const mockProductInstance = {
        save: jest.fn().mockResolvedValue(savedProduct)
      };

      Product.mockImplementation(() => mockProductInstance);

      await productController.createProduct(req, res);

      expect(Product).toHaveBeenCalledWith(req.body);
      expect(mockProductInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(savedProduct);
    });

    it('should handle validation errors', async () => {
      const error = new Error('Product validation failed: title: Path `title` is required.');
      const mockProductInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Product.mockImplementation(() => mockProductInstance);

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle missing required fields', async () => {
      req.body = { description: 'Product without title' };
      
      const error = new Error('Product validation failed: title: Path `title` is required.');
      const mockProductInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Product.mockImplementation(() => mockProductInstance);

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle duplicate title errors', async () => {
      const error = new Error('Product with this title already exists');
      const mockProductInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Product.mockImplementation(() => mockProductInstance);

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle database save errors', async () => {
      const error = new Error('Database connection failed during save');
      const mockProductInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Product.mockImplementation(() => mockProductInstance);

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should create product with minimal required fields', async () => {
      req.body = { title: 'Minimal Product', price: 99 };
      
      const savedProduct = {
        _id: 'minimalProduct123',
        ...req.body
      };

      const mockProductInstance = {
        save: jest.fn().mockResolvedValue(savedProduct)
      };

      Product.mockImplementation(() => mockProductInstance);

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(savedProduct);
    });

    it('should handle empty request body', async () => {
      req.body = {};
      
      const error = new Error('Validation failed: Required fields missing');
      const mockProductInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Product.mockImplementation(() => mockProductInstance);

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('updateProduct', () => {
    beforeEach(() => {
      req.params.id = 'product123';
      req.body = {
        title: 'Updated Product Title',
        price: 499,
        description: 'Updated description'
      };
    });

    it('should update product successfully', async () => {
      const updatedProduct = {
        _id: 'product123',
        ...req.body,
        updatedAt: new Date()
      };

      Product.findByIdAndUpdate.mockResolvedValue(updatedProduct);

      await productController.updateProduct(req, res);

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
        'product123',
        req.body,
        { new: true }
      );
      expect(res.json).toHaveBeenCalledWith(updatedProduct);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should handle update errors', async () => {
      const error = new Error('Update operation failed');
      Product.findByIdAndUpdate.mockRejectedValue(error);

      await productController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle non-existent product update', async () => {
      Product.findByIdAndUpdate.mockResolvedValue(null);

      await productController.updateProduct(req, res);

      expect(res.json).toHaveBeenCalledWith(null);
    });

    it('should handle invalid ObjectId in update', async () => {
      const error = new Error('Cast to ObjectId failed');
      Product.findByIdAndUpdate.mockRejectedValue(error);

      await productController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle validation errors in update', async () => {
      const error = new Error('Validation failed: price must be a positive number');
      Product.findByIdAndUpdate.mockRejectedValue(error);

      await productController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle partial updates', async () => {
      req.body = { price: 299 }; // Only updating price
      
      const updatedProduct = {
        _id: 'product123',
        title: 'Original Title',
        price: 299,
        description: 'Original description'
      };

      Product.findByIdAndUpdate.mockResolvedValue(updatedProduct);

      await productController.updateProduct(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedProduct);
    });

    it('should handle database connection errors during update', async () => {
      const error = new Error('Database connection lost');
      Product.findByIdAndUpdate.mockRejectedValue(error);

      await productController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('deleteProduct', () => {
    beforeEach(() => {
      req.params.id = 'product123';
    });

    it('should delete product successfully', async () => {
      const deletedProduct = {
        _id: 'product123',
        title: 'Deleted Product'
      };

      Product.findByIdAndDelete.mockResolvedValue(deletedProduct);

      await productController.deleteProduct(req, res);

      expect(Product.findByIdAndDelete).toHaveBeenCalledWith('product123');
      expect(res.json).toHaveBeenCalledWith({ message: 'Product deleted' });
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should handle deletion errors', async () => {
      const error = new Error('Delete operation failed');
      Product.findByIdAndDelete.mockRejectedValue(error);

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle invalid ObjectId in deletion', async () => {
      const error = new Error('Cast to ObjectId failed');
      Product.findByIdAndDelete.mockRejectedValue(error);

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should succeed even when product does not exist', async () => {
      Product.findByIdAndDelete.mockResolvedValue(null);

      await productController.deleteProduct(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Product deleted' });
    });

    it('should handle database connection errors during deletion', async () => {
      const error = new Error('Database connection lost');
      Product.findByIdAndDelete.mockRejectedValue(error);

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle missing product ID parameter', async () => {
      req.params.id = undefined;
      
      const error = new Error('Product ID is required');
      Product.findByIdAndDelete.mockRejectedValue(error);

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle empty string as product ID', async () => {
      req.params.id = '';
      
      const error = new Error('Cast to ObjectId failed for value ""');
      Product.findByIdAndDelete.mockRejectedValue(error);

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle foreign key constraints', async () => {
      const error = new Error('Cannot delete product with existing bookings');
      Product.findByIdAndDelete.mockRejectedValue(error);

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });
});
