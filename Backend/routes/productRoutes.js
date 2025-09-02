const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authenticateToken } = require('../middleware/firebaseAuth');
const { adminOnly } = require('../middleware/adminMiddleware');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin routes
router.post('/', authenticateToken, adminOnly, createProduct);
router.put('/:id', authenticateToken, adminOnly, updateProduct);
router.delete('/:id', authenticateToken, adminOnly, deleteProduct);

module.exports = router;
