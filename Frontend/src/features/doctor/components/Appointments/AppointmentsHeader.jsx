import { MdOutlineEventNote } from 'react-icons/md';

const AppointmentsHeader = () => {
  return (
    <header className="flex flex-col pb-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-xl text-black-main-text text-[23px] shrink-0">
            <MdOutlineEventNote aria-label="Appointments" />
          </div>
          <h1 className="text-[24px] font-bold text-black-main-text">Appointments</h1>
        </div>
        <p className="text-[18px] text-[var(--appt-muted)] max-w-2xl pl-[6px]">
          Manage and view all your scheduled visits easily.
        </p>
      </div>
    </header>
  );
};

export default AppointmentsHeader;
