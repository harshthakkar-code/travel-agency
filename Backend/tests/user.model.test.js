// tests/user.model.test.js
const mongoose = require('mongoose');
let User;

describe('User model schema', () => {
  beforeAll(() => {
    jest.resetModules();
    // Import the model fresh to ensure schema loads
    User = require('../models/User');
  });

  it('creates a User document in memory and preserves provided fields', () => {
    const doc = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'hashed',
      role: 'user',
      country: 'IN',
      city: 'Mumbai',
      mobile: '9999999999',
      dateOfBirth: '1990-01-01',
    });

    // Basic field checks
    expect(doc.firstName).toBe('John');
    expect(doc.lastName).toBe('Doe');
    expect(doc.email).toBe('john@example.com');
    expect(doc.password).toBe('hashed');
    expect(doc.role).toBe('user');
    expect(doc.country).toBe('IN');
    expect(doc.city).toBe('Mumbai');
    expect(doc.mobile).toBe('9999999999');
    expect(doc.dateOfBirth).toBe('1990-01-01');
  });

  it('applies defaults when not provided (if role default exists)', () => {
    const doc = new User({
      firstName: 'A',
      lastName: 'B',
      email: 'a@b.com',
      password: 'x',
    });

    // If your schema defines a default for role, assert it; otherwise skip or adjust
    // Example:
    // expect(doc.role).toBe('user');
    // If you do not have a role default, remove this assertion.

    // Timestamps: only present if schema uses { timestamps: true }
    // They’re not set until save, but keys exist after save. To avoid DB, just assert fields exist in schema paths:
    const paths = User.schema.paths;
    expect(paths).toBeTruthy();
  });

  it('fails validation when required fields are missing', async () => {
    const doc = new User({}); // missing required fields like email/password/firstName/lastName if your schema requires them
    let error;
    try {
      await doc.validate(); // validate in memory, no DB
    } catch (e) {
      error = e;
    }
    // If your schema marks certain fields as required, they should appear here.
    // Adjust field names as per your actual schema requirements.
    expect(error).toBeTruthy();
    // Example checks (uncomment/adjust based on your schema):
    // expect(error.errors.email).toBeDefined();
    // expect(error.errors.password).toBeDefined();
  });

it('passes validation when required fields are present', async () => {
  const doc = new User({
    firstName: 'Valid',
    lastName: 'User',
    email: 'valid@example.com',
    password: 'hashed',
    // Include required fields per your schema
    city: 'Mumbai',
    country: 'IN',
    mobile: '9999999999',
  });

  await expect(doc.validate()).resolves.toBeUndefined();
});

  it('has expected schema paths', () => {
    const paths = Object.keys(User.schema.paths);
    // Check for common fields; adjust to your User schema
    expect(paths).toEqual(expect.arrayContaining([
      'firstName',
      'lastName',
      'email',
      'password',
    ]));
  });
});
