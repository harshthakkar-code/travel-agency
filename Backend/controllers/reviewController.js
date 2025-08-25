const Review = require('../models/Review');
const User = require('../models/User'); 
// Get all reviews (can filter by product or package via query params)
exports.getReviews = async (req, res) => {
  try {
    const filter = {};
    if (req.query.productId) filter.product = req.query.productId;
    if (req.query.packageId) filter.package = req.query.packageId;
    const reviews = await Review.find(filter).populate('user', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create review (protected route)
exports.createReview = async (req, res) => {
  try {
    const { product, package: packageId, rating, comment } = req.body;

    // Check if user already reviewed this package
    const existing = await Review.findOne({ user: req.user._id, package: packageId });
    if (existing) {
      return res.status(400).json({ message: "User has already submitted a review for this package." });
    }
    const user = await User.findById(req.user._id).select('firstName lastName');

    const review = new Review({
      user: req.user._id,
      userName: `${user.firstName} ${user.lastName}`,
      product,
      package: packageId,
      rating,
      comment
    });
    const saved = await review.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete review (Admin or Review Owner)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (req.user.role !== 'admin' && !review.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await review.remove();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
