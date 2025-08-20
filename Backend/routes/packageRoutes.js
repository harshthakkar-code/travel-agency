const express = require('express');
const { protect } = require('../middleware/authMiddleware');
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
router.post('/', protect, adminOnly, createPackage);

// Anyone can view packages, admin can filter status
router.get('/', getPackages);
router.get('/:id', getPackageById);

// Admin can update and delete
router.put('/:id', protect, adminOnly, updatePackage);
router.delete('/:id', protect, adminOnly, deletePackage);

// Image upload route
router.post('/upload-image', protect, upload.single('image'), uploadImage);
module.exports = router;
