import React from 'react';

function PatientSummaryCard({ patient }) {
  return (
    <section className="rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm md:p-5" aria-label="Patient information">
      <h2 className="text-xl font-bold text-slate-900">Patient Information</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex items-center gap-3 lg:col-span-2">
          <img
            src={patient.avatar}
            alt={patient.name}
            className="h-14 w-14 rounded-full border border-slate-200 object-cover"
          />
          <div>
            <p className="text-xs font-medium text-slate-500">Patient Name</p>
            <p className="text-sm font-bold text-slate-900">{patient.name}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500">Age</p>
          <p className="text-sm font-bold text-slate-900">{patient.age} years old</p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500">Gender</p>
          <p className="text-sm font-bold text-slate-900">{patient.gender}</p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500">Risk Level</p>
          <span className="mt-1 inline-flex rounded-full bg-[#DFF7E7] px-3 py-1 text-xs font-bold text-[#1E8E4A]">
            {patient.riskLevel} Risk
          </span>
        </div>
      </div>
    </section>
  );
}

export default PatientSummaryCard;
