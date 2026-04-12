import { LuClipboardList } from 'react-icons/lu';

const PrescriptionsHeader = () => {
  return (
    <header className="flex items-center gap-3 mb-6">
      <div>
        <h1 className="text-[24px] font-bold text-black-main-text m-0 leading-tight flex items-center">
          <LuClipboardList className="text-[30px] text-black-main-text mr-2" />
          Prescription History
        </h1>
        <p className="text-[18px] text-gray-text-dim2 mt-[2px] m-0">
          View and manage all your medical prescriptions
        </p>
      </div>
    </header>
  );
};

export default PrescriptionsHeader;
