const stripe = require('../utils/stripe');
const Transaction = require('../models/Transaction');
const Booking = require('../models/Booking'); 


exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    // calculate total amount
    const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    
    // Function to format number in Indian numbering style
    const formatIndianNumber = (num) => {
      const numStr = num.toString();
      const lastThree = numStr.slice(-3);
      const otherNumbers = numStr.slice(0, -3);
      
      if (otherNumbers !== '') {
        const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
        return formattedOtherNumbers + ',' + lastThree;
      }
      return lastThree;
    };

    const formattedTotalAmount = formatIndianNumber(totalAmount);

    const Data = {
      totalAmount: formattedTotalAmount,
      originalAmount: totalAmount, 
      transactions
    };
    
    res.json(Data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


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
            currency: 'inr', // or INR, etc.
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
      // currency: 'usd',
      currency: 'inr',
      user: userDetails,
      billingAddress,
      package: packageDetails,
      addOns,
      pricing,
      status: 'pending'
      // status:"paid"
    });
    console.log("Stripe session created:", session.id);
    //create a booking record
    // await Booking.create({
    //   userId,
    //   user: userDetails,
    //   billingAddress,
    //   package: packageDetails,
    //   addOns,
    //   pricing,
    //   termsAccepted,
    //   bookingDate,
    //   status: 'Pending',
    // });

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

    let receiptUrl = null;

    // 1. Retrieve the PaymentIntent
    let paymentIntent = null;
    if (session.payment_intent) {
      try {
        paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent, { expand: ['charges'] });
        // 2. Retrieve the Charge
        const latestChargeId = paymentIntent.latest_charge;
        if (latestChargeId) {
          const charge = await stripe.charges.retrieve(latestChargeId);
          receiptUrl = charge.receipt_url || null;
        }
      } catch (err) {
        console.error("Unable to fetch paymentIntent or charge for receipt", err);
      }
    }

    // 3. Update the Transaction with receiptUrl
    const transaction = await Transaction.findOneAndUpdate(
      { sessionId: session.id },
      {
        status: 'paid',
        paymentIntentId: session.payment_intent,
        receiptUrl: receiptUrl
      },
      { new: true }
    );
    console.log("Transaction marked as paid:", session.id, "with receipt:", receiptUrl);

    // 4. Save booking data to Booking collection, now with receiptUrl
    if (transaction) {
      const bookingData = {
        transactionId: transaction._id,
        user: {
          firstName: transaction?.user?.firstName,
          lastName: transaction?.user?.lastName,
          fullName: transaction?.user?.fullName,
          email: transaction?.user?.email,
          phone: transaction?.user?.phone
        },
        userId: transaction.userId,
        billingAddress: transaction.billingAddress,
        package: transaction.package,
        addOns: transaction.addOns,
        pricing: transaction.pricing,
        status: 'Confirmed',
        bookingDate: transaction.bookingDate || new Date(),
        paymentIntentId: transaction.paymentIntentId,
        receiptUrl: receiptUrl,
        // createdAt, updatedAt are handled by schema timestamps
      };
      await Booking.create(bookingData);
    }
  }

  res.status(200).json({ received: true });
};

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

