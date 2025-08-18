const express = require('express');
const { getJobs, getJobById, applyJob } = require('../controllers/careerController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/:jobId/apply',protect, applyJob);

module.exports = router;
