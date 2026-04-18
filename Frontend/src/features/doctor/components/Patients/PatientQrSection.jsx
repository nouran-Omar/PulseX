import { HiOutlineArrowDownTray } from 'react-icons/hi2';
import Qrcodepatiant from '../../../../assets/Images/Qrcodepatiant.svg';

const PatientQrSection = () => {
  return (
    <section className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[280px_1fr]" aria-label="QR section">
      <article className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
        <h3 className="text-[22px] font-bold text-black-main-text">Patient QR Code</h3>
        <img src={Qrcodepatiant} alt="Patient QR" className="mx-auto mt-4 h-[130px] w-[130px]" />
        <p className="mt-3 text-[14px] text-black-main-text"><span className="font-semibold">Generated on:</span> 19/10/2004</p>
        <p className="mt-1 text-[14px] text-black-main-text"><span className="font-semibold">Total Files:</span> 8</p>
        <button type="button" className="mt-4 h-10 w-full rounded-full bg-[#333CF5] text-[13px] font-semibold text-white">
          <span className="inline-flex items-center gap-1"><HiOutlineArrowDownTray /> Download PDF</span>
        </button>
      </article>

      <article className="self-end rounded-2xl bg-[#6366F1] p-4 text-white shadow-[0_8px_20px_rgba(99,102,241,0.35)]">
        <h4 className="text-[18px] font-bold">Tip</h4>
        <p className="mt-1 text-[13px] text-[#E0E7FF]">Scan or download this code to access all uploaded records instantly.</p>
      </article>
    </section>
  );
};

export default PatientQrSection;
