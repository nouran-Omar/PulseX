import { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

function SelectField({
  label,
  icon,
  iconLabel,
  value,
  onChange,
  options,
  placeholder,
  required,
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="flex flex-col gap-1.5 relative">
      <label className="text-xs font-bold text-black-main-text">
        {label}
        {required && <span className="text-[#DC2626] ml-0.5">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex cursor-pointer items-center justify-between bg-[#f9fafb] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#155DFC] transition-colors w-full"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-gray-400 text-[14px]" aria-label={iconLabel}>
            {icon}
          </span>
          <span className={selected ? 'text-black-main-text' : 'text-gray-400'}>
            {selected ? selected.label : placeholder}
          </span>
        </div>
        <LuChevronDown
          size={16}
          className={`cursor-pointer text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-label="Open options"
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[#EEF2FF] hover:text-brand-main ${
                value === opt.value
                  ? 'bg-[#EEF2FF] text-brand-main font-semibold'
                  : 'text-gray-700'
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectField;
