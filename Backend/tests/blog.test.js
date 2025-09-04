const blogController = require('../controllers/blogController');
const Blog = require('../models/Blog');

// Mock dependencies
jest.mock('../models/Blog');

describe('Blog Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      user: {
        _id: 'testUserId',
        role: 'admin',
        name: 'Test Admin',
        email: 'admin@example.com'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  describe('getBlogs', () => {
    it('should return all blogs successfully', async () => {
      const mockBlogs = [
        {
          _id: 'blog1',
          title: 'First Blog',
          content: 'Content 1',
          author: 'Author 1',
          category: 'Tech'
        },
        {
          _id: 'blog2',
          title: 'Second Blog',
          content: 'Content 2',
          author: 'Author 2',
          category: 'Travel'
        }
      ];

      Blog.find.mockResolvedValue(mockBlogs);

      await blogController.getBlogs(req, res);

      expect(Blog.find).toHaveBeenCalledWith();
      expect(res.json).toHaveBeenCalledWith(mockBlogs);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return empty array when no blogs exist', async () => {
      Blog.find.mockResolvedValue([]);

      await blogController.getBlogs(req, res);

      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should handle database errors', async () => {
      const error = new Error('Database connection failed');
      Blog.find.mockRejectedValue(error);

      await blogController.getBlogs(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle network timeout errors', async () => {
      const error = new Error('Network timeout');
      Blog.find.mockRejectedValue(error);

      await blogController.getBlogs(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Network timeout' });
    });
  });

  describe('getBlogById', () => {
    beforeEach(() => {
      req.params.id = 'blog123';
    });

    it('should return blog when found', async () => {
      const mockBlog = {
        _id: 'blog123',
        title: 'Test Blog',
        content: 'Test Content',
        author: 'Test Author',
        category: 'Tech',
        tags: ['javascript', 'testing']
      };

      Blog.findById.mockResolvedValue(mockBlog);

      await blogController.getBlogById(req, res);

      expect(Blog.findById).toHaveBeenCalledWith('blog123');
      expect(res.json).toHaveBeenCalledWith(mockBlog);
    });

    it('should return 404 when blog not found', async () => {
      Blog.findById.mockResolvedValue(null);

      await blogController.getBlogById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Blog not found' });
    });

    it('should handle database errors', async () => {
      const error = new Error('Database error');
      Blog.findById.mockRejectedValue(error);

      await blogController.getBlogById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle invalid ObjectId format', async () => {
      const error = new Error('Cast to ObjectId failed');
      Blog.findById.mockRejectedValue(error);

      await blogController.getBlogById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('createBlog', () => {
    beforeEach(() => {
      req.body = {
        title: 'New Blog Post',
        content: 'This is the content of the new blog post',
        author: 'Test Author',
        category: 'Technology',
        tags: ['javascript', 'testing', 'development']
      };
    });

    it('should create a new blog successfully', async () => {
      const savedBlog = {
        _id: 'newBlog123',
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const mockBlogInstance = {
        save: jest.fn().mockResolvedValue(savedBlog)
      };

      Blog.mockImplementation(() => mockBlogInstance);

      await blogController.createBlog(req, res);

      expect(Blog).toHaveBeenCalledWith(req.body);
      expect(mockBlogInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(savedBlog);
    });

    it('should handle validation errors', async () => {
      const error = new Error('Title is required');
      const mockBlogInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Blog.mockImplementation(() => mockBlogInstance);

      await blogController.createBlog(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle missing required fields', async () => {
      req.body = { content: 'Content without title' };
      
      const error = new Error('Blog validation failed: title: Path `title` is required.');
      const mockBlogInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Blog.mockImplementation(() => mockBlogInstance);

      await blogController.createBlog(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle duplicate title errors', async () => {
      const error = new Error('Blog with this title already exists');
      const mockBlogInstance = {
        save: jest.fn().mockRejectedValue(error)
      };

      Blog.mockImplementation(() => mockBlogInstance);

      await blogController.createBlog(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('updateBlog', () => {
    beforeEach(() => {
      req.params.id = 'blog123';
      req.body = {
        title: 'Updated Blog Title',
        content: 'Updated content',
        category: 'Updated Category'
      };
    });

    it('should update blog successfully', async () => {
      const updatedBlog = {
        _id: 'blog123',
        ...req.body,
        updatedAt: new Date()
      };

      Blog.findByIdAndUpdate.mockResolvedValue(updatedBlog);

      await blogController.updateBlog(req, res);

      expect(Blog.findByIdAndUpdate).toHaveBeenCalledWith(
        'blog123',
        req.body,
        { new: true }
      );
      expect(res.json).toHaveBeenCalledWith(updatedBlog);
    });

    it('should handle update errors', async () => {
      const error = new Error('Update failed');
      Blog.findByIdAndUpdate.mockRejectedValue(error);

      await blogController.updateBlog(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle non-existent blog update', async () => {
      Blog.findByIdAndUpdate.mockResolvedValue(null);

      await blogController.updateBlog(req, res);

      expect(res.json).toHaveBeenCalledWith(null);
    });

    it('should handle invalid ObjectId in update', async () => {
      const error = new Error('Cast to ObjectId failed');
      Blog.findByIdAndUpdate.mockRejectedValue(error);

      await blogController.updateBlog(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle validation errors in update', async () => {
      const error = new Error('Validation failed: title cannot be empty');
      Blog.findByIdAndUpdate.mockRejectedValue(error);

      await blogController.updateBlog(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('deleteBlog', () => {
    beforeEach(() => {
      req.params.id = 'blog123';
    });

    it('should delete blog successfully', async () => {
      Blog.findByIdAndDelete.mockResolvedValue({
        _id: 'blog123',
        title: 'Deleted Blog'
      });

      await blogController.deleteBlog(req, res);

      expect(Blog.findByIdAndDelete).toHaveBeenCalledWith('blog123');
      expect(res.json).toHaveBeenCalledWith({ message: 'Blog deleted' });
    });

    it('should handle deletion errors', async () => {
      const error = new Error('Delete failed');
      Blog.findByIdAndDelete.mockRejectedValue(error);

      await blogController.deleteBlog(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle invalid ObjectId in deletion', async () => {
      const error = new Error('Cast to ObjectId failed');
      Blog.findByIdAndDelete.mockRejectedValue(error);

      await blogController.deleteBlog(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should succeed even when blog does not exist', async () => {
      Blog.findByIdAndDelete.mockResolvedValue(null);

      await blogController.deleteBlog(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Blog deleted' });
    });

    it('should handle database connection errors', async () => {
      const error = new Error('Database connection lost');
      Blog.findByIdAndDelete.mockRejectedValue(error);

      await blogController.deleteBlog(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });
});
