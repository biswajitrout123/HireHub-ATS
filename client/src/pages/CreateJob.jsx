import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios'; // 🌟 NEW: Using our clean interceptor!
import { ArrowLeft, Briefcase, Building, MapPin, DollarSign, FileText, CheckSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateJob = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    requirements: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Transform comma-separated string into an array, removing empty spaces
      const jobData = {
        ...formData,
        requirements: formData.requirements
          .split(',')
          .map(req => req.trim())
          .filter(req => req !== '') 
      };

      // 🌟 NEW: Look how incredibly simple this POST request is now!
      await api.post('/jobs', jobData);
      
      toast.success('Job posted successfully!');
      navigate('/recruiter/dashboard'); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/recruiter/dashboard" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 bg-blue-600 text-white">
            <h1 className="text-3xl font-bold">Post a New Job</h1>
            <p className="mt-2 text-blue-100">Fill out the details below to publish a new position to the job board.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="pl-10 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Senior React Developer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="pl-10 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Google"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="pl-10 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Remote, India"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="pl-10 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. ₹12,00,000 - ₹18,00,000 / year"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="pl-10 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe the role, responsibilities, and team..."
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (Comma Separated)</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <CheckSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="requirements"
                    required
                    rows={3}
                    value={formData.requirements}
                    onChange={handleChange}
                    className="pl-10 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 3+ years React, MongoDB, REST APIs, Git"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Publishing Job...' : 'Publish Job Listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;