import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobDetails from './pages/JobDetails';
import CreateJob from './pages/CreateJob';
import RecruiterDashboard from './pages/RecruiterDashboard';
import JobApplicants from './pages/JobApplicants';
import MyApplications from './pages/MyApplications'; 
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        
        <Route path="/my-applications" element={<MyApplications />} />
        
        {/* Recruiter Routes */}
        {/* FIX: Updated this path to match your dashboard button exactly! */}
        <Route path="/recruiter/create-job" element={<CreateJob />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/jobs/:id/applicants" element={<JobApplicants />} />
      </Routes>
    </Router>
  );
}

export default App;