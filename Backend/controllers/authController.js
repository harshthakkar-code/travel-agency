const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Register user
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, mobile, phone, country, city } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if(userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({firstName, lastName, email, password, mobile, phone, country, city});
    res.status(201).json({
      _id: user._id,
      name: user.firstName + ' ' + user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Authenticate user / login
exports.authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
