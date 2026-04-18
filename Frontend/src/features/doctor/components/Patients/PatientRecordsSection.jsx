import { LuFileText } from 'react-icons/lu';

const tagClass = (type) => (type === 'Radiology' ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#DBEAFE] text-[#1D4ED8]');

const PatientRecordsSection = ({ patient }) => {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white" aria-labelledby="records-title">
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] px-4 py-3">
        <LuFileText className="text-[#3B82F6]" />
        <h2 id="records-title" className="text-[24px] font-bold text-black-main-text">Medical Records</h2>
      </div>

      {patient.records.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <h3 className="text-[22px] font-bold text-black-main-text">No Medical Records Found</h3>
          <p className="mt-1 text-[14px] text-[#6B7280]">This patient does not have any medical records uploaded yet.</p>
        </div>
      ) : (
        <div className="p-4">
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_0.7fr] px-2 pb-3 text-[12px] font-semibold text-[#6B7280]">
            <span>File Name</span><span>Type</span><span>Upload Date</span><span>Action</span>
          </div>
          {patient.records.map((record) => (
            <article key={record.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_0.7fr] items-center gap-2 border-t border-[#F1F5F9] px-2 py-3 text-[14px]">
              <span className="font-semibold text-black-main-text">{record.fileName}</span>
              <span className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${tagClass(record.type)}`}>{record.type}</span>
              <span className="text-[#6B7280]">{record.uploadDate}</span>
              <button type="button" className="text-left font-semibold text-[#333CF5]">View</button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default PatientRecordsSection;
