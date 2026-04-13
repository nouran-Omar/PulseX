import { useRef, useState } from 'react';
import {
  LuBell,
  LuCalendar,
  LuCheck,
  LuLock,
  LuMail,
  LuMapPin,
  LuMoon,
  LuPhone,
  LuUser,
} from 'react-icons/lu';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import Toast from '../../../../../components/Toast/Toast';
import { GenderToggle } from '../../shared';
import PasswordChangeModal from './PasswordChangeModal';

export default function SettingsProfileView() {
  const [toast, setToast] = useState({ visible: false, title: '', msg: '' });
  const fileRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [form, setForm] = useState({
    firstName: 'Tayem',
    lastName: 'Zayed',
    email: 'Mohamed.salem@pulsex.com',
    phone: '+20 1234567890',
    dob: '1985-06-15',
    location: 'Cairo, Egypt',
    gender: 'male',
  });

  const [pwModal, setPwModal] = useState(false);

  const [emailNotif, setEmailNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const showToast = (title, msg) => {
    setToast({ visible: true, title, msg });
    setTimeout(() => setToast((current) => ({ ...current, visible: false })), 3500);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhoto(url);
    showToast('Photo Updated', 'Your profile photo has been changed successfully.');
  };

  const handleField = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const handleSaveProfile = () =>
    showToast('Saved Successfully', 'Your changes have been saved successfully.');

  return (
    <section className="flex flex-col gap-6 p-6" aria-label="Settings and profile">
      <Toast
        visible={toast.visible}
        title={toast.title}
        message={toast.msg}
        type="success"
        onClose={() => setToast((current) => ({ ...current, visible: false }))}
      />

      <header className="flex flex-col gap-1 pb-4" aria-labelledby="settings-profile-title">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gray-50 text-[22px] text-black-main-text">
            <HiOutlineCog6Tooth />
          </div>
          <h1 id="settings-profile-title" className="text-[24px] leading-tight text-black-main-text sm:font-bold">
            Settings &amp; Profile
          </h1>
        </div>
        <p className="ml-2 text-[18px] text-gray-text-dim2">
          Manage your personal details and account preferences.
        </p>
      </header>

      <section className="overflow-hidden rounded-[22px] border border-gray-100 bg-white shadow-sm" aria-label="Personal information">
        <div
          className="flex items-center gap-2 border-b border-gray-100 px-5 py-4"
          style={{ background: 'linear-gradient(to right, #EFF6FF, #EEF2FF)' }}
        >
          <LuUser size={18} className="text-[#155DFC]" />
          <span className="text-[18px] font-bold text-[#101828]">Personal Information</span>
        </div>

        <div className="p-5 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
            <div className="flex shrink-0 flex-col items-center gap-2">
              <p className="mb-1 self-start text-[14px] font-semibold text-[#364153] lg:self-center">
                Profile Photo
              </p>
              <div
                className="group relative h-28 w-28 cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 transition-colors hover:border-blue-400"
                onClick={() => fileRef.current.click()}
              >
                <img
                  src={
                    photo ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(`${form.firstName} ${form.lastName}`)}&background=333CF5&color=fff&size=128`
                  }
                  className="h-full w-full object-cover"
                  alt="Profile"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-[14px] font-semibold text-white">Change</span>
                </div>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <span className="text-center text-[12px] leading-relaxed text-gray-400">
                JPG, PNG or GIF
                <br />
                Max size 5MB
              </span>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField
                label="First Name"
                icon={<LuUser />}
                value={form.firstName}
                onChange={(value) => handleField('firstName', value)}
                required
              />
              <InputField
                label="Last Name"
                icon={<LuUser />}
                value={form.lastName}
                onChange={(value) => handleField('lastName', value)}
                required
              />
              <InputField
                label="Email Address"
                icon={<LuMail />}
                value={form.email}
                onChange={(value) => handleField('email', value)}
                required
              />
              <InputField
                label="Phone Number"
                icon={<LuPhone />}
                value={form.phone}
                onChange={(value) => handleField('phone', value)}
                required
              />
              <InputField
                label="Date of Birth"
                icon={<LuCalendar />}
                value={form.dob}
                onChange={(value) => handleField('dob', value)}
                required
              />
              <InputField
                label="Location"
                icon={<LuMapPin />}
                value={form.location}
                onChange={(value) => handleField('location', value)}
                required
              />
              <div className="sm:col-span-2">
                <GenderToggle
                  value={form.gender === 'male' ? 'Male' : 'Female'}
                  onChange={(value) => handleField('gender', value.toLowerCase())}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSaveProfile}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-brand-main px-6 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-blue-700"
            >
              <LuCheck size={15} /> Save Changes
            </button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[22px] border border-gray-100 bg-white shadow-sm" aria-label="Account settings">
        <div
          className="flex items-center gap-2 border-b border-gray-100 px-5 py-4"
          style={{ background: 'linear-gradient(to right, #FFF7ED, #FEF2F2)' }}
        >
          <HiOutlineCog6Tooth size={18} className="text-[#F54900]" />
          <span className="text-[18px] font-bold text-[#101828]">Account Settings</span>
        </div>

        <div className="divide-y divide-gray-50">
          <SettingRow
            icon={<LuLock />}
            title="Change Password"
            desc="Update your password regularly for security"
            action={
              <button
                onClick={() => {
                  setPwModal(true);
                }}
                className="cursor-pointer text-[14px] font-bold text-[#155DFC] hover:underline"
              >
                Change
              </button>
            }
          />
          <SettingRow
            icon={<LuBell />}
            title="Email Notifications"
            desc="Receive email updates about your account"
            action={<Toggle checked={emailNotif} onChange={() => setEmailNotif((value) => !value)} />}
          />
          <SettingRow
            icon={<LuMoon />}
            title="Dark Mode"
            desc="Switch to dark theme"
            action={<Toggle checked={darkMode} onChange={() => setDarkMode((value) => !value)} />}
          />
        </div>
      </section>

      <PasswordChangeModal
        isOpen={pwModal}
        onClose={() => setPwModal(false)}
        onSuccess={() =>
          showToast('Password Changed Successfully', 'Your changes have been saved successfully.')
        }
      />

      <style>{`@keyframes pwSlideIn { from { transform: translateY(-18px) scale(.97); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }`}</style>
    </section>
  );
}

function InputField({ label, icon, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-normal text-[#364153]">
        {label}
        {required ? <span className="ml-0.5 text-red-500">*</span> : null}
      </label>
      <div className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-[#f9fafb] px-3.5 py-2.5 transition-colors focus-within:border-[#155DFC]">
        <span className="shrink-0 text-[14px] text-gray-400">{icon}</span>
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent text-[14px] text-black-main-text outline-none"
        />
      </div>
    </div>
  );
}

function SettingRow({ icon, title, desc, action }) {
  return (
    <article className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <span className="shrink-0 text-lg text-gray-400">{icon}</span>
        <div>
          <h3 className="text-[16px] font-bold text-black-main-text">{title}</h3>
          <p className="mt-0.5 text-[14px] text-gray-400">{desc}</p>
        </div>
      </div>
      {action}
    </article>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <div className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
    </label>
  );
}