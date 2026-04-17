import { LuBriefcaseBusiness, LuCheck, LuGraduationCap, LuPlus, LuTrash2 } from 'react-icons/lu';
import { InputField, TextAreaField } from './FormPrimitives';

const iconForType = (type = '') => {
  return type.toLowerCase().includes('education')
    ? <LuGraduationCap size={16} className="text-[#9333EA]" />
    : <LuBriefcaseBusiness size={16} className="text-[#155DFC]" />;
};

const ProfessionalExperienceSection = ({
  experiences,
  handleAddExperience,
  handleExperienceField,
  setDeleteTarget,
  handleSaveExperience,
}) => {
  return (
    <article className="bg-white rounded-[22px] border border-gray-100 shadow-sm overflow-hidden">
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4"
        style={{ background: 'linear-gradient(to right,#EFF6FF,#EEF2FF)' }}
      >
        <div className="flex items-center gap-2">
          <LuBriefcaseBusiness size={18} className="text-[#155DFC]" />
          <h2 id="settings-experience-heading" className="text-[#101828] text-[18px] font-bold">Professional Experience</h2>
        </div>

        <button
          onClick={handleAddExperience}
          className="bg-brand-main cursor-pointer hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <LuPlus size={16} /> Add Experience
        </button>
      </div>

      <div className="p-4 sm:p-6 flex flex-col gap-4">
        {experiences.map((experience, index) => (
          <div key={experience.id} className="bg-[#f9fafb] rounded-2xl border border-gray-100 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0">
                {iconForType(experience.type)}
              </div>

              <button
                onClick={() => setDeleteTarget(experience.id)}
                className="text-[#E7000B] cursor-pointer hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all"
                title="Delete experience"
              >
                <LuTrash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Type"
                icon={iconForType(experience.type)}
                value={experience.type}
                onChange={v => handleExperienceField(index, 'type', v)}
              />
              <InputField
                label="Institution"
                icon={<LuBriefcaseBusiness size={14} />}
                value={experience.institution}
                onChange={v => handleExperienceField(index, 'institution', v)}
              />
              <div className="sm:col-span-2">
                <InputField
                  label="Title/Position"
                  icon={<LuBriefcaseBusiness size={14} />}
                  value={experience.title}
                  onChange={v => handleExperienceField(index, 'title', v)}
                />
              </div>
              <InputField
                label="Start Date"
                icon={<LuBriefcaseBusiness size={14} />}
                value={experience.startDate}
                onChange={v => handleExperienceField(index, 'startDate', v)}
              />
              <InputField
                label="End Date"
                icon={<LuBriefcaseBusiness size={14} />}
                value={experience.endDate}
                onChange={v => handleExperienceField(index, 'endDate', v)}
              />
              <div className="sm:col-span-2">
                <label className="text-[14px] font-semibold text-[#364153] mb-1.5 block">Description</label>
                <TextAreaField
                  value={experience.description}
                  onChange={v => handleExperienceField(index, 'description', v)}
                  placeholder="Describe your role and responsibilities..."
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-1">
          <button
            onClick={handleSaveExperience}
            className="bg-brand-main cursor-pointer hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm w-full sm:w-auto"
          >
            <LuCheck size={16} /> Save Experience
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProfessionalExperienceSection;
