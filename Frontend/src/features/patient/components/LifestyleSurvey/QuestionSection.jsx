const QuestionSection = ({
  icon,
  label,
  question,
  options,
  selected,
  onSelect,
  className = 'flex-1 w-full',
}) => (
  <article className={className}>
    <div className="flex items-center gap-2.5 text-black-main-text text-[18px] font-roboto font-semibold mb-1.5">
      <span aria-label={label}>{icon}</span> {label}
    </div>
    <p className="text-[16px] text-[var(--survey-muted)] mb-3 ml-6">{question}</p>
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => {
        const active = selected === opt;
        return (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-[24px] text-[13px] font-medium border transition-all cursor-pointer ${
              active
                ? 'border-brand-main text-black-main-text bg-white'
                : 'border-gray-200 text-black-main-text bg-white hover:border-brand-main hover:bg-[#f5f5ff]'
            }`}
          >
            <span
              className={`w-3.5 h-3.5 rounded-full border shrink-0 transition-all ${
                active
                  ? 'border-brand-main bg-brand-main shadow-[inset_0_0_0_2.5px_white]'
                  : 'border-gray-300 bg-white'
              }`}
            />
            {opt}
          </button>
        );
      })}
    </div>
  </article>
);

export default QuestionSection;
