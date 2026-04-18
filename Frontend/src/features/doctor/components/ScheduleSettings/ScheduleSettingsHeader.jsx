import { HiOutlineCalendarDays } from 'react-icons/hi2';

const ScheduleSettingsHeader = () => {
  return (
    <header className="flex flex-col gap-1 pb-4 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <span className="w-9 h-9 rounded-lg flex items-center justify-center text-black-main-text text-[22px]">
          <HiOutlineCalendarDays />
        </span>
        <h1 className="text-[24px] font-bold text-black-main-text">Availability Management</h1>
      </div>
      <p className="text-[18px] text-[#757575] pl-1">Set your available hours and manage appointment slots</p>
    </header>
  );
};

export default ScheduleSettingsHeader;
