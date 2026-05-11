import Job from './job.model.js';

// 1. Get ALL jobs (Public Dashboard) WITH FILTERS
export const getJobs = async (req, res) => {
  try {
    const { search, location, remote, minSalary } = req.query;
    
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    if (location && location !== 'All' && location !== 'All Locations') {
      query.location = { $regex: location, $options: 'i' };
    }

    if (remote === 'true') {
        query.location = { $regex: 'Remote', $options: 'i' };
    }

    if (minSalary) {
      query.salary = { $gte: parseInt(minSalary) };
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Create a new job (Recruiter Only)
export const createJob = async (req, res) => {
  try {
    const jobData = { ...req.body, postedBy: req.user._id }; 
    const job = await Job.create(jobData);
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// 3. Get a single job by ID (Public Job Details)
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// 4. Get ONLY jobs created by the logged-in recruiter (Recruiter Dashboard)
export const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort('-createdAt');
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// 5. Delete a job (Recruiter Only) - NEW FULL FUNCTION
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Security Check: Only the recruiter who posted it can delete it
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this job' });
    }

    await job.deleteOne();
    
    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};