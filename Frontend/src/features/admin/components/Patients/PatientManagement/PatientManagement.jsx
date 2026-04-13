import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import EmptyState from "../../shared/EmptyState/EmptyState";
import { Toast } from "../../../../../components";
import { FiSearch, FiUpload, FiPlus, FiEdit3, FiTrash2 } from "react-icons/fi";
import { HiChevronLeft, HiChevronRight, HiChevronDown } from "react-icons/hi2";
import PatientsIcon from "./PatientsIcon";
import DUMMY_PATIENTS, { ROWS_OPTIONS } from "./patientsMockData";
import exportPatientsToExcel from "./exportPatientsToExcel";
// التعديل الصحيح بناءً على أسماء الملفات اللي عندك
// import noPatientsImg from "../../../../assets/images/no-patient.svg";

export default function PatientManagement() {
  const navigate = useNavigate();
  const location = useLocation();

  const [patients,    setPatients]    = useState(DUMMY_PATIENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showRPPMenu, setShowRPPMenu] = useState(false);
  const [modal,       setModal]       = useState({ open: false, type: "single", targetId: null });
  const [toast,       setToast]       = useState({ visible: false, title: "", message: "" });

  useEffect(() => {
    if (location.state?.success) {
      setToast({
        visible: true,
        title:   location.state.title   || "Done Successfully",
        message: location.state.message || "Your changes have been saved.",
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const filtered = patients.filter((p) =>
    p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery)
  );

  const totalRows  = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const safePage   = Math.min(currentPage, totalPages);
  const pageStart  = (safePage - 1) * rowsPerPage;
  const pageItems  = filtered.slice(pageStart, pageStart + rowsPerPage);

  const allPageSelected =
    pageItems.length > 0 && pageItems.every((p) => selectedIds.includes(p.id));

  const toggleSelect    = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleSelectAll = (chk) => {
    if (chk) setSelectedIds((prev) => [...new Set([...prev, ...pageItems.map((p) => p.id)])]);
    else     setSelectedIds((prev) => prev.filter((id) => !pageItems.find((p) => p.id === id)));
  };

  const openSingleDeleteModal = (patient) =>
    setModal({ open: true, type: "single", targetId: patient.id });

  const openBulkDeleteModal = () =>
    setModal({ open: true, type: "bulk", targetId: null });

  const handleDeleteConfirm = () => {
    if (modal.type === "single") {
      setPatients((prev) => prev.filter((p) => p.id !== modal.targetId));
      setSelectedIds((prev) => prev.filter((id) => id !== modal.targetId));
      setToast({ visible: true, title: "Deleted Successfully", message: "Patient has been removed from the platform." });
    } else {
      const count = selectedIds.length;
      setPatients((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
      setSelectedIds([]);
      setToast({ visible: true, title: "Deleted Successfully", message: `${count} patients have been removed.` });
    }
    setModal({ open: false, type: "single", targetId: null });
  };

  const handleExport = async () => {
    try {
      await exportPatientsToExcel(patients);
    } catch (e) {
      console.error("Export failed", e);
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 4) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (safePage <= 2)   return [1, 2, 3, 4];
    if (safePage >= totalPages - 1)
      return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages].filter((n) => n > 0);
    return [safePage - 1, safePage, safePage + 1, safePage + 2];
  };

  const handleSearch = (e) => { setSearchQuery(e.target.value); setCurrentPage(1); };

  /* ════════════════════════════════════════════════════════ */
  return (
    <section className="relative flex flex-col gap-6 p-4 sm:p-5 lg:p-6 min-h-screen" aria-label="Patient Management">

      <Toast
        visible={toast.visible}
        title={toast.title}
        message={toast.message}
        type="success"
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />

      {/* ── الحالة الفارغة — بتعرض الهيدر + الـ empty body كلهم من EmptyState ── */}
      {patients.length === 0 ? (
        <EmptyState
          pageIcon={<PatientsIcon />}
          pageTitle="Patient Management"
          pageSubtitle="View, edit, and manage all registered patients."
          imgSrc="/no-patient.svg"
          title="No Patients Found"
          description="You haven't added any patients yet. Start building your patient database by adding your first patient record."
          buttonLabel="Add Patient"
            onAction={() => navigate("/admin/patients/create")}
        />
      ) : (
        <>
          {/* ── Page Header — يظهر بس لما في بيانات ── */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <PatientsIcon />
              <h1 className="text-[24px] font-bold text-black-main-text leading-none">
                Patient Management
              </h1>
            </div>
            <p className="text-[18px] text-[#757575]">
              View, edit, and manage all registered patients.
            </p>
          </div>

          {/* ── Search + Actions ── */}
          <div className="flex flex-col px-0 sm:px-2 lg:px-6 py-2 sm:py-4 sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 min-w-0">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[16px]" />
              <input
                type="search"
                placeholder="Search patients…"
                aria-label="Search patients"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full sm:max-w-[275px] pl-9 pr-4 py-2.5 text-[16px] bg-[#F6F7F8] border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#333CF5]/30 focus:border-[#333CF5] transition-colors"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={handleExport}
                className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                <FiUpload className="text-[16px]" /> Export
              </button>
              <button
                onClick={() => navigate("/admin/patients/create")}
                className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-white bg-[#333CF5] rounded-full hover:bg-[#0913C3] transition-colors"
              >
                <FiPlus className="text-[16px]" /> Add Patient
              </button>
            </div>
          </div>

         
          {/* ── Table or No-search-results Empty State ── */}
          {filtered.length === 0 ? (
            /* بحث مش لاقي نتايج — بدون هيدر */
            <div className="flex flex-col items-center justify-center text-center py-20">
              <p className="text-[20px] font-bold text-gray-400 mb-2">No results found</p>
              <p className="text-[15px] text-gray-400">
                No patients match "<span className="font-semibold text-gray-600">{searchQuery}</span>"
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 px-0 sm:px-2 lg:px-6 py-2 sm:py-4">
              <div className="overflow-visible sm:overflow-x-auto rounded-2xl sm:rounded-xl border-0 sm:border sm:border-gray-200/70 bg-white">
                <table className="w-full relative min-w-full sm:min-w-[640px] border-collapse">
                  <thead className="hidden sm:table-header-group">
                         {selectedIds.length > 0 && (
            <div className="absolute top-[55px] left-1/2 -translate-x-1/2 z-30 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-3 py-2 bg-white border border-gray-100 rounded-xl shadow-[0px_10px_30px_rgba(0,0,0,0.15)] animate-in fade-in slide-in-from-top-4 duration-300 w-[calc(100%-16px)] sm:w-auto max-w-[96%]">
              <div className="px-3 py-2 bg-[#333CF5] text-white text-[12px] font-bold rounded-lg whitespace-nowrap">
                {selectedIds.length} Patients Selected
              </div>
              <button
                onClick={openBulkDeleteModal}
                className="px-4 py-2 text-[12px] cursor-pointer font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all active:scale-95 shadow-sm shadow-red-200"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedIds([])}
                className="px-4 py-2 text-[12px] font-bold cursor-pointer text-neutral-500 bg-zinc-100 border border-gray-200 rounded-lg hover:bg-zinc-200 transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          )}
                    <tr className="bg-[#333CF5] text-white text-left">
                      <th className="w-10 px-4 py-4">
                        <input
                          type="checkbox"
                          checked={allPageSelected}
                          onChange={(e) => toggleSelectAll(e.target.checked)}
                          className="w-4 h-4 rounded accent-white cursor-pointer border-2 border-white/30"
                        />
                      </th>
                      <th className="px-4 py-4 text-[14px] font-normal text-center whitespace-nowrap">Full Name</th>
                      <th className="px-4 py-4 text-[14px] font-normal text-center whitespace-nowrap">Email</th>
                      <th className="px-4 py-4 text-[14px] font-normal text-center whitespace-nowrap">Phone</th>
                      <th className="px-4 py-4 text-[14px] font-normal text-center whitespace-nowrap">Age</th>
                      <th className="px-4 py-4 text-[14px] font-normal text-center whitespace-nowrap">Gender</th>
                      <th className="px-4 py-4 text-[14px] font-normal text-center whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageItems.map((patient, idx) => {
                      const isMale     = patient.gender?.toLowerCase() === "male";
                      const isSelected = selectedIds.includes(patient.id);
                      return (
                        <tr
                          key={patient.id}
                          className={`block sm:table-row rounded-2xl sm:rounded-none overflow-hidden border border-slate-200/80 sm:border-0 shadow-[0_6px_18px_rgba(15,23,42,0.08)] sm:shadow-none mb-4 sm:mb-0 transition-colors ${isSelected ? "bg-[#EFF6FF]" : "bg-white"} ${idx % 2 === 0 ? "sm:bg-white" : "sm:bg-[#F9FAFB]"} hover:bg-[#EFF6FF]/60`}
                        >
                          <td className="hidden sm:table-cell px-4 py-3 text-center sm:text-left">
                            <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(patient.id)} className="w-4 h-4 rounded accent-[#155dfc] cursor-pointer mx-auto sm:mx-0" />
                          </td>
                          <td className="block sm:table-cell px-4 py-3 text-center sm:text-left">
                            <div className="flex flex-row items-center justify-center sm:justify-start gap-3 rounded-xl bg-[#F7F7FA] px-3 py-2 sm:bg-transparent sm:px-0 sm:py-0">
                              <img src={patient.image} alt={patient.fullName} className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-100" />
                              <span className="text-[14px] font-semibold text-black-main-text truncate max-w-[160px]">{patient.fullName}</span>
                            </div>
                          </td>
                          <td className="block sm:table-cell px-4 py-3 text-center"><span className="text-[16px] text-center text-gray-text-dim2 truncate block max-w-[180px] mx-auto">{patient.email}</span></td>
                          <td className="block sm:table-cell px-4 py-3 text-center"><span className="text-[16px] text-gray-text-dim2 whitespace-nowrap">{patient.phone}</span></td>
                          <td className="block sm:table-cell px-4 py-3 text-center"><span className="text-[16px] text-[#757575]">{patient.age}</span></td>
                          <td className="block sm:table-cell px-4 py-3 text-center">
                            <span className={`inline-block px-3 py-1 text-[11px] font-bold rounded-full ${isMale ? "bg-[#28A745] text-white" : "bg-[#FD7E14] text-white"}`}>
                              {patient.gender}
                            </span>
                          </td>
                          <td className="block sm:table-cell px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-3">
                              <button onClick={() => navigate(`/admin/patients/edit/${patient.id}`)} className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg text-black-main-text hover:bg-[#EEF2FF] transition-all" title="Edit">
                                <FiEdit3 size={15} />
                              </button>
                              <button onClick={() => openSingleDeleteModal(patient)} className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg text-[#DC3545] hover:bg-red-50 transition-all" title="Delete">
                                <FiTrash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* ── Pagination ── */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 pt-2">
                <div className="relative flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[14px] text-[#333CF5]">
                  <span>Rows per page</span>
                  <div className="relative">
                    <button
                      onClick={() => setShowRPPMenu((v) => !v)}
                      className="cursor-pointer flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-full bg-white hover:bg-gray-50 text-[14px] font-bold text-[#333CF5] transition-all"
                    >
                      {rowsPerPage}<HiChevronDown size={14} />
                    </button>
                    {showRPPMenu && (
                      <ul className="absolute left-0 bottom-full mb-2 z-40 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden min-w-[80px] list-none p-1 animate-in fade-in zoom-in-95 duration-200">
                        {ROWS_OPTIONS.map((opt) => (
                          <li
                            key={opt}
                            onClick={() => { setRowsPerPage(opt); setCurrentPage(1); setShowRPPMenu(false); }}
                            className={`px-3 py-2 text-[12px] cursor-pointer rounded-lg transition-colors ${opt === rowsPerPage ? "bg-[#EFF6FF] text-[#333CF5] font-bold" : "hover:bg-gray-50 text-gray-700"}`}
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <span className="font-medium">of {totalRows} rows</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <button disabled={safePage === 1} onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                    <HiChevronLeft size={16} />
                  </button>
                  {getPageNumbers().map((n) => (
                    <button key={n} onClick={() => setCurrentPage(n)} className={`w-8 h-8 flex items-center cursor-pointer justify-center rounded-full text-[13px] font-bold transition-all ${n === safePage ? "bg-[#333CF5] text-white shadow-md shadow-blue-200" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                      {n}
                    </button>
                  ))}
                  <button disabled={safePage === totalPages} onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                    <HiChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <ConfirmModal
        isOpen={modal.open}
        title={modal.type === "bulk" ? `Delete ${selectedIds.length} Patients?` : "Delete Patient?"}
        desc={modal.type === "bulk" ? `Are you sure you want to delete ${selectedIds.length} patients? This action is permanent.` : "Are you sure you want to delete this patient? This action is permanent."}
        onCancel={() => setModal({ open: false, type: "single", targetId: null })}
        onConfirm={handleDeleteConfirm}
      />
    </section>
  );
}