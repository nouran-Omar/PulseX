import React from 'react';

const Skeleton = () => (
  <div className="flex items-center gap-3 py-3 animate-pulse">
    <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-3/4" />
      <div className="h-2.5 bg-gray-100 rounded w-1/2" />
    </div>
    <div className="w-12 h-7 bg-gray-200 rounded-lg" />
  </div>
);

export default Skeleton;
