function NumberField({
  label,
  icon,
  iconLabel,
  value,
  onChange,
  placeholder,
  unit,
  required,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-[var(--uh-muted-2)]">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="flex items-center bg-[#f9fafb] border border-gray-200 rounded-xl px-4 py-3 gap-2.5 focus-within:border-[#155DFC] transition-colors">
        <span className="text-[var(--uh-muted-3)] text-[14px] shrink-0" aria-label={iconLabel}>
          {icon}
        </span>
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="cursor-pointer bg-transparent outline-none w-full text-sm text-black-main-text placeholder-gray-400"
        />
        {unit && <span className="text-[var(--uh-muted-3)] text-xs shrink-0">{unit}</span>}
      </div>
    </div>
  );
}

export default NumberField;
