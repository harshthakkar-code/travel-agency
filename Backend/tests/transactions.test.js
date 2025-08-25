const request = require('supertest');
const app = require('../app');

const Transaction = require('../models/Transaction');
const Booking = require('../models/Booking');
const stripe = require('../utils/stripe');

jest.mock('../models/Transaction');
jest.mock('../models/Booking');
jest.mock('../utils/stripe');

describe('Transaction API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/transactions', () => {
    it('should return all transactions with formatted total amount', async () => {
      const transactions = [
        { amount: 1000 },
        { amount: 2500 },
      ];
      Transaction.find.mockResolvedValue(transactions);

      const res = await request(app).get('/api/transactions');

      expect(Transaction.find).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('originalAmount', 3500);
      expect(res.body).toHaveProperty('totalAmount', '3,500');
      expect(res.body).toHaveProperty('transactions', transactions);
    });

    it('should return 500 on error', async () => {
      Transaction.find.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/api/transactions');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });

  describe('POST /api/transactions/stripe/checkout', () => {
    const fullPostData = {
      userId: 'user1',
      userDetails: { email: 'user@example.com', firstName: 'John', lastName: 'Doe' },
      billingAddress: { country: 'IN', city: 'Mumbai' },
      packageDetails: { packageTitle: 'Trip to Goa', destination: 'Goa', tripDuration: '5 days', packageImage: 'http://image.jpg' },
      addOns: { tourGuide: true },
      pricing: { totalCost: '100' },
      termsAccepted: true,
      bookingDate: '2025-08-22',
      bookingStatus: 'Pending',
      successUrl: 'http://success.url',
      cancelUrl: 'http://cancel.url',
    };

    it('should create a Stripe checkout session and save transaction', async () => {
      const sessionMock = {
        id: 'sess_123',
        url: 'https://checkout.stripe.com/pay/xyz',
      };

      stripe.checkout.sessions.create.mockResolvedValue(sessionMock);
      Transaction.create.mockResolvedValue({});

      const res = await request(app)
        .post('/api/transactions/stripe/checkout')
        .send(fullPostData);

      expect(stripe.checkout.sessions.create).toHaveBeenCalled();
      expect(Transaction.create).toHaveBeenCalledWith(expect.objectContaining({
        userId: 'user1',
        sessionId: 'sess_123',
        amount: 10000, // 100 * 100 cents
        currency: 'usd',
        user: fullPostData.userDetails,
        billingAddress: fullPostData.billingAddress,
        package: fullPostData.packageDetails,
        addOns: fullPostData.addOns,
        pricing: fullPostData.pricing,
        status: 'pending',
      }));
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('url', 'https://checkout.stripe.com/pay/xyz');
    });

    it('should return 500 on Stripe error', async () => {
      stripe.checkout.sessions.create.mockRejectedValue(new Error('Stripe error'));

      const res = await request(app)
        .post('/api/transactions/stripe/checkout')
        .send({
          userDetails: { email: 'test@example.com' },  // minimal valid userDetails
          pricing: { totalCost: '100' },
           packageDetails: { packageTitle: 'Test Package', destination: 'Test', tripDuration: '1 day', packageImage: 'http://image.jpg' }                 // to prevent undefined access error
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Stripe error');
    });
  });

  describe('POST /api/transactions/stripe/webhook', () => {
    it('should process Stripe webhook event for checkout.session.completed', async () => {
      const session = {
        id: 'sess_123',
        payment_intent: 'pi_123',
      };

      const event = {
        type: 'checkout.session.completed',
        data: { object: session },
      };

      const constructEventSpy = jest.spyOn(stripe.webhooks, 'constructEvent').mockReturnValue(event);
      const retrievePaymentIntentSpy = jest.spyOn(stripe.paymentIntents, 'retrieve').mockResolvedValue({
        latest_charge: 'ch_123',
      });
      const retrieveChargeSpy = jest.spyOn(stripe.charges, 'retrieve').mockResolvedValue({ receipt_url: 'http://receipt.url' });

      Transaction.findOneAndUpdate.mockResolvedValue({
        _id: 'trans_123',
        userId: 'user1',
        user: {},
        billingAddress: {},
        package: {},
        addOns: {},
        pricing: {},
        bookingDate: new Date(),
        paymentIntentId: 'pi_123',
      });
      Booking.create.mockResolvedValue({});

      const res = await request(app)
        .post('/api/transactions/stripe/webhook')
        .set('stripe-signature', 'test-signature')
        .send('{}');

      expect(constructEventSpy).toHaveBeenCalled();
      expect(retrievePaymentIntentSpy).toHaveBeenCalledWith('pi_123', { expand: ['charges'] });
      expect(retrieveChargeSpy).toHaveBeenCalledWith('ch_123');
      expect(Transaction.findOneAndUpdate).toHaveBeenCalledWith(
        { sessionId: 'sess_123' },
        { status: 'paid', paymentIntentId: 'pi_123', receiptUrl: 'http://receipt.url' },
        { new: true }
      );
      expect(Booking.create).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ received: true });

      constructEventSpy.mockRestore();
      retrievePaymentIntentSpy.mockRestore();
      retrieveChargeSpy.mockRestore();
    });

    it('should return 400 on webhook signature verification failure', async () => {
      jest.spyOn(stripe.webhooks, 'constructEvent').mockImplementation(() => {
        throw new Error('Invalid signature');
      });

      const res = await request(app)
        .post('/api/transactions/stripe/webhook')
        .set('stripe-signature', 'bad-signature')
        .send('{}');

      expect(res.statusCode).toBe(400);
      expect(res.text).toMatch(/Webhook Error: Invalid signature/);
    });
  });

  describe('GET /api/transactions/stripe/transaction/:sessionId', () => {
    it('should get transaction by sessionId', async () => {
      const transaction = { sessionId: 'sess_123', amount: 10000 };
      Transaction.findOne.mockResolvedValue(transaction);

      const res = await request(app).get('/api/transactions/stripe/transaction/sess_123');

      expect(Transaction.findOne).toHaveBeenCalledWith({ sessionId: 'sess_123' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(transaction);
    });

    it('should return 404 if transaction not found', async () => {
      Transaction.findOne.mockResolvedValue(null);

      const res = await request(app).get('/api/transactions/stripe/transaction/unknown');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Transaction not found');
    });

    it('should return 500 on error', async () => {
      Transaction.findOne.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/api/transactions/stripe/transaction/sess_123');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'DB error');
    });
  });
});
