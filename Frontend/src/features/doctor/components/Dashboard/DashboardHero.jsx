const DashboardHero = ({ stats }) => {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-[#A9DDF3] via-[#7DAEF4] to-[#3340EE] px-4 py-5 shadow-[0_4px_12px_rgba(0,0,0,0.12)] sm:px-5" aria-label="Doctor greeting and quick stats">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex-1">
          <h1 className="text-[24px] font-medium text-[#0F172A] sm:text-[28px]">
            Good Morning <span className="text-[#3340EE] text-[30px] sm:text-[36px] font-bold">Dr. Noha!</span>
          </h1>
          <p className="mt-1 text-[18px] text-[#EAF2FF]">Your clinic snapshot for today.</p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((card) => (
              <article key={card.label} className="min-h-[104px] rounded-2xl bg-white/80 px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-sm">
                <p className="text-[16px] font-medium tracking-tight text-[#0F172A]">{card.label}</p>
                <div className="mt-1 flex items-end justify-between">
                  <p className="text-[38px] leading-none font-medium text-[#3340EE]">{card.value}</p>
                  <span className={`rounded-xl px-2.5 py-1 text-[12px] font-normal ${card.badgeClass}`}>
                    {card.delta}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <img
          src="https://randomuser.me/api/portraits/women/68.jpg"
          alt="Doctor"
          className="mx-auto h-[188px] w-[150px] rounded-[20px] object-cover ring-2 ring-white/45 lg:mx-0"
        />
      </div>
    </section>
  );
};

export default DashboardHero;
