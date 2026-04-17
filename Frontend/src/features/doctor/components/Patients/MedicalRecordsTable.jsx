import React from 'react';

const TYPE_STYLE = {
  'Blood Test': 'bg-[#DBEAFE] text-[#2563EB]',
  Radiology: 'bg-[#DCFCE7] text-[#15803D]',
};

function MedicalRecordsTable({ records }) {
  return (
    <section className="rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm md:p-5" aria-label="Medical records">
      <header className="mb-4 flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB]">+</span>
        <h2 className="text-2xl font-bold text-slate-900">Medical Records</h2>
      </header>

      <div className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500">
              <th className="px-3 py-3 font-semibold">File Name</th>
              <th className="px-3 py-3 font-semibold">Type</th>
              <th className="px-3 py-3 font-semibold">Upload Date</th>
              <th className="px-3 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-b border-slate-100 text-sm last:border-b-0">
                <td className="px-3 py-3 font-semibold text-slate-900">{record.fileName}</td>
                <td className="px-3 py-3">
                  <span className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${TYPE_STYLE[record.type] || 'bg-slate-100 text-slate-700'}`}>
                    {record.type}
                  </span>
                </td>
                <td className="px-3 py-3 text-slate-500">{record.uploadDate}</td>
                <td className="px-3 py-3">
                  <button className="text-sm font-semibold text-[#333CF5] transition hover:opacity-80">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {records.map((record) => (
          <article key={record.id} className="rounded-xl border border-slate-200 p-3">
            <p className="text-sm font-bold text-slate-900">{record.fileName}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${TYPE_STYLE[record.type] || 'bg-slate-100 text-slate-700'}`}>
                {record.type}
              </span>
              <span className="text-xs text-slate-500">{record.uploadDate}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MedicalRecordsTable;
