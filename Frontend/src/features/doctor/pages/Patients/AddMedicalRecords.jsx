import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiHeart, FiDroplet, FiMaximize, FiBox, FiActivity, FiTrendingUp } from 'react-icons/fi';
import { getPatientById } from '../../components/Patients/patientsMock';
import PatientSummaryCard from '../../components/Patients/PatientSummaryCard';

const FIELD_CLASS =
  'mt-1 w-full rounded-xl border border-[#D0D5DD] bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-[#333CF5]/40';

function AddMedicalRecords() {
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
    <section className="space-y-5">
      <PatientSummaryCard patient={patient} />

      <article className="rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm md:p-5">
        <h2 className="text-2xl font-bold text-slate-900">Health Information</h2>
        <p className="text-sm text-slate-500">Enter your health measurements to continue.</p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">Body Temperature (C) *
            <div className="relative">
              <FiThermometer className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className={`${FIELD_CLASS} pl-10`} placeholder="e.g. 37.0 C" />
            </div>
          </label>
          <label className="text-sm font-semibold text-slate-700">Blood Sugar *
            <div className="relative">
              <FiDroplet className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className={`${FIELD_CLASS} pl-10`} placeholder="mg/dL" />
            </div>
          </label>
          <label className="text-sm font-semibold text-slate-700">Height *
            <div className="relative">
              <FiMaximize className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className={`${FIELD_CLASS} pl-10`} placeholder="cm" />
            </div>
          </label>
          <label className="text-sm font-semibold text-slate-700">Weight *
            <div className="relative">
              <FiBox className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className={`${FIELD_CLASS} pl-10`} placeholder="kg" />
            </div>
          </label>
        </div>
      </article>

      <article className="rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm md:p-5">
        <h2 className="text-2xl font-bold text-slate-900">Medical Information</h2>
        <p className="text-sm text-slate-500">Enter your medical details to help us assess your health status.</p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">Heart Rate *
            <div className="relative">
              <FiHeart className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className={`${FIELD_CLASS} pl-10`} />
            </div>
          </label>
          <label className="text-sm font-semibold text-slate-700">Blood Pressure *
            <div className="relative">
              <FiActivity className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className={`${FIELD_CLASS} pl-10`} />
            </div>
          </label>
          <label className="text-sm font-semibold text-slate-700">Blood Count *
            <div className="relative">
              <FiDroplet className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className={`${FIELD_CLASS} pl-10`} />
            </div>
          </label>
          <label className="text-sm font-semibold text-slate-700">Cholesterol *
            <div className="relative">
              <FiTrendingUp className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className={`${FIELD_CLASS} pl-10`} />
            </div>
          </label>
        </div>
      </article>

      <footer className="flex flex-wrap items-center justify-end gap-3">
        <Link
          to={`/doctor/patients/${patient.id}`}
          className="inline-flex rounded-full border border-[#D0D5DD] bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </Link>
        <button className="inline-flex rounded-full bg-[#333CF5] px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90">
          Save Medical Records
        </button>
      </footer>
    </section>
  );
}

function FiThermometer(props) {
  return <FiActivity {...props} />;
}

export default AddMedicalRecords;
