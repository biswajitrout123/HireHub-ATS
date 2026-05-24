import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // 🌟 NEW: State to track if mobile menu is open

  // Basic auth check (You can adjust this if you are using Context)
  const token = localStorage.getItem('token');
  
  // For this ATS, we assume if they have a recruiter route, they are a recruiter.
  // In a real app, you might decode the JWT to check the role exactly.
  const isRecruiter = true; // Replace with your actual user role state if you have one

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* LEFT SIDE: Logo */}
          <div className="flex items-center">
            <Link to={isRecruiter ? '/recruiter/dashboard' : '/dashboard'} className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">SmartJobPortal</span>
            </Link>
          </div>

          {/* RIGHT SIDE: Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-6">
            {token ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">All Jobs</Link>
                {isRecruiter ? (
                  <>
                    <Link to="/recruiter/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">My Dashboard</Link>
                    <Link to="/recruiter/create-job" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Post a Job
                    </Link>
                  </>
                ) : (
                  <Link to="/my-applications" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">My Applications</Link>
                )}
                
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors" title="Logout">
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Log in</Link>
                <Link to="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Sign up</Link>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON (Hidden on Desktop) */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-900 focus:outline-none p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROP-DOWN MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {token ? (
            <>
              <Link to="/dashboard" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">All Jobs</Link>
              {isRecruiter ? (
                <>
                  <Link to="/recruiter/dashboard" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">My Dashboard</Link>
                  <Link to="/recruiter/create-job" onClick={toggleMenu} className="block px-3 py-3 mt-2 rounded-md text-base font-medium bg-blue-600 text-white text-center">Post a Job</Link>
                </>
              ) : (
                <Link to="/my-applications" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">My Applications</Link>
              )}
              <button onClick={() => { handleLogout(); toggleMenu(); }} className="w-full text-left flex items-center px-3 py-3 mt-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">
                <LogOut className="h-5 w-5 mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Log in</Link>
              <Link to="/register" onClick={toggleMenu} className="block px-3 py-3 mt-2 rounded-md text-base font-medium bg-blue-600 text-white text-center">Sign up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;