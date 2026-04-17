import React from 'react';
import { FiSearch } from 'react-icons/fi';

const FILTER_SELECT_CLASS =
  'w-full rounded-full border border-[#E4E7EC] bg-[#F8FAFC] px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-[#333CF5]/40';

function PatientFilters({ filters, onFilterChange, onSearchChange }) {
  return (
    <section className="rounded-2xl bg-[#F2F4F7] p-3 md:p-4" aria-label="Patient filters">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <span className="min-w-[72px]">Risk Level:</span>
          <select
            value={filters.risk}
            onChange={(event) => onFilterChange('risk', event.target.value)}
            className={FILTER_SELECT_CLASS}
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <span className="min-w-[112px]">Blood Pressure:</span>
          <select
            value={filters.bloodPressure}
            onChange={(event) => onFilterChange('bloodPressure', event.target.value)}
            className={FILTER_SELECT_CLASS}
          >
            <option value="All">All</option>
            <option value="Normal">Normal</option>
            <option value="Elevated">Elevated</option>
            <option value="High">High</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <span className="min-w-[72px]">Last Visit:</span>
          <select
            value={filters.lastVisit}
            onChange={(event) => onFilterChange('lastVisit', event.target.value)}
            className={FILTER_SELECT_CLASS}
          >
            <option value="All">All</option>
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="older">Older</option>
          </select>
        </label>

        <label className="relative">
          <span className="sr-only">Search by patient name</span>
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-slate-400" />
          <input
            type="search"
            value={filters.search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name"
            className="w-full rounded-full border border-[#E4E7EC] bg-[#F8FAFC] py-2 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#333CF5]/40"
          />
        </label>
      </div>
    </section>
  );
}

export default PatientFilters;
