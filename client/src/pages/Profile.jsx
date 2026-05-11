import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, FileText, Upload, Save, CheckCircle } from 'lucide-react';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    skills: '',
    resumeUrl: ''
  });

  const getToken = () => localStorage.getItem('token') || '';

  // 1. Fetch current profile data on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${getToken()}` } };
        // Assuming your backend has a route to get the current user's details
        const response = await axios.get('http://localhost:3000/api/auth/me', config);
        const user = response.data.data;
        
        setFormData({
          name: user.name || '',
          email: user.email || '',
          bio: user.bio || '',
          // Convert array of skills back to a comma-separated string for the input field
          skills: user.skills ? user.skills.join(', ') : '',
          resumeUrl: user.resumeUrl || ''
        });
      } catch (error) {
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // 2. Handle input typing
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit profile updates to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const config = { headers: { Authorization: `Bearer ${getToken()}` } };
      
      await axios.put('http://localhost:3000/api/auth/profile', {
        bio: formData.bio,
        skills: formData.skills,
        resumeUrl: formData.resumeUrl
      }, config);
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
      setIsSaving(false);
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
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-sm text-gray-600">Update your personal details and resume to stand out to recruiters.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Basic Info (Read Only) */}
            <div className="flex items-center gap-4 pb-8 border-b border-gray-100">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
                <p className="text-gray-500">{formData.email}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                  Job Seeker Account
                </span>
              </div>
            </div>

            {/* Editable Profile Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell recruiters about your experience and career goals..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills (Comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. React, Node.js, MongoDB, Express"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                />
              </div>

              {/* Resume Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume (PDF Link)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="space-y-2 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      {/* For now, this is a text input for the ImageKit URL. 
                          We will upgrade this to a real file uploader next! */}
                      <input
                        type="text"
                        name="resumeUrl"
                        value={formData.resumeUrl}
                        onChange={handleChange}
                        placeholder="Paste your ImageKit or Google Drive PDF URL here"
                        className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Ensure your link is publicly viewable</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-colors"
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="h-5 w-5 mr-2" />
                )}
                {isSaving ? 'Saving Changes...' : 'Save Profile'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;