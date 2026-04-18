import { HiOutlineDocumentText } from 'react-icons/hi2';

const PrescriptionHeader = () => {
  return (
    <header className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center text-[18px] text-[#374151]">
        <HiOutlineDocumentText />
      </span>
      <div>
        <h1 className="text-[24px] leading-tight font-bold text-black-main-text">New E-Prescription</h1>
        <p className="mt-1 text-[18px] leading-snug text-[#6B7280]">Create and send digital prescription to patient</p>
      </div>
    </header>
  );
};

export default PrescriptionHeader;
