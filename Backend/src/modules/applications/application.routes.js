import express from 'express';
import { 
  applyForJob, 
  getJobApplicants, 
  getUserApplications, 
  updateApplicationStatus 
} from './application.controller.js';
import { protect, authorize } from '../../middlewares/auth.middleware.js';
import { upload } from '../../config/imagekit.js';

const router = express.Router();

// User Route: View their own application history
router.get('/me', protect, authorize('user'), getUserApplications);

// User Route: Apply for a job (Requires PDF upload)
router.post('/jobs/:jobId/apply', protect, authorize('user'), upload.single('resume'), applyForJob);

// Recruiter Route: View applicants for a specific job
router.get('/jobs/:jobId/applicants', protect, authorize('recruiter', 'admin'), getJobApplicants);

// Recruiter Route: Update application status
router.patch('/:id/status', protect, authorize('recruiter', 'admin'), updateApplicationStatus);

export default router;