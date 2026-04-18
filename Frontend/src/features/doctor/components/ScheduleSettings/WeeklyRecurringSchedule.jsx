import { HiCheck } from 'react-icons/hi2';

const WEEK_ROWS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeeklyRecurringSchedule = ({ recurringSchedule, onScheduleChange, onSave }) => {
  return (
    <section className="bg-white border border-gray-100 rounded-[18px] p-4 sm:p-5" aria-label="Weekly recurring schedule">
      <h2 className="text-[24px] font-semibold text-black-main-text mb-3">Weekly Recurring Schedule</h2>

      <div className="space-y-2.5">
        {WEEK_ROWS.map((day) => {
          const row = recurringSchedule[day];
          const isWeekend = day === 'Saturday' || day === 'Sunday';
          return (
            <div
              key={day}
              className="bg-[#F7F8FA] border border-[#E7EBF0] rounded-[14px] px-3 sm:px-4 py-3 grid grid-cols-1 md:grid-cols-[112px_1fr_1fr_40px] gap-2 md:gap-3 items-center"
            >
              <span className={`text-[14px] font-medium md:text-center ${isWeekend ? 'text-[#6B7280]' : 'text-black-main-text'}`}>
                {day}
              </span>

              <label className="block">
                <span className="text-[10px] text-[#9CA3AF]">Start Time</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder=""
                  value={row.startTime}
                  onChange={(e) => onScheduleChange(day, 'startTime', e.target.value)}
                  disabled={isWeekend}
                  className={`mt-1 w-full h-9 ${isWeekend ? 'rounded-md' : 'rounded-full'} border px-3 text-[12px] outline-none ${
                    isWeekend
                      ? 'border-[#DCE3EB] bg-[#EEF2F6] text-[#9CA3AF]'
                      : 'border-[#DCE3EB] bg-white focus:border-brand-main'
                  }`}
                />
              </label>

              <label className="block">
                <span className="text-[10px] text-[#9CA3AF]">End Time</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder=""
                  value={row.endTime}
                  onChange={(e) => onScheduleChange(day, 'endTime', e.target.value)}
                  disabled={isWeekend}
                  className={`mt-1 w-full h-9 ${isWeekend ? 'rounded-md' : 'rounded-full'} border px-3 text-[12px] outline-none ${
                    isWeekend
                      ? 'border-[#DCE3EB] bg-[#EEF2F6] text-[#9CA3AF]'
                      : 'border-[#DCE3EB] bg-white focus:border-brand-main'
                  }`}
                />
              </label>

              <span className="text-[12px] text-[#9CA3AF] text-right md:text-center md:pt-4">
                {isWeekend ? '' : row.hours || '8h'}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={onSave}
          className="h-11 px-6 rounded-full bg-brand-main text-white text-[13px] font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-[#2D36EA] shadow-[0_8px_18px_rgba(51,60,245,0.28)] transition-colors"
        >
          <HiCheck className="text-[15px]" />
          Save Recurring Schedule
        </button>
      </div>
    </section>
  );
};

export default WeeklyRecurringSchedule;
