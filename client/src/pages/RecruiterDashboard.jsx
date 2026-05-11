import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, MapPin, Calendar, Users, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import JobCardSkeleton from '../components/layout/JobCardSkeleton';

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getToken = () => localStorage.getItem('token') || '';

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${getToken()}` } };
        const response = await axios.get('http://localhost:3000/api/jobs/recruiter/me', config);
        setJobs(response.data.data);
      } catch (error) {
        toast.error("Failed to load your job postings");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to completely delete this job posting? This action cannot be undone.")) {
      try {
        const config = { headers: { Authorization: `Bearer ${getToken()}` } };
        await axios.delete(`http://localhost:3000/api/jobs/${jobId}`, config);
        setJobs(jobs.filter(job => job._id !== jobId));
        toast.success("Job deleted successfully");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete job");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Job Postings</h1>
            <p className="mt-2 text-sm text-gray-600">Manage your active listings and view applicants.</p>
          </div>
          <Link
            to="/recruiter/create-job"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Link>
        </div>

        {/* LOADING STATE: Skeletons but with the Recruiter layout */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {[1, 2, 3].map((n) => (
              <JobCardSkeleton key={n} isRecruiter={true} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No jobs posted yet</h3>
            <p className="mt-2 text-gray-500 mb-6">Get started by creating your first job listing.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h2>
                  <div className="space-y-2 mb-6 mt-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      {job.location}
                    </div>
                    {job.salary && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                        {job.salary}
                      </div>
                    )}
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      Posted: {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                  <Link
                    to={`/recruiter/jobs/${job._id}/applicants`}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-blue-200 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Applicants
                  </Link>
                  
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="inline-flex items-center px-3 py-2 border border-red-200 text-sm font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                    title="Delete Job"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;