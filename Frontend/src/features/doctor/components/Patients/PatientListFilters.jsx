import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

const SelectFilter = ({ label, value, onChange, options }) => (
  <label className="flex items-center gap-2 text-[14px] font-semibold text-black-main-text">
    <span>{label}:</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 min-w-[110px] rounded-full border border-[#D1D5DB] bg-white px-4 text-[14px] font-normal text-[#374151] outline-none"
    >
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </label>
);

const PatientListFilters = ({ filters, onFilterChange, search, onSearchChange }) => {
  return (
    <section className="mt-5 rounded-2xl bg-[#ECEEF2] p-3" aria-label="Patient list filters">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_1fr_220px]">
        <SelectFilter
          label="Risk Level"
          value={filters.risk}
          onChange={(value) => onFilterChange('risk', value)}
          options={['All', 'Low', 'Moderate', 'High', 'Low Risk']}
        />
        <SelectFilter
          label="Blood Pressure"
          value={filters.pressure}
          onChange={(value) => onFilterChange('pressure', value)}
          options={['Normal', 'High', 'Low']}
        />
        <SelectFilter
          label="Last Visit"
          value={filters.lastVisit}
          onChange={(value) => onFilterChange('lastVisit', value)}
          options={['Today', 'This Week', 'This Month']}
        />

        <label className="relative block">
          <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-[#9CA3AF]" />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name"
            className="h-10 w-full rounded-full border border-[#D1D5DB] bg-[#F9FAFB] pl-11 pr-4 text-[14px] outline-none placeholder:text-[#9CA3AF]"
          />
        </label>
      </div>
    </section>
  );
};

export default PatientListFilters;
