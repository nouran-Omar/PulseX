import { LuCheck, LuEye, LuEyeOff, LuLock } from 'react-icons/lu';

export function InputField({ label, icon, value, onChange, required, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-semibold text-[#364153]">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="flex items-center bg-[#f9fafb] border border-gray-200 rounded-xl px-3.5 py-2.5 gap-2.5 focus-within:border-[#155DFC] transition-colors">
        <span className="text-gray-400 shrink-0 text-[14px]">{icon}</span>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          className="bg-transparent outline-none w-full text-[14px] text-black-main-text"
        />
      </div>
    </div>
  );
}

export function TextAreaField({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full min-h-[160px] rounded-xl border border-gray-200 bg-[#f9fafb] p-4 text-[14px] text-black-main-text outline-none focus:border-[#155DFC] transition-colors resize-none"
    />
  );
}

export function PasswordField({ label, placeholder, value, show, onToggle, onChange }) {
  return (
    <div className="mb-4">
      <label className="text-[12px] font-semibold text-[#364153] mb-1.5 block">{label}</label>
      <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 gap-2.5 focus-within:border-[#155DFC] transition-colors">
        <LuLock size={14} className="text-gray-400 shrink-0" />
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="outline-none w-full text-[13px] text-black-main-text bg-transparent"
        />
        <button type="button" onClick={onToggle} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors shrink-0">
          {show ? <LuEyeOff size={14} /> : <LuEye size={14} />}
        </button>
      </div>
    </div>
  );
}

export function ReqItem({ met, text }) {
  return (
    <li className={`flex items-center gap-2 text-xs ${met ? 'text-green-600' : 'text-gray-400'}`}>
      <LuCheck size={12} className={met ? 'text-green-500' : 'text-gray-300'} />
      {text}
    </li>
  );
}

export function SettingRow({ icon, title, desc, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 py-4">
      <div className="flex items-start sm:items-center gap-3">
        <span className="text-gray-400 text-lg shrink-0">{icon}</span>
        <div>
          <h3 className="font-bold text-[16px] text-black-main-text">{title}</h3>
          <p className="text-gray-400 text-[14px] mt-0.5">{desc}</p>
        </div>
      </div>
      <div className="sm:self-auto self-start">
        {action}
      </div>
    </div>
  );
}

export function Toggle({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#155DFC] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" />
    </label>
  );
}
