import { TbFileText } from 'react-icons/tb';

const ClinicalNotesSection = ({ data }) => {
  return (
    <section aria-labelledby="prescription-notes-title">
      <div
        className="flex items-center gap-2 text-black-main-text font-bold text-[16px] px-4 py-3 rounded-xl mb-5"
        style={{ background: 'linear-gradient(90deg, #FFF7ED 0%, #FFEDD4 100%)' }}
      >
        <TbFileText className="text-[16px] text-[#F54900]" aria-label="Clinical notes" />
        <h2 id="prescription-notes-title" className="m-0 text-[16px] font-bold">
          Clinical Notes &amp; Instructions
        </h2>
      </div>
      <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-xl p-5 text-[16px] text-[var(--rx-muted-2)] leading-relaxed">
        {data.clinicalNotes}
      </div>
    </section>
  );
};

export default ClinicalNotesSection;
