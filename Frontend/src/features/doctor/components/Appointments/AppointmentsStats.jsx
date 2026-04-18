import { GiCheckMark } from 'react-icons/gi';
import { LuCalendarClock } from 'react-icons/lu';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const CALENDAR_DAYS = [
  ['SUN', '', ''],
  ['MON', '', ''],
  ['TUE', '', ''],
  ['WED', '', ''],
  ['THU', '', ''],
  ['FRI', '', ''],
  ['SAT', '', ''],
];

const CALENDAR_NUMBERS = [
  ['', '', 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, '', ''],
];

const AppointmentsStats = ({ upcomingCount, completedCount }) => {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_0.72fr] gap-4 lg:gap-6" aria-label="Appointments overview">
      <article className="bg-white rounded-[20px] border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-5 sm:p-6 flex items-center gap-4">
        <div
          className="w-[60px] h-[60px] rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(201deg, #D3FFE7 0%, #EFFFF6 100%)' }}
        >
          <LuCalendarClock className="text-[#00AC4F] text-[30px]" aria-label="Upcoming" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[14px] text-[var(--appt-muted)]">Upcoming Appointments</p>
          <h2 className="text-[32px] font-bold text-brand-main leading-none">{upcomingCount}</h2>
        </div>
      </article>

      <article className="bg-white rounded-[20px] border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-5 sm:p-6 flex items-center gap-4">
        <div
          className="w-[60px] h-[60px] rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(201deg, rgba(51, 60, 245, 0.65) 0%, rgba(51, 60, 245, 0.05) 100%)' }}
        >
          <GiCheckMark className="text-brand-main text-[24px]" aria-label="Completed" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[14px] text-[var(--appt-muted)]">Completed Appointments</p>
          <h2 className="text-[32px] font-bold text-brand-main leading-none">{completedCount}</h2>
        </div>
      </article>

      <article className="bg-white rounded-[20px] border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-4 sm:p-4.5">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-[12px] font-semibold text-black-main-text uppercase tracking-wide">January 2026</h3>
          <div className="flex items-center gap-2 text-gray-400">
            <button className="cursor-default" aria-label="Previous month">
              <HiChevronLeft />
            </button>
            <button className="cursor-default" aria-label="Next month">
              <HiChevronRight />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2 px-1">
          {CALENDAR_DAYS.map(([day], idx) => (
            <span key={`${day}-${idx}`} className="text-[10px] text-[#9CA3AF] font-semibold">
              {day}
            </span>
          ))}
        </div>

        <div className="space-y-1 px-1">
          {CALENDAR_NUMBERS.map((week, weekIndex) => (
            <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-1 text-center">
              {week.map((d, dayIndex) => {
                const isSelected = d === 8;
                return (
                  <span
                    key={`d-${weekIndex}-${dayIndex}`}
                    className={`h-7 w-7 mx-auto rounded-full text-[11px] flex items-center justify-center ${
                      isSelected
                        ? 'bg-brand-main text-white font-semibold'
                        : 'text-black-main-text'
                    }`}
                  >
                    {d}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default AppointmentsStats;
