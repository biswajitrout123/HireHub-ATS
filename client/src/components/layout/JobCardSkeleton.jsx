import React from 'react';

const JobCardSkeleton = ({ isRecruiter = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full animate-pulse">
      <div className="flex-1">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4"></div>
        {/* Company Skeleton */}
        <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-8"></div>
        
        {/* Details Skeleton (Location, Salary, Date) */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-200"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-200"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-200"></div>
            <div className="h-3 bg-gray-200 rounded w-2/5"></div>
          </div>
        </div>
      </div>
      
      {/* Bottom Button(s) Skeleton */}
      <div className={`mt-auto pt-4 ${isRecruiter ? 'flex gap-3 border-t border-gray-100' : ''}`}>
        {isRecruiter ? (
          <>
            <div className="h-10 bg-gray-200 rounded-md flex-1"></div>
            <div className="h-10 bg-gray-200 rounded-md w-12"></div>
          </>
        ) : (
          <div className="h-10 bg-gray-200 rounded-md w-full"></div>
        )}
      </div>
    </div>
  );
};

export default JobCardSkeleton;