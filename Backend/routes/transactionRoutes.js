const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const bodyParser = require('body-parser');

router.post('/stripe/checkout', transactionController.createStripeCheckoutSession);
router.get('/stripe/transaction/:sessionId', transactionController.getTransactionBySessionId);

// no JSON body parsing for webhooks!
// router.post('/stripe/webhook', bodyParser.raw({type: 'application/json'}), transactionController.stripeWebhook);
router.post('/stripe/webhook', express.raw({type: 'application/json'}), transactionController.stripeWebhook);

module.exports = router;
