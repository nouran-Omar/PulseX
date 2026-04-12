import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUser,
} from 'react-icons/hi2';
import { TbStethoscope } from 'react-icons/tb';

const PrescriptionDetailHeader = ({ data }) => {
  return (
    <header
      className="px-8 py-7 w-full"
      style={{ background: 'linear-gradient(90deg, #155DFC 0%, #1447E6 100%)' }}
    >
      <h2 className="sr-only">Prescription summary</h2>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <section className="flex items-center gap-3 text-white" aria-label="Prescribing doctor">
          <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center text-[22px] shrink-0">
            <TbStethoscope aria-label="Stethoscope" />
          </div>
          <div>
            <span className="text-[14px] opacity-80 block">Prescribed by</span>
            <p className="text-[18px] font-bold m-0 leading-tight">{data.doc}</p>
            <p className="text-[14px] opacity-80 m-0">{data.spec}</p>
          </div>
        </section>

        <section className="flex items-center gap-3 text-white" aria-label="Patient">
          <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center text-[22px] shrink-0">
            <HiOutlineUser aria-label="Patient" />
          </div>
          <div>
            <span className="text-[14px] opacity-80 block">Patient</span>
            <p className="text-[18px] font-bold m-0 leading-tight">{data.patientName}</p>
            <p className="text-[14px] opacity-80 m-0">ID: {data.patientID}</p>
          </div>
        </section>

        <section className="flex items-center gap-3 text-white" aria-label="Date issued">
          <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center text-[22px] shrink-0">
            <HiOutlineCalendar aria-label="Calendar" />
          </div>
          <div>
            <span className="text-[14px] opacity-80 block">Date Issued</span>
            <p className="text-[18px] font-bold m-0 leading-tight">{data.date}</p>
            <p className="text-[14px] opacity-80 m-0 flex items-center gap-1">
              <HiOutlineClock className="text-[14px]" aria-label="Time" /> {data.time}
            </p>
          </div>
        </section>
      </div>
    </header>
  );
};

export default PrescriptionDetailHeader;
