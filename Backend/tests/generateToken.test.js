// tests/generateToken.test.js
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken'); // adjust path if needed

jest.mock('jsonwebtoken');

describe('generateToken utility', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, JWT_SECRET: 'test_secret' };
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('calls jwt.sign with id payload, secret, and 30d expiry', () => {
    jwt.sign.mockReturnValue('signed.jwt.token');

    const token = generateToken('user123');

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 'user123' },
      'test_secret',
      { expiresIn: '30d' }
    );
    expect(token).toBe('signed.jwt.token');
  });

  it('returns the token produced by jwt.sign', () => {
    jwt.sign.mockReturnValue('another.token.value');

    const token = generateToken('abc');
    expect(token).toBe('another.token.value');
  });
});
