import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2';
import { MdOutlineMedication } from 'react-icons/md';

const MedicationEntrySection = ({ medications, onAddMedication, onRemoveMedication, onMedicationChange }) => {
  return (
    <section className="rounded-2xl border border-[#E6EAF0] bg-white overflow-hidden">
      <div className="bg-[#F4EEFF] px-4 py-3">
        <h2 className="flex items-center gap-2 text-[16px] font-semibold text-black-main-text">
          <MdOutlineMedication className="text-[14px] text-[#9333EA]" />
          <span>Medication Entry</span>
        </h2>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        {medications.map((medication, index) => (
          <article key={medication.id} className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[13px] font-semibold text-[#374151]">Medication #{index + 1}</h3>
              {medications.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveMedication(medication.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#EF4444] transition-colors hover:bg-[#FEE2E2]"
                  aria-label={`Remove medication ${index + 1}`}
                >
                  <HiOutlineTrash className="text-[16px]" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <label className="block">
                <span className="mb-1 block text-[12px] font-medium text-[#6B7280]">
                  Drug Name <span className="text-[#DC2626]">*</span>
                </span>
                <input
                  type="text"
                  value={medication.drugName}
                  onChange={(event) => onMedicationChange(medication.id, 'drugName', event.target.value)}
                  placeholder="e.g., Amoxicillin"
                  className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#111827] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#8B5CF6]"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-[12px] font-medium text-[#6B7280]">
                  Dosage <span className="text-[#DC2626]">*</span>
                </span>
                <input
                  type="text"
                  value={medication.dosage}
                  onChange={(event) => onMedicationChange(medication.id, 'dosage', event.target.value)}
                  placeholder="e.g., 500mg"
                  className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#111827] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#8B5CF6]"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-[12px] font-medium text-[#6B7280]">
                  Frequency <span className="text-[#DC2626]">*</span>
                </span>
                <input
                  type="text"
                  value={medication.frequency}
                  onChange={(event) => onMedicationChange(medication.id, 'frequency', event.target.value)}
                  placeholder="e.g., 3 times daily"
                  className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#111827] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#8B5CF6]"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-[12px] font-medium text-[#6B7280]">Duration</span>
                <input
                  type="text"
                  value={medication.duration}
                  onChange={(event) => onMedicationChange(medication.id, 'duration', event.target.value)}
                  placeholder="e.g., 7 days"
                  className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#111827] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#8B5CF6]"
                />
              </label>
            </div>
          </article>
        ))}

        <button
          type="button"
          onClick={onAddMedication}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#C4B5FD] bg-[#FBF9FF] text-[14px] font-semibold text-[#7C3AED] transition-colors hover:bg-[#F5F0FF]"
        >
          <HiOutlinePlus className="text-[18px]" />
          Add More Medication
        </button>
      </div>
    </section>
  );
};

export default MedicationEntrySection;
