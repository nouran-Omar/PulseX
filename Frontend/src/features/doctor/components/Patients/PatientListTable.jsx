import { HiOutlineArrowLongRight } from 'react-icons/hi2';
import { getRiskClass } from '../../data/patientsData';

const PatientListTable = ({ rows, onOpenProfile, onOpenChat }) => {
  return (
    <section className="mt-5 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white" aria-label="Patients table">
      <div className="hidden md:grid grid-cols-[1.6fr_0.7fr_0.9fr_0.9fr_1fr_0.9fr_0.9fr_1fr] bg-[#3B48F3] px-5 py-3 text-[14px] font-semibold text-white">
        <span>Patient Name</span>
        <span>Age</span>
        <span>Gender</span>
        <span>Visit Type</span>
        <span>Chat Expired</span>
        <span>Risk Level</span>
        <span>Last Visit</span>
        <span>Action</span>
      </div>

      <div>
        {rows.map((patient) => (
          <article key={patient.id} className="grid grid-cols-1 md:grid-cols-[1.6fr_0.7fr_0.9fr_0.9fr_1fr_0.9fr_0.9fr_1fr] items-center gap-2 border-t border-[#F1F5F9] px-5 py-4 text-[14px] text-black-main-text">
            <div className="flex items-center gap-3 font-semibold">
              <img src={patient.avatar} alt={patient.name} className="h-10 w-10 rounded-full object-cover" />
              {patient.name}
            </div>
            <span>{patient.age}</span>
            <span>{patient.gender}</span>
            <span>{patient.visitType}</span>
            {patient.chatExpired === 'Open Chat' ? (
              <button
                type="button"
                onClick={() => onOpenChat(patient)}
                className="h-8 w-fit rounded-xl bg-[#22C55E] px-3 text-[13px] font-semibold text-white"
              >
                Open Chat
              </button>
            ) : (
              <span className="text-[#6B7280]">{patient.chatExpired}</span>
            )}
            <span className={`w-fit rounded-full px-3 py-1 text-[12px] font-semibold ${getRiskClass(patient.riskColor)}`}>
              {patient.riskLevel}
            </span>
            <span>{patient.lastVisit}</span>
            <button
              type="button"
              onClick={() => onOpenProfile(patient.id)}
              className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#333CF5]"
            >
              View Record <HiOutlineArrowLongRight className="text-[16px]" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PatientListTable;
