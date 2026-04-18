import { LuActivity, LuHeartPulse, LuTestTube } from 'react-icons/lu';

const Input = ({ label, icon, value, onChange }) => (
  <label className="block">
    <span className="mb-1 block text-[12px] font-semibold text-[#374151]">{label} <span className="text-[#DC2626]">*</span></span>
    <div className="flex items-center gap-2 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] px-3">
      <span className="text-[#9CA3AF]">{icon}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full bg-transparent text-[14px] outline-none"
      />
    </div>
  </label>
);

const MedicalMetricsSection = ({ values, onChange }) => {
  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4" aria-labelledby="medical-input-title">
      <h2 id="medical-input-title" className="text-[24px] font-bold text-black-main-text">Medical Information</h2>
      <p className="text-[18px] text-[#6B7280]">Enter your medical details to help us assess your health status.</p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input label="Heart Rate" icon={<LuHeartPulse />} value={values.heartRate} onChange={(value) => onChange('heartRate', value)} />
        <Input label="Blood Pressure" icon={<LuActivity />} value={values.bloodPressure} onChange={(value) => onChange('bloodPressure', value)} />
        <Input label="Blood Count" icon={<LuTestTube />} value={values.bloodCount} onChange={(value) => onChange('bloodCount', value)} />
        <Input label="Cholesterol" icon={<LuActivity />} value={values.cholesterol} onChange={(value) => onChange('cholesterol', value)} />
      </div>
    </section>
  );
};

export default MedicalMetricsSection;
