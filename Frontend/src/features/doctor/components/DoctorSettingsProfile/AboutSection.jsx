import { LuCheck, LuFileText } from 'react-icons/lu';
import { TextAreaField } from './FormPrimitives';

const AboutSection = ({ bio, setBio, handleSaveBio }) => {
  return (
    <article className="bg-white rounded-[22px] border border-gray-100 shadow-sm overflow-hidden">
      <div
        className="flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-4"
        style={{ background: 'linear-gradient(to right,#FAF5FF,#F3E8FF)' }}
      >
        <LuFileText size={18} className="text-[#9810FA]" />
        <h2 id="settings-about-heading" className="text-[#101828] text-[18px] font-bold">About</h2>
      </div>

      <div className="p-4 sm:p-6">
        <p className="text-[14px] text-[#4A5565] mb-4">
          Write a professional bio about yourself, your experience, and expertise. This will be visible to patients.
        </p>

        <TextAreaField
          value={bio}
          onChange={setBio}
          placeholder="Dr. [Your Name] is a highly experienced cardiologist with over a decade of practice in cardiovascular medicine..."
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5">
          <span className="text-[12px] text-gray-400">Recommended: 200-500 characters</span>
          <button
            onClick={handleSaveBio}
            className="bg-brand-main cursor-pointer hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm w-full sm:w-auto"
          >
            <LuCheck size={16} /> Save Changes
          </button>
        </div>
      </div>
    </article>
  );
};

export default AboutSection;
