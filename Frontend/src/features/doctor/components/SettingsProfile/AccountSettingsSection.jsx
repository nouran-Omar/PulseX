import { LuBell, LuLock, LuMoon } from 'react-icons/lu';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-[#2563EB]' : 'bg-[#D1D5DB]'}`}
    aria-pressed={checked}
  >
    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${checked ? 'right-0.5' : 'left-0.5'}`} />
  </button>
);

const SettingRow = ({ icon, title, desc, action }) => (
  <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-[14px] text-[#9CA3AF]">{icon}</span>
      <div>
        <h3 className="text-[14px] font-semibold text-black-main-text">{title}</h3>
        <p className="text-[12px] text-[#6B7280]">{desc}</p>
      </div>
    </div>
    {action}
  </div>
);

const AccountSettingsSection = ({ emailNotif, setEmailNotif, darkMode, setDarkMode, onOpenPassword }) => {
  return (
    <section className="overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white" aria-labelledby="doctor-account-title">
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#FFF5ED] px-4 py-3">
        <HiOutlineCog6Tooth className="text-[14px] text-[#F97316]" />
        <h2 id="doctor-account-title" className="text-[22px] font-bold text-black-main-text">Account Settings</h2>
      </div>

      <div className="divide-y divide-[#F3F4F6]">
        <SettingRow
          icon={<LuLock />}
          title="Change Password"
          desc="Update your password regularly for security"
          action={
            <button
              type="button"
              onClick={onOpenPassword}
              className="text-[12px] font-semibold text-[#2563EB] hover:underline"
            >
              Change
            </button>
          }
        />
        <SettingRow
          icon={<LuBell />}
          title="Email Notifications"
          desc="Receive email updates about your account"
          action={<Toggle checked={emailNotif} onChange={() => setEmailNotif((state) => !state)} />}
        />
        <SettingRow
          icon={<LuMoon />}
          title="Dark Mode"
          desc="Switch to dark theme"
          action={<Toggle checked={darkMode} onChange={() => setDarkMode((state) => !state)} />}
        />
      </div>
    </section>
  );
};

export default AccountSettingsSection;
