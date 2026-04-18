import { HiOutlineCog6Tooth } from 'react-icons/hi2';

const SettingsHeader = () => {
  return (
    <header className="flex flex-col gap-1" aria-labelledby="doctor-settings-title">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center text-[22px] text-black-main-text">
          <HiOutlineCog6Tooth />
        </span>
        <h1 id="doctor-settings-title" className="text-[24px] font-bold text-black-main-text">
          Settings & Profile
        </h1>
      </div>
      <p className="text-[18px] leading-snug text-[#6B7280]">
        Manage your personal details, health data, and account preferences.
      </p>
    </header>
  );
};

export default SettingsHeader;
