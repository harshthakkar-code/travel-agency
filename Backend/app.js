// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());

// Stripe webhook route BEFORE express.json() middleware
app.post(
  '/api/transactions/stripe/webhook',
  express.raw({ type: 'application/json' }),
  require('./controllers/transactionController').stripeWebhook
);

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

module.exports = app;
