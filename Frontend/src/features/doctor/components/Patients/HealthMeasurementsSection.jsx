import { LuDroplets, LuRuler, LuWeight, LuThermometer } from 'react-icons/lu';

const Input = ({ label, placeholder, icon, value, onChange }) => (
  <label className="block">
    <span className="mb-1 block text-[12px] font-semibold text-[#374151]">{label} <span className="text-[#DC2626]">*</span></span>
    <div className="flex items-center gap-2 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] px-3">
      <span className="text-[#9CA3AF]">{icon}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full bg-transparent text-[14px] outline-none placeholder:text-[#9CA3AF]"
      />
    </div>
  </label>
);

const HealthMeasurementsSection = ({ values, onChange }) => {
  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4" aria-labelledby="health-input-title">
      <h2 id="health-input-title" className="text-[24px] font-bold text-black-main-text">Health Information</h2>
      <p className="text-[18px] text-[#6B7280]">Enter your health measurements to continue.</p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input label="Body Temperature (°C)" placeholder="e.g. 37.0°C" icon={<LuThermometer />} value={values.temperature} onChange={(value) => onChange('temperature', value)} />
        <Input label="Blood Sugar" placeholder="mg/dL" icon={<LuDroplets />} value={values.bloodSugar} onChange={(value) => onChange('bloodSugar', value)} />
        <Input label="Height" placeholder="cm" icon={<LuRuler />} value={values.height} onChange={(value) => onChange('height', value)} />
        <Input label="Weight" placeholder="kg" icon={<LuWeight />} value={values.weight} onChange={(value) => onChange('weight', value)} />
      </div>
    </section>
  );
};

export default HealthMeasurementsSection;
