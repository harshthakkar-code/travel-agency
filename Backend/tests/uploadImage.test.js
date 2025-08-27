// tests/uploadImage.test.js
const clearModule = (modPath) => {
  const full = require.resolve(modPath);
  delete require.cache[full];
};

describe('upload (multer + S3) middleware', () => {
  const modulePath = '../middleware/uploadImage'; // adjust path if needed

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('exports a Multer instance with common methods (single/array/fields)', () => {
    // Ensure env is set before requiring module to avoid "bucket is required"
    const prev = {
      AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_REGION: process.env.AWS_REGION,
    };
    process.env.AWS_S3_BUCKET = 'my-bucket';
    process.env.AWS_ACCESS_KEY_ID = 'AKIA_TEST';
    process.env.AWS_SECRET_ACCESS_KEY = 'SECRET_TEST';
    process.env.AWS_REGION = 'ap-south-1';

    // Mock aws-sdk to prevent real S3 init
    clearModule('aws-sdk');
    jest.doMock('aws-sdk', () => ({
      S3: jest.fn().mockImplementation(() => ({})),
    }));

    // Provide pass-through mocks so multer/multer-s3 construct cleanly
    clearModule('multer');
    jest.doMock('multer', () => {
      return (opts) => {
        const stub = () => {};
        stub.single = () => (req, res, next) => next();
        stub.array = () => (req, res, next) => next();
        stub.fields = () => (req, res, next) => next();
        return stub;
      };
    });
    clearModule('multer-s3');
    jest.doMock('multer-s3', () => () => ({ _dummy: true }));

    // Now require the module under test
    const upload = require(modulePath);

    expect(typeof upload).toBe('function');
    expect(typeof upload.single).toBe('function');
    expect(typeof upload.array).toBe('function');
    expect(typeof upload.fields).toBe('function');

    // restore env
    process.env.AWS_S3_BUCKET = prev.AWS_S3_BUCKET;
    process.env.AWS_ACCESS_KEY_ID = prev.AWS_ACCESS_KEY_ID;
    process.env.AWS_SECRET_ACCESS_KEY = prev.AWS_SECRET_ACCESS_KEY;
    process.env.AWS_REGION = prev.AWS_REGION;
  });

  it('fileFilter rejects non-image mimetypes and accepts image mimetypes', () => {
    // Capture options by mocking multer and multer-s3 before require
    const captured = { options: null, s3Options: null };

    clearModule('multer');
    jest.doMock('multer', () => {
      return (opts) => {
        captured.options = opts;
        const stub = () => {};
        stub.single = () => (req, res, next) => next();
        stub.array = () => (req, res, next) => next();
        stub.fields = () => (req, res, next) => next();
        return stub;
      };
    });

    clearModule('multer-s3');
    jest.doMock('multer-s3', () => (s3Config) => {
      captured.s3Options = s3Config;
      return { _dummy: true };
    });

    // Mock aws-sdk
    clearModule('aws-sdk');
    jest.doMock('aws-sdk', () => ({
      S3: jest.fn().mockImplementation(() => ({})),
    }));

    clearModule(modulePath);
    const upload = require(modulePath);

    expect(typeof upload).toBe('function');
    expect(captured.options).toBeTruthy();
    expect(typeof captured.options.fileFilter).toBe('function');

    const fileFilter = captured.options.fileFilter;

    // Non-image
    const badFile = { mimetype: 'application/pdf', originalname: 'doc.pdf' };
    const badCb = jest.fn();
    fileFilter({}, badFile, badCb);
    expect(badCb).toHaveBeenCalledTimes(1);
    const [errArgBad, acceptBad] = badCb.mock.calls[0];
    expect(errArgBad).toBeInstanceOf(Error);
    expect(errArgBad.message).toBe('Only image files are allowed!');
    expect(acceptBad).toBe(false);

    // Image
    const goodFile = { mimetype: 'image/png', originalname: 'photo.png' };
    const goodCb = jest.fn();
    fileFilter({}, goodFile, goodCb);
    expect(goodCb).toHaveBeenCalledTimes(1);
    const [errArgGood, acceptGood] = goodCb.mock.calls[0];
    expect(errArgGood).toBeNull();
    expect(acceptGood).toBe(true);
  });

  it('storage.key generates keys with travel/<timestamp>-<originalname>', () => {
    // Patch Date.now for deterministic key
    const fakeNow = 1730000000000;
    const realNow = Date.now;
    Date.now = () => fakeNow;

    const captured = { options: null, s3Options: null };

    clearModule('multer');
    jest.doMock('multer', () => {
      return (opts) => {
        captured.options = opts;
        const stub = () => {};
        stub.single = () => (req, res, next) => next();
        stub.array = () => (req, res, next) => next();
        stub.fields = () => (req, res, next) => next();
        return stub;
      };
    });

    clearModule('multer-s3');
    jest.doMock('multer-s3', () => (s3Config) => {
      captured.s3Options = s3Config;
      return { _dummy: true };
    });

    clearModule('aws-sdk');
    jest.doMock('aws-sdk', () => ({
      S3: jest.fn().mockImplementation(() => ({})),
    }));

    clearModule(modulePath);
    require(modulePath);

    expect(captured.s3Options).toBeTruthy();
    expect(typeof captured.s3Options.key).toBe('function');

    const file = { originalname: 'pic.jpg' };
    const cb = jest.fn();
    captured.s3Options.key({}, file, cb);

    expect(cb).toHaveBeenCalledTimes(1);
    const [err, key] = cb.mock.calls[0];
    expect(err).toBeNull();
    expect(key).toBe(`travel/${fakeNow}-pic.jpg`);

    Date.now = realNow;
  });

  it('uses configured limits (5MB)', () => {
    const captured = { options: null, s3Options: null };

    clearModule('multer');
    jest.doMock('multer', () => {
      return (opts) => {
        captured.options = opts;
        const stub = () => {};
        stub.single = () => (req, res, next) => next();
        stub.array = () => (req, res, next) => next();
        stub.fields = () => (req, res, next) => next();
        return stub;
      };
    });

    clearModule('multer-s3');
    jest.doMock('multer-s3', () => (s3Config) => {
      captured.s3Options = s3Config;
      return { _dummy: true };
    });

    clearModule('aws-sdk');
    jest.doMock('aws-sdk', () => ({
      S3: jest.fn().mockImplementation(() => ({})),
    }));

    clearModule(modulePath);
    require(modulePath);

    expect(captured.options).toBeTruthy();
    expect(captured.options.limits).toBeTruthy();
    expect(captured.options.limits.fileSize).toBe(5 * 1024 * 1024);
  });

  it('passes bucket and ACL to storage config', () => {
    const captured = { options: null, s3Options: null };

    // Stub env BEFORE require
    const prev = {
      AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_REGION: process.env.AWS_REGION,
    };
    process.env.AWS_S3_BUCKET = 'my-bucket';
    process.env.AWS_ACCESS_KEY_ID = 'AKIA_TEST';
    process.env.AWS_SECRET_ACCESS_KEY = 'SECRET_TEST';
    process.env.AWS_REGION = 'ap-south-1';

    clearModule('multer');
    jest.doMock('multer', () => {
      return (opts) => {
        captured.options = opts;
        const stub = () => {};
        stub.single = () => (req, res, next) => next();
        stub.array = () => (req, res, next) => next();
        stub.fields = () => (req, res, next) => next();
        return stub;
      };
    });

    clearModule('multer-s3');
    jest.doMock('multer-s3', () => (s3Config) => {
      captured.s3Options = s3Config;
      return { _dummy: true };
    });

    clearModule('aws-sdk');
    jest.doMock('aws-sdk', () => ({
      S3: jest.fn().mockImplementation(() => ({})),
    }));

    clearModule(modulePath);
    require(modulePath);

    expect(captured.s3Options).toBeTruthy();
    expect(captured.s3Options.bucket).toBe('my-bucket');
    expect(captured.s3Options.acl).toBe('public-read');

    // restore env
    process.env.AWS_S3_BUCKET = prev.AWS_S3_BUCKET;
    process.env.AWS_ACCESS_KEY_ID = prev.AWS_ACCESS_KEY_ID;
    process.env.AWS_SECRET_ACCESS_KEY = prev.AWS_SECRET_ACCESS_KEY;
    process.env.AWS_REGION = prev.AWS_REGION;
  });
});
