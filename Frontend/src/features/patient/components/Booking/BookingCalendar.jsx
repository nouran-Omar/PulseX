import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const BookingCalendar = ({
  calHeaderLabel,
  weekDays,
  daysInMonth,
  firstDayOfWeek,
  availableDays,
  isSelectedDay,
  onPrev,
  onNext,
  onDayClick,
}) => {
  return (
    <section className="flex-1" aria-label="Calendar">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <button
          onClick={onPrev}
          className="cursor-pointer w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition"
          aria-label="Previous month"
        >
          <HiChevronLeft className="text-[var(--book-muted-3)]" />
        </button>
        <span className="text-base font-bold text-black-main-text">{calHeaderLabel}</span>
        <button
          onClick={onNext}
          className="cursor-pointer w-9 h-9 rounded-full bg-brand-main flex items-center justify-center shadow-lg shadow-blue-100"
          aria-label="Next month"
        >
          <HiChevronRight className="text-white" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {weekDays.map((d) => (
          <span key={d} className="text-center text-[11px] text-[var(--book-muted-2)] font-black uppercase tracking-widest">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const isAvail = availableDays.has(day);
          const selected = isSelectedDay(day);
          return (
            <button
              key={day}
              onClick={() => onDayClick(day)}
              disabled={!isAvail}
              className={`aspect-square w-full max-w-[40px] mx-auto rounded-full text-xs font-bold flex items-center justify-center transition-all
                ${selected ? 'bg-brand-main text-white shadow-lg' :
                  isAvail ? 'bg-[#333CF514] text-black-main-text cursor-pointer hover:bg-blue-100' : 'text-gray-200 cursor-not-allowed'}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default BookingCalendar;
