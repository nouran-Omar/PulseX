import { LuFileText, LuTrash2 } from 'react-icons/lu';

const DocumentsTableDesktop = ({ documents, selected, toggleSelect, toggleAll, openConfirm, brand }) => {
  return (
    <div className="hidden sm:block table-scrollbar overflow-x-auto rounded-[20px] border border-gray-200 [scrollbar-gutter:stable]" style={{ boxShadow: '0px 1px 3px rgba(0,0,0,0.06)' }}>
      <table className="w-full text-[14px]" style={{ minWidth: '700px' }}>
        <thead>
          <tr className="border-b border-gray-200 bg-white">
            <th className="pl-6 pr-2 py-5 text-left w-14">
              <input
                type="checkbox"
                checked={selected.length === documents.length && documents.length > 0}
                onChange={toggleAll}
                className="rounded-[5px] border-2 border-gray-300 accent-[#333CF5] cursor-pointer"
                style={{ width: '18px', height: '18px' }}
              />
            </th>
            <th className="px-4 py-5 text-left text-[14px] font-semibold text-gray-500 tracking-wide">File name</th>
            <th className="px-4 py-5 text-left text-[14px] font-semibold text-gray-500 tracking-wide">Type</th>
            <th className="px-4 py-5 text-left text-[14px] font-semibold text-gray-500 tracking-wide">Size</th>
            <th className="px-4 py-5 text-left text-[14px] font-semibold text-gray-500 tracking-wide">Uploaded Date</th>
            <th className="px-4 py-5 text-left text-[14px] font-semibold text-gray-500 tracking-wide">Record Type</th>
            <th className="pr-6 pl-2 py-5 text-center w-14">
              <LuTrash2 className="text-red-500 text-[24px] mx-auto" />
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-16 text-[14px] text-neutral-400">
                No documents yet. Upload your first file above.
              </td>
            </tr>
          )}
          {documents.map((doc, idx) => {
            const isChecked = selected.includes(doc.id);
            const isLast = idx === documents.length - 1;
            return (
              <tr
                key={doc.id}
                className={`transition-colors hover:bg-gray-50/60 ${!isLast ? 'border-b border-gray-100' : ''}`}
                style={{ background: isChecked ? '#EEF0FF' : undefined }}
              >
                <td className="pl-6 pr-2 py-5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSelect(doc.id)}
                    className="rounded-[5px] border-2 border-gray-300 accent-[#333CF5] cursor-pointer"
                    style={{ width: '18px', height: '18px' }}
                  />
                </td>
                <td className="px-4 py-5">
                  <div className="flex items-center gap-2.5">
                    <LuFileText className="text-[16px] shrink-0" style={{ color: brand.main }} />
                    <span className="font-semibold text-[14px]" style={{ color: brand.dark }}>{doc.name}</span>
                  </div>
                </td>
                <td className="px-4 py-5 text-[14px]">
                  <span className="font-bold text-[14px]" style={{ color: brand.dark }}>{doc.type}</span>
                </td>
                <td className="px-4 py-5 text-[14px] text-gray-400 font-medium">{doc.size}</td>
                <td className="px-4 py-5 text-[14px] text-gray-400 font-medium">{doc.date}</td>
                <td className="px-4 py-5 text-[14px] text-gray-500 font-medium">{doc.category}</td>
                <td className="pr-6 pl-2 py-5 text-center">
                  <button
                    className="p-2 cursor-pointer rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    onClick={() => openConfirm([doc.id], doc.name)}
                    title="Delete"
                  >
                    <LuTrash2 className="text-[24px]" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsTableDesktop;
