import { HiOutlineClock, HiOutlinePlus } from 'react-icons/hi2';

const TodaySlotsPanel = ({ selectedDateLabel, slots, draftSlot, onDraftChange, onAddSlot }) => {
  return (
    <aside className="bg-white border border-[#E5E7EB] rounded-[16px] p-4 sm:p-[18px] h-fit" aria-label="Today's slots">
      <h2 className="text-[24px] leading-[1.15] font-semibold text-black-main-text">Today's Slots</h2>
      <p className="text-[12px] text-[#9CA3AF] mt-1.5 mb-3">{selectedDateLabel}</p>

      <section className="space-y-2 mb-6" aria-label="Slots list">
        {slots.map((slot) => (
          <div key={slot} className="w-full h-9 px-3 rounded-full bg-[#F0F4FB] border border-[#D9E3F2] text-[#1E293B] text-[13px] font-medium flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-[#C9D8F0] flex items-center justify-center shrink-0">
              <HiOutlineClock className="text-brand-main text-[10px]" />
            </span>
            {slot}
          </div>
        ))}
      </section>

      <section className="border-t border-[#EEF1F4] pt-4" aria-label="Add single slot">
        <h3 className="text-[14px] font-semibold text-black-main-text mb-3">Add Single Slot</h3>

        <div className="space-y-2.5">
          <label className="block">
            <span className="text-[12px] text-[#9CA3AF]">Date</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder=""
              value={draftSlot.date}
              onChange={(e) => onDraftChange('date', e.target.value)}
              className="mt-1 w-full h-9 rounded-full border border-[#E3E7EE] px-3 text-[12px] outline-none focus:border-brand-main"
            />
          </label>

          <label className="block">
            <span className="text-[12px] text-[#9CA3AF]">Start Time</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder=""
              value={draftSlot.startTime}
              onChange={(e) => onDraftChange('startTime', e.target.value)}
              className="mt-1 w-full h-9 rounded-full border border-[#E3E7EE] px-3 text-[12px] outline-none focus:border-brand-main"
            />
          </label>

          <label className="block">
            <span className="text-[12px] text-[#9CA3AF]">End Time</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder=""
              value={draftSlot.endTime}
              onChange={(e) => onDraftChange('endTime', e.target.value)}
              className="mt-1 w-full h-9 rounded-full border border-[#E3E7EE] px-3 text-[12px] outline-none focus:border-brand-main"
            />
          </label>

          <button
            type="button"
            onClick={onAddSlot}
            className="w-full h-10 rounded-full bg-brand-main text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#2D36EA] transition-colors shadow-[0_8px_18px_rgba(51,60,245,0.24)]"
          >
            <HiOutlinePlus className="text-[15px]" />
            Add Single Slot
          </button>
        </div>

        <div className="mt-5 pt-3 border-t border-[#EEF1F4] flex items-center justify-between">
          <span className="text-[12px] text-[#9CA3AF]">Total Slots Today</span>
          <span className="text-[18px] font-bold text-brand-main">{slots.length}</span>
        </div>
      </section>
    </aside>
  );
};

export default TodaySlotsPanel;
