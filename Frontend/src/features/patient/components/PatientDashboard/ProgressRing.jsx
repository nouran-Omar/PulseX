import { useEffect, useState } from 'react';

const ProgressRing = ({ percentage = 25 }) => {
  const [animated, setAnimated] = useState(false);
  const r = 44;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (animated ? (percentage / 100) * circumference : circumference);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative size-24 sm:size-28 flex items-center justify-center shrink-0">
      <svg className="size-24 sm:size-28 -rotate-90" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r={r} fill="none" stroke="#F0F0F0" strokeWidth="9" />
        <circle
          cx="56"
          cy="56"
          r={r}
          fill="none"
          stroke="#333CF5"
          strokeWidth="9"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <span className="absolute text-xl sm:text-2xl font-semibold font-['Roboto'] text-black-main-text">{percentage}%</span>
    </div>
  );
};

export default ProgressRing;
