const stripe = require('../utils/stripe');
const Transaction = require('../models/Transaction');
const Booking = require('../models/Booking'); 

exports.createStripeCheckoutSession = async (req, res) => {
  try {
    const {
      userId,
      userDetails,
      billingAddress,
      packageDetails,
      addOns,
      pricing,
      termsAccepted,
      bookingDate,
      bookingStatus,
      successUrl, cancelUrl
    } = req.body;

    const totalAmount = Math.round(Number(pricing.totalCost) * 100); // in cents/paise

    // Use description and metadata for rich tracking
    const metadata = {
      ...userDetails,
      ...billingAddress,
      ...packageDetails,
      ...addOns,
      bookingDate,
      bookingStatus
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: userDetails.email,
      line_items: [
        {
          price_data: {
            currency: 'usd', // or INR, etc.
            product_data: {
              name: packageDetails.packageTitle,
              description: `${packageDetails.destination} - ${packageDetails.tripDuration}`,
              images: [packageDetails.packageImage], // must be an absolute URL if you want to display in Stripe
            },
            unit_amount: totalAmount
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata
    });

    // Save transaction (link sessionId and package)
    await Transaction.create({
      userId,
      sessionId: session.id,
      amount: totalAmount,
      currency: 'usd',
      user: userDetails,
      billingAddress,
      package: packageDetails,
      addOns,
      pricing,
      // status: 'pending'
      status:"paid"
    });
    console.log("Stripe session created:", session.id);
    //create a booking record
    await Booking.create({
      userId,
      user: userDetails,
      billingAddress,
      package: packageDetails,
      addOns,
      pricing,
      termsAccepted,
      bookingDate,
      status: 'Pending',
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.stripeWebhook = async (req, res) => {
  console.log("Received Stripe webhook event");
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log("Webhook event received:", event.type);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

if (event.type === 'checkout.session.completed') {
  const session = event.data.object;

  // Mark the transaction as paid
  const transaction = await Transaction.findOneAndUpdate(
    { sessionId: session.id },
    {
      status: 'paid',
      paymentIntentId: session.payment_intent,
      receiptUrl: session.invoice ? session.invoice : (session.receipt_url || null)
    },
    { new: true }
  );

  // Save booking data to Booking collection
  if (transaction) {
    const bookingData = {
      transactionId: transaction._id,
      user: transaction.user,
      userId: transaction.userId,
      billingAddress: transaction.billingAddress,
      package: transaction.package,
      addOns: transaction.addOns,
      pricing: transaction.pricing,
      status: 'confirmed',
      bookingDate: transaction.bookingDate || new Date(),
      paymentIntentId: transaction.paymentIntentId,
      receiptUrl: transaction.receiptUrl,
      // createdAt, updatedAt are auto-handled if using timestamps:true in schema
    };

    await Booking.create(bookingData);
    console.log("Booking saved successfully");
  }

  console.log("Transaction marked as paid and booking saved:", session.id);
}


  res.status(200).json({ received: true });
};
// GET /stripe/transaction/:sessionId
exports.getTransactionBySessionId = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ sessionId: req.params.sessionId });
    if(!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(transaction);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

