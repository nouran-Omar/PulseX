import React from 'react';

const StatCard = ({ icon, label, value, sub, gradient }) => (
  <div className="bg-white rounded-[16px] p-5 flex flex-col items-start gap-4 border border-gray-100 shadow-sm transition-all hover:shadow-md">
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xl shrink-0"
      style={{ background: gradient }}
    >
      {icon}
    </div>

    <div className="flex flex-col gap-1 min-w-0">
      <span className="text-[30px] sm:text-[24px] font-bold text-[#101828] leading-tight">
        {(value ?? 0).toLocaleString()}
      </span>
      <span className="text-[14px] font-semibold text-[#101828]">{label}</span>
      <span className="text-[12px] text-[#6A7282]">{sub}</span>
    </div>
  </div>
);

export default StatCard;
