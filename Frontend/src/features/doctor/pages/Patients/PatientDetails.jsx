import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiMessageSquare, FiPlus } from 'react-icons/fi';
import { getPatientById } from '../../components/Patients/patientsMock';
import PatientSummaryCard from '../../components/Patients/PatientSummaryCard';
import PatientVitalsCards from '../../components/Patients/PatientVitalsCards';
import MedicalRecordsTable from '../../components/Patients/MedicalRecordsTable';
import PatientQrCard from '../../components/Patients/PatientQrCard';

function PatientDetails() {
  const { id } = useParams();
  const patient = getPatientById(id);

  if (!patient) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-xl font-bold text-slate-900">Patient not found</h1>
        <Link to="/doctor/patients" className="mt-4 inline-flex rounded-xl bg-[#333CF5] px-4 py-2 text-sm font-semibold text-white">
          Back to Patients List
        </Link>
      </section>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-end gap-3">
        <Link
          to={`/doctor/patients/${patient.id}/medical-records/new`}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D0D5DD] bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <FiPlus /> Add Medical Records
        </Link>
        <Link
          to={`/doctor/patients/${patient.id}/prescriptions/new`}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D0D5DD] bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <FiPlus /> Add prescription
        </Link>
        <Link
          to="/doctor/messages"
          state={{ patientId: patient.id }}
          className="inline-flex items-center gap-2 rounded-xl bg-[#333CF5] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          <FiMessageSquare /> Message
        </Link>
      </div>

      <PatientSummaryCard patient={patient} />
      <PatientVitalsCards vitals={patient.vitals} />
      <MedicalRecordsTable records={patient.medicalRecords || []} />

      <div className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
        <PatientQrCard patient={patient} />
        <aside className="self-end rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] p-5 text-white shadow-lg">
          <p className="text-sm font-bold">Tip</p>
          <p className="mt-1 text-sm text-white/85">Scan or download this code to access all uploaded records instantly.</p>
        </aside>
      </div>
    </div>
  );
}

export default PatientDetails;
