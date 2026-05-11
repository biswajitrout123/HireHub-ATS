import React from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';

const FilterBar = ({ onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-center">
      
      {/* Text Search */}
      <div className="flex-1 min-w-[200px] relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search job titles or companies..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
      </div>

      {/* Location Filter */}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <select 
          className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm appearance-none bg-white cursor-pointer"
          onChange={(e) => onFilterChange('location', e.target.value)}
        >
          <option value="All">All Locations</option>
          <option value="Remote">Remote</option>
          <option value="BBSR">Bhubaneswar (BBSR)</option>
          <option value="Deradun">Deradun</option>
        </select>
      </div>

      {/* Remote Toggle */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input 
          type="checkbox" 
          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" 
          onChange={(e) => onFilterChange('remote', e.target.checked)}
        />
        <span className="text-sm font-medium text-gray-700">Remote Only</span>
      </label>
    </div>
  );
};

export default FilterBar;