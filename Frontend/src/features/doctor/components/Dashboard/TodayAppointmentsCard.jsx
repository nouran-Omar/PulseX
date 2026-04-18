const TodayAppointmentsCard = ({ appointments, onViewCalendar }) => {
  if (!appointments.length) {
    return (
      <section className="rounded-3xl bg-gradient-to-br from-[#4F8CF9] to-[#2E5EF5] p-4 text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]" aria-labelledby="appointments-title-empty">
        <h2 id="appointments-title-empty" className="text-[24px] font-bold">Today Appointments</h2>
        <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 p-6 text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-white/20" />
          <p className="text-[22px] font-bold">No Appointments Today</p>
          <p className="mt-2 text-[14px] text-[#DCE7FF]">You don&apos;t have any scheduled appointments for today.</p>
          <button type="button" onClick={onViewCalendar} className="mt-4 h-10 rounded-xl bg-white px-4 text-[13px] font-semibold text-[#2E5EF5]">
            View Calendar
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-gradient-to-br from-[#7EA9F6] to-[#628DF0] p-4 text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]" aria-labelledby="appointments-title">
      <h2 id="appointments-title" className="text-[24px] font-bold">Today Appointments</h2>
      <div className="mt-4 space-y-3">
        {appointments.map((item) => (
          <article key={item.id} className="flex items-center justify-between rounded-xl bg-white/20 px-3 py-2">
            <p className="text-[12px] font-semibold">{item.time}</p>
            <div className="flex items-center gap-2">
              <img src={item.avatar} alt={item.name} className="h-8 w-8 rounded-full object-cover" />
              <div>
                <p className="text-[13px] font-semibold">{item.name}</p>
                <p className="text-[11px] text-[#EAF2FF]">{item.slot}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TodayAppointmentsCard;
