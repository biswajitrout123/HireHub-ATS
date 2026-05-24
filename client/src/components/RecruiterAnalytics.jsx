import React, { useState, useEffect } from 'react';
import api from '../api/axios'; // 🌟 NEW: Using our clean interceptor!
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Briefcase, Users, CheckCircle } from 'lucide-react';

const RecruiterAnalytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // 🌟 NEW: Look how incredibly clean this request is now!
        const res = await api.get('/applications/analytics');
        setData(res.data);
      } catch (error) {
        console.error("Failed to load analytics");
      }
    };
    fetchAnalytics();
  }, []);

  if (!data) return <div className="animate-pulse h-64 bg-gray-200 rounded-xl mb-8"></div>;

  return (
    <div className="mb-10 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Pipeline Analytics</h2>
      
      {/* Top Stats Cards - Fully Responsive Stack */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-lg"><Briefcase className="w-8 h-8"/></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Jobs Posted</p>
            <p className="text-3xl font-bold text-gray-900">{data.stats.totalJobs}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-lg"><Users className="w-8 h-8"/></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Applicants</p>
            <p className="text-3xl font-bold text-gray-900">{data.stats.totalApplicants}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-green-50 text-green-600 rounded-lg"><CheckCircle className="w-8 h-8"/></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Candidates Hired</p>
            <p className="text-3xl font-bold text-gray-900">{data.stats.totalAccepted}</p>
          </div>
        </div>
      </div>

      {/* The Recharts Bar Chart - Protected by ResponsiveContainer */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-96">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Candidate Pipeline Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} allowDecimals={false} />
            <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
            <Bar dataKey="candidates" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RecruiterAnalytics;