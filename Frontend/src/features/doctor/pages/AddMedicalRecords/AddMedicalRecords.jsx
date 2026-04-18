import { useEffect, useState } from 'react';
import { HiOutlineCheck } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmModal from '../../../admin/components/ConfirmModal/ConfirmModal';
import StatusToast from '../../components/SettingsProfile/StatusToast';
import HealthMeasurementsSection from '../../components/Patients/HealthMeasurementsSection';
import MedicalMetricsSection from '../../components/Patients/MedicalMetricsSection';
import PatientInfoCompactCard from '../../components/Patients/PatientInfoCompactCard';
import { findPatientById } from '../../data/patientsData';

const AddMedicalRecords = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = findPatientById(id);

  const [healthForm, setHealthForm] = useState({ temperature: '', bloodSugar: '', height: '', weight: '' });
  const [medicalForm, setMedicalForm] = useState({ heartRate: '', bloodPressure: '', bloodCount: '', cholesterol: '' });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    document.title = 'Add Medical Records | PulseX Doctor';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Doctor form to add patient health and medical metrics records.');
    }
  }, []);

  useEffect(() => {
    if (!toastVisible) return undefined;
    const timer = setTimeout(() => setToastVisible(false), 2400);
    return () => clearTimeout(timer);
  }, [toastVisible]);

  return (
    <main className="min-h-full bg-[#F8F9FB] p-4 sm:p-[24px]" aria-label="Add medical records page">
      <StatusToast visible={toastVisible} title="Saved Successfully" message="Your changes have been saved successfully." />
      <ConfirmModal
        isOpen={confirmOpen}
        title="Save Medical Records?"
        desc="Are you sure you want to save these medical records for this patient?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          setToastVisible(true);
          navigate(`/doctor/patients/${patient.id}`);
        }}
      />

      <section className="mx-auto w-full max-w-[1120px] space-y-4 rounded-[24px] border border-[#E5E7EB] bg-white p-4 sm:p-6">
        <PatientInfoCompactCard patient={patient} />
        <HealthMeasurementsSection
          values={healthForm}
          onChange={(key, value) => setHealthForm((state) => ({ ...state, [key]: value }))}
        />
        <MedicalMetricsSection
          values={medicalForm}
          onChange={(key, value) => setMedicalForm((state) => ({ ...state, [key]: value }))}
        />

        <section className="flex justify-end gap-3" aria-label="Form actions">
          <button
            type="button"
            onClick={() => navigate(`/doctor/patients/${patient.id}`)}
            className="h-11 rounded-full border border-[#D1D5DB] bg-[#F3F4F6] px-6 text-[14px] font-semibold text-[#374151]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="inline-flex h-11 items-center gap-1 rounded-full bg-[#333CF5] px-6 text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(51,60,245,0.35)]"
          >
            <HiOutlineCheck className="text-[15px]" /> Save Medical Records
          </button>
        </section>
      </section>
    </main>
  );
};

export default AddMedicalRecords;
