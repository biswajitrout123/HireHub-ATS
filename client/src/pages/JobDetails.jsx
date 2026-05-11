import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, DollarSign, ArrowLeft, UploadCloud, CheckCircle, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext'; // <-- IMPORT AUTH CONTEXT

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // <-- GET CURRENT USER ROLE
  
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Application State
  const [resume, setResume] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/jobs/${id}`);
        setJob(response.data.data);
      } catch (error) {
        toast.error("Failed to load job details");
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
    } else {
      toast.error('Please select a valid PDF file');
      e.target.value = null;
    }
  };

  const handleApply = async () => {
    if (!resume) {
      toast.error('Please upload your resume first');
      return;
    }

    setIsApplying(true);
    const token = localStorage.getItem('token'); // Grab Token
    const formData = new FormData();
    formData.append('resume', resume);

    try {
      await axios.post(`http://localhost:3000/api/applications/jobs/${id}/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Attach Token
        },
      });
      
      toast.success('Application submitted successfully!');
      setHasApplied(true); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </button>

        {/* Job Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-8 border-b border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <div className="text-lg text-blue-600 font-medium mb-6">{job.company}</div>
            
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                {job.location}
              </span>
              <span className="inline-flex items-center text-sm text-green-700 bg-green-50 px-3 py-1 rounded-md font-medium">
                <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                {job.salary}
              </span>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Role</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </p>
          </div>
        </div>

        {/* CONDITIONAL RENDER: Only show this box if the user is NOT a recruiter */}
        {user?.role !== 'recruiter' && (
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-8 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-1">
                {hasApplied ? 'Application Submitted!' : 'Ready to apply?'}
              </h3>
              <p className="text-blue-700 text-sm">
                {hasApplied 
                  ? 'The recruiter will review your profile shortly.' 
                  : 'Upload your resume (PDF) to submit your application.'}
              </p>
            </div>
            
            <div className="mt-6 md:mt-0 flex flex-col items-end">
              {hasApplied ? (
                <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 font-medium rounded-md">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Successfully Applied
                </span>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <input 
                    type="file" 
                    id="resume-upload" 
                    accept=".pdf" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                  <label 
                    htmlFor="resume-upload"
                    className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border-2 border-blue-600 text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {resume ? resume.name : 'Select PDF'}
                  </label>
                  <button 
                    onClick={handleApply}
                    disabled={isApplying || !resume}
                    className={`inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-colors ${
                      isApplying || !resume ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-sm'
                    }`}
                  >
                    {isApplying ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> : <UploadCloud className="w-4 h-4 mr-2" />}
                    {isApplying ? 'Uploading...' : 'Submit Application'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default JobDetails;