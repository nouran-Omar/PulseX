const AppointmentsTabs = ({ activeTab, onChange }) => {
  return (
    <nav className="flex items-center" aria-label="Appointment tabs">
      <div className="inline-flex bg-white border border-gray-200 rounded-full p-0.5 shadow-sm min-w-[220px]">
        <button
          className={`w-[108px] px-5 py-2 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
            activeTab === 'upcoming'
              ? 'bg-brand-main text-white shadow-[0_6px_16px_rgba(51,60,245,0.25)]'
              : 'text-[var(--appt-muted)] hover:text-black-main-text'
          }`}
          onClick={() => onChange('upcoming')}
          aria-current={activeTab === 'upcoming' ? 'page' : undefined}
        >
          Upcoming
        </button>

        <button
          className={`w-[108px] px-5 py-2 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
            activeTab === 'completed'
              ? 'bg-brand-main text-white shadow-[0_6px_16px_rgba(51,60,245,0.25)]'
              : 'text-[var(--appt-muted)] hover:text-black-main-text'
          }`}
          onClick={() => onChange('completed')}
          aria-current={activeTab === 'completed' ? 'page' : undefined}
        >
          Completed
        </button>
      </div>
    </nav>
  );
};

export default AppointmentsTabs;
