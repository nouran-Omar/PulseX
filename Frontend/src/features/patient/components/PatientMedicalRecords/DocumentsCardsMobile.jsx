import { LuFileText, LuTrash2 } from 'react-icons/lu';

const DocumentsCardsMobile = ({ documents, selected, toggleSelect, openConfirm, brand }) => {
  return (
    <div className="sm:hidden flex flex-col gap-3 px-4 pb-4">
      {documents.length === 0 && (
        <div className="text-center py-10 text-[14px] text-neutral-400 rounded-2xl border border-dashed border-gray-200 bg-[#FAFBFF]">
          No documents yet. Upload your first file above.
        </div>
      )}

      {documents.map((doc) => {
        const isChecked = selected.includes(doc.id);
        return (
          <div
            key={doc.id}
            className="rounded-2xl border p-4 transition-colors"
            style={{
              borderColor: isChecked ? '#BFC4FF' : '#E5E7EB',
              background: isChecked ? '#EEF0FF' : '#FAFBFF',
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <label className="flex items-center gap-2 min-w-0">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleSelect(doc.id)}
                  className="rounded-[5px] border-2 border-gray-300 accent-[#333CF5] cursor-pointer"
                  style={{ width: '18px', height: '18px' }}
                />
                <div className="flex items-center gap-2 min-w-0">
                  <LuFileText className="text-[16px] shrink-0" style={{ color: brand.main }} />
                  <p className="font-semibold text-[14px] truncate" style={{ color: brand.dark }}>{doc.name}</p>
                </div>
              </label>

              <button
                className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                onClick={() => openConfirm([doc.id], doc.name)}
                title="Delete"
              >
                <LuTrash2 className="text-[20px]" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[13px]">
              <div className="rounded-xl px-3 py-2 bg-white border border-gray-100">
                <p className="text-gray-400">Type</p>
                <p className="font-bold" style={{ color: brand.dark }}>{doc.type}</p>
              </div>
              <div className="rounded-xl px-3 py-2 bg-white border border-gray-100">
                <p className="text-gray-400">Size</p>
                <p className="font-semibold text-gray-500">{doc.size}</p>
              </div>
              <div className="rounded-xl px-3 py-2 bg-white border border-gray-100">
                <p className="text-gray-400">Uploaded Date</p>
                <p className="font-semibold text-gray-500">{doc.date}</p>
              </div>
              <div className="rounded-xl px-3 py-2 bg-white border border-gray-100">
                <p className="text-gray-400">Record Type</p>
                <p className="font-semibold text-gray-500 truncate">{doc.category}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DocumentsCardsMobile;
