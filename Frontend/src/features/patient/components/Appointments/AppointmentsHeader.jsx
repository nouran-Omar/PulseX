import { MdOutlineEventNote } from 'react-icons/md';

const AppointmentsHeader = () => {
  return (
    <header className="flex flex-col pb-4 mb-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl text-black-main-text text-[24px] shrink-0">
            <MdOutlineEventNote aria-label="Appointments" />
          </div>
          <h1 className="text-[24px] font-bold text-black-main-text">
            My Appointments
          </h1>
        </div>
        <p className="text-[18px] text-[var(--appt-muted)] max-w-2xl pl-[8px]">
          View your scheduled and completed appointments
        </p>
      </div>
    </header>
  );
};

export default AppointmentsHeader;
