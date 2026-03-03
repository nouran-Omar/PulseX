import React from 'react';
import { useNavigate } from 'react-router-dom';
import usePatientData from '../../../../PatientHooks/usePatientData';
import PatientWeeklyChart from '../../components/PatientDashboard/PatientWeeklyChart';
import { FaHeartPulse } from 'react-icons/fa6';
import {
  HiOutlineCalendarDays, HiOutlineQrCode, HiOutlineSparkles,
  HiOutlineLightBulb, HiOutlineExclamationTriangle,
  HiOutlineArrowRight, HiOutlineClipboardDocumentCheck, HiOutlineCheckCircle,
} from 'react-icons/hi2';
import { TbDroplet, TbLungs } from 'react-icons/tb';
import { HiOutlineBeaker } from 'react-icons/hi';
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md';

/* ── Mini chart paths ── */
const BLOOD_PRESSURE_PATH = "M0,22 C8,22 12,8 20,12 C30,17 34,26 44,14 C52,5 56,18 60,18 L60,30 L0,30 Z";
const BLOOD_SUGAR_PATH    = "M0,24 C8,24 12,14 20,16 C28,18 32,8 42,10 C50,12 56,20 60,18 L60,30 L0,30 Z";
const BLOOD_COUNT_PATH    = "M0,20 C8,20 14,10 24,12 C34,14 38,22 48,16 C54,12 57,16 60,16 L60,30 L0,30 Z";

const MiniChart = ({ path, color, gradId }) => (
  <svg className="w-full h-[30px]" viewBox="0 0 60 30" preserveAspectRatio="none">
    <defs>
      <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor={color} stopOpacity="0.35" />
        <stop offset="100%" stopColor={color} stopOpacity="0"    />
      </linearGradient>
    </defs>
    <path d={path} stroke={color} strokeWidth="1.8" fill={`url(#${gradId})`} />
  </svg>
);

/* ── Stat Card ── */
const StatCard = ({ label, value, unit, status, isHeartRate, isLow, chartSlot, icon }) => (
  <div className={`rounded-[16px] overflow-hidden ${isHeartRate ? '' : 'bg-white border border-gray-100 shadow-sm'}`}
    style={isHeartRate ? { background: 'linear-gradient(180deg, #333CF5 0%, #0913C3 100%)' } : {}}>
    {isHeartRate ? (
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold text-white/70">{label}</p>
            <p className="text-[22px] font-extrabold text-white leading-tight">{value} <span className="text-[13px] font-semibold text-white/60">{unit}</span></p>
            <span className="text-[10px] font-semibold text-[#00DEA3] bg-[#00DEA3]/15 px-2 py-0.5 rounded-full">{status}</span>
          </div>
          <img src="/image/Heartratetop.svg" alt="heart" className="w-10 h-10 object-contain opacity-80" onError={e => { e.target.style.display = 'none'; }} />
        </div>
        <svg className="w-full h-[36px]" viewBox="0 0 160 36" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#00DEA3" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00DEA3" stopOpacity="0"   />
            </linearGradient>
          </defs>
          <path d="M0,28 C12,28 16,10 28,14 C40,18 44,30 58,20 C70,12 76,6 90,16 C104,26 110,32 124,22 C136,14 142,18 160,18 L160,36 L0,36 Z" fill="url(#waveGrad)" />
          <path d="M0,28 C12,28 16,10 28,14 C40,18 44,30 58,20 C70,12 76,6 90,16 C104,26 110,32 124,22 C136,14 142,18 160,18" stroke="#00DEA3" strokeWidth="2" fill="none" />
        </svg>
      </div>
    ) : (
      <div className="p-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold text-gray-400">{label}</p>
          {icon && <span className="text-gray-300 text-[16px]">{icon}</span>}
        </div>
        {chartSlot && <div className="w-full">{chartSlot}</div>}
        <p className="text-[20px] font-extrabold text-black-main-text leading-tight">{value} <span className="text-[11px] font-semibold text-gray-400">{unit}</span></p>
        <span className="self-start text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ color: isLow ? '#F23985' : '#20E56F', background: isLow ? '#FDE8F0' : '#E6FBF0' }}>
          {status}
        </span>
      </div>
    )}
  </div>
);

/* ── Stars ── */
const Stars = ({ count }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(i => i <= count
      ? <MdOutlineStar key={i} className="text-[#F59E0B] text-[13px]" />
      : <MdOutlineStarBorder key={i} className="text-gray-300 text-[13px]" />
    )}
  </div>
);

/* ── Risk Ring ── */
const RiskRing = ({ score, color }) => {
  const r = 44; const circ = 2 * Math.PI * r;
  return (
    <div className="relative w-[110px] h-[110px] shrink-0">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="#f1f3f5" strokeWidth="8" />
        <circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ - (score / 100) * circ}
          transform="rotate(-90 55 55)" style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[18px] font-extrabold leading-none" style={{ color }}>{score}%</span>
        <span className="text-[10px] text-gray-400">Risk</span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   PatientDashboard
═══════════════════════════════════════════ */
const PatientDashboard = () => {
  const { patient, isLoading, hasVitals } = usePatientData();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#155dfc]">
        <FaHeartPulse className="text-[40px] animate-pulse" />
        <p className="text-[14px] font-semibold text-gray-500">Loading your health data…</p>
      </div>
    );
  }

  const v = patient.vitals;

  return (
    <section className="flex flex-col gap-6 p-5" aria-label="Patient Dashboard">

      {/* ── Welcome ── */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[18px] font-bold text-black-main-text">Welcome Back, {patient.name} 👋</h2>
        <p className="text-[13px] text-gray-500">Here's an overview of your current heart health status.</p>
      </div>

      {/* ── Main Grid: left col + right col ── */}
      <div className="flex flex-col xl:flex-row gap-6">

        {/* ── Left Column ── */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">

          {/* Stat Cards */}
          {hasVitals ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Heart Rate" value={v.heartRate.value} unit="bpm" status="Normal" isHeartRate />
              <StatCard label="Blood Pressure" value={v.bloodPressure.display} unit="mmHg" status={v.bloodPressure.status} isLow icon={<TbDroplet />} chartSlot={<MiniChart path={BLOOD_PRESSURE_PATH} color="#F23985" gradId="bpGrad" />} />
              <StatCard label="Blood Sugar" value={v.bloodSugar.value} unit="mg/dl" status={v.bloodSugar.status} icon={<HiOutlineBeaker />} chartSlot={<MiniChart path={BLOOD_SUGAR_PATH} color="#00DEA3" gradId="bsGrad" />} />
              <StatCard label="Blood Count" value={v.bloodCount?.value ?? 40} unit="g/dl" status={v.bloodCount?.status ?? 'Normal'} icon={<FaHeartPulse />} chartSlot={<MiniChart path={BLOOD_COUNT_PATH} color="#00DEA3" gradId="bcGrad" />} />
            </div>
          ) : (
            <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-6 flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#155dfc0d] text-[#155dfc] flex items-center justify-center text-[24px]"><HiOutlineCalendarDays /></div>
              <h3 className="text-[15px] font-bold text-black-main-text">No Vital Signs Recorded Yet</h3>
              <p className="text-[13px] text-gray-500 max-w-sm">Your vital signs haven't been recorded yet. To get your health data:</p>
              <ul className="text-left flex flex-col gap-2 text-[13px] text-gray-600">
                <li className="flex items-center gap-2"><HiOutlineCalendarDays className="text-[#155dfc] shrink-0" /> Book an appointment with a doctor</li>
                <li className="flex items-center gap-2"><HiOutlineClipboardDocumentCheck className="text-[#155dfc] shrink-0" /> Complete your health checkup</li>
                <li className="flex items-center gap-2"><FaHeartPulse className="text-[#155dfc] shrink-0" /> Doctor will record your vital signs after examination</li>
              </ul>
              <button className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white bg-[#155dfc] rounded-[10px] hover:bg-[#0913C3] transition-colors mt-1" onClick={() => navigate('/patient/doctors')}>
                <HiOutlineCalendarDays /> Book Appointment
              </button>
            </div>
          )}

          {/* Weekly Chart */}
          <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-5">
            {hasVitals ? (
              <PatientWeeklyChart weeklyData={patient.weeklyData} />
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-[15px] font-bold text-black-main-text">Weekly Health Overview</h3>
                  <p className="text-[12px] text-gray-400 mt-0.5">Analyze how your heart health improves throughout the week</p>
                </div>
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <span className="text-[40px]">📈</span>
                  <p className="text-[14px] font-bold text-black-main-text">No Health Data Available</p>
                  <p className="text-[12px] text-gray-500 max-w-sm">Your weekly health overview will appear here once you have completed your health assessment and started tracking your vitals.</p>
                  <div className="bg-[#F6F7F8] rounded-[12px] p-4 text-left text-[12px] text-gray-600 mt-2 w-full max-w-sm">
                    <p className="font-bold text-black-main-text mb-1 flex items-center gap-1"><HiOutlineLightBulb className="text-[#155dfc]" /> Get started:</p>
                    <ul className="flex flex-col gap-1 list-disc pl-4">
                      <li>Complete Heart Risk Assessment</li>
                      <li>Book an appointment with a doctor</li>
                      <li>Track your daily health metrics</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Row: QR+AI + Doctors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* QR + AI */}
            <div className="flex flex-col gap-3">
              <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-4 flex items-center justify-between cursor-pointer hover:border-[#155dfc]/30 transition-colors" onClick={() => navigate('/patient/qr')} role="button" tabIndex={0}>
                <div className="flex items-center gap-3">
                  <HiOutlineQrCode className="text-[24px] text-[#155dfc] shrink-0" />
                  <div>
                    <p className="text-[13px] font-bold text-black-main-text">QR Code</p>
                    <p className="text-[11px] text-gray-400">Quick access to your medical records</p>
                  </div>
                </div>
                <HiOutlineArrowRight className="text-gray-400 text-[16px]" />
              </div>
              <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                <div>
                  <p className="text-[13px] font-bold text-black-main-text">AI Model: Active</p>
                  <p className="text-[11px] text-gray-400">(Heart risk analysis working fine)</p>
                </div>
              </div>
              <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
                <span className="text-[12px] font-semibold text-gray-500">⚙️ With Accuracy: 98%</span>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#155dfc] rounded-full" style={{ width: '98%' }} />
                </div>
              </div>
            </div>

            {/* Doctors List */}
            <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-black-main-text">Doctors List</span>
                <button className="flex items-center gap-1 text-[12px] font-semibold text-[#155dfc] hover:underline" onClick={() => navigate('/patient/doctors')}>View More <HiOutlineArrowRight /></button>
              </div>
              <div className="flex flex-col gap-3">
                {patient.featuredDoctors.map(doc => (
                  <div key={doc.id} className="flex items-center gap-3">
                    <img src={doc.img} alt={doc.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-black-main-text truncate">{doc.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{doc.location}</p>
                    </div>
                    <Stars count={doc.rating} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="w-full xl:w-[280px] shrink-0 flex flex-col gap-4">

          {/* Health Summary */}
          <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
            <h3 className="text-[14px] font-bold text-black-main-text">Health Summary</h3>
            {hasVitals && patient.aiRisk ? (
              <div className="flex items-center gap-4">
                <RiskRing score={patient.aiRisk.score} color={patient.aiRisk.color} />
                <div className="flex flex-col gap-2 min-w-0">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-gray-400">AI Risk Score</span>
                    <span className="text-[12px] font-bold px-2 py-0.5 rounded-full self-start" style={{ color: patient.aiRisk.color, background: patient.aiRisk.color + '18' }}>{patient.aiRisk.level} Risk</span>
                  </div>
                  <p className="text-[11px] text-gray-500">Your heart condition is stable. Keep following your daily plan.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-4 text-center">
                <HiOutlineExclamationTriangle className="text-[32px] text-amber-400" />
                <p className="text-[13px] font-bold text-black-main-text">No Risk Assessment</p>
                <p className="text-[11px] text-gray-500">Complete your Heart Risk Assessment to get your personalized AI risk score.</p>
                <button className="flex items-center gap-2 px-4 py-2 text-[12px] font-semibold text-white bg-[#155dfc] rounded-[10px] hover:bg-[#0913C3] transition-colors mt-1" onClick={() => navigate('/patient/heart-risk')}>
                  <FaHeartPulse /> Start Assessment
                </button>
              </div>
            )}
          </div>

          {/* Smart Recommendation */}
          <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
            <h3 className="text-[14px] font-bold text-black-main-text">Smart Recommendation</h3>
            {hasVitals && patient.aiRisk?.recommendations?.length ? (
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {patient.aiRisk.recommendations.slice(0, 3).map((rec, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[12px] text-gray-600">
                    <span className="text-[16px] shrink-0">{i === 0 ? '🥗' : i === 1 ? '🚶' : '😴'}</span>
                    {rec}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center gap-2 py-4 text-center">
                <HiOutlineLightBulb className="text-[32px] text-[#155dfc]" />
                <p className="text-[13px] font-bold text-black-main-text">No Recommendations Yet</p>
                <p className="text-[11px] text-gray-500">Complete your risk assessment to receive personalized health recommendations.</p>
                <div className="bg-[#F6F7F8] rounded-[10px] p-3 text-left text-[11px] text-gray-600 w-full mt-1">
                  <p className="font-bold text-black-main-text mb-1">You'll receive recommendations like:</p>
                  <ul className="flex flex-col gap-0.5">
                    <li>· Dietary suggestions based on your health</li>
                    <li>· Exercise routines tailored for you</li>
                    <li>· Sleep and lifestyle improvements</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-black-main-text">Upcoming Appointments</h3>
              <button className="flex items-center gap-1 text-[12px] font-semibold text-[#155dfc] hover:underline" onClick={() => navigate('/patient/appointments')}>View More <HiOutlineArrowRight /></button>
            </div>
            {patient.appointments?.length > 0 ? (
              <div className="flex flex-col gap-3">
                {patient.appointments.slice(0, 2).map(apt => (
                  <div key={apt.id} className="flex items-center gap-3">
                    <img src={apt.img} alt={apt.doctor} className="w-9 h-9 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-bold text-black-main-text truncate">{apt.doctor}</p>
                      <p className="text-[11px] text-gray-400 truncate">{apt.location}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[11px] font-semibold text-black-main-text">{apt.date}</p>
                      <p className="text-[10px] text-gray-400">at: {apt.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-4 text-center">
                <HiOutlineCalendarDays className="text-[32px] text-[#155dfc]" />
                <p className="text-[13px] font-bold text-black-main-text">No Appointments Yet</p>
                <p className="text-[11px] text-gray-500">You haven't booked any appointments. Start by finding a doctor.</p>
                <button className="flex items-center gap-2 px-4 py-2 text-[12px] font-semibold text-white bg-[#155dfc] rounded-[10px] hover:bg-[#0913C3] transition-colors mt-1" onClick={() => navigate('/patient/doctors')}>
                  <HiOutlineCalendarDays /> Book Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientDashboard;
