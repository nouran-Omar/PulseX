import { FaHeartPulse } from 'react-icons/fa6';

const HealthInfoSection = ({ healthCards, navigate }) => {
  return (
    <article className="bg-white rounded-[22px] border border-[#E5E7EB] shadow-sm overflow-hidden">
      <div
        className="flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-4"
        style={{ background: 'linear-gradient(to right,#FAF5FF,#FDF2F8)' }}
      >
        <FaHeartPulse size={18} className="text-[#9810FA]" />
        <h2 id="settings-health-heading" className="text-black-main-text text-[18px] font-bold">Health Information</h2>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          {healthCards.map((c) => (
            <div key={c.label} className="bg-[#f9fafb] rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-1.5 text-[#4B5563] text-sm mb-1.5">
                <span className="text-[13px]">{c.icon}</span>
                {c.label}
              </div>
              <p className="text-black-main-text font-extrabold text-2xl leading-tight">{c.value}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/patient/update-health')}
          className="border border-brand-main cursor-pointer text-brand-main hover:bg-[#EEF2FF] transition-colors px-6 py-2.5 rounded-full text-sm font-bold w-full sm:w-auto"
        >
          Update Health Data
        </button>
      </div>
    </article>
  );
};

export default HealthInfoSection;
