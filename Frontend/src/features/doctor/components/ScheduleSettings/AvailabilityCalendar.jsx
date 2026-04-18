import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const AvailabilityCalendar = ({ monthLabel, selectedDay, availableDays, onSelectDay }) => {
  const days = Array.from({ length: 28 }, (_, index) => index + 1);

  return (
    <section className="bg-white border border-gray-100 rounded-[18px] p-4 sm:p-5" aria-label="Select available days">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[24px] font-semibold text-black-main-text">Select Available Days</h2>
        <div className="flex items-center gap-2 text-[#9CA3AF]">
          <button type="button" className="cursor-default" aria-label="Previous month">
            <HiChevronLeft />
          </button>
          <button type="button" className="cursor-default" aria-label="Next month">
            <HiChevronRight />
          </button>
        </div>
      </div>

      <p className="text-[18px] text-[#374151] font-medium mb-3">{monthLabel}</p>

      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
        {WEEK_DAYS.map((day) => (
          <span key={day} className="text-center text-[12px] text-[#9CA3AF]">
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((day) => {
          const isAvailable = availableDays.includes(day);
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelectDay(day)}
              className={`h-11 sm:h-12 rounded-[14px] text-[13px] font-semibold transition-all cursor-pointer ${
                isAvailable
                  ? 'bg-brand-main text-white shadow-[0_10px_22px_rgba(51,60,245,0.28)]'
                  : isSelected
                  ? 'bg-[#EEF2FF] text-brand-main border border-brand-main/20'
                  : 'bg-transparent text-[#374151] hover:bg-[#F3F4F6]'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-4">
        <span className="inline-flex items-center gap-2 text-[12px] text-[#6B7280]">
          <span className="w-3 h-3 rounded-sm bg-brand-main" /> Available
        </span>
        <span className="inline-flex items-center gap-2 text-[12px] text-[#6B7280]">
          <span className="w-3 h-3 rounded-sm border border-brand-main/40" /> Today
        </span>
      </div>
    </section>
  );
};

export default AvailabilityCalendar;
