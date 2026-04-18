import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusToast from '../../components/SettingsProfile/StatusToast';
import PatientListFilters from '../../components/Patients/PatientListFilters';
import PatientListHeader from '../../components/Patients/PatientListHeader';
import PatientListTable from '../../components/Patients/PatientListTable';
import { PATIENTS } from '../../data/patientsData';

const Patients = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ risk: 'All', pressure: 'Normal', lastVisit: 'Today' });
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  useEffect(() => {
    document.title = 'Patient List | PulseX Doctor';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Doctor patient list with risk indicators, visit details, and quick access to patient records.');
    }
  }, []);

  useEffect(() => {
    if (!toast.visible) return undefined;
    const timer = setTimeout(() => setToast((state) => ({ ...state, visible: false })), 2200);
    return () => clearTimeout(timer);
  }, [toast.visible]);

  const rows = useMemo(() => {
    return PATIENTS.filter((patient) => {
      const matchedName = patient.name.toLowerCase().includes(search.toLowerCase());
      const matchedRisk = filters.risk === 'All' || patient.riskLevel.toLowerCase().includes(filters.risk.toLowerCase());
      return matchedName && matchedRisk;
    });
  }, [search, filters]);

  return (
    <main className="min-h-full bg-[#F8F9FB] p-4 sm:p-[24px]" aria-label="Doctor patient list page">
      <StatusToast visible={toast.visible} title={toast.title} message={toast.message} />

      <section className="mx-auto w-full max-w-[1120px] rounded-[24px] border border-[#E5E7EB] bg-white p-4 sm:p-6">
        <PatientListHeader />
        <PatientListFilters
          filters={filters}
          onFilterChange={(key, value) => setFilters((state) => ({ ...state, [key]: value }))}
          search={search}
          onSearchChange={setSearch}
        />
        <PatientListTable
          rows={rows}
          onOpenProfile={(id) => navigate(`/doctor/patients/${id}`)}
          onOpenChat={(patient) => {
            setToast({ visible: true, title: 'Chat Opened', message: `You can now chat with ${patient.name}.` });
            navigate('/doctor/messages');
          }}
        />
      </section>
    </main>
  );
};

export default Patients;
