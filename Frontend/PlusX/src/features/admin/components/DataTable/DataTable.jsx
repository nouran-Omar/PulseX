import React from 'react';
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

export default function DataTable({
  data,
  selectedItems,
  onToggle,
  onEdit,
  onDeleteIndividual,
  onBulkDelete,
  onClearSelection
}) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem  = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems     = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages       = Math.ceil(data.length / itemsPerPage);

  const allSelected = currentItems.length > 0 && currentItems.every(i => selectedItems.includes(i.id));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      currentItems.forEach(item => { if (!selectedItems.includes(item.id)) onToggle(item.id); });
    } else {
      onClearSelection();
    }
  };

  return (
    <div className="flex flex-col gap-4">

      {/* Bulk bar */}
      {selectedItems.length > 0 && (
        <div className="flex items-center gap-4 px-4 py-3 bg-[#EFF6FF] border border-[#bfdbfe] rounded-[10px]">
          <input type="checkbox" checked onChange={onClearSelection} className="w-4 h-4 rounded accent-[#155dfc] cursor-pointer" />
          <span className="text-[13px] font-semibold text-[#155dfc]">{selectedItems.length} Selected</span>
          <button onClick={onBulkDelete} className="px-3 py-1.5 text-[12px] font-semibold text-white bg-red-500 rounded-[8px] hover:bg-red-600 transition-colors">Delete Selected</button>
          <button onClick={onClearSelection} className="px-3 py-1.5 text-[12px] font-semibold text-gray-600 bg-white border border-gray-200 rounded-[8px] hover:bg-gray-50 transition-colors">Cancel</button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-[12px] border border-gray-200/70">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="bg-[#333CF5] text-white text-left">
              <th className="w-10 px-3 py-3">
                <input type="checkbox" checked={allSelected} onChange={handleSelectAll} className="w-4 h-4 rounded accent-white cursor-pointer" />
              </th>
              <th className="px-3 py-3 text-[12px] font-semibold whitespace-nowrap">Full Name</th>
              <th className="px-3 py-3 text-[12px] font-semibold whitespace-nowrap">Email</th>
              <th className="px-3 py-3 text-[12px] font-semibold whitespace-nowrap">Price</th>
              <th className="px-3 py-3 text-[12px] font-semibold whitespace-nowrap">Joined Date</th>
              <th className="px-3 py-3 text-[12px] font-semibold text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, idx) => {
              const isSelected = selectedItems.includes(item.id);
              return (
                <tr key={item.id} className={`border-b border-gray-100 transition-colors ${isSelected ? 'bg-[#EFF6FF]' : idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'} hover:bg-[#EFF6FF]/60`}>
                  <td className="px-3 py-2.5">
                    <input type="checkbox" checked={isSelected} onChange={() => onToggle(item.id)} className="w-4 h-4 rounded accent-[#155dfc] cursor-pointer" />
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <img src={item.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.fullName)}`} alt={item.fullName} className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-100" />
                      <span className="text-[13px] font-semibold text-black-main-text truncate max-w-[140px]">{item.fullName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5"><span className="text-[12px] text-[#757575] truncate block max-w-[180px]">{item.email}</span></td>
                  <td className="px-3 py-2.5"><span className="text-[12px] font-semibold text-[#010218]">${item.price}</span></td>
                  <td className="px-3 py-2.5"><span className="text-[12px] text-[#757575] whitespace-nowrap">{item.joinedDate}</span></td>
                  <td className="px-3 py-2.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => onEdit(item)} className="w-7 h-7 flex items-center justify-center text-[#010218] hover:bg-[#dbeafe] transition-colors" title="Edit"><FiEdit3 size={13} /></button>
                      <button onClick={() => onDeleteIndividual(item)} className="w-7 h-7 flex items-center justify-center   text-[#DC3545] hover:bg-red-100 transition-colors" title="Delete"><FiTrash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <FaAngleLeft size={12} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-7 h-7 flex items-center justify-center rounded-full text-[12px] font-semibold transition-colors ${currentPage === i + 1 ? 'bg-[#333CF5] text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {i + 1}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <FaAngleRight size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
