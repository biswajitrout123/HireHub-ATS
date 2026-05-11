import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, FileText, User, Mail, Calendar, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const JobApplicants = () => {
  const { id } = useParams(); // The Job ID
  const [applicants, setApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Helper to get token for API calls
  const getToken = () => localStorage.getItem('token') || '';

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${getToken()}` }
        };
        const response = await axios.get(`http://localhost:3000/api/applications/jobs/${id}/applicants`, config);
        setApplicants(response.data.data);
        setJobTitle(response.data.jobTitle);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load applicants");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [id]);

  // ==========================================
  // NEW: Handle Status Change Function
  // ==========================================
  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${getToken()}` }
      };

      // Make the PATCH request to the backend
      await axios.patch(
        `http://localhost:3000/api/applications/${applicationId}/status`,
        { status: newStatus },
        config
      );

      // Instantly update the React UI without refreshing the page
      setApplicants((prevApplicants) =>
        prevApplicants.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );

      toast.success('Status updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
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
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="mb-8">
          <Link
            to="/recruiter/dashboard"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Jobs
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Applicants</h1>
          <p className="mt-2 text-lg text-blue-600 font-medium">Role: {jobTitle}</p>
        </div>

        {/* Applicants Table */}
        {applicants.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No applicants yet</h3>
            <p className="mt-2 text-gray-500">When someone applies to this role, their resume will appear here.</p>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Candidate</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied Date</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Resume</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applicants.map((app) => (
                    <tr key={app._id} className="hover:bg-gray-50 transition-colors">

                      {/* Name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{app.applicant?.name || 'Deleted User'}</div>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {app.applicant?.email || 'No email available'}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </td>

                      {/* NEW INTERACTIVE STATUS DROPDOWN */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app._id, e.target.value)}
                          className="border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-1.5 shadow-sm cursor-pointer capitalize"
                        >
                          <option value="applied">Applied</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="interview scheduled">Interview Scheduled</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>

                      {/* Resume Button */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View PDF
                        </a>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default JobApplicants;