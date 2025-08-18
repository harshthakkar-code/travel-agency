const Wishlist = require('../models/Wishlist');

// Get wishlist for a user
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('packages');
    res.json(wishlist || { user: req.user._id, packages: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add package to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, packages: [] });
    }
    if (!wishlist.packages.includes(req.body.packageId)) {
      wishlist.packages.push(req.body.packageId);
    }
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove package from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    wishlist.packages = wishlist.packages.filter(pkg => pkg.toString() !== req.params.packageId);
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
