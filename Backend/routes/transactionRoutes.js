const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.getAllTransactions);

// Stripe
router.post('/stripe/checkout', transactionController.createStripeCheckoutSession);
router.get('/stripe/transaction/:sessionId', transactionController.getTransactionBySessionId);


module.exports = router;
