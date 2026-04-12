import React from 'react';
import { useNavigate } from 'react-router-dom';
import usePatientData from '../../../../PatientHooks/usePatientData';
import DashboardWelcome from '../../components/PatientDashboard/DashboardWelcome';
import VitalsSection from '../../components/PatientDashboard/VitalsSection';
import LeftColumn from '../../components/PatientDashboard/LeftColumn';
import RightColumn from '../../components/PatientDashboard/RightColumn';

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
    <div className="min-h-screen bg-[#FAFBFF]">
      <header className="pb-8 pt-4 md:px-6 md:pt-6">
        <DashboardWelcome patientName={patient.name} />
      </header>

      <main className="flex flex-col gap-6 px-4 pb-4 md:px-6 md:pb-6">
        <section aria-labelledby="dashboard-vitals-heading">
          <h2 id="dashboard-vitals-heading" className="sr-only">Vital signs</h2>
          <VitalsSection vitals={v} />
        </section>

        <section aria-labelledby="dashboard-details-heading" className="flex flex-col xl:flex-row gap-6 items-start w-full">
          <h2 id="dashboard-details-heading" className="sr-only">Detailed health overview</h2>
          <article className="w-full xl:flex-1 min-w-0" aria-label="Primary dashboard content">
            <LeftColumn navigate={navigate} doctors={doctors} />
          </article>
          <aside className="w-full xl:w-[380px] shrink-0" aria-label="Secondary dashboard insights">
            <RightColumn navigate={navigate} patient={patient} />
          </aside>
        </section>
      </main>

      <footer className="px-4 pb-4 md:px-6 md:pb-6">
        <p className="text-xs font-normal font-['Roboto'] text-neutral-500">Last health sync: today</p>
      </footer>
    </div>
  );
};

export default PatientDashboard;