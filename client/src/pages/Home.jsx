import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, MapPin, Calendar, ArrowRight } from 'lucide-react';
import FilterBar from '../components/layout/FilterBar';
import JobCardSkeleton from '../components/layout/JobCardSkeleton';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: 'All',
    remote: false
  });

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/jobs', { params: filters });
        setJobs(response.data.data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchJobs();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Find Your Dream Job</h1>
          <p className="mt-4 text-xl text-gray-500">Thousands of jobs in the tech industry are waiting for you.</p>
        </div>

        <FilterBar onFilterChange={handleFilterChange} />

        {/* LOADING STATE: Show 6 Skeletons in a Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <JobCardSkeleton key={n} isRecruiter={false} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center mt-6">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => setFilters({ search: '', location: 'All', remote: false })}
              className="mt-6 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h2>
                  <p className="text-blue-600 font-medium mb-4">{job.company}</p>
                  
                  <div className="space-y-2 mb-6">
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
                
                <Link
                  to={`/jobs/${job._id}`}
                  className="mt-auto w-full inline-flex justify-center items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  View Details <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;