const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true
  }, 
  userId: { type: String, required: true },
  billingAddress: {
    country: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    postalCode: String,
    additionalInfo: String,
  },
  package: {
    packageId: { type: String, required: true },
    packageTitle: String,
    destination: String,
    tripDuration: String,
    travelDate: Date,
    groupSize: Number,
    packagePrice: Number, // in cents
    packageImage: String,
  },
  addOns: { // Store selected add-ons with boolean or count
    tourGuide: { type: Boolean, default: false },
    mealsIncluded: { type: Boolean, default: false },
    extraBaggage: { type: Boolean, default: false },
    transfers: { type: Boolean, default: false },
  },
  pricing: {
    packageCost: Number, // in cents
    tourGuide: Number,
    mealsIncluded: Number,
    extraBaggage: Number,
    transfers: Number,
    taxRate: String,
    totalCost: Number, // string or number (depending on your calculation)
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending',
  },
  paymentIntentId: String,
  receiptUrl: String,
  sessionId: String, // Stripe checkout session ID
  enquiryCount: { type: Number, default: 0 },
  bookingDate: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);
