import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { day: 'Mon', value: 30 },
  { day: 'Tue', value: 85 },
  { day: 'Wed', value: 45 },
  { day: 'Thu', value: 90 },
  { day: 'Fri', value: 55 },
  { day: 'Sat', value: 20 },
  { day: 'Sun', value: 95 },
];

const PatientWeeklyChart = () => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Header section */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[18px] font-bold text-black-main-text leading-tight font-['Roboto']">
            Weekly Health Overview
          </h3>
          <p className="text-[13px] text-gray-text-dim2 mt-1 font-['Roboto']">
            Analyze how your heart health improves throughout the week
          </p>
        </div>
        <span className="text-[14px] text-gray-text-dim2 font-medium font-['Roboto']">
          This Week
        </span>
      </div>

      {/* Chart Container */}
      <div className="flex-1 w-full min-h-45">
        <ResponsiveContainer width="100%" height="250">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4850E9" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#45D0EE " stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#7D7D7D', fontSize: 11, fontWeight: 400 }}
              dy={10}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              domain={[0, 100]} 
              ticks={[0, 20, 40, 60, 80, 100]} 
              tick={{ fill: '#7D7D7D', fontSize: 11 }}
            />

            <Tooltip 
              cursor={{ stroke: '#4850E9', strokeWidth: 1, strokeDasharray: '4 4' }}
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontSize: '12px',
                fontFamily: 'Roboto'
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              strokeWidth={0}
              fillOpacity={1}
              fill="url(#chartGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PatientWeeklyChart;