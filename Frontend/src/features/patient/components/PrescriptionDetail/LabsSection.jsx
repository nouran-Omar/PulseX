import { HiOutlineArrowUpTray } from 'react-icons/hi2';
import { FaInfoCircle } from 'react-icons/fa';
import { TbClipboardText } from 'react-icons/tb';

const LabsSection = ({ data, onUpload }) => {
  return (
    <section aria-labelledby="prescription-labs-title">
      <div
        className="flex items-center gap-2 text-black-main-text font-bold text-[16px] px-4 py-3 rounded-xl mb-5"
        style={{ background: 'linear-gradient(90deg, #F0FDF4 0%, #DCFCE7 100%)' }}
      >
        <TbClipboardText className="text-[16px] text-[#00A63E]" aria-label="Lab requests" />
        <h2 id="prescription-labs-title" className="m-0 text-[16px] font-bold">
          Lab &amp; Radiology Requests
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {data.labs.map((lab, i) => (
          <article
            key={lab.id}
            className="bg-white border border-[#00c9503a] border-l-4 border-l-[#00C950] rounded-2xl p-5"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-7 h-7 bg-[#00C950] text-white rounded-lg flex items-center justify-center text-[13px] font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-black-main-text m-0">{lab.name}</h3>
                  {lab.note && (
                    <p className="text-[14px] text-[var(--rx-muted)] m-0 mt-[2px]">Note: {lab.note}</p>
                  )}
                </div>
              </div>

              <button
                onClick={onUpload}
                className="flex items-center gap-2 bg-brand-main text-white font-semibold text-[13px] px-5 py-[9px] rounded-xl border-none cursor-pointer transition-opacity hover:opacity-90 shrink-0"
              >
                <HiOutlineArrowUpTray className="text-[14px]" aria-label="Upload" /> Upload Result
              </button>
            </div>
          </article>
        ))}
      </div>

      <aside className="flex items-start gap-3 bg-[#eff6ff] border border-[#dbeafe] rounded-xl p-4 mt-4">
        <FaInfoCircle className="text-[#155DFC] text-[17px] shrink-0 mt-[2px]" aria-label="Lab instructions" />
        <div>
          <h3 className="text-[16px] font-bold text-[#1C398E] m-0 mb-1">Lab Visit Instructions</h3>
          <p className="text-[14px] text-[#193CB8] m-0 leading-relaxed">{data.labInstructions}</p>
        </div>
      </aside>
    </section>
  );
};

export default LabsSection;
