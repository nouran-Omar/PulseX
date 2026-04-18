import { HiOutlineChatBubbleOvalLeft, HiOutlineDocumentPlus, HiOutlineDocumentText } from 'react-icons/hi2';

const PatientProfileHero = ({ patient, onAddMedical, onAddPrescription, onMessage }) => {
  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" aria-label="Patient profile header">
      <div className="flex items-center gap-4">
        <img src={patient.avatar} alt={patient.name} className="h-16 w-16 rounded-full object-cover" />
        <div>
          <h1 className="text-[24px] font-bold text-black-main-text">{patient.name}</h1>
          <p className="mt-1 text-[18px] text-[#6B7280]">{patient.age} years old   {patient.gender}</p>
          <span className="mt-1 inline-block rounded-full bg-[#DCFCE7] px-3 py-1 text-[12px] font-semibold text-[#166534]">
            {patient.riskLevel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={onAddMedical}
          className="h-12 rounded-xl border border-[#D1D5DB] bg-white px-4 text-[14px] font-medium text-[#374151]"
        >
          <span className="inline-flex items-center gap-1"><HiOutlineDocumentPlus /> Add Medical Records</span>
        </button>
        <button
          type="button"
          onClick={onAddPrescription}
          className="h-12 rounded-xl border border-[#D1D5DB] bg-white px-4 text-[14px] font-medium text-[#374151]"
        >
          <span className="inline-flex items-center gap-1"><HiOutlineDocumentText /> Add prescription</span>
        </button>
        <button
          type="button"
          onClick={onMessage}
          className="h-12 rounded-xl bg-[#333CF5] px-4 text-[14px] font-medium text-white shadow-[0_8px_18px_rgba(51,60,245,0.35)]"
        >
          <span className="inline-flex items-center gap-1"><HiOutlineChatBubbleOvalLeft /> Message</span>
        </button>
      </div>
    </section>
  );
};

export default PatientProfileHero;
