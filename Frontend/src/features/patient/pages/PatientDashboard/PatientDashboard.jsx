import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePatientData from '../../../../PatientHooks/usePatientData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Icons
import { TbDroplet } from 'react-icons/tb';
import { HiOutlineBeaker, HiOutlineArrowRight } from 'react-icons/hi2';
import { FaHeartPulse } from 'react-icons/fa6';
// import Heartpatiant from '../../../../assets/images/PatiantHeart.svg';
import PatientWeeklyChart  from '../../components/PatientDashboard/PatientWeeklyChart';
/* ════════════════════════════════════
   1. SVG Wave & UI Components
════════════════════════════════════ */
const LowWave = () => (
  <svg width="101" height="65" viewBox="0 0 101 65" fill="none" className="absolute bottom-0 right-0 pointer-events-none">
    <path d="M99.5801 64.6421C94.169 50.1954 89.4171 31.915 76.4486 30.9393C60.6543 29.3206 56.225 44.9508 42.7229 43.0388C19.7846 41.313 31.0898 3.33072 0.0746655 0.997194" stroke="url(#paint0_low)" strokeWidth="2" />
    <defs><linearGradient id="paint0_low" x1="99.5801" y1="64.6421" x2="17.949" y2="-16.8972" gradientUnits="userSpaceOnUse"><stop offset="0.125" stopColor="#FFC500" stopOpacity="0" /><stop offset="0.488932" stopColor="#FFC500" /><stop offset="1" stopColor="#FFC500" stopOpacity="0" /></linearGradient></defs>
  </svg>
);

const NormalWave = () => (
  <svg width="118" height="88" viewBox="0 0 118 88" fill="none" className="absolute bottom-0 right-0 pointer-events-none">
    <path d="M0.71875 34.1851C11.4402 45.2773 23.0854 60.1481 35.3679 55.8733C50.4983 51.0617 48.3297 34.9614 61.4748 31.3325C83.1998 23.7714 87.9726 63.1119 117.347 52.8884" stroke="url(#paint0_norm)" strokeWidth="2" />
    <defs><linearGradient id="paint0_norm" x1="0.71875" y1="34.1851" x2="108.088" y2="76.4248" gradientUnits="userSpaceOnUse"><stop offset="0.125" stopColor="#00DEA3" stopOpacity="0" /><stop offset="0.488932" stopColor="#00DEA3" /><stop offset="1" stopColor="#00DEA3" stopOpacity="0" /></linearGradient></defs>
  </svg>
);

const HighWave = () => (
  <svg width="119" height="107" viewBox="0 0 119 107" fill="none" className="absolute bottom-0 right-0 pointer-events-none">
    <path d="M0.484375 61.4083C13.9804 68.8812 29.4646 79.6976 39.9606 72.0185C53.0231 62.9934 46.2419 48.2306 57.7517 40.9171C76.3167 27.3346 92.383 63.5607 117.485 45.1956" stroke="url(#paint0_high)" strokeWidth="2" />
    <defs><linearGradient id="paint0_high" x1="0.484375" y1="61.4083" x2="115.512" y2="70.4108" gradientUnits="userSpaceOnUse"><stop offset="0.125" stopColor="#F23985" stopOpacity="0" /><stop offset="0.488932" stopColor="#F23985" /><stop offset="1" stopColor="#F23985" stopOpacity="0" /></linearGradient></defs>
  </svg>
);

const StarRating = ({ rating, max = 5 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <span key={i} style={{ color: i < rating ? '#FACC15' : '#E5E7EB', fontSize: '14px' }}>★</span>
    ))}
  </div>
);

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
    <div className="relative size-24 sm:size-28 flex items-center justify-center flex-shrink-0">
      <svg className="size-24 sm:size-28 -rotate-90" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r={r} fill="none" stroke="#F0F0F0" strokeWidth="9" />
        <circle cx="56" cy="56" r={r} fill="none" stroke="#333CF5" strokeWidth="9" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }} />
      </svg>
      <span className="absolute text-xl sm:text-2xl font-semibold font-['Roboto'] text-[#010218]">{percentage}%</span>
    </div>
  );
};

const SectionHeader = ({ title, onViewMore }) => (
  <div className="h-10 rounded-2xl relative overflow-visible sm:overflow-hidden flex-shrink-0 mb-2">
    <div className="flex justify-between items-center sm:absolute sm:left-0 sm:right-0 sm:top-[9px]">
      <span className="text-sm font-semibold font-['Roboto'] text-[#010218]">{title}</span>
      <button onClick={onViewMore} className="cursor-pointer flex items-center gap-1 text-xs font-normal font-['Roboto'] text-[#010218] hover:opacity-90 transition-opacity">
        View More <HiOutlineArrowRight size={10} />
      </button>
    </div>
  </div>
);

const StatCard = ({ label, value, unit, status, isHeartRate, icon }) => {
  const sl = status.toLowerCase();
  const badgeClass = sl === 'low' ? 'bg-yellow-400/30 text-yellow-700 outline-yellow-400/30' : sl === 'high' ? 'bg-rose-100 text-red-900 outline-red-100' : 'bg-emerald-50 text-green-800 outline-green-100';

  return (
    <div className={`relative overflow-hidden h-36 rounded-3xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] ${isHeartRate ? 'bg-gradient-to-b from-[#333CF5] to-[#0913C3]' : 'bg-white border border-zinc-200'}`}>
      <div className="absolute left-[16px] top-[16px] flex flex-col z-10">
        <span className={`text-base font-semibold font-['Roboto'] tracking-tight ${isHeartRate ? 'text-white' : 'text-[#010218]'}`}>{label}</span>
      </div>
      <div className="absolute right-[16px] top-[12px] z-10">
        {isHeartRate ? <img src='/PatiantHeart.svg' className="size-11 object-contain" alt="heart" /> : <span className="text-xl text-[#010218]">{icon}</span>}
      </div>
      <div className="absolute left-[16.5px] top-[77px] z-10">
        <span className={`text-base font-bold font-['Roboto'] tracking-tight ${isHeartRate ? 'text-white' : 'text-[#010218]'}`}>{value} </span>
        <span className={`text-sm font-normal font-['Roboto'] tracking-tight ${isHeartRate ? 'text-white/80' : 'text-neutral-500'}`}>{unit}</span>
      </div>
      <div className="absolute left-[16.5px] top-[107px] z-10">
        {isHeartRate ? (
          <span className="text-xs font-normal font-['Roboto'] tracking-tight text-white">{status}</span>
        ) : (
          <span className={`px-2 py-0.5 rounded-[100px] inline-flex items-center text-xs font-medium font-['Roboto'] leading-5 outline outline-1 ${badgeClass}`}>{status}</span>
        )}
      </div>
      <div className="absolute pointer-events-none" style={{ top: '130.05px', right: '10.88px', transformOrigin: 'top right' }}>
        {sl === 'low' && <LowWave />}
        {sl === 'normal' && !isHeartRate && <NormalWave />}
        {sl === 'high' && <HighWave />}
        {isHeartRate && <NormalWave />}
      </div>
    </div>
  );
};





/* ════════════════════════════════════
   3. Main Patient Dashboard
════════════════════════════════════ */
const PatientDashboard = () => {
  const { patient, isLoading } = usePatientData();
  const navigate = useNavigate();

  if (isLoading) return <div className="flex h-screen items-center justify-center text-[#333CF5] font-bold font-['Roboto']">Loading Dashboard…</div>;

  const v = patient.vitals;
  const doctors = [
    { name: 'Dr: Ebrahim Moustafa', loc: 'Cairo', rating: 4, img: patient.featuredDoctors?.[0]?.img },
    { name: 'Dr: Jehan Osama', loc: 'Menoufia', rating: 4, img: patient.featuredDoctors?.[1]?.img },
    { name: 'Dr: Yassin Mansour', loc: 'Giza', rating: 3, img: patient.featuredDoctors?.[2]?.img },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 bg-[#FAFBFF] min-h-screen">
      
      {/* Welcome Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-bold font-['Roboto'] text-[#010218] tracking-tight">Welcome Back , {patient.name} 👋</h1>
        <p className="text-base md:text-lg text-[#757575] font-['Roboto']">Here&apos;s an overview of your current heart health status.</p>
      </div>

      {/* Row 1: 4 Vital cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard label="Heart Rate" value={v.heartRate.value} unit="bpm" status="Normal" isHeartRate />
        <StatCard label="Blood Pressure" value={v.bloodPressure.display} unit="mmHg" status={v.bloodPressure.status} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_3006_14147)">
    <path d="M12.84 0.450089C12.7493 0.309742 12.625 0.194346 12.4782 0.114443C12.3315 0.0345395 12.1671 -0.00732422 12 -0.00732422C11.8329 -0.00732422 11.6685 0.0345395 11.5218 0.114443C11.375 0.194346 11.2507 0.309742 11.16 0.450089C11.09 0.560089 4 11.7301 4 16.0001C4 18.1218 4.84285 20.1567 6.34315 21.6569C7.84344 23.1572 9.87827 24.0001 12 24.0001C14.1217 24.0001 16.1566 23.1572 17.6569 21.6569C19.1571 20.1567 20 18.1218 20 16.0001C20 11.7401 12.91 0.560089 12.84 0.450089ZM12 21.2401C10.6102 21.2375 9.27784 20.6849 8.29413 19.703C7.31042 18.7212 6.75528 17.3899 6.75 16.0001C6.75 15.8012 6.82902 15.6104 6.96967 15.4698C7.11032 15.3291 7.30109 15.2501 7.5 15.2501C7.69891 15.2501 7.88968 15.3291 8.03033 15.4698C8.17098 15.6104 8.25 15.8012 8.25 16.0001C8.25527 16.9921 8.65237 17.9418 9.35478 18.6424C10.0572 19.3429 11.008 19.7375 12 19.7401C12.1989 19.7401 12.3897 19.8191 12.5303 19.9598C12.671 20.1004 12.75 20.2912 12.75 20.4901C12.75 20.689 12.671 20.8798 12.5303 21.0204C12.3897 21.1611 12.1989 21.2401 12 21.2401Z" fill="#010218"/>
  </g>
  <defs>
    <clipPath id="clip0_3006_14147">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>} />
        <StatCard label="Blood Sugar" value={v.bloodSugar.value} unit="mg/dl" status={v.bloodSugar.status} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_3006_14155)">
    <path d="M17.3549 20.1311L19.9709 19.9851L20.1239 17.3701L15.1459 12.3921L12.3789 15.1541L17.3549 20.1311Z" fill="#010218"/>
    <path d="M10.2365 1.60711L8.68345 3.16011L6.66745 1.14411C6.31038 0.758794 5.87926 0.449466 5.39987 0.234631C4.92048 0.0197958 4.40268 -0.0961311 3.87745 -0.106214C3.35223 -0.116297 2.83036 -0.0203286 2.34308 0.175949C1.8558 0.372227 1.41312 0.664781 1.04153 1.03611C0.669931 1.40743 0.377056 1.8499 0.180426 2.33704C-0.0162052 2.82418 -0.112552 3.34597 -0.102849 3.87121C-0.093147 4.39644 0.0224047 4.91432 0.236892 5.39387C0.45138 5.87341 0.760396 6.30476 1.14545 6.66211L1.14745 6.66411L3.16445 8.68011L1.61145 10.2331L3.57845 12.2001L5.24145 10.5361L16.7735 22.0671L20.4265 21.8601L22.5625 23.9961L24.0125 22.5461L21.8765 20.4101L22.0835 16.7571L10.5525 5.22611L12.2165 3.56211L10.2365 1.60711ZM20.5365 20.5551L17.2705 20.7411L6.15845 9.62911L9.61145 6.17611L20.7235 17.2881L20.5365 20.5551Z" fill="#010218"/>
  </g>
  <defs>
    <clipPath id="clip0_3006_14155">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>} />
        <StatCard label="Blood Count" value="60" unit="g/dL" status="High" icon={<FaHeartPulse size={24} />} />
      </div>

      {/* Main Layout Container (Left & Right Columns) */}
      <div className="flex flex-col xl:flex-row gap-6 items-start w-full">

        {/* =========================================
            العمود الأيسر (مرن باستخدام flex-1 و w-full)
        ========================================= */}
        <div className="flex flex-col gap-6 w-full xl:flex-1 min-w-0">
          
          {/* Chart Card */}
          <div className="bg-white rounded-[32px] p-4 sm:p-6 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] border border-zinc-200 min-h-[285px] transition-shadow duration-300 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.12)] w-full">
           <PatientWeeklyChart />
          </div>

          {/* Row تحت التشارت: QR/AI (شمال) + Doctors (يمين) */}
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            
            {/* QR / AI / Progress */}
            <div className="flex flex-col gap-4 w-full lg:w-[240px] shrink-0">
              <div onClick={() => navigate('/patient/qr')} className="bg-[#9CA3AF] rounded-3xl px-6 py-5 shadow-sm flex justify-between items-start cursor-pointer transition-all duration-300 hover:brightness-95 hover:-translate-y-0.5 w-full">
                <div className="flex items-start gap-3">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_3006_14170)">
    <path d="M22.6808 2.3278C21.7508 0.527805 15.6008 0.299805 12.0008 0.299805C8.40078 0.299805 2.25078 0.527805 1.32078 2.3278C0.390781 3.2278 0.300781 8.0278 0.300781 11.9998C0.300781 15.9718 0.390781 20.7718 1.32078 21.6718C2.25078 23.4718 8.40078 23.6998 12.0008 23.6998C15.6008 23.6998 21.7508 23.4718 22.6808 21.6718C23.6108 20.7718 23.7008 15.9718 23.7008 11.9998C23.7008 8.0278 23.6108 3.2278 22.6808 2.3278Z" fill="#FFE236" stroke="#231F20" stroke-width="0.6" stroke-miterlimit="10"/>
    <path d="M19.3924 5.3039C18.7504 4.0619 14.4844 3.8999 12.0004 3.8999C9.51639 3.8999 5.25039 4.0619 4.60839 5.3039C3.96639 5.9279 3.90039 9.2459 3.90039 11.9999C3.90039 14.7539 3.96639 18.0719 4.60839 18.6959C5.25039 19.9379 9.51639 20.0999 12.0004 20.0999C14.4844 20.0999 18.7504 19.9379 19.3924 18.6959C20.0344 18.0959 20.1004 14.7539 20.1004 11.9999C20.1004 9.2459 20.0344 5.9279 19.3924 5.3039Z" fill="white" stroke="#231F20" stroke-width="0.6" stroke-miterlimit="10"/>
    <path d="M10.0439 6.91161C9.89989 6.63561 8.95189 6.59961 8.39989 6.59961C7.84789 6.59961 6.89989 6.63561 6.75589 6.91161C6.60365 7.39193 6.55058 7.89816 6.59989 8.39961C6.55058 8.90106 6.60365 9.40729 6.75589 9.88761C6.89989 10.1636 7.84789 10.1996 8.39989 10.1996C8.95189 10.1996 9.89989 10.1636 10.0439 9.88761C10.1961 9.40729 10.2492 8.90106 10.1999 8.39961C10.2492 7.89816 10.1961 7.39193 10.0439 6.91161ZM10.0439 14.1116C9.89989 13.8356 8.95189 13.7996 8.39989 13.7996C7.84789 13.7996 6.89989 13.8356 6.75589 14.1116C6.60365 14.5919 6.55058 15.0982 6.59989 15.5996C6.55058 16.1011 6.60365 16.6073 6.75589 17.0876C6.89989 17.3636 7.84789 17.3996 8.39989 17.3996C8.95189 17.3996 9.89989 17.3636 10.0439 17.0876C10.1961 16.6073 10.2492 16.1011 10.1999 15.5996C10.2492 15.0982 10.1961 14.5919 10.0439 14.1116ZM17.2439 6.91161C17.0999 6.63561 16.1519 6.59961 15.5999 6.59961C15.0479 6.59961 14.0999 6.63561 13.9559 6.91161C13.8037 7.39193 13.7506 7.89816 13.7999 8.39961C13.7506 8.90106 13.8037 9.40729 13.9559 9.88761C14.0999 10.1636 15.0479 10.1996 15.5999 10.1996C16.1519 10.1996 17.0999 10.1636 17.2439 9.88761C17.3961 9.40729 17.4492 8.90106 17.3999 8.39961C17.4492 7.89816 17.3961 7.39193 17.2439 6.91161Z" fill="white" stroke="#231F20" stroke-width="0.6" stroke-miterlimit="10"/>
    <path d="M18.5645 2.48975C20.9645 3.04175 20.9645 3.04175 21.5105 5.18975" stroke="white" stroke-width="0.6" stroke-miterlimit="10" stroke-linecap="round"/>
    <path d="M12.0005 6.59961C11.9165 8.39961 11.9165 10.1996 12.0005 11.9996H13.8005" stroke="#231F20" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.60156 11.9998C7.79916 11.8978 9.00396 11.8978 10.2016 11.9998H6.60156Z" fill="white"/>
    <path d="M6.60156 11.9998C7.79916 11.8978 9.00396 11.8978 10.2016 11.9998M15.6016 13.7998H13.8016V15.5998M15.6016 11.9998C16.2005 11.9489 16.8026 11.9489 17.4016 11.9998C17.4616 12.5998 17.4616 14.9998 17.4016 15.5998H15.6016" stroke="#231F20" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.0004 13.7998C11.9165 14.9983 11.9165 16.2013 12.0004 17.3998C13.7992 17.5018 15.6016 17.5018 17.4004 17.3998" stroke="#231F20" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_3006_14170">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg><div className="flex flex-col">
                    <span className="text-white text-base font-medium font-['Roboto']">QR Code</span>
                    <span className="text-white/80 text-[11px] font-medium leading-tight mt-1">Quick access to<br/>your medical records</span>
                  </div>
                </div>
                <div className="size-6 bg-white rounded-full flex items-center justify-center mt-1 shrink-0">
                  <HiOutlineArrowRight size={12} className="text-[#1E1E1E] -rotate-45" />
                </div>
              </div>

              <div className="bg-gradient-to-b from-neutral-500 to-green-500 rounded-3xl px-4 py-3 shadow-sm flex items-start gap-2 transition-all duration-300 hover:-translate-y-0.5 w-full">
                <span className="text-xl mt-0.5 shrink-0">🧠</span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white text-sm font-medium font-['Roboto']">Ai Model: Active</span>
                  <span className="text-white/80 text-[10px] font-normal leading-tight">(Heart risk analysis working fine)</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-1">
                <div className="relative h-3 w-full bg-[rgba(0,0,0,0.12)] rounded-full overflow-hidden">
                  <div className="absolute left-0 top-0 h-full  bg-gradient-to-b from-[#333CF5] to-[#070E92] rounded-full" style={{ width: '98%' }} />
                </div>
                <div className="flex items-center gap-1.5 px-1">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M9.1419 21.5854C7.46635 21.0866 5.9749 20.1604 4.79393 18.9333C5.2345 18.4111 5.5 17.7365 5.5 16.9998C5.5 15.343 4.15686 13.9998 2.5 13.9998C2.39977 13.9998 2.3007 14.0048 2.203 14.0144C2.0699 13.3636 2 12.6899 2 11.9998C2 10.9545 2.16039 9.94666 2.4579 8.99951C2.47191 8.99971 2.48594 8.99981 2.5 8.99981C4.15686 8.99981 5.5 7.65666 5.5 5.99981C5.5 5.52416 5.3893 5.07441 5.1923 4.67481C6.34875 3.59951 7.76025 2.79477 9.32605 2.36133C9.8222 3.33385 10.8334 3.99982 12 3.99982C13.1666 3.99982 14.1778 3.33385 14.674 2.36133C16.2397 2.79477 17.6512 3.59951 18.8077 4.67481C18.6107 5.07441 18.5 5.52416 18.5 5.99981C18.5 7.65666 19.8431 8.99981 21.5 8.99981C21.514 8.99981 21.5281 8.99971 21.5421 8.99951C21.8396 9.94666 22 10.9545 22 11.9998C22 12.6899 21.9301 13.3636 21.797 14.0144C21.6993 14.0048 21.6003 13.9998 21.5 13.9998C19.8431 13.9998 18.5 15.343 18.5 16.9998C18.5 17.7365 18.7655 18.4111 19.2061 18.9333C18.0251 20.1604 16.5336 21.0866 14.8581 21.5854C14.4714 20.3758 13.338 19.4998 12 19.4998C10.662 19.4998 9.5286 20.3758 9.1419 21.5854Z" fill="#333CF5" stroke="#010218" stroke-width="2" stroke-linejoin="round"/>
  <path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z" fill="#43CCF8" stroke="white" stroke-width="2" stroke-linejoin="round"/>
</svg>
                  <span className="text-[#010218] text-[11px] font-bold font-['Roboto']">With Accuracy: 98%</span>
                </div>
              </div>
            </div>

            {/* Doctors List */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] border border-zinc-200 flex-1 transition-all duration-300 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.12)] w-full">
              <div className="flex flex-col gap-2 h-full">
                <SectionHeader title="Doctors List" onViewMore={() => navigate('/patient/doctors')} />
                <div className="flex flex-col gap-4 mt-1">
                  {doctors.map((doc, i) => (
                    <React.Fragment key={i}>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 group cursor-pointer w-full">
                        <div className="flex items-center gap-3">
                           <img src={doc.img} className="w-12 h-12 rounded-xl object-cover shrink-0 transition-transform duration-300 group-hover:scale-105" alt={doc.name} />
                           <div className="flex flex-col sm:hidden">
                             <span className="text-sm font-medium font-['Roboto'] text-[#010218] break-words">{doc.name}</span>
                             <span className="text-xs font-normal font-['Roboto'] text-neutral-400 mt-0.5">{doc.loc}</span>
                           </div>
                        </div>
                        <div className="flex items-start sm:items-center justify-between flex-1">
                          <div className="hidden sm:flex flex-col">
                            <span className="text-sm font-medium font-['Roboto'] text-[#010218] break-words">{doc.name}</span>
                            <span className="text-xs font-normal font-['Roboto'] text-[#75757566] mt-0.5">{doc.loc}</span>
                          </div>
                          <StarRating rating={doc.rating} />
                        </div>
                      </div>
                      {i < doctors.length - 1 && <div className="border-t border-zinc-100" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================
            العمود الأيمن (عرض ثابت على الديسكتوب، و w-full على الموبايل)
        ========================================= */}
        <div className="flex flex-col gap-6 w-full xl:w-[380px] shrink-0">
          
          {/* 1. Health Summary */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] border border-zinc-200 min-h-[189px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.12)] w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center h-full gap-4">
              <div className="flex flex-col justify-between h-full gap-4">
                <h3 className="text-xl font-semibold font-['Roboto'] text-[#010218]">Health Summary</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <span className="text-sm font-medium font-['Roboto'] text-[#010218]">Ai Risk Score</span>
                    <span className="px-2.5 py-1 bg-emerald-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full">Low Risk</span>
                  </div>
                  <p className="text-neutral-500 text-xs sm:text-sm font-normal font-['Roboto'] leading-relaxed">
                    Your heart condition is stable.<br className="hidden sm:block" />keep following your daily plan
                  </p>
                </div>
              </div>
              <div className="self-start sm:self-auto">
                <ProgressRing percentage={25} />
              </div>
            </div>
          </div>

          {/* 2. Smart Recommendation */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] border border-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.12)] w-full">
            <div className="flex flex-col gap-5">
              <h3 className="text-xl font-semibold font-['Roboto'] text-[#010218]">Smart Recommendation</h3>
              <div className="flex flex-col gap-4">
                {[
                  { icon: '🥗', text: 'Try to reduce foods high in saturated fat.' },
                  { icon: '🚶', text: 'Walk 30 mins daily.' },
                  { icon: '😴', text: 'Sleep 7–8 hours.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-[#010218B2] text-sm font-medium font-['Roboto']">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Upcoming Appointments */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] border border-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.12)] w-full">
  <div className="flex flex-col gap-3 w-full">
    <SectionHeader title="Upcoming Appointments" onViewMore={() => navigate('/patient/appointments')} />
    <div className="flex flex-col gap-4 w-full">
      {patient.appointments?.slice(0, 2).map((appointment, index) => (
        <React.Fragment key={index}>
          {/* تعديل الـ Div الرئيسي لكل موعد ليكون Full width */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 group cursor-pointer w-full">
            
            {/* قسم صورة الطبيب والاسم */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img 
                src={appointment.img} 
                className="w-12 h-12 rounded-xl object-cover shrink-0 transition-transform duration-300 group-hover:scale-105" 
                alt={appointment.doctorName} 
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold font-['Roboto'] text-[#010218] break-words">
                  {appointment.doctorName || "Dr: Ghada Adel"}
                </span>
                <span className="text-xs font-normal font-['Roboto'] text-neutral-400 mt-0.5">
                  {appointment.location || "Cairo"}
                </span>
              </div>
            </div>

            {/* قسم التاريخ والوقت - تعديل التوزيع في الموبايل ليكون على الأطراف */}
            <div className="flex flex-row justify-between sm:flex-col items-center sm:items-end gap-2 sm:gap-1 text-right w-full sm:w-auto border-t border-zinc-50 pt-2 sm:border-0 sm:pt-0">
              <span className="text-sm font-semibold font-['Roboto'] text-[#010218]">
                {appointment.date || "13/12/2025"}
              </span>
              <span className="text-xs font-normal font-['Roboto'] text-neutral-400">
                at: {appointment.time || "7:00 PM"}
              </span>
            </div>
          </div>
          {index < patient.appointments.slice(0, 2).length - 1 && <div className="border-t border-zinc-100 w-full" />}
        </React.Fragment>
      ))}
    </div>
  </div>
</div>

        </div>
      </div>

    </div>
  );
};

export default PatientDashboard;