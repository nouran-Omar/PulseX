const Point = ({ x, y }) => (
  <circle cx={x} cy={y} r="3" fill="#fff" stroke="#8B5CF6" strokeWidth="2" />
);

const WeeklyOverviewCard = ({ hasData }) => {
  if (!hasData) {
    return (
      <section className="rounded-3xl border border-[#E6EAF0] bg-white p-4 sm:p-5" aria-labelledby="weekly-overview-title-empty">
        <h2 id="weekly-overview-title-empty" className="text-[24px] font-bold text-black-main-text">Weekly Overview</h2>
        <p className="text-[18px] text-[#6B7280]">Patient visits throughout the week</p>
        <div className="mt-6 rounded-2xl bg-[#F8FAFC] p-6 text-center">
          <div className="mx-auto mb-3 h-14 w-14 rounded-xl bg-[#E2E8F0]" />
          <p className="text-[22px] font-bold text-black-main-text">No Visit Data Available</p>
          <p className="mt-2 text-[14px] text-[#6B7280]">Your weekly patient visit statistics will appear here once you start seeing patients and recording appointments.</p>
          <div className="mx-auto mt-4 max-w-[370px] rounded-xl bg-[#EAF2FF] px-4 py-3 text-left text-[12px] text-[#374151]">
            <p className="font-semibold text-[#1D4ED8]">To see data here:</p>
            <p className="mt-1">- Add patients to your patient list</p>
            <p>- Schedule and complete appointments</p>
            <p>- Track patient visits over time</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-[#E6EAF0] bg-white p-4 sm:p-5" aria-labelledby="weekly-overview-title">
      <div className="flex items-center justify-between">
        <h2 id="weekly-overview-title" className="text-[24px] font-bold text-black-main-text">Weekly Overview</h2>
        <button type="button" className="text-[24px] leading-none text-[#9CA3AF]">...</button>
      </div>

      <div className="mt-4 rounded-2xl border border-[#EEF2F7] bg-gradient-to-b from-white to-[#F8F5FF] px-3 py-4">
        <svg viewBox="0 0 560 210" className="h-[180px] w-full">
          <defs>
            <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4EA6FF" />
              <stop offset="100%" stopColor="#FF4FD8" />
            </linearGradient>
            <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#8B5CF6" floodOpacity="0.25" />
            </filter>
          </defs>
          <line x1="10" y1="30" x2="555" y2="30" stroke="#0F172A" strokeOpacity="0.08" strokeWidth="1" />
          <line x1="10" y1="65" x2="555" y2="65" stroke="#0F172A" strokeOpacity="0.08" strokeWidth="1" />
          <line x1="10" y1="100" x2="555" y2="100" stroke="#0F172A" strokeOpacity="0.08" strokeWidth="1" />
          <line x1="10" y1="135" x2="555" y2="135" stroke="#0F172A" strokeOpacity="0.08" strokeWidth="1" />
          <line x1="10" y1="170" x2="555" y2="170" stroke="#0F172A" strokeOpacity="0.08" strokeWidth="1" />
          <line x1="286" y1="89" x2="286" y2="198" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.85" />
          <path
            d="M8 92 C 28 110, 40 140, 58 138 C 78 136, 90 86, 108 78 C 126 72, 142 122, 158 126 C 176 130, 190 116, 208 128 C 226 140, 242 164, 258 150 C 272 138, 278 102, 286 89 C 298 72, 318 172, 330 168 C 346 163, 364 126, 384 124 C 402 122, 414 133, 430 120 C 448 106, 468 62, 486 58 C 503 54, 520 100, 532 86 C 542 74, 548 58, 555 48"
            fill="none"
            stroke="url(#line)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lineGlow)"
          />
          <Point x="108" y="78" />
          <Point x="208" y="128" />
          <Point x="286" y="89" />
          <Point x="384" y="124" />
          <Point x="486" y="58" />
          <rect x="250" y="25" width="72" height="46" rx="10" fill="#3340EE" />
          <text x="286" y="44" textAnchor="middle" fill="#fff" fontSize="10">Visits</text>
          <text x="286" y="62" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700">45</text>
        </svg>
        <div className="mt-1 grid grid-cols-[20px_1fr] gap-2 text-[10px] text-[#6B7280]">
          <div className="space-y-[17px] pt-1">
            <p className="text-right">100</p>
            <p className="text-right">80</p>
            <p className="text-right">60</p>
            <p className="text-right">40</p>
            <p className="text-right">20</p>
            <p className="text-right">0</p>
          </div>
          <div className="mt-2 grid grid-cols-8 text-center text-[11px] text-[#9CA3AF]">
            <span>10am</span><span>11am</span><span>12pm</span><span>01pm</span><span>02pm</span><span>03pm</span><span>04pm</span><span>05pm</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklyOverviewCard;
