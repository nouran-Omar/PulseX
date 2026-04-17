import React, { useMemo, useState } from 'react';
import PatientFilters from '../../components/Patients/PatientFilters';
import PatientTable from '../../components/Patients/PatientTable';
import { PATIENTS_MOCK } from '../../components/Patients/patientsMock';

const INITIAL_FILTERS = {
  risk: 'All',
  bloodPressure: 'All',
  lastVisit: 'All',
  search: '',
};

function PatientList() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const filteredPatients = useMemo(() => {
    return PATIENTS_MOCK.filter((patient) => {
      const matchRisk = filters.risk === 'All' || patient.riskLevel === filters.risk;
      const matchPressure =
        filters.bloodPressure === 'All' || patient.bloodPressure === filters.bloodPressure;
      const matchLastVisit = filters.lastVisit === 'All' || patient.lastVisitKey === filters.lastVisit;
      const matchSearch = patient.name.toLowerCase().includes(filters.search.toLowerCase().trim());

      return matchRisk && matchPressure && matchLastVisit && matchSearch;
    });
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="rounded-[28px] border border-[#E4E7EC] bg-[#F9FAFB] p-3 shadow-[0_10px_35px_rgba(15,23,42,0.08)] md:p-5">
      <header className="mb-4">
        <h1 className="text-xl font-bold text-[#101828] md:text-3xl">Patient List</h1>
        <p className="mt-1 text-sm text-slate-500">View and manage all your patients easily.</p>
      </header>

      <div className="space-y-4">
        <PatientFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchChange={(value) => handleFilterChange('search', value)}
        />
        <PatientTable rows={filteredPatients} />
      </div>
    </section>
  );
}

export default PatientList;
