import React from 'react';

export const ApplicationSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-pulse flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Fake Job Details */}
      <div className="flex-1 space-y-3">
        {/* Fake Job Title */}
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        {/* Fake Company Name */}
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        
        {/* Fake Meta Info (Location, Date) */}
        <div className="flex gap-4 pt-2">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-28"></div>
        </div>
      </div>

      {/* Fake Status Badge and Link */}
      <div className="flex items-center gap-4 sm:flex-col sm:items-end space-y-2">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-16 hidden sm:block"></div>
      </div>
    </div>
  );
};