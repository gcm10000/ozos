'use client';

import React from 'react';

const FullScreenLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white border-solid" />
    </div>
  );
};

export default FullScreenLoader;
