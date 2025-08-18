const Career = require('../models/Career');
const Application = require('../models/Application');

exports.getJobs = async (req, res) => {
  res.json(await Career.find());
};

exports.getJobById = async (req, res) => {
  const job = await Career.findById(req.params.id);
  if (!job) return res.status(404).json({ msg: 'Not found' });
  res.json(job);
};

exports.applyJob = async (req, res) => {
  const job = await Career.findById(req.params.jobId);
  if (!job) return res.status(404).json({ msg: 'Job not found' });

  const application = new Application({ ...req.body, job: job._id });
  await application.save();
  res.status(201).json(application);
};
