import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Menu, X, LogOut } from 'lucide-react';

import { AuthContext } from '../../context/AuthContext';



const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 
  const { user } = useContext(AuthContext); 
  const token = localStorage.getItem('token');
  
  // Logic: Is there a logged-in user, and is their role 'recruiter'?
  const isRecruiter = user?.role === 'recruiter'; 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Also clear user data
    window.location.href = '/login'; // Force refresh to clear state
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={isRecruiter ? '/recruiter/dashboard' : '/dashboard'} className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg"><Briefcase className="h-5 w-5 text-white" /></div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">SmartJobPortal</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {token ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600">All Jobs</Link>
                {isRecruiter ? (
                  <>
                    <Link to="/recruiter/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600">My Dashboard</Link>
                    <Link to="/recruiter/create-job" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg">Post a Job</Link>
                  </>
                ) : (
                  <Link to="/my-applications" className="text-sm font-medium text-gray-600 hover:text-blue-600">My Applications</Link>
                )}
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500"><LogOut className="h-5 w-5" /></button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-600">Log in</Link>
                <Link to="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;