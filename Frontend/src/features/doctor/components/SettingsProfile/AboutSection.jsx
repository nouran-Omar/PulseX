import { HiOutlineCheck } from 'react-icons/hi2';
import { LuFileText } from 'react-icons/lu';

const AboutSection = ({ value, onChange, onSave }) => {
  return (
    <section className="overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white" aria-labelledby="doctor-about-title">
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#F5EEF8] px-4 py-3">
        <LuFileText className="text-[14px] text-[#9333EA]" />
        <h2 id="doctor-about-title" className="text-[22px] font-bold text-black-main-text">About</h2>
      </div>

      <div className="p-4 sm:p-5">
        <p className="mb-2 text-[12px] text-[#6B7280]">
          Write a professional bio about yourself, your experience, and expertise. This will be visible to patients.
        </p>
        <textarea
          rows={4}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Dr. [Your Name] is a highly experienced cardiologist with over a decade of practice in cardiovascular medicine..."
          className="w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-3 text-[13px] text-[#111827] outline-none resize-y focus:border-[#9333EA]"
        />
        <p className="mt-2 text-[10px] text-[#9CA3AF]">Recommended: 200-500 characters</p>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#9333EA] px-5 text-[12px] font-semibold text-white shadow-[0_8px_18px_rgba(147,51,234,0.3)] transition-colors hover:bg-[#7E22CE]"
          >
            <HiOutlineCheck className="text-[14px]" /> Save Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
