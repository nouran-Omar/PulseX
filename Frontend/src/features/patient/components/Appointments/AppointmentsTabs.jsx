const AppointmentsTabs = ({ activeTab, onChange }) => {
  return (
    <nav className="flex gap-4" aria-label="Appointment tabs">
      <button
        className={`px-2 py-2 text-[14px] font-bold transition-all cursor-pointer border-b-2 ${
          activeTab === 'upcoming'
            ? 'text-black-main-text border-[#333CF5]'
            : 'text-[var(--appt-muted-2)] border-transparent hover:text-black-main-text'
        }`}
        onClick={() => onChange('upcoming')}
        aria-current={activeTab === 'upcoming' ? 'page' : undefined}
      >
        Upcoming
      </button>

      <button
        className={`px-2 py-2 text-[14px] font-bold transition-all cursor-pointer border-b-2 ${
          activeTab === 'completed'
            ? 'text-black-main-text border-[#333CF5]'
            : 'text-[var(--appt-muted-2)] border-transparent hover:text-black-main-text'
        }`}
        onClick={() => onChange('completed')}
        aria-current={activeTab === 'completed' ? 'page' : undefined}
      >
        Completed
      </button>
    </nav>
  );
};

export default AppointmentsTabs;
