import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PatientProfileHero from '../../components/Patients/PatientProfileHero';
import PatientQrSection from '../../components/Patients/PatientQrSection';
import PatientRecordsSection from '../../components/Patients/PatientRecordsSection';
import PatientVitalsSection from '../../components/Patients/PatientVitalsSection';
import { findPatientById } from '../../data/patientsData';

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = findPatientById(id);

  useEffect(() => {
    document.title = `${patient.name} | Patient Details`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Doctor patient details page with vital signs, records, and QR summary.');
    }
  }, [patient.name]);

  return (
    <main className="min-h-full bg-[#F8F9FB] p-4 sm:p-[24px]" aria-label="Patient details page">
      <section className="mx-auto w-full max-w-[1120px] rounded-[24px] border border-[#E5E7EB] bg-white p-4 sm:p-6">
        <PatientProfileHero
          patient={patient}
          onAddMedical={() => navigate(`/doctor/patients/${patient.id}/medical-records/new`)}
          onAddPrescription={() => navigate(`/doctor/prescription?patientId=${patient.id}`)}
          onMessage={() => navigate('/doctor/messages')}
        />

        <PatientVitalsSection
          patient={patient}
          onAddVitals={() => navigate(`/doctor/patients/${patient.id}/medical-records/new`)}
        />

        <PatientRecordsSection patient={patient} />
        {patient.records.length > 0 ? <PatientQrSection /> : null}
      </section>
    </main>
  );
};

export default PatientDetails;
