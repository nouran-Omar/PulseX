import { FaUserDoctor } from 'react-icons/fa6';

const DoctorListHeader = () => {
  return (
    <header className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <FaUserDoctor className="text-xl text-black-main-text" aria-label="Doctors" />
        <h1 className="text-[20px] sm:text-[24px] font-bold text-black-main-text">Doctor List</h1>
      </div>
      <p className="text-[16px] sm:text-[18px] text-[var(--doc-list-muted)]">
        Find and connect with heart specialists easily.
      </p>
    </header>
  );
};

export default DoctorListHeader;
