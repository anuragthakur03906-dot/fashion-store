// Loading spinner component
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-beige-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 bg-beige-100 dark:bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;