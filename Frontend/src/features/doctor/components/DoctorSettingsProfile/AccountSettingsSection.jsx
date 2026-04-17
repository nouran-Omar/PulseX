import { LuBell, LuLock, LuMoon } from 'react-icons/lu';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import { SettingRow, Toggle } from './FormPrimitives';

const AccountSettingsSection = ({ setPwError, setPwModal, emailNotif, setEmailNotif, darkMode, setDarkMode }) => {
  return (
    <div className="bg-white rounded-[22px] border border-gray-100 shadow-sm overflow-hidden">
      <div
        className="flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-4"
        style={{ background: 'linear-gradient(to right,#FFF7ED,#FEF2F2)' }}
      >
        <HiOutlineCog6Tooth size={18} className="text-[#f97316]" />
        <h2 id="settings-account-heading" className="text-[#101828] text-[18px] font-bold">Account Settings</h2>
      </div>

      <div className="divide-y divide-gray-50">
        <SettingRow
          icon={<LuLock />}
          title="Change Password"
          desc="Update your password regularly for security"
          action={
            <button
              onClick={() => { setPwError(''); setPwModal(true); }}
              className="text-[#155DFC] cursor-pointer font-bold text-sm hover:underline"
            >
              Change
            </button>
          }
        />
        <SettingRow
          icon={<LuBell />}
          title="Email Notifications"
          desc="Receive appointment and system updates by email"
          action={<Toggle checked={emailNotif} onChange={() => setEmailNotif(v => !v)} />}
        />
        <SettingRow
          icon={<LuMoon />}
          title="Dark Mode"
          desc="Switch to dark theme"
          action={<Toggle checked={darkMode} onChange={() => setDarkMode(v => !v)} />}
        />
      </div>
    </div>
  );
};

export default AccountSettingsSection;
