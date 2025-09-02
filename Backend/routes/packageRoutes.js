const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authenticateToken } = require('../middleware/firebaseAuth');
const { adminOnly } = require('../middleware/adminMiddleware');
const {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage ,
  uploadImage
} = require('../controllers/packageController');
const upload = require('../middleware/uploadImage');

const router = express.Router();

// Admin can create packages
router.post('/', authenticateToken, adminOnly, createPackage);

// Anyone can view packages, admin can filter status
router.get('/', getPackages);
router.get('/:id', getPackageById);

// Admin can update and delete
router.put('/:id', authenticateToken, adminOnly, updatePackage);
router.delete('/:id', authenticateToken, adminOnly, deletePackage);

// Image upload route
router.post('/upload-image', authenticateToken, upload.single('image'), uploadImage);
module.exports = router;
