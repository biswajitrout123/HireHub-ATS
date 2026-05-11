import express from 'express';
import { getJobs, createJob, getJobById, getRecruiterJobs, deleteJob } from './job.controller.js';

import { protect, authorize } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// Public Routes
router.get('/', getJobs);
router.get('/:id', getJobById);

// Protected Recruiter Routes
router.post('/', protect, authorize('recruiter'), createJob);
router.get('/recruiter/me', protect, authorize('recruiter'), getRecruiterJobs);

// NEW COMPLETE DELETE ROUTE
router.delete('/:id', protect, authorize('recruiter'), deleteJob);

export default router;