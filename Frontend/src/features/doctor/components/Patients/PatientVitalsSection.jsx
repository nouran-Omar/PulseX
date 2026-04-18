import { LuActivity, LuDroplets, LuHeartPulse, LuShieldPlus, LuTestTube } from 'react-icons/lu';
import { HiOutlinePlus } from 'react-icons/hi2';

const VITAL_CARDS = [
  { key: 'heartRate', label: 'Heart Rate', unit: 'bpm', icon: <LuHeartPulse className="text-[#EF4444]" /> },
  { key: 'bloodPressure', label: 'Blood Pressure', unit: 'mmHg', icon: <LuActivity className="text-[#3B82F6]" /> },
  { key: 'bloodSugar', label: 'Blood Sugar', unit: 'mg/dL', icon: <LuDroplets className="text-[#EAB308]" /> },
  { key: 'cholesterol', label: 'Cholesterol', unit: 'mg/dL', icon: <LuShieldPlus className="text-[#A855F7]" /> },
  { key: 'bloodCount', label: 'Blood Count', unit: 'CBC', icon: <LuTestTube className="text-[#22C55E]" /> },
];

const PatientVitalsSection = ({ patient, onAddVitals }) => {
  if (!patient.vitals) {
    return (
      <section className="mt-6" aria-labelledby="vitals-title-empty">
        <h2 id="vitals-title-empty" className="text-[24px] font-bold text-black-main-text">Vital Signs</h2>
        <article className="mt-3 rounded-2xl border border-[#F59E0B] bg-[#FFFBEB] p-6">
          <h3 className="text-[22px] font-bold text-black-main-text">No Vital Signs Recorded Yet</h3>
          <p className="mt-1 text-[14px] text-[#6B7280]">Patient vital signs data is currently empty. Adding vital signs will help track health progress over time.</p>
          <button
            type="button"
            onClick={onAddVitals}
            className="mt-4 inline-flex h-11 items-center gap-1 rounded-xl bg-[#F97316] px-4 text-[14px] font-semibold text-white shadow-md"
          >
            <HiOutlinePlus /> Add Vital Signs
          </button>
        </article>
      </section>
    );
  }

  return (
    <section className="mt-6" aria-labelledby="vitals-title">
      <h2 id="vitals-title" className="text-[24px] font-bold text-black-main-text">Vital Signs</h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {VITAL_CARDS.map((card) => (
          <article key={card.key} className="rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2 text-[12px] text-[#6B7280]">{card.icon} {card.label}</div>
            <p className={`mt-2 text-[30px] font-bold ${card.key === 'bloodCount' ? 'text-[#16A34A]' : 'text-black-main-text'}`}>
              {patient.vitals[card.key]}
            </p>
            <p className="text-[12px] text-[#9CA3AF]">{card.unit}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PatientVitalsSection;
