import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPatientById, PATIENTS_MOCK } from '../../components/Patients/patientsMock';

const FIELD_CLASS =
  'mt-1 w-full rounded-xl border border-[#D0D5DD] bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-[#333CF5]/40';

function NewPrescription() {
  const { id } = useParams();
  const initialPatientId = id ? String(id) : '';
  const [selectedPatientId, setSelectedPatientId] = useState(initialPatientId);
  const patient = useMemo(() => {
    if (!selectedPatientId) return null;
    return getPatientById(selectedPatientId);
  }, [selectedPatientId]);

  if (id && !patient) {
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
    <section className="rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm md:p-5">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">New E-Prescription</h1>
        <p className="text-sm text-slate-500">Create and send digital prescription to patient.</p>
      </header>

      <article className="mt-5 rounded-2xl border border-[#DCE3F1] bg-[#F8FAFC]">
        <h2 className="rounded-t-2xl bg-[#EAF0FB] px-4 py-2 text-sm font-bold text-slate-800">Patient Information</h2>
        {!id && (
          <div className="px-4 pt-4">
            <label className="text-sm font-semibold text-slate-700">
              Select Patient *
              <select
                value={selectedPatientId}
                onChange={(event) => setSelectedPatientId(event.target.value)}
                className={FIELD_CLASS}
              >
                <option value="">Search by name or patient ID...</option>
                {PATIENTS_MOCK.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} - P-{String(item.id).padStart(4, '0')}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {patient && (
          <div className="grid gap-3 px-4 py-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-2">
              <img src={patient.avatar} alt={patient.name} className="h-10 w-10 rounded-full object-cover" />
              <p className="text-sm font-bold text-slate-900">{patient.name}</p>
            </div>
            <p className="text-xs text-slate-600"><span className="block font-semibold">Patient ID</span> P-{String(patient.id).padStart(4, '0')}</p>
            <p className="text-xs text-slate-600"><span className="block font-semibold">Gender</span> {patient.gender}</p>
            <p className="text-xs text-slate-600"><span className="block font-semibold">Age</span> {patient.age}</p>
            <p className="text-xs text-slate-600"><span className="block font-semibold">Visit Type</span> {patient.visitType}</p>
          </div>
        )}
      </article>

      <article className="mt-5 rounded-2xl border border-[#E8DDFD] bg-[#FCFAFF] p-4">
        <h2 className="text-sm font-bold text-[#7C3AED]">Medication Entry</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <label className="text-sm font-semibold text-slate-700">Medication #1<input className={FIELD_CLASS} placeholder="e.g., Amoxicillin" /></label>
          <label className="text-sm font-semibold text-slate-700">Dosage *<input className={FIELD_CLASS} placeholder="e.g., 500mg" /></label>
          <label className="text-sm font-semibold text-slate-700">Frequency *<input className={FIELD_CLASS} placeholder="e.g., 3 times daily" /></label>
          <label className="text-sm font-semibold text-slate-700 md:col-span-1">Duration *<input className={FIELD_CLASS} placeholder="e.g., 7 days" /></label>
        </div>
        <button className="mt-4 w-full rounded-xl border border-[#D9B8FF] py-2 text-sm font-semibold text-[#A855F7] transition hover:bg-[#A855F7]/5">+ Add More Medication</button>
      </article>

      <article className="mt-5 rounded-2xl border border-[#D1FAE5] bg-[#F7FEFB] p-4">
        <h2 className="text-sm font-bold text-[#15803D]">Lab & Radiology Requests</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">Test/Lab Name *<input className={FIELD_CLASS} placeholder="e.g., Complete Blood Count (CBC)" /></label>
          <label className="text-sm font-semibold text-slate-700">Additional Notes (Optional)<input className={FIELD_CLASS} placeholder="e.g., Fasting required" /></label>
        </div>
        <button className="mt-4 w-full rounded-xl border border-[#86EFAC] py-2 text-sm font-semibold text-[#16A34A] transition hover:bg-[#16A34A]/5">+ Add More Lab/Radiology Request</button>
      </article>

      <article className="mt-5 rounded-2xl border border-[#F2E8DA] bg-[#FFFBF4] p-4">
        <h2 className="text-sm font-bold text-[#B45309]">Clinical Notes</h2>
        <label className="mt-3 block text-sm font-semibold text-slate-700">Additional Instructions & Advice
          <textarea rows={4} className={FIELD_CLASS} placeholder="Enter clinical notes, follow-up recommendations, lifestyle advice, or any other relevant information for the patient." />
        </label>
      </article>

      <footer className="mt-5 flex flex-wrap items-center justify-end gap-3">
        <Link
          to={patient ? `/doctor/patients/${patient.id}` : '/doctor/prescription'}
          className="inline-flex rounded-full border border-[#D0D5DD] bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </Link>
        <button
          disabled={!patient}
          className="inline-flex rounded-full bg-[#333CF5] px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send to Patient
        </button>
      </footer>
    </section>
  );
}

export default NewPrescription;
