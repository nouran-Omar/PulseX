import React, { useEffect, useState } from 'react';
import ConfirmModal from '../../../admin/components/ConfirmModal/ConfirmModal';
import AppointmentsHeader from '../../components/Appointments/AppointmentsHeader';
import AppointmentsStats from '../../components/Appointments/AppointmentsStats';
import AppointmentsTabs from '../../components/Appointments/AppointmentsTabs';
import AppointmentsList from '../../components/Appointments/AppointmentsList';

const INIT_APPOINTMENTS = [
  { id: 1, doc: 'Dr. Jehan Osama',  date: '22 Oct 2025', time: '03:30 PM', method: 'Cash at Clinic',  loc: 'Cairo Heart Center',   status: 'Upcoming',  img: 'https://images.unsplash.com/photo-1559839734-2b71f1536780?w=200&q=80' },
  { id: 2, doc: 'Dr. Ahmed Hassan', date: '25 Oct 2025', time: '10:00 AM', method: 'Online Payment',  loc: 'Medical City Hospital', status: 'Upcoming',  img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80' },
  { id: 3, doc: 'Dr. Noha Mohamed', date: '28 Oct 2025', time: '02:15 PM', method: 'Online Payment',  loc: 'Skin Care Clinic',      status: 'Upcoming',  img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80' },
  { id: 4, doc: 'Dr. Jehan Osama',  date: '22 Oct 2025', time: '03:30 PM', method: 'Cash at Clinic',  loc: 'Cairo Heart Center',   status: 'Completed', img: 'https://images.unsplash.com/photo-1559839734-2b71f1536780?w=200&q=80' },
  { id: 5, doc: 'Dr. Ahmed Hassan', date: '22 Oct 2025', time: '03:39 PM', method: 'Online Payment',  loc: 'Medical City Hospital', status: 'Completed', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80' },
  { id: 6, doc: 'Dr. Noha Mohamed', date: '22 Oct 2025', time: '03:30 PM', method: 'Online Payment',  loc: 'Care Clinic',           status: 'Completed', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80' },
];

const PatientAppointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [appointments, setAppointments] = useState(INIT_APPOINTMENTS);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    document.title = 'Appointments | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'View your scheduled and completed appointments.');
    }
  }, []);

  const upcoming = appointments.filter((a) => a.status === 'Upcoming');
  const completed = appointments.filter((a) => a.status === 'Completed');
  const list = activeTab === 'upcoming' ? upcoming : completed;

  const handleConfirmCancel = () => {
    setAppointments((prev) =>
      prev.map((a) => a.id === cancelTarget ? { ...a, status: 'Cancelled' } : a)
    );
    setCancelTarget(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <main
      className="flex flex-col gap-6 p-4 sm:p-[24px]"
      style={{
        "--appt-muted": "#757575",
        "--appt-muted-2": "#757575B2",
      }}
    >
      <ConfirmModal
        isOpen={!!cancelTarget}
        title="Cancel Appointment?"
        desc="Are you sure you want to cancel this appointment? This action cannot be undone."
        onConfirm={handleConfirmCancel}
        onCancel={() => setCancelTarget(null)}
      />

      <AppointmentsHeader />

      <AppointmentsStats
        upcomingCount={upcoming.length}
        completedCount={completed.length}
      />

      <AppointmentsTabs activeTab={activeTab} onChange={setActiveTab} />

      <AppointmentsList
        list={list}
        activeTab={activeTab}
        onCancel={setCancelTarget}
      />

      <footer className="sr-only">
        <p>End of appointments page.</p>
      </footer>
    </main>
  );
};

export default PatientAppointments;
