import { LuBriefcaseBusiness, LuGraduationCap, LuTrash2 } from 'react-icons/lu';
import { HiOutlineCheck, HiOutlinePlus } from 'react-icons/hi2';

const ExperienceCard = ({ item, index, onChange, onDelete }) => {
  const icon = item.type === 'work' ? <LuBriefcaseBusiness className="text-[14px] text-[#2563EB]" /> : <LuGraduationCap className="text-[14px] text-[#9333EA]" />;

  return (
    <article className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#E5E7EB] bg-white">{icon}</span>
        <button
          type="button"
          onClick={onDelete}
          className="text-[#EF4444] transition-colors hover:text-[#DC2626]"
          aria-label={`Delete experience ${index + 1}`}
        >
          <LuTrash2 className="text-[13px]" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold text-[#4B5563]">Type</span>
          <input
            type="text"
            value={item.typeLabel}
            onChange={(event) => onChange('typeLabel', event.target.value)}
            className="h-9 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-[12px] outline-none focus:border-[#333CF5]"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold text-[#4B5563]">Institution</span>
          <input
            type="text"
            value={item.institution}
            onChange={(event) => onChange('institution', event.target.value)}
            className="h-9 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-[12px] outline-none focus:border-[#333CF5]"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-[11px] font-semibold text-[#4B5563]">Title/Position</span>
          <input
            type="text"
            value={item.position}
            onChange={(event) => onChange('position', event.target.value)}
            className="h-9 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-[12px] outline-none focus:border-[#333CF5]"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold text-[#4B5563]">Start Date</span>
          <input
            type="text"
            value={item.startDate}
            onChange={(event) => onChange('startDate', event.target.value)}
            className="h-9 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-[12px] outline-none focus:border-[#333CF5]"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold text-[#4B5563]">End Date</span>
          <input
            type="text"
            value={item.endDate}
            onChange={(event) => onChange('endDate', event.target.value)}
            className="h-9 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-[12px] outline-none focus:border-[#333CF5]"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-[11px] font-semibold text-[#4B5563]">Description</span>
          <input
            type="text"
            value={item.description}
            onChange={(event) => onChange('description', event.target.value)}
            placeholder="Describe your role and responsibilities..."
            className="h-9 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-[12px] outline-none focus:border-[#333CF5]"
          />
        </label>
      </div>
    </article>
  );
};

const ProfessionalExperienceSection = ({ experiences, onAdd, onChange, onDeleteRequest, onSave }) => {
  return (
    <section className="overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white" aria-labelledby="doctor-exp-title">
      <div className="flex items-center justify-between gap-2 border-b border-[#E5E7EB] bg-[#EEF3FB] px-4 py-3">
        <div className="flex items-center gap-2">
          <LuBriefcaseBusiness className="text-[14px] text-[#2563EB]" />
          <h2 id="doctor-exp-title" className="text-[22px] font-bold text-black-main-text">Professional Experience</h2>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-8 items-center gap-1 rounded-full bg-[#333CF5] px-3 text-[11px] font-semibold text-white"
        >
          <HiOutlinePlus className="text-[13px]" /> Add Experience
        </button>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        {experiences.map((item, index) => (
          <ExperienceCard
            key={item.id}
            item={item}
            index={index}
            onChange={(field, value) => onChange(item.id, field, value)}
            onDelete={() => onDeleteRequest(item.id)}
          />
        ))}

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#333CF5] px-5 text-[12px] font-semibold text-white shadow-[0_8px_18px_rgba(51,60,245,0.35)]"
          >
            <HiOutlineCheck className="text-[14px]" /> Save Experience
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalExperienceSection;
