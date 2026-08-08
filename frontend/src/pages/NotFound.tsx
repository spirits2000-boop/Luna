import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-gray-400">Page not found</p>
      </div>
    </div>
  );
};

export default NotFound;