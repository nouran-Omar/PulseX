import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ConfirmModal from '../../../admin/components/ConfirmModal/ConfirmModal';
import CriticalPatientsCard from '../../components/Dashboard/CriticalPatientsCard';
import DashboardHero from '../../components/Dashboard/DashboardHero';
import PatientMessagesCard from '../../components/Dashboard/PatientMessagesCard';
import TodayAppointmentsCard from '../../components/Dashboard/TodayAppointmentsCard';
import WeeklyOverviewCard from '../../components/Dashboard/WeeklyOverviewCard';

const STATS = [
  { label: 'Total Patients', value: 40, delta: '51%', badgeClass: 'bg-[#DCFCE7] text-[#166534]' },
  { label: 'Critical Cases', value: 8, delta: '20%', badgeClass: 'bg-[#FEE2E2] text-[#B91C1C]' },
  { label: 'Appointments', value: 12, delta: '23%', badgeClass: 'bg-[#DCFCE7] text-[#166534]' },
];

const MESSAGE_ITEMS = [
  { id: 1, name: 'Esraa Tamer', text: 'I am experiencing some side effects today.', time: '2 minutes ago', avatar: 'https://randomuser.me/api/portraits/women/14.jpg' },
  { id: 2, name: 'Ali Ismael', text: 'Thank you for the prescription.', time: '1 hour ago', avatar: 'https://randomuser.me/api/portraits/men/19.jpg' },
  { id: 3, name: 'Soha Ali', text: 'Can I reschedule my appointment?', time: '1 hour ago', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
];

const TODAY_APPOINTMENTS = [
  { id: 1, time: '08:00 am', name: 'Zeyad Ehab', slot: '08:00-09:00', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
  { id: 2, time: '09:00 am', name: 'Soha Ali', slot: '09:00-10:00', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { id: 3, time: '10:00 am', name: 'Wael Nagi', slot: '10:00-11:00', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 4, time: '12:00 am', name: 'Nour Eslam', slot: '12:00-01:00', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
];

const CRITICAL_PATIENTS = [
  { id: 1, name: 'Sara Kamel', date: 'Oct 30', risk: 'Low Risk', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 2, name: 'Ali Mohamed', date: 'Oct 26', risk: 'Moderate', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
  { id: 3, name: 'Salma Said', date: 'Oct 23', risk: 'High Risk', avatar: 'https://randomuser.me/api/portraits/women/24.jpg' },
  { id: 4, name: 'Waled Omar', date: 'Oct 18', risk: 'Low Risk', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
];

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [confirmCalendar, setConfirmCalendar] = useState(false);

  useEffect(() => {
    document.title = 'Doctor Dashboard | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Doctor dashboard showing daily stats, weekly visits, patient messages, appointments, and critical patient highlights.');
    }
  }, []);

  const hasData = searchParams.get('mode') !== 'empty';

  return (
    <main className="min-h-full bg-[#F5F7FB] p-4 sm:p-[24px]" aria-label="Doctor dashboard page">
      <ConfirmModal
        isOpen={confirmCalendar}
        title="Go To Schedule Settings?"
        desc="Do you want to open your schedule settings now?"
        onCancel={() => setConfirmCalendar(false)}
        onConfirm={() => {
          setConfirmCalendar(false);
          navigate('/doctor/schedule');
        }}
      />

      <section className="mx-auto w-full max-w-[1107px] space-y-6 rounded-[24px] bg-white/90 p-4 shadow-[0_4px_12px_rgba(0,0,0,0.12)] sm:p-6">
        <DashboardHero
          stats={hasData ? STATS : STATS.map((card) => ({ ...card, value: 0, delta: '0%' }))}
        />

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.95fr_1fr]">
          <WeeklyOverviewCard hasData={hasData} />
          <PatientMessagesCard
            messages={hasData ? MESSAGE_ITEMS : []}
            onViewAll={() => navigate('/doctor/messages')}
          />
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.05fr_1fr]">
          <TodayAppointmentsCard
            appointments={hasData ? TODAY_APPOINTMENTS : []}
            onViewCalendar={() => setConfirmCalendar(true)}
          />
          <CriticalPatientsCard
            patients={hasData ? CRITICAL_PATIENTS : []}
            onViewMore={() => navigate('/doctor/patients')}
          />
        </section>
      </section>
    </main>
  );
};

export default DoctorDashboard;
