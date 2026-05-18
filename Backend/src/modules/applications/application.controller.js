import { imagekit } from '../../config/imagekit.js';
import Application from './application.model.js';
import Job from '../jobs/job.model.js';


// 1. USER: Apply for a Job

export const applyForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    
    // 1. Check if the job actually exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // 2. Check if user already applied
    const existingApplication = await Application.findOne({ job: jobId, applicant: req.user._id });
    if (existingApplication) {
      return res.status(400).json({ success: false, message: 'You have already applied for this job' });
    }

    // 3. Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload your resume (PDF)' });
    }

    // 4. Upload to ImageKit
    const fileBase64 = req.file.buffer.toString("base64");
    const uploadResponse = await imagekit.upload({
      file: fileBase64,
      fileName: `resume_${req.user._id}_${Date.now()}.pdf`,
      folder: "/SmartJobPortal_Resumes"
    });

    // 5. Save the application to MongoDB
    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      resumeUrl: uploadResponse.url
    });

    res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully!',
      data: application 
    });

  } catch (error) {
    console.error('Application Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};


// 2. RECRUITER: Fetch all applicants for a specific job

export const getJobApplicants = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // 1. Find the job and verify the logged-in recruiter actually owns it
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to view these applicants' });
    }

    // 2. Fetch applications and populate the user's details (Name, Email, Skills, Resume)
    const applications = await Application.find({ job: jobId })
      .populate('applicant', 'name email bio skills resumeUrl')
      .sort('-createdAt'); // Newest first

    res.status(200).json({ 
      success: true, 
      count: applications.length, 
      data: applications,
      jobTitle: job.title
    });

  } catch (error) {
    console.error('Fetch Applicants Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};


// 3. USER: Fetch application history for the logged-in user

export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title company location salary')
      .sort('-createdAt'); 

    res.status(200).json({ 
      success: true, 
      count: applications.length, 
      data: applications 
    });

  } catch (error) {
    console.error('Fetch User Applications Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};




// 4. RECRUITER: Update Application Status

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    // A. Find the application
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // B. Find the related job
    const job = await Job.findById(application.job);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Associated job not found' });
    }

    // C. Verify Recruiter Ownership
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this application' });
    }

    // D. Update Status
    application.status = status.toLowerCase(); 
    await application.save();

    // E. Return Updated Data
    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: application
    });

  } catch (error) {
    console.error('Update Status Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};







// 5. RECRUITER: Get Analytics Dashboard Data

export const getRecruiterAnalytics = async (req, res) => {
  try {
    const recruiterId = req.user._id;

    // 1. Find all jobs posted by this recruiter
    const jobs = await Job.find({ postedBy: recruiterId });
    const jobIds = jobs.map(job => job._id);

    // 2. Find all applications across all their jobs
    const applications = await Application.find({ job: { $in: jobIds } });

    // 3. Count everything up
    const totalJobs = jobs.length;
    const totalApplicants = applications.length;
    
    const statusCounts = {
      applied: 0,
      reviewing: 0,
      shortlisted: 0,
      'interview scheduled': 0,
      accepted: 0,
      rejected: 0
    };

    applications.forEach(app => {
      if (statusCounts[app.status] !== undefined) {
        statusCounts[app.status]++;
      }
    });

    // 4. Format the data exactly how Recharts likes it
    const chartData = [
      { name: 'Applied', candidates: statusCounts.applied },
      { name: 'Reviewing', candidates: statusCounts.reviewing },
      { name: 'Shortlisted', candidates: statusCounts.shortlisted },
      { name: 'Interviewing', candidates: statusCounts['interview scheduled'] },
      { name: 'Accepted', candidates: statusCounts.accepted },
      { name: 'Rejected', candidates: statusCounts.rejected }
    ];

    res.status(200).json({ 
      success: true, 
      stats: { totalJobs, totalApplicants, totalAccepted: statusCounts.accepted }, 
      chartData 
    });

  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};