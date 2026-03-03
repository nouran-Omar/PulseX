import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 text-[12px]">
      <p className="font-bold text-black-main-text mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-500">{entry.name}:</span>
          <span className="font-bold ml-auto" style={{ color: entry.color }}>
            {entry.value}
            {entry.dataKey === 'heartRate' ? ' bpm' : entry.dataKey === 'oxygenLevel' ? '%' : ' mg/dl'}
          </span>
        </div>
      ))}
    </div>
  );
};

const METRICS = [
  { key: 'heartRate',   label: 'Heart Rate',   color: '#4F46E5', active: true  },
  { key: 'bloodSugar',  label: 'Blood Sugar',  color: '#00A63E', active: true  },
  { key: 'oxygenLevel', label: 'Oxygen Level', color: '#8B5CF6', active: false },
];

const PatientWeeklyChart = ({ weeklyData }) => {
  const [activeMetrics, setActiveMetrics] = useState(
    METRICS.filter((m) => m.active).map((m) => m.key)
  );

  const toggle = (key) =>
    setActiveMetrics((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  return (
    <div className="bg-white rounded-[22px] border border-gray-100 shadow-sm p-5 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[14px] font-bold text-black-main-text">Weekly Health Overview</h3>
          <p className="text-[12px] text-gray-400 mt-0.5">Analyze how your heart health improves throughout the week</p>
        </div>
        <span className="text-[11px] font-semibold text-[#155DFC] bg-blue-50 px-3 py-1 rounded-full">This Week</span>
      </div>

      {/* Metric toggle pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {METRICS.map((m) => {
          const isOn = activeMetrics.includes(m.key);
          return (
            <button
              key={m.key}
              onClick={() => toggle(m.key)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-[12px] font-semibold text-gray-500 cursor-pointer transition-all"
              style={isOn ? { borderColor: m.color, color: m.color, background: m.color + '12' } : {}}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: isOn ? m.color : '#d1d5db' }} />
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="mt-2">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {METRICS.map((m) => (
                <linearGradient key={m.key} id={`grad-${m.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={m.color} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={m.color} stopOpacity={0.02} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: '#7d7d7d', fontWeight: 500, fontFamily: 'Roboto' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#7d7d7d', fontFamily: 'Roboto' }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              ticks={[0, 10, 20, 50, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            {METRICS.map(
              (m) =>
                activeMetrics.includes(m.key) && (
                  <Area
                    key={m.key}
                    type="monotone"
                    dataKey={m.key}
                    name={m.label}
                    stroke={m.color}
                    strokeWidth={2.5}
                    fill={`url(#grad-${m.key})`}
                    dot={false}
                    activeDot={{ r: 5, fill: m.color, stroke: '#fff', strokeWidth: 2 }}
                  />
                )
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PatientWeeklyChart;
