import { useEffect, useMemo, useState } from 'react';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import ClinicalNotesSection from '../../components/Prescription/ClinicalNotesSection';
import LabRadiologySection from '../../components/Prescription/LabRadiologySection';
import MedicationEntrySection from '../../components/Prescription/MedicationEntrySection';
import PatientInformationSection from '../../components/Prescription/PatientInformationSection';
import PrescriptionConfirmModal from '../../components/Prescription/PrescriptionConfirmModal';
import PrescriptionHeader from '../../components/Prescription/PrescriptionHeader';
import PrescriptionSuccessToast from '../../components/Prescription/PrescriptionSuccessToast';
import { PATIENTS } from '../../data/patientsData';

const INITIAL_MEDICATION = { id: 1, drugName: '', dosage: '', frequency: '', duration: '' };
const INITIAL_REQUEST = { id: 1, testName: '', notes: '' };

const PATIENT_OPTIONS = [
  { id: 'PT-1204', name: 'Omar Hany' },
  { id: 'PT-2209', name: 'Mariam Adel' },
  { id: 'PT-1041', name: 'Youssef Fathy' },
  { id: 'PT-3077', name: 'Nouran Samir' },
];

const Prescription = () => {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');
  const selectedPatientFromQuery = PATIENTS.find((patient) => patient.id === patientId) || null;
  const [selectedPatient, setSelectedPatient] = useState('');
  const [medications, setMedications] = useState([INITIAL_MEDICATION]);
  const [requests, setRequests] = useState([INITIAL_REQUEST]);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  useEffect(() => {
    document.title = 'New E-Prescription | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Doctor page to create and send e-prescriptions with medications, lab requests, and clinical notes.');
    }
  }, []);

  useEffect(() => {
    if (!successVisible) return undefined;
    const timer = setTimeout(() => setSuccessVisible(false), 2400);
    return () => clearTimeout(timer);
  }, [successVisible]);

  const canSend = useMemo(() => {
    const hasPatient = Boolean(selectedPatientFromQuery) || selectedPatient.trim().length > 0;
    const hasMedication = medications.some(
      (item) => item.drugName.trim() && item.dosage.trim() && item.frequency.trim()
    );
    return hasPatient && hasMedication;
  }, [selectedPatient, medications, selectedPatientFromQuery]);

  const handleAddMedication = () => {
    setMedications((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((item) => item.id)) + 1 : 1;
      return [...prev, { id: nextId, drugName: '', dosage: '', frequency: '', duration: '' }];
    });
  };

  const handleRemoveMedication = (id) => {
    setMedications((prev) => (prev.length > 1 ? prev.filter((item) => item.id !== id) : prev));
  };

  const handleMedicationChange = (id, field, value) => {
    setMedications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAddRequest = () => {
    setRequests((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((item) => item.id)) + 1 : 1;
      return [...prev, { id: nextId, testName: '', notes: '' }];
    });
  };

  const handleRemoveRequest = (id) => {
    setRequests((prev) => (prev.length > 1 ? prev.filter((item) => item.id !== id) : prev));
  };

  const handleRequestChange = (id, field, value) => {
    setRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleClickSend = () => {
    if (!canSend) {
      return;
    }
    setConfirmOpen(true);
  };

  const handleConfirmSend = () => {
    setConfirmOpen(false);
    setSuccessVisible(true);
  };

  return (
    <main className="min-h-full bg-[#F8F9FB] p-6">
      <PrescriptionSuccessToast visible={successVisible} />
      <PrescriptionConfirmModal
        isOpen={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmSend}
      />

      <section className="mx-auto w-full max-w-[1120px] rounded-[24px] border border-[#E5E7EB] bg-white p-4 sm:p-6">
        <PrescriptionHeader />

        <section className="mt-6 space-y-4 sm:space-y-5">
          <PatientInformationSection
            selectedPatient={selectedPatient}
            onPatientChange={setSelectedPatient}
            patientOptions={PATIENT_OPTIONS}
            selectedPatientDetails={selectedPatientFromQuery}
          />

          <MedicationEntrySection
            medications={medications}
            onAddMedication={handleAddMedication}
            onRemoveMedication={handleRemoveMedication}
            onMedicationChange={handleMedicationChange}
          />

          <LabRadiologySection
            requests={requests}
            onAddRequest={handleAddRequest}
            onRemoveRequest={handleRemoveRequest}
            onRequestChange={handleRequestChange}
          />

          <ClinicalNotesSection value={clinicalNotes} onChange={setClinicalNotes} />
        </section>

        <section className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleClickSend}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#333CF5] px-6 text-[14px] font-semibold text-white shadow-[0_10px_20px_rgba(51,60,245,0.35)] transition-colors hover:bg-[#2C34D8]"
          >
            <HiOutlinePaperAirplane className="text-[18px]" />
            Send to Patient
          </button>
        </section>
      </section>
    </main>
  );
};

export default Prescription;
