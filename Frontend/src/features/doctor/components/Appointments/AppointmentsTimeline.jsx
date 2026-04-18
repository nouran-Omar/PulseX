import { HiOutlineXCircle, HiOutlineArrowRight } from 'react-icons/hi2';
import { HiMiniPause } from 'react-icons/hi2';

const TimelineTime = ({ time, muted = false }) => (
  <div className="w-[58px] shrink-0 flex justify-center">
    <span
      className={`h-8 min-w-[46px] px-2 rounded-full text-[10px] font-semibold flex items-center justify-center ${
        muted ? 'bg-gray-200 text-[#6B7280]' : 'bg-brand-main text-white shadow-[0_6px_14px_rgba(51,60,245,0.25)]'
      }`}
    >
      {time}
    </span>
  </div>
);

const UpcomingCard = ({ item, onCancel, onViewRecord }) => (
  <article className="bg-white rounded-[18px] border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div className="flex items-center gap-3 min-w-0">
      <img src={item.img} alt={item.patient} className="w-11 h-11 rounded-full object-cover shrink-0" />
      <div className="min-w-0">
        <h3 className="text-[14px] sm:text-[15px] font-semibold text-black-main-text truncate">{item.patient}</h3>
        <p className="text-[12px] text-[var(--appt-muted)] truncate">Today - Clinic Room {item.room}</p>
      </div>
      {item.tag && (
        <span className={`hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${item.tagClass}`}>
          {item.tag}
        </span>
      )}
    </div>

    <div className="flex items-center gap-2 sm:gap-3 justify-end">
      <button
        onClick={() => onCancel(item.id)}
        className="text-[#DC2626] text-[12px] sm:text-[13px] font-semibold flex items-center gap-1 cursor-pointer hover:underline"
      >
        <HiOutlineXCircle className="text-[14px]" /> Cancel Appointment
      </button>
      <button
        onClick={() => onViewRecord(item.id)}
        className="text-brand-main text-[12px] sm:text-[13px] font-semibold flex items-center gap-1 cursor-pointer hover:underline"
      >
        View Record <HiOutlineArrowRight className="text-[13px]" />
      </button>
    </div>
  </article>
);

const CompletedCard = ({ item, onViewRecord }) => (
  <article className="bg-white rounded-[18px] border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div className="flex items-center gap-3 min-w-0">
      <img src={item.img} alt={item.patient} className="w-11 h-11 rounded-full object-cover shrink-0" />
      <div className="min-w-0">
        <h3 className="text-[14px] sm:text-[15px] font-semibold text-black-main-text truncate">{item.patient}</h3>
        <p className="text-[12px] text-[var(--appt-muted)] truncate">{item.when} - Room {item.room}</p>
      </div>
    </div>

    <div className="flex items-center gap-3 justify-end">
      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#D1FAE5] text-[#10B981]">Completed</span>
      <button
        onClick={() => onViewRecord(item.id)}
        className="text-brand-main text-[12px] sm:text-[13px] font-semibold flex items-center gap-1 cursor-pointer hover:underline"
      >
        View Record <HiOutlineArrowRight className="text-[13px]" />
      </button>
    </div>
  </article>
);

const AppointmentsTimeline = ({ activeTab, upcomingList, completedGroups, onCancel, onViewRecord }) => {
  if (activeTab === 'completed') {
    return (
      <section className="flex flex-col gap-4" aria-label="Completed appointments">
        {completedGroups.map((group) => (
          <section key={group.dateLabel} className="flex flex-col gap-3">
            <h2 className="text-[11px] text-[#9CA3AF] font-semibold uppercase tracking-wide">{group.dateLabel}</h2>
            {group.items.map((item) => (
              <CompletedCard key={item.id} item={item} onViewRecord={onViewRecord} />
            ))}
          </section>
        ))}
      </section>
    );
  }

  return (
    <section className="relative" aria-label="Upcoming appointments timeline">
      <div className="flex flex-col gap-4">
        {upcomingList.map((item) => {
          if (item.type === 'break') {
            return (
              <div key={item.id} className="flex items-center gap-3 sm:gap-4">
                <TimelineTime time="--" muted />
                <div className="flex-1 bg-[#F3F4F6] rounded-[14px] px-4 py-3 text-[12px] text-[#6B7280] flex items-center gap-2">
                  <HiMiniPause className="text-[14px]" />
                  <span className="font-semibold">Break Time</span>
                  <span>{item.duration}</span>
                </div>
              </div>
            );
          }

          return (
            <div key={item.id} className="flex items-start gap-3 sm:gap-4">
              <TimelineTime time={item.time} />
              <div className="flex-1">
                <UpcomingCard item={item} onCancel={onCancel} onViewRecord={onViewRecord} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AppointmentsTimeline;
