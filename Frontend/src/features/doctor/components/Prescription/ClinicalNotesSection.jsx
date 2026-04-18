import { HiOutlineDocumentText } from 'react-icons/hi2';

const ClinicalNotesSection = ({ value, onChange }) => {
  return (
    <section className="rounded-2xl border border-[#E6EAF0] bg-white overflow-hidden">
      <div className="bg-[#FEF6E9] px-4 py-3">
        <h2 className="flex items-center gap-2 text-[16px] font-semibold text-black-main-text">
          <HiOutlineDocumentText className="text-[14px] text-[#EA580C]" />
          <span>Clinical Notes</span>
        </h2>
      </div>

      <div className="p-4 sm:p-5">
        <label htmlFor="clinical-notes" className="mb-2 block text-[13px] font-semibold text-[#374151]">
          Additional Instructions & Advice
        </label>
        <textarea
          id="clinical-notes"
          rows={4}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter clinical notes, special instructions, follow-up recommendations, lifestyle advice, or any other relevant information for the patient..."
          className="w-full resize-y rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 text-[13px] text-[#111827] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#F59E0B]"
        />
      </div>
    </section>
  );
};

export default ClinicalNotesSection;
