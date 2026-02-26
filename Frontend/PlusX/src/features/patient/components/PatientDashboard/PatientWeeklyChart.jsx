import React, { useState } from 'react';
import styles from './PatientWeeklyChart.module.css';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

/* ─── Custom Tooltip ────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className={styles.tooltipRow}>
          <span className={styles.tooltipDot} style={{ backgroundColor: entry.color }} />
          <span className={styles.tooltipKey}>{entry.name}:</span>
          <span className={styles.tooltipVal} style={{ color: entry.color }}>
            {entry.value}
            {entry.dataKey === 'heartRate' ? ' bpm' : entry.dataKey === 'oxygenLevel' ? '%' : ' mg/dl'}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ─── Metric definitions ─────────────────────────── */
const METRICS = [
  { key: 'heartRate',   label: 'Heart Rate',   color: '#4F46E5', active: true  },
  { key: 'bloodSugar',  label: 'Blood Sugar',  color: '#00A63E', active: true  },
  { key: 'oxygenLevel', label: 'Oxygen Level', color: '#8B5CF6', active: false },
];

/* ─────────────────────────────────────────────────── */
const PatientWeeklyChart = ({ weeklyData }) => {
  const [activeMetrics, setActiveMetrics] = useState(
    METRICS.filter((m) => m.active).map((m) => m.key)
  );

  const toggle = (key) =>
    setActiveMetrics((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Weekly Health Overview</h3>
          <p className={styles.subtitle}>Analyze how your heart health improves throughout the week</p>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.thisWeek}>This Week</span>
        </div>
      </div>

      {/* Metric toggle pills */}
      <div className={styles.pills}>
        {METRICS.map((m) => {
          const isOn = activeMetrics.includes(m.key);
          return (
            <button
              key={m.key}
              onClick={() => toggle(m.key)}
              className={`${styles.pill} ${isOn ? styles.pillActive : ''}`}
              style={isOn ? { borderColor: m.color, color: m.color, background: m.color + '12' } : {}}
            >
              <span className={styles.pillDot} style={{ background: isOn ? m.color : '#d1d5db' }} />
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <div className={styles.chartArea}>
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
