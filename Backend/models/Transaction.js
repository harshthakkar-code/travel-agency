const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId : { type: String, required: true },
  sessionId: { type: String, required: true, unique: true },
  paymentIntentId: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
  status: { type: String, default: 'pending' },
  user: {
    firstName: String,
    lastName: String,
    fullName: String,
    email: String,
    phone: String,
  },
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
    packageId: String,
    packageTitle: String,
    destination: String,
    tripDuration: String,
    travelDate: String,
    groupSize: Number,
    packagePrice: Number,
    packageImage: String,
  },
  addOns: Object,
  pricing: Object,
  receiptUrl: String,
  createdAt: { type: Date, default: Date.now },
  invoiceId: String, // link to invoice collection if separate
});

module.exports = mongoose.model('Transaction', transactionSchema);
