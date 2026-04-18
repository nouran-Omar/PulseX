import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2';
import { LuTestTubeDiagonal } from 'react-icons/lu';

const LabRadiologySection = ({ requests, onAddRequest, onRemoveRequest, onRequestChange }) => {
  return (
    <section className="rounded-2xl border border-[#E6EAF0] bg-white overflow-hidden">
      <div className="bg-[#EAF8EE] px-4 py-3">
        <h2 className="flex items-center gap-2 text-[16px] font-semibold text-black-main-text">
          <LuTestTubeDiagonal className="text-[14px] text-[#16A34A]" />
          <span>Lab & Radiology Requests</span>
        </h2>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        {requests.map((request, index) => (
          <article key={request.id} className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[13px] font-semibold text-[#374151]">Request #{index + 1}</h3>
              {requests.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveRequest(request.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#EF4444] transition-colors hover:bg-[#FEE2E2]"
                  aria-label={`Remove request ${index + 1}`}
                >
                  <HiOutlineTrash className="text-[16px]" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[12px] font-medium text-[#6B7280]">
                  Test/Scan Name <span className="text-[#DC2626]">*</span>
                </span>
                <input
                  type="text"
                  value={request.testName}
                  onChange={(event) => onRequestChange(request.id, 'testName', event.target.value)}
                  placeholder="e.g., Complete Blood Count (CBC)"
                  className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#111827] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#10B981]"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-[12px] font-medium text-[#6B7280]">Additional Notes (Optional)</span>
                <input
                  type="text"
                  value={request.notes}
                  onChange={(event) => onRequestChange(request.id, 'notes', event.target.value)}
                  placeholder="e.g., Fasting required"
                  className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#111827] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#10B981]"
                />
              </label>
            </div>
          </article>
        ))}

        <button
          type="button"
          onClick={onAddRequest}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#86EFAC] bg-[#F0FDF4] text-[14px] font-semibold text-[#16A34A] transition-colors hover:bg-[#E8FBEF]"
        >
          <HiOutlinePlus className="text-[18px]" />
          Add More Lab/Radiology Request
        </button>
      </div>
    </section>
  );
};

export default LabRadiologySection;
