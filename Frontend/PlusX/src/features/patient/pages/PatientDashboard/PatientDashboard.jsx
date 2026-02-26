import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PatientDashboard.module.css';
import usePatientData from '../../../../PatientHooks/usePatientData';
import PatientWeeklyChart from '../../components/PatientDashboard/PatientWeeklyChart';
import { FaHeartPulse } from 'react-icons/fa6';
import {
  HiOutlineCalendarDays,
  HiOutlineQrCode,
  HiOutlineSparkles,
  HiOutlineLightBulb,
  HiOutlineExclamationTriangle,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineClipboardDocumentCheck,
} from 'react-icons/hi2';
import { TbDroplet, TbLungs } from 'react-icons/tb';
import { HiOutlineBeaker } from 'react-icons/hi';
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md';

/* ── Mini chart paths per metric ──────────────────── */
const BLOOD_PRESSURE_PATH = "M0,22 C8,22 12,8 20,12 C30,17 34,26 44,14 C52,5 56,18 60,18 L60,30 L0,30 Z";
const BLOOD_SUGAR_PATH    = "M0,24 C8,24 12,14 20,16 C28,18 32,8 42,10 C50,12 56,20 60,18 L60,30 L0,30 Z";
const BLOOD_COUNT_PATH    = "M0,20 C8,20 14,10 24,12 C34,14 38,22 48,16 C54,12 57,16 60,16 L60,30 L0,30 Z";

/* ── Blood Pressure mini-chart: pink gradient (#F23985) */
const BPChart = () => (
  <svg className={styles.miniChart} viewBox="0 0 60 30" preserveAspectRatio="none">
    <defs>
      <linearGradient id="bpGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#F23985" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#F23985" stopOpacity="0"    />
      </linearGradient>
    </defs>
    <path d={BLOOD_PRESSURE_PATH} stroke="#F23985" strokeWidth="1.8" fill="url(#bpGrad)" />
  </svg>
);

/* ── Blood Sugar mini-chart: teal gradient (#00DEA3) */
const BSChart = () => (
  <svg className={styles.miniChart} viewBox="0 0 60 30" preserveAspectRatio="none">
    <defs>
      <linearGradient id="bsGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#00DEA3" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#00DEA3" stopOpacity="0"    />
      </linearGradient>
    </defs>
    <path d={BLOOD_SUGAR_PATH} stroke="#00DEA3" strokeWidth="1.8" fill="url(#bsGrad)" />
  </svg>
);

/* ── Blood Count mini-chart: teal gradient (#00DEA3) */
const BCChart = () => (
  <svg className={styles.miniChart} viewBox="0 0 60 30" preserveAspectRatio="none">
    <defs>
      <linearGradient id="bcGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#00DEA3" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#00DEA3" stopOpacity="0"    />
      </linearGradient>
    </defs>
    <path d={BLOOD_COUNT_PATH} stroke="#00DEA3" strokeWidth="1.8" fill="url(#bcGrad)" />
  </svg>
);

/* ── Stat Card ─────────────────────────────────────── */
const StatCard = ({ label, value, unit, status, isHeartRate, isLow, chartSlot, icon }) => (
  <div
    className={styles.statCard}
    style={isHeartRate
      ? { background: 'linear-gradient(180deg, #333CF5 0%, #0913C3 100%)' }
      : {}}
  >
    {isHeartRate ? (
      /* ── Heart Rate card ── */
      <div className={styles.hrCard}>
        <div className={styles.hrTop}>
          <div>
            <p className={styles.hrLabel}>{label}</p>
            <p className={styles.hrValue}>{value} <span className={styles.hrUnit}>{unit}</span></p>
            <span className={styles.hrStatus}>{status}</span>
          </div>
          <img
            src="/image/Heartratetop.svg"
            alt="heart"
            className={styles.hrHeart}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        {/* Green wave line — matches Figma */}
        <svg className={styles.hrWave} viewBox="0 0 160 36" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#00DEA3" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00DEA3" stopOpacity="0"   />
            </linearGradient>
          </defs>
          <path
            d="M0,28 C12,28 16,10 28,14 C40,18 44,30 58,20 C70,12 76,6 90,16 C104,26 110,32 124,22 C136,14 142,18 160,18 L160,36 L0,36 Z"
            fill="url(#waveGrad)"
          />
          <path
            d="M0,28 C12,28 16,10 28,14 C40,18 44,30 58,20 C70,12 76,6 90,16 C104,26 110,32 124,22 C136,14 142,18 160,18"
            stroke="#00DEA3" strokeWidth="2" fill="none"
          />
        </svg>
      </div>
    ) : (
      /* ── Regular white card ── */
      <div className={styles.regularCard}>
        <div className={styles.rcTop}>
          <p className={styles.rcLabel}>{label}</p>
          {icon && <span className={styles.rcIcon}>{icon}</span>}
          {chartSlot}
        </div>
        <p className={styles.rcValue}>{value} <span className={styles.rcUnit}>{unit}</span></p>
        <span
          className={styles.rcStatus}
          style={{
            color:      isLow ? '#F23985' : '#20E56F',
            background: isLow ? '#FDE8F0' : '#E6FBF0',
          }}
        >
          {status}
        </span>
      </div>
    )}
  </div>
);

/* ── Star Rating ────────────────────────────────── */
const Stars = ({ count }) => (
  <div className={styles.stars}>
    {[1,2,3,4,5].map(i => i <= count
      ? <MdOutlineStar key={i} className={styles.starFilled} />
      : <MdOutlineStarBorder key={i} className={styles.starEmpty} />
    )}
  </div>
);

/* ── Risk Ring ──────────────────────────────────── */
const RiskRing = ({ score, color }) => {
  const r = 44; const c = 2 * Math.PI * r;
  return (
    <div className={styles.ringWrap}>
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="#f1f3f5" strokeWidth="8" />
        <circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={c}
          strokeDashoffset={c - (score / 100) * c}
          transform="rotate(-90 55 55)"
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div className={styles.ringCenter}>
        <span className={styles.ringScore} style={{ color }}>{score}%</span>
      </div>
    </div>
  );
};

/* ═════════════════════════════════════════════════
   PatientDashboard  —  Figma-exact layout
═════════════════════════════════════════════════ */
const PatientDashboard = () => {
  const { patient, isLoading, hasVitals } = usePatientData();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <FaHeartPulse className={styles.loaderIcon} />
        <p>Loading your health data…</p>
      </div>
    );
  }

  const v = patient.vitals;

  return (
    <div className={styles.page}>

      {/* ══ Welcome ══════════════════════════════════ */}
      <div className={styles.welcome}>
        <div>
          <h2 className={styles.welcomeTitle}>Welcome Back , {patient.name} 👋</h2>
          <p className={styles.welcomeSub}>Here's an overview of your current heart health status.</p>
        </div>
      </div>

      {/* ══ Main Grid ════════════════════════════════ */}
      <div className={styles.mainGrid}>

        {/* ── Left Column ──────────────────────────── */}
        <div className={styles.leftCol}>

          {/* Stat Cards Row */}
          {hasVitals ? (
            <div className={styles.statRow}>
              <StatCard
                label="Heart Rate" value={v.heartRate.value} unit="bpm"
                status="Normal" isHeartRate
              />
              <StatCard
                label="Blood Pressure" value={v.bloodPressure.display} unit="mmHg"
                status={v.bloodPressure.status} isLow
                icon={<TbDroplet />}
                chartSlot={<BPChart />}
              />
              <StatCard
                label="Blood Sugar" value={v.bloodSugar.value} unit="mg/dl"
                status={v.bloodSugar.status}
                icon={<HiOutlineBeaker />}
                chartSlot={<BSChart />}
              />
              <StatCard
                label="Blood Count" value={v.bloodCount?.value ?? 40} unit="g/dl"
                status={v.bloodCount?.status ?? 'Normal'}
                icon={<FaHeartPulse />}
                chartSlot={<BCChart />}
              />
            </div>
          ) : (
            <div className={styles.noVitalsCard}>
              <div className={styles.noVitalsIcon}><HiOutlineCalendarDays /></div>
              <h3 className={styles.noVitalsTitle}>No Vital Signs Recorded Yet</h3>
              <p className={styles.noVitalsSub}>Your vital signs haven't been recorded yet. To get your health data:</p>
              <ul className={styles.noVitalsList}>
                <li><HiOutlineCalendarDays className={styles.nvListIcon} /> Book an appointment with a doctor</li>
                <li><HiOutlineClipboardDocumentCheck className={styles.nvListIcon} /> Complete your health checkup</li>
                <li><FaHeartPulse className={styles.nvListIcon} /> Doctor will record your vital signs after examination</li>
              </ul>
              <button className={styles.bookBtn} onClick={() => navigate('/patient/doctors')}>
                <HiOutlineCalendarDays /> Book Appointment
              </button>
            </div>
          )}

          {/* Weekly Health Overview */}
          <div className={styles.chartCard}>
            {hasVitals ? (
              <PatientWeeklyChart weeklyData={patient.weeklyData} />
            ) : (
              <div className={styles.emptyChart}>
                <div className={styles.ecHeader}>
                  <div>
                    <h3 className={styles.ecTitle}>Weekly Health Overview</h3>
                    <p className={styles.ecSub}>Analyze how your heart health improves throughout the week</p>
                  </div>
                </div>
                <div className={styles.ecBody}>
                  <div className={styles.ecIcon}>📈</div>
                  <p className={styles.ecEmpty}>No Health Data Available</p>
                  <p className={styles.ecEmptySub}>Your weekly health overview will appear here once you have completed your health assessment and started tracking your vitals.</p>
                  <div className={styles.ecGetStarted}>
                    <p className={styles.ecGsTitle}><HiOutlineLightBulb /> Get started:</p>
                    <ul>
                      <li>Complete Heart Risk Assessment</li>
                      <li>Book an appointment with a doctor</li>
                      <li>Track your daily health metrics</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Left: QR Code + AI Model + Doctors List */}
          <div className={styles.bottomRow}>

            {/* QR + AI stack */}
            <div className={styles.qrAiStack}>
              <div className={styles.qrCard} onClick={() => navigate('/patient/qr')} role="button" tabIndex={0}>
                <div className={styles.qrLeft}>
                  <HiOutlineQrCode className={styles.qrIcon} />
                  <div>
                    <p className={styles.qrTitle}>QR Code</p>
                    <p className={styles.qrSub}>Quick access to your medical records</p>
                  </div>
                </div>
                <HiOutlineArrowRight className={styles.qrArrow} />
              </div>

              <div className={styles.aiCard}>
                <div className={styles.aiDot} />
                <div className={styles.aiInfo}>
                  <p className={styles.aiTitle}>Ai Model: Active</p>
                  <p className={styles.aiSub}>(Heart risk analysis working fine)</p>
                </div>
              </div>

              <div className={styles.accuracyRow}>
                <span className={styles.accuracyLabel}>⚙️ With Accuracy: 98%</span>
                <div className={styles.accuracyBar}><div className={styles.accuracyFill} /></div>
              </div>
            </div>

            {/* Doctors List */}
            <div className={styles.doctorCard}>
              <div className={styles.doctorCardHeader}>
                <span className={styles.doctorCardTitle}>Doctors List</span>
                <button className={styles.viewMoreBtn} onClick={() => navigate('/patient/doctors')}>
                  View More <HiOutlineArrowRight />
                </button>
              </div>
              <div className={styles.doctorList}>
                {patient.featuredDoctors.map(doc => (
                  <div key={doc.id} className={styles.doctorItem}>
                    <img src={doc.img} alt={doc.name} className={styles.doctorImg} />
                    <div className={styles.doctorMeta}>
                      <p className={styles.doctorName}>{doc.name}</p>
                      <p className={styles.doctorLoc}>{doc.location}</p>
                    </div>
                    <Stars count={doc.rating} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Right Column ─────────────────────────── */}
        <div className={styles.rightCol}>

          {/* Health Summary */}
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Health Summary</h3>
            {hasVitals && patient.aiRisk ? (
              <>
                <div className={styles.summaryBody}>
                  <RiskRing score={patient.aiRisk.score} color={patient.aiRisk.color} />
                  <div className={styles.summaryInfo}>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Ai Risk Score</span>
                      <span className={styles.summaryBadge} style={{ color: patient.aiRisk.color, background: patient.aiRisk.color + '18' }}>
                        {patient.aiRisk.level} Risk
                      </span>
                    </div>
                    <p className={styles.summaryMsg}>Your heart condition is stable . keep following your daily plan</p>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.noSummary}>
                <HiOutlineExclamationTriangle className={styles.noSummaryIcon} />
                <p className={styles.noSummaryTitle}>No Risk Assessment</p>
                <p className={styles.noSummaryText}>Complete your Heart Risk Assessment to get your personalized AI risk score.</p>
                <button className={styles.startBtn} onClick={() => navigate('/patient/heart-risk')}>
                  <FaHeartPulse /> Start Assessment
                </button>
              </div>
            )}
          </div>

          {/* Smart Recommendation */}
          <div className={styles.recommendCard}>
            <h3 className={styles.summaryTitle}>Smart Recommendation</h3>
            {hasVitals && patient.aiRisk?.recommendations?.length ? (
              <ul className={styles.recList}>
                {patient.aiRisk.recommendations.slice(0, 3).map((rec, i) => (
                  <li key={i} className={styles.recItem}>
                    <span className={styles.recEmoji}>{i === 0 ? '🥗' : i === 1 ? '🚶' : '😴'}</span>
                    {rec}
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.noRec}>
                <HiOutlineLightBulb className={styles.noRecIcon} />
                <p className={styles.noRecTitle}>No Recommendations Yet</p>
                <p className={styles.noRecText}>Complete your risk assessment to receive personalized health recommendations based on your results.</p>
                <div className={styles.noRecPreview}>
                  <p className={styles.noRecPreviewTitle}>You'll receive recommendations like:</p>
                  <ul>
                    <li>· Dietary suggestions based on your health</li>
                    <li>· Exercise routines tailored for you</li>
                    <li>· Sleep and lifestyle improvements</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Upcoming Appointments */}
          <div className={styles.appointCard}>
            <div className={styles.appointHeader}>
              <h3 className={styles.summaryTitle}>Upcoming Appointments</h3>
              <button className={styles.viewMoreBtn} onClick={() => navigate('/patient/appointments')}>
                View More <HiOutlineArrowRight />
              </button>
            </div>
            {patient.appointments?.length > 0 ? (
              <div className={styles.appointList}>
                {patient.appointments.slice(0, 2).map(apt => (
                  <div key={apt.id} className={styles.appointItem}>
                    <img src={apt.img} alt={apt.doctor} className={styles.appointImg} />
                    <div className={styles.appointMeta}>
                      <p className={styles.appointDoctor}>{apt.doctor}</p>
                      <p className={styles.appointLoc}>{apt.location}</p>
                    </div>
                    <div className={styles.appointDate}>
                      <p className={styles.appointDateVal}>{apt.date}</p>
                      <p className={styles.appointTime}>at: {apt.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noAppoint}>
                <HiOutlineCalendarDays className={styles.noAppointIcon} />
                <p className={styles.noAppointTitle}>No Appointments Yet</p>
                <p className={styles.noAppointText}>You haven't booked any appointments. Start by finding a doctor and scheduling your first visit.</p>
                <button className={styles.bookBtn} onClick={() => navigate('/patient/doctors')}>
                  <HiOutlineCalendarDays /> Book Appointment
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;

