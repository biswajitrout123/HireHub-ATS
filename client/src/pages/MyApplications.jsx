import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios'; // 🌟 NEW: Importing our custom Axios interceptor
import { Briefcase, MapPin, Calendar, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { ApplicationSkeleton } from '../components/SkeletonLoader';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🗑️ REMOVED: getToken helper function is no longer needed!

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        // 🗑️ REMOVED: Manual header config is gone!
        // 🌟 NEW: Just the route path. The interceptor handles the base URL and Token!
        const response = await api.get('/applications/me');
        
        setApplications(response.data.data);
      } catch (error) {
        toast.error("Failed to load your applications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyApplications();
  }, []);

  // Helper function to color-code the status badge dynamically
  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'interview scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'shortlisted': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Matching Header Placeholder */}
          <div className="animate-pulse mb-8 space-y-3">
            <div className="h-9 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/5"></div>
          </div>

          {/* Stack of 3 Pulsing Cards */}
          <div className="space-y-4">
            <ApplicationSkeleton />
            <ApplicationSkeleton />
            <ApplicationSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="mt-2 text-sm text-gray-600">Track the status of jobs you have applied for.</p>
        </div>

        {/* Empty State */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No applications found</h3>
            <p className="mt-2 text-gray-500 mb-6">You haven't applied to any jobs yet.</p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          /* Application List */
          <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {applications.map((app) => (
                <li key={app._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                    {/* Job Details */}
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-gray-900">
                        {app.job ? app.job.title : 'Job no longer available'}
                      </h2>

                      {app.job && (
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="font-medium text-blue-600">{app.job.company}</span>
                          <span className="flex items-center">
                            <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {app.job.location}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            Applied: {new Date(app.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Status Badge & Link */}
                    <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border capitalize ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>

                      {app.job && (
                        <Link
                          to={`/jobs/${app.job._id}`}
                          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                        >
                          View Listing <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                      )}
                    </div>

                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyApplications;