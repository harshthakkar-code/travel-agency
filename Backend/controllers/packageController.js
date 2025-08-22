const Package = require('../models/Package');

// Add new package
exports.createPackage = async (req, res) => {
  try {
    const pkg = new Package(req.body);
    const saved = await pkg.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all packages (optionally filter by status)
// exports.getPackages = async (req, res) => {
//   try {
//     const filter = {};
//     if (req.query.status) {
//       filter.status = req.query.status;
//     }
//     const packages = await Package.find(filter);
//     res.json(packages);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Get all packages (optionally filter by status, with pagination)
exports.getPackages = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // pagination params
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) ; // You can change 5 to default items per page
    const skip = (page - 1) * limit;

    const total = await Package.countDocuments(filter);
    const packages = await Package.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      packages,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get single package
exports.getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update package
exports.updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pkg);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete package
exports.deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Example: Express handler for file upload
exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ imageUrl: req.file.location });
};



