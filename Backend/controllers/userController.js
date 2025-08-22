  const User = require('../models/User');

  // Get all users (Admin only)
  exports.getUsers = async (req, res) => {
    try {
      const { role } = req.query;

      const filter = {};
      if (role) {
        filter.role = role; // dynamic role filter
      }

      const users = await User.find(filter).select('-password');
      const totalUsers = await User.countDocuments(filter);

      res.json({
        totalUsers,
        users,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  // Get single user
  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update user (Admin or self)
  exports.updateUser = async (req, res) => {
    try {
      const { firstName, lastName, email, mobile, country, city, dateOfBirth, role } = req.body;
      const user = await User.findById(req.params.id);

      if (!user) return res.status(404).json({ message: 'User not found' });

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (mobile) user.mobile = mobile;
      if (country) user.country = country;
      if (city) user.city = city;
      if (dateOfBirth) user.dateOfBirth = dateOfBirth;
      if (email) user.email = email;
      if (role) user.role = role;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // const multer = require('multer');
  // const upload = multer({ dest: 'uploads/' }); // Configure as per your storage requirements

  // exports.updateUser = async (req, res) => {
  //   try {
  //     const { firstName, lastName, email, role, ...rest } = req.body; // req.body now parsed by multer
  //     const user = await User.findById(req.params.id);

  //     if (!user) return res.status(404).json({ message: 'User not found' });

  //     if (firstName) user.firstName = firstName;
  //     if (lastName) user.lastName = lastName;
  //     if (email) user.email = email;
  //     if (role) user.role = role;

  //     // Handle other fields similarly...

  //     // Handle file upload if any:
  //     if (req.file) {
  //       user.profilePhoto = req.file.filename; // Or save file path as per your logic
  //     }

  //     const updatedUser = await user.save();
  //     res.json(updatedUser);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };

  // Delete user (Admin only)
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User removed' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
