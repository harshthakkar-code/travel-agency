// controllers/reviewController.js
const admin = require('../config/firebase-admin');
const Review = require('../models/Review');

// Get all reviews (can filter by product or package via query params)
exports.getReviews = async (req, res) => {
  try {
    const filter = {};
    if (req.query.productId) filter.product = req.query.productId;
    if (req.query.packageId) filter.package = req.query.packageId;
    
    const reviews = await Review.find(filter)
      .populate('product', 'name')
      .populate('package', 'packageTitle')
      .sort({ createdAt: -1 });
      
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create review (protected route - requires Firebase authentication)
exports.createReview = async (req, res) => {
  try {
    const { product, package: packageId, rating, comment } = req.body;

    // Check if user already reviewed this package
    const existingReview = await Review.findOne({ 
      user: req.user.uid, 
      package: packageId 
    });
    
    if (existingReview) {
      return res.status(400).json({ 
        message: "You have already submitted a review for this package." 
      });
    }

    // Get user data from Firebase Auth
    let userName;
    try {
      const firebaseUser = await admin.auth().getUser(req.user.uid);
      userName = firebaseUser.displayName || req.user.name || req.user.email || 'Anonymous User';
    } catch (error) {
      userName = req.user.name || req.user.email || 'Anonymous User';
    }

    const review = new Review({
      user: req.user.uid,
      userName: userName,
      product,
      package: packageId,
      rating,
      comment
    });

    const savedReview = await review.save();
    
    // Populate the saved review before sending response
    await savedReview.populate('product', 'name');
    await savedReview.populate('package', 'packageTitle');
    
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete review (Admin or Review Owner)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check authorization - admin or review owner
    if (req.user.role !== 'admin' && review.user !== req.user.uid) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews by user (protected route)
exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.uid })
      .populate('product', 'name')
      .populate('package', 'packageTitle')
      .sort({ createdAt: -1 });
      
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
