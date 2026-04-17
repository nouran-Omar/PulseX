import React from 'react';
import { FiDownload, FiCalendar, FiBarChart2 } from 'react-icons/fi';

function PatientQrCard({ patient }) {
  return (
    <section className="rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm md:p-5" aria-label="Patient QR code">
      <h2 className="text-2xl font-bold text-slate-900">Patient QR Code</h2>
      <div className="mt-5 flex justify-center rounded-xl border border-slate-200 bg-white p-3">
        <img
          src={patient.qrCode}
          alt={`QR code for ${patient.name}`}
          className="h-40 w-40 rounded-lg object-contain"
        />
      </div>

      <div className="mt-5 space-y-3 text-sm font-semibold text-slate-800">
        <p className="flex items-center gap-2"><FiCalendar className="text-[#333CF5]" /> Generated on: {patient.generatedOn}</p>
        <p className="flex items-center gap-2"><FiBarChart2 className="text-[#333CF5]" /> Total Files: {patient.totalFiles}</p>
      </div>

      <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#333CF5] px-4 py-3 text-sm font-bold text-white transition hover:opacity-90">
        <FiDownload /> Download PDF
      </button>
    </section>
  );
}

export default PatientQrCard;
