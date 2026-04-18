import { LuCalendar, LuMail, LuMapPin, LuPhone, LuUser } from 'react-icons/lu';
import { HiOutlineCheck } from 'react-icons/hi2';

const inputClass = 'h-10 w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 text-[13px] text-[#111827] outline-none focus:border-[#333CF5]';

const InputField = ({ label, icon, value, onChange, required = false }) => (
  <label className="block">
    <span className="mb-1 block text-[12px] font-semibold text-[#374151]">
      {label}
      {required ? <span className="text-[#DC2626]">*</span> : null}
    </span>
    <div className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 transition-colors focus-within:border-[#333CF5]">
      <span className="text-[13px] text-[#9CA3AF]">{icon}</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full bg-transparent text-[13px] text-[#111827] outline-none"
      />
    </div>
  </label>
);

const PersonalInfoSection = ({ form, setForm, onSave }) => {
  const onField = (field, value) => setForm((state) => ({ ...state, [field]: value }));

  return (
    <section className="overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white" aria-labelledby="doctor-personal-title">
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#EEF3FB] px-4 py-3">
        <LuUser className="text-[14px] text-[#2563EB]" />
        <h2 id="doctor-personal-title" className="text-[22px] font-bold text-black-main-text">Personal Information</h2>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[104px_1fr]">
          <div>
            <p className="mb-2 text-[12px] font-semibold text-[#374151]">Profile Photo</p>
            <img
              src={form.photo}
              alt="Doctor profile"
              className="h-[102px] w-[78px] rounded-xl object-cover shadow-sm"
            />
            <p className="mt-1 text-[10px] leading-tight text-[#9CA3AF]">JPG, PNG or GIF</p>
            <p className="text-[10px] leading-tight text-[#9CA3AF]">Max size 5MB</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InputField label="First Name" icon={<LuUser />} value={form.firstName} onChange={(v) => onField('firstName', v)} required />
            <InputField label="Last Name" icon={<LuUser />} value={form.lastName} onChange={(v) => onField('lastName', v)} required />
            <InputField label="Email Address" icon={<LuMail />} value={form.email} onChange={(v) => onField('email', v)} required />
            <InputField label="Phone Number" icon={<LuPhone />} value={form.phone} onChange={(v) => onField('phone', v)} required />
            <InputField label="Date of Birth" icon={<LuCalendar />} value={form.dob} onChange={(v) => onField('dob', v)} />
            <InputField label="Location" icon={<LuMapPin />} value={form.location} onChange={(v) => onField('location', v)} />

            <InputField
              label="Years of Experience"
              icon={<LuCalendar />}
              value={form.experienceYears}
              onChange={(v) => onField('experienceYears', v)}
            />

            <div className="sm:col-span-2">
              <span className="mb-1 block text-[12px] font-semibold text-[#374151]">
                Gender <span className="text-[#DC2626]">*</span>
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onField('gender', 'male')}
                  className={`h-10 rounded-[10px] border text-[12px] transition-colors flex items-center justify-center gap-1.5 ${
                    form.gender === 'male'
                      ? 'border-[#333CF5] bg-[#EEF2FF] text-[#1D4ED8]'
                      : 'border-[#CBD5E1] bg-white text-[#4B5563]'
                  }`}
                >
                  <span
                    className={`h-3.5 w-3.5 rounded-full border ${
                      form.gender === 'male' ? 'border-[#1D4ED8]' : 'border-[#94A3B8]'
                    }`}
                  />
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => onField('gender', 'female')}
                  className={`h-10 rounded-[10px] border text-[12px] transition-colors flex items-center justify-center gap-1.5 ${
                    form.gender === 'female'
                      ? 'border-[#E6007A] bg-[#E6007A] text-white'
                      : 'border-[#CBD5E1] bg-white text-[#4B5563]'
                  }`}
                >
                  <span
                    className={`h-3.5 w-3.5 rounded-full border ${
                      form.gender === 'female' ? 'border-white' : 'border-[#94A3B8]'
                    }`}
                  />
                  Female
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#333CF5] px-5 text-[12px] font-semibold text-white shadow-[0_8px_18px_rgba(51,60,245,0.35)] transition-colors hover:bg-[#2C34D8]"
          >
            <HiOutlineCheck className="text-[14px]" /> Save Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoSection;
