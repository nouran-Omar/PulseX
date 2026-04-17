import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const RISK_BADGE = {
  Low: 'bg-[#DFF7E7] text-[#1E8E4A]',
  Moderate: 'bg-[#FFF3CD] text-[#A06B00]',
  High: 'bg-[#FDE2E4] text-[#C7353B]',
};

function PatientTable({ rows }) {
  const navigate = useNavigate();

  const goToPatientDetails = (patientId) => {
    navigate(`/doctor/patients/${patientId}`);
  };

  if (!rows.length) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center">
        <h2 className="text-lg font-bold text-slate-800">No patients found</h2>
        <p className="mt-2 text-sm text-slate-500">Try changing the selected filters or search keyword.</p>
      </section>
    );
  }

  return (
    <section aria-label="Patients table" className="space-y-3">
      <div className="hidden overflow-x-auto rounded-2xl border border-[#E5E7EB] bg-white md:block">
        <table className="w-full min-w-[980px] border-collapse">
          <thead>
            <tr className="bg-[#333CF5] text-center text-sm font-semibold text-white">
              <th className="px-4 py-4">Patient Name</th>
              <th className="px-4 py-4">Age</th>
              <th className="px-4 py-4">Gender</th>
              <th className="px-4 py-4">Visit Type</th>
              <th className="px-4 py-4">Chat Expired</th>
              <th className="px-4 py-4">Risk Level</th>
              <th className="px-4 py-4">Last Visit</th>
              <th className="px-4 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((patient) => (
              <tr
                key={patient.id}
                className="cursor-pointer border-b border-slate-200 text-center text-sm text-slate-700 transition hover:bg-slate-50/70 last:border-b-0"
                role="button"
                tabIndex={0}
                onClick={() => goToPatientDetails(patient.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    goToPatientDetails(patient.id);
                  }
                }}
              >
                <td className="px-4 py-4 text-left">
                  <div className="flex items-center gap-3">
                    <img
                      src={patient.avatar}
                      alt={patient.name}
                      className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                    />
                    <span className="font-semibold text-slate-900">{patient.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 font-medium">{patient.age}</td>
                <td className="px-4 py-4 font-medium">{patient.gender}</td>
                <td className="px-4 py-4 font-medium">{patient.visitType}</td>
                <td className="px-4 py-4">
                  {patient.canOpenChat ? (
                    <Link
                      to="/doctor/messages"
                      state={{ patientId: patient.id }}
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex rounded-xl bg-[#00C853] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#00b24b]"
                    >
                      Open Chat
                    </Link>
                  ) : (
                    <span className="font-medium text-slate-500">{patient.chatExpired}</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      RISK_BADGE[patient.riskLevel] || 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {patient.riskLevel}
                  </span>
                </td>
                <td className="px-4 py-4 font-semibold text-slate-800">{patient.lastVisitLabel}</td>
                <td className="px-4 py-4">
                  <Link
                    to={`/doctor/patients/${patient.id}`}
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#333CF5] transition hover:opacity-80"
                  >
                    View Record
                    <FiArrowRight className="text-base" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {rows.map((patient) => (
          <article
            key={patient.id}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#333CF5]/30"
            onClick={() => goToPatientDetails(patient.id)}
          >
            <header className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={patient.avatar}
                  alt={patient.name}
                  className="h-11 w-11 rounded-full border border-slate-200 object-cover"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{patient.name}</h3>
                  <p className="text-xs text-slate-500">{patient.gender} - {patient.age} years</p>
                </div>
              </div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  RISK_BADGE[patient.riskLevel] || 'bg-slate-100 text-slate-700'
                }`}
              >
                {patient.riskLevel}
              </span>
            </header>

            <dl className="mt-4 grid grid-cols-2 gap-y-2 text-xs text-slate-600">
              <div>
                <dt className="font-semibold text-slate-500">Visit Type</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-800">{patient.visitType}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Last Visit</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-800">{patient.lastVisitLabel}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Blood Pressure</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-800">{patient.bloodPressure}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Chat</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-800">{patient.chatExpired}</dd>
              </div>
            </dl>

            <footer className="mt-4 flex items-center gap-2">
              <Link
                to={`/doctor/patients/${patient.id}`}
                onClick={(event) => event.stopPropagation()}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#333CF5]/20 px-3 py-2 text-xs font-semibold text-[#333CF5] transition hover:bg-[#333CF5]/5"
              >
                View Record
              </Link>
              {patient.canOpenChat && (
                <Link
                  to="/doctor/messages"
                  state={{ patientId: patient.id }}
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#00C853] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#00b24b]"
                >
                  Open Chat
                </Link>
              )}
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PatientTable;
