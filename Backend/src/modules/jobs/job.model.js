import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a job title'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Please add a company name']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  salary: {
    type: String,
    required: [true, 'Please add a salary range (e.g. $80k - $100k)']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Job = mongoose.model('Job', jobSchema);
export default Job;