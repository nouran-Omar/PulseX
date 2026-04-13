import { HiUsers } from 'react-icons/hi';
import { MdMonitor, MdStars } from 'react-icons/md';

const DoctorListStats = ({ totalDoctors }) => {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm px-3 py-6 mt-[30px] sm:mt-[55px] mb-[30px] sm:mb-[40px] flex flex-wrap items-center justify-around sm:justify-evenly gap-y-6 gap-x-4" aria-label="Doctors stats">
      <article className="flex items-center gap-3 sm:gap-4">
        <div
          className="w-14 h-14 sm:w-18 sm:h-18 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(201deg, #D3FFE7 0%, #EFFFF6 100%)' }}
        >
          <HiUsers className="text-[#00AC4F] text-[24px] sm:text-[32px]" aria-label="Total doctors" />
        </div>
        <div>
          <p className="text-[12px] sm:text-[14px] text-[var(--doc-list-muted-2)]">Total Doctors</p>
          <p className="text-[24px] sm:text-[32px] font-bold text-brand-main">{totalDoctors}</p>
        </div>
      </article>

      <article className="flex items-center gap-3 sm:gap-4">
        <div
          className="w-14 h-14 sm:w-18 sm:h-18 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(201deg, #D3FFE7 0%, #EFFFF6 100%)' }}
        >
          <MdStars className="text-[#00AC4F] text-[24px] sm:text-[32px]" aria-label="Top rated" />
        </div>
        <div>
          <p className="text-[12px] sm:text-[14px] text-[var(--doc-list-muted-2)]">Top Rated Specialist</p>
          <p className="text-[24px] sm:text-[32px] font-bold text-[#FACC15]">89%</p>
        </div>
      </article>

      <article className="flex items-center gap-3 sm:gap-4">
        <div
          className="w-14 h-14 sm:w-18 sm:h-18 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(201deg, #D3FFE7 0%, #EFFFF6 100%)' }}
        >
          <MdMonitor className="text-[#00AC4F] text-[24px] sm:text-[32px]" aria-label="Active now" />
        </div>
        <div>
          <p className="text-[12px] sm:text-[14px] text-[var(--doc-list-muted-2)]">Active Now</p>
          <p className="text-[24px] sm:text-[32px] font-bold text-[#7939FF]">32</p>
        </div>
      </article>
    </section>
  );
};

export default DoctorListStats;
