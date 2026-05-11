import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resumeUrl: {
      type: String,
      required: [true, 'Please upload your resume'],
    },
    // STEP 1 UPGRADE: Strict Enum Validation
    status: {
      type: String,
      enum: [
        "applied", 
        "reviewing", 
        "shortlisted", 
        "interview scheduled", 
        "accepted", 
        "rejected"
      ],
      default: "applied",
    },
  },
  { timestamps: true }
);

const Application = mongoose.model('Application', applicationSchema);

// SECURITY: Prevent a user from applying to the same job twice
applicationSchema.index({ applicant: 1, job: 1 }, { unique: true });
export default Application;