import React, { useState, useEffect } from 'react';
import { HiOutlineBell } from 'react-icons/hi2';
import { FiCalendar, FiClock } from 'react-icons/fi';

const DoctorHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center justify-between w-full h-full">
      {/* Date & Time */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <FiCalendar className="text-[#333CF5] text-lg" />
          <span className="text-sm font-bold text-slate-700">
            Sunday, February 15, 2026
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FiClock className="text-green-500 text-lg" />
          <span className="text-sm font-bold text-slate-700">
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Profile & Notifications */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-400 hover:text-slate-700 transition-colors">
          <HiOutlineBell className="text-2xl" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-gray-200">
            {/* صورة الدكتورة في الـ Header */}
            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100&h=100" alt="Dr. Noha Salem" className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-slate-800">Noha Salem</p>
            <p className="text-xs text-gray-500">Doctor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHeader;