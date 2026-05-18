import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, LogOut, User as UserIcon } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2 group">
              <div className="bg-blue-600 text-white p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                SmartJobPortal
              </span>
            </Link>
          </div>

          {/* User Actions Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* CONDITIONAL RENDER: Recruiter Links */}
                {user.role === 'recruiter' && (
                  <div className="hidden sm:flex items-center gap-4 mr-2">
                    
                    {/* NEW EXPLICIT BACK BUTTON / HOME LINK */}
                    <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                      All Jobs
                    </Link>

                    <Link to="/recruiter/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                      My Jobs
                    </Link>
                    
                    <Link to="/recruiter/create-job" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                      Post a Job
                    </Link>
                  </div>
                )}

                {/* CONDITIONAL RENDER: Standard User Links */}
                {user.role === 'user' && (
                  <div className="hidden sm:flex items-center mr-2">
                    <Link to="/my-applications" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                      My Applications
                    </Link>
                  </div>
                )}

                {/* User Badge */}
                <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                  <UserIcon className="w-4 h-4 text-gray-500" />
                  {user.name}
                  <span className="ml-1 text-xs text-gray-400 uppercase tracking-wider bg-white px-2 py-0.5 rounded-md shadow-sm">
                    {user.role}
                  </span>
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Sign In
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;