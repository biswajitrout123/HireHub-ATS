import express from 'express';
import { 
  applyForJob, 
  getJobApplicants, 
  getUserApplications, 
  updateApplicationStatus,
  getRecruiterAnalytics // <-- This import fixes your crash!
} from './application.controller.js';
import { protect, authorize } from '../../middlewares/auth.middleware.js';
import { upload } from '../../config/imagekit.js';

const router = express.Router();

// ==========================================
// JOB SEEKER ROUTES
// ==========================================

// 1. View their own application history
router.get('/me', protect, authorize('user'), getUserApplications);

// 2. Apply for a job (Requires PDF upload via ImageKit)
router.post('/jobs/:jobId/apply', protect, authorize('user'), upload.single('resume'), applyForJob);

// ==========================================
// RECRUITER ROUTES
// ==========================================

// 3. View analytics dashboard data
router.get('/analytics', protect, authorize('recruiter', 'admin'), getRecruiterAnalytics);

// 4. View applicants for a specific job
router.get('/jobs/:jobId/applicants', protect, authorize('recruiter', 'admin'), getJobApplicants);

// 5. Update application status (Dropdown logic)
router.patch('/:id/status', protect, authorize('recruiter', 'admin'), updateApplicationStatus);

export default router;