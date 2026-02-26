import React, { useState } from 'react';
import styles from './PatientAppointments.module.css';
import {
  HiOutlineCalendarDays,
  HiOutlineCheckBadge,
  HiOutlineMapPin,
  HiOutlineBanknotes,
  HiOutlineXCircle,
} from 'react-icons/hi2';
import { MdOutlineEventNote } from 'react-icons/md';
import ConfirmModal from '../../../admin/components/ConfirmModal/ConfirmModal';
import SuccessPopup  from '../../../admin/components/SuccessPopup/SuccessPopup';

const INIT_APPOINTMENTS = [
  { id: 1, doc: 'Dr. Jehan Osama',  date: '22 Oct 2025', time: '03:30 PM', method: 'Cash at Clinic',  loc: 'Cairo Heart Center',   status: 'Upcoming',  img: 'https://images.unsplash.com/photo-1559839734-2b71f1536780?w=200&q=80' },
  { id: 2, doc: 'Dr. Ahmed Hassan', date: '25 Oct 2025', time: '10:00 AM', method: 'Online Payment',  loc: 'Medical City Hospital', status: 'Upcoming',  img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80' },
  { id: 3, doc: 'Dr. Noha Mohamed', date: '28 Oct 2025', time: '02:15 PM', method: 'Online Payment',  loc: 'Skin Care Clinic',      status: 'Upcoming',  img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80' },
  { id: 4, doc: 'Dr. Jehan Osama',  date: '22 Oct 2025', time: '03:30 PM', method: 'Cash at Clinic',  loc: 'Cairo Heart Center',   status: 'Completed', img: 'https://images.unsplash.com/photo-1559839734-2b71f1536780?w=200&q=80' },
  { id: 5, doc: 'Dr. Ahmed Hassan', date: '22 Oct 2025', time: '03:39 PM', method: 'Online Payment',  loc: 'Medical City Hospital', status: 'Completed', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80' },
  { id: 6, doc: 'Dr. Noha Mohamed', date: '22 Oct 2025', time: '03:30 PM', method: 'Online Payment',  loc: 'Care Clinic',           status: 'Completed', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80' },
];

const PatientAppointments = () => {
  const [activeTab,    setActiveTab]    = useState('upcoming');
  const [appointments, setAppointments] = useState(INIT_APPOINTMENTS);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [showSuccess,  setShowSuccess]  = useState(false);

  const upcoming  = appointments.filter(a => a.status === 'Upcoming');
  const completed = appointments.filter(a => a.status === 'Completed');
  const list      = activeTab === 'upcoming' ? upcoming : completed;

  const handleConfirmCancel = () => {
    setAppointments(prev =>
      prev.map(a => a.id === cancelTarget ? { ...a, status: 'Cancelled' } : a)
    );
    setCancelTarget(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className={styles.pageContainer}>
      <ConfirmModal
        isOpen={!!cancelTarget}
        title="Cancel Appointment?"
        desc="Are you sure you want to cancel this appointment? This action cannot be undone."
        onConfirm={handleConfirmCancel}
        onCancel={() => setCancelTarget(null)}
      />
      <SuccessPopup
        isOpen={showSuccess}
        title="Appointment Cancelled"
        desc="Your appointment has been successfully cancelled."
      />
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <MdOutlineEventNote className={styles.headerIcon} />
          <h1 className={styles.title}>My Appointments</h1>
        </div>
        <p className={styles.subtitle}>View your scheduled and completed appointments</p>
      </div>
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.greenStat}`}>
          <div className={styles.statIconWrap}>
            <HiOutlineCalendarDays className={styles.statSvg} />
          </div>
          <div>
            <p className={styles.statLabel}>Upcoming Appointments</p>
            <h3 className={styles.statNumber}>{upcoming.length}</h3>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.indigoStat}`}>
          <div className={`${styles.statIconWrap} ${styles.indigoIconWrap}`}>
            <HiOutlineCheckBadge className={styles.statSvg} />
          </div>
          <div>
            <p className={styles.statLabel}>Completed Appointments</p>
            <h3 className={styles.statNumber}>{completed.length}</h3>
          </div>
        </div>
      </div>
      <div className={styles.tabsContainer}>
        <button className={`${styles.tabBtn} ${activeTab === 'upcoming'  ? styles.activeTab : ''}`} onClick={() => setActiveTab('upcoming')}>Upcoming</button>
        <button className={`${styles.tabBtn} ${activeTab === 'completed' ? styles.activeTab : ''}`} onClick={() => setActiveTab('completed')}>Completed</button>
      </div>
      <div className={styles.appointmentsList}>
        {list.length === 0 && <p className={styles.emptyMsg}>No {activeTab} appointments.</p>}
        {list.map(app => (
          <div key={app.id} className={styles.appCard}>
            <div className={styles.cardMain}>
              <img src={app.img} alt={app.doc} className={styles.docImg} />
              <div className={styles.info}>
                <h4 className={styles.docName}>{app.doc}</h4>
                <div className={styles.detailsRow}>
                  <div className={styles.detail}><HiOutlineCalendarDays className={styles.detailIcon} />{app.date} &ndash; {app.time}</div>
                  <div className={styles.detail}><HiOutlineBanknotes className={styles.detailIcon} />{app.method}</div>
                </div>
                <div className={styles.detail}><HiOutlineMapPin className={styles.detailIcon} />{app.loc}</div>
              </div>
            </div>
            <div className={styles.cardActions}>
              {activeTab === 'upcoming' ? (
                <button className={styles.cancelBtn} onClick={() => setCancelTarget(app.id)}>
                  <HiOutlineXCircle className={styles.cancelIcon} />Cancel Appointment
                </button>
              ) : (
                <span className={`${styles.badge} ${styles.completedBadge}`}>Completed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientAppointments;
