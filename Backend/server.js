const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
// Add other routes here for bookings, users, packages, comments...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/careers', require('./routes/careerRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
