import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import EmptyState from "../shared/EmptyState/EmptyState";
import { Toast } from "../../../../components";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FiSearch, FiUpload, FiPlus, FiEdit3, FiTrash2 } from "react-icons/fi";
import { MdManageAccounts } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiChevronLeft, HiChevronRight, HiChevronDown } from "react-icons/hi2";

const DUMMY_PATIENTS = [
  { id: 1,  fullName: "Nada Aql",           email: "nada.aql@gmail.com",           phone: "+201008205312", age: 29, gender: "Female", image: "https://randomuser.me/api/portraits/women/12.jpg" },
  { id: 2,  fullName: "Hazem Abdelmajid",   email: "hazem.abdelmajid@gmail.com",   phone: "+201012020766", age: 33, gender: "Male",   image: "https://randomuser.me/api/portraits/men/23.jpg"   },
  { id: 3,  fullName: "Hoda Bakry",         email: "hoda.bakry@gmail.com",         phone: "+201012020766", age: 59, gender: "Female", image: "https://randomuser.me/api/portraits/women/34.jpg" },
  { id: 4,  fullName: "Ola Ashour",         email: "ola.ashour@gmail.com",         phone: "+201122626940", age: 45, gender: "Female", image: "https://randomuser.me/api/portraits/women/45.jpg" },
  { id: 5,  fullName: "Hanaa Khalil",       email: "hanaa.khalil@gmail.com",       phone: "+201005521587", age: 37, gender: "Female", image: "https://randomuser.me/api/portraits/women/56.jpg" },
  { id: 6,  fullName: "Sajda Hafez",        email: "sajda.hafez@gmail.com",        phone: "+201006865699", age: 52, gender: "Female", image: "https://randomuser.me/api/portraits/women/67.jpg" },
  { id: 7,  fullName: "Mohamed Abdelkader", email: "mohamed.abdelkader@gmail.com", phone: "+201140092221", age: 30, gender: "Male",   image: "https://randomuser.me/api/portraits/men/8.jpg"    },
  { id: 8,  fullName: "Tarek El-Moghawry",  email: "tarek.moghawry@gmail.com",     phone: "+201111269301", age: 60, gender: "Male",   image: "https://randomuser.me/api/portraits/men/17.jpg"   },
  { id: 9,  fullName: "Reem Saleh",         email: "reem.saleh@gmail.com",         phone: "+201001842794", age: 48, gender: "Female", image: "https://randomuser.me/api/portraits/women/78.jpg" },
  { id: 10, fullName: "Abdelmohsen Salem",  email: "abdelmohsen.salem@gmail.com",  phone: "+201003738387", age: 27, gender: "Male",   image: "https://randomuser.me/api/portraits/men/29.jpg"   },
  { id: 11, fullName: "Amjad Hussein",      email: "amjad.hussein@gmail.com",      phone: "+201090986990", age: 40, gender: "Male",   image: "https://randomuser.me/api/portraits/men/38.jpg"   },
  { id: 12, fullName: "Sara Mohsen",        email: "sara.mohsen@gmail.com",        phone: "+201012345678", age: 31, gender: "Female", image: "https://randomuser.me/api/portraits/women/89.jpg" },
  { id: 13, fullName: "Khaled Nour",        email: "khaled.nour@gmail.com",        phone: "+201198765432", age: 44, gender: "Male",   image: "https://randomuser.me/api/portraits/men/47.jpg"   },
  { id: 14, fullName: "Mona Farouk",        email: "mona.farouk@gmail.com",        phone: "+201011223344", age: 38, gender: "Female", image: "https://randomuser.me/api/portraits/women/5.jpg"  },
  { id: 15, fullName: "Ahmed Saber",        email: "ahmed.saber@gmail.com",        phone: "+201055667788", age: 55, gender: "Male",   image: "https://randomuser.me/api/portraits/men/59.jpg"   },
  { id: 16, fullName: "Dina El-Sayed",      email: "dina.elsayed@gmail.com",       phone: "+201099887766", age: 26, gender: "Female", image: "https://randomuser.me/api/portraits/women/16.jpg" },
  { id: 17, fullName: "Omar Galal",         email: "omar.galal@gmail.com",         phone: "+201033445566", age: 34, gender: "Male",   image: "https://randomuser.me/api/portraits/men/71.jpg"   },
  { id: 18, fullName: "Yasmin Taha",        email: "yasmin.taha@gmail.com",        phone: "+201077889900", age: 42, gender: "Female", image: "https://randomuser.me/api/portraits/women/27.jpg" },
  { id: 19, fullName: "Mostafa Hamdy",      email: "mostafa.hamdy@gmail.com",      phone: "+201021343546", age: 50, gender: "Male",   image: "https://randomuser.me/api/portraits/men/82.jpg"   },
  { id: 20, fullName: "Nour Eldin Hassan",  email: "nour.hassan@gmail.com",        phone: "+201087654321", age: 36, gender: "Male",   image: "https://randomuser.me/api/portraits/men/93.jpg"   },
  { id: 21, fullName: "Mariam Youssef",     email: "mariam.youssef@gmail.com",     phone: "+201091122334", age: 28, gender: "Female", image: "https://randomuser.me/api/portraits/women/38.jpg" },
  { id: 22, fullName: "Karim Zaki",         email: "karim.zaki@gmail.com",         phone: "+201062233445", age: 41, gender: "Male",   image: "https://randomuser.me/api/portraits/men/14.jpg"   },
  { id: 23, fullName: "Salma Ibrahim",      email: "salma.ibrahim@gmail.com",      phone: "+201053344556", age: 35, gender: "Female", image: "https://randomuser.me/api/portraits/women/49.jpg" },
  { id: 24, fullName: "Bassem Wael",        email: "bassem.wael@gmail.com",        phone: "+201044455667", age: 47, gender: "Male",   image: "https://randomuser.me/api/portraits/men/66.jpg"   },
  { id: 25, fullName: "Noha Ramzy",         email: "noha.ramzy@gmail.com",         phone: "+201035566778", age: 32, gender: "Female", image: "https://randomuser.me/api/portraits/women/60.jpg" },
  { id: 26, fullName: "Sherif Ragab",       email: "sherif.ragab@gmail.com",       phone: "+201026677889", age: 53, gender: "Male",   image: "https://randomuser.me/api/portraits/men/37.jpg"   },
  { id: 27, fullName: "Doaa Fawzy",         email: "doaa.fawzy@gmail.com",         phone: "+201017788990", age: 39, gender: "Female", image: "https://randomuser.me/api/portraits/women/71.jpg" },
  { id: 28, fullName: "Islam Magdy",        email: "islam.magdy@gmail.com",        phone: "+201008899001", age: 44, gender: "Male",   image: "https://randomuser.me/api/portraits/men/55.jpg"   },
  { id: 29, fullName: "Rana Ashraf",        email: "rana.ashraf@gmail.com",        phone: "+201099900112", age: 26, gender: "Female", image: "https://randomuser.me/api/portraits/women/82.jpg" },
  { id: 30, fullName: "Adel Samir",         email: "adel.samir@gmail.com",         phone: "+201080011223", age: 58, gender: "Male",   image: "https://randomuser.me/api/portraits/men/91.jpg"   },
  { id: 31, fullName: "Heba Mansour",       email: "heba.mansour@gmail.com",       phone: "+201071122334", age: 33, gender: "Female", image: "https://randomuser.me/api/portraits/women/93.jpg" },
  { id: 32, fullName: "Magdy El-Gohary",    email: "magdy.elgohary@gmail.com",     phone: "+201062233445", age: 49, gender: "Male",   image: "https://randomuser.me/api/portraits/men/43.jpg"   },
  { id: 33, fullName: "Amira Soltan",       email: "amira.soltan@gmail.com",       phone: "+201053344556", age: 31, gender: "Female", image: "https://randomuser.me/api/portraits/women/22.jpg" },
  { id: 34, fullName: "Waleed Fares",       email: "waleed.fares@gmail.com",       phone: "+201044455667", age: 45, gender: "Male",   image: "https://randomuser.me/api/portraits/men/6.jpg"    },
  { id: 35, fullName: "Samah Gad",          email: "samah.gad@gmail.com",          phone: "+201035566778", age: 37, gender: "Female", image: "https://randomuser.me/api/portraits/women/33.jpg" },
  { id: 36, fullName: "Tarek Sharaf",       email: "tarek.sharaf@gmail.com",       phone: "+201026677889", age: 54, gender: "Male",   image: "https://randomuser.me/api/portraits/men/77.jpg"   },
  { id: 37, fullName: "Rania Fouad",        email: "rania.fouad@gmail.com",        phone: "+201017788990", age: 29, gender: "Female", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 38, fullName: "Hassan Shehata",     email: "hassan.shehata@gmail.com",     phone: "+201008899001", age: 62, gender: "Male",   image: "https://randomuser.me/api/portraits/men/88.jpg"   },
  { id: 39, fullName: "Eman Lotfy",         email: "eman.lotfy@gmail.com",         phone: "+201099900112", age: 43, gender: "Female", image: "https://randomuser.me/api/portraits/women/55.jpg" },
  { id: 40, fullName: "Mahmoud El-Refaay",  email: "mahmoud.refaay@gmail.com",     phone: "+201080011223", age: 36, gender: "Male",   image: "https://randomuser.me/api/portraits/men/62.jpg"   },
];

const ROWS_OPTIONS = [5, 10, 20, 50];

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

  const toggleSelect = (id) =>
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
      setToast({
        visible: true,
        title: "Deleted Successfully",
        message: "Patient has been removed from the platform.",
      });
    } else {
      const count = selectedIds.length;
      setPatients((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
      setSelectedIds([]);
      setToast({
        visible: true,
        title: "Deleted Successfully",
        message: `${count} patients have been removed.`,
      });
    }
    setModal({ open: false, type: "single", targetId: null });
  };

  const handleExport = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Patients");
      sheet.columns = [
        { header: "Full Name", key: "fullName", width: 30 },
        { header: "Email",     key: "email",    width: 35 },
        { header: "Phone",     key: "phone",    width: 20 },
        { header: "Age",       key: "age",      width: 10 },
        { header: "Gender",    key: "gender",   width: 12 },
      ];
      patients.forEach((p) => sheet.addRow(p));
      saveAs(new Blob([await workbook.xlsx.writeBuffer()]), "PulseX_Patients.xlsx");
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="flex flex-col gap-6 p-5 " aria-label="Patient Management">

      <Toast
        visible={toast.visible}
        title={toast.title}
        message={toast.message}
        type="success"
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />

      {/* ── Page Header ── */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-2 ">
          <MdManageAccounts className="text-[22px] text-black-main-text" aria-hidden="true" />
          <h1 className="text-[18px] sm:text-[20px] font-bold text-black-main-text leading-none">
            Patient Management
          </h1>
        </div>
        <p className="text-[12px] text-[#757575] ">View, edit, and manage all registered patients.</p>
      </div>

      {/* ── Search + Actions ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 min-w-0">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[15px]" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search patients…"
            aria-label="Search patients"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-9 pr-4 py-2.5 text-[13px] bg-[#F6F7F8] border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#333CF5]/30 focus:border-[#333CF5] transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
            <FiUpload className="text-[14px]" /> Export
          </button>
          <button onClick={() => navigate("/admin/AddPatientBtn")} className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-white bg-[#333CF5] rounded-full hover:bg-[#0913C3] transition-colors">
            <FiPlus className="text-[14px]" /> Add Patient
          </button>
        </div>
      </div>

      {/* ── Bulk Bar ── */}
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-4 px-4 py-3 bg-[#EFF6FF] border border-[#bfdbfe] rounded-[10px]">
          <span className="text-[13px] font-semibold text-[#155dfc]">{selectedIds.length} Selected</span>
          <button onClick={openBulkDeleteModal} className="px-3 py-1.5 text-[12px] font-semibold text-white bg-red-500 rounded-[8px] hover:bg-red-600 transition-colors">
            Delete Selected
          </button>
          <button onClick={() => setSelectedIds([])} className="px-3 py-1.5 text-[12px] font-semibold text-gray-600 bg-white border border-gray-200 rounded-[8px] hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      )}

      {/* ── Table / Empty ── */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<HiOutlineUsers />}
          title="No Patients Found"
          description="No patients have been registered on the platform yet."
          buttonLabel="+ Add Patient"
          onAction={() => navigate("/admin/AddPatientBtn")}
          accentColor="#F0FDF4"
          iconColor="#059669"
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-[12px] border border-gray-200/70">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="bg-[#333CF5] text-white text-left">
                  <th className="w-10 px-3 py-3">
                    <input type="checkbox" checked={allPageSelected} onChange={(e) => toggleSelectAll(e.target.checked)} className="w-4 h-4 rounded accent-white cursor-pointer" />
                  </th>
                  <th className="px-3 py-3 text-[12px] font-semibold whitespace-nowrap">Full Name</th>
                  <th className="px-3 py-3 text-[12px] font-semibold whitespace-nowrap">Email</th>
                  <th className="px-3 py-3 text-[12px] font-semibold whitespace-nowrap">Phone</th>
                  <th className="px-3 py-3 text-[12px] font-semibold text-center whitespace-nowrap">Age</th>
                  <th className="px-3 py-3 text-[12px] font-semibold text-center whitespace-nowrap">Gender</th>
                  <th className="px-3 py-3 text-[12px] font-semibold text-center whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((patient, idx) => {
                  const isMale = patient.gender?.toLowerCase() === "male";
                  const isSelected = selectedIds.includes(patient.id);
                  return (
                    <tr key={patient.id} className={`border-b border-gray-100 transition-colors ${isSelected ? "bg-[#EFF6FF]" : idx % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"} hover:bg-[#EFF6FF]/60`}>
                      <td className="px-3 py-2.5">
                        <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(patient.id)} className="w-4 h-4 rounded accent-[#155dfc] cursor-pointer" />
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <img src={patient.image} alt={patient.fullName} className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-100" />
                          <span className="text-[13px] font-semibold text-black-main-text truncate max-w-[160px]">{patient.fullName}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5"><span className="text-[12px] text-[#757575] truncate block max-w-[180px]">{patient.email}</span></td>
                      <td className="px-3 py-2.5"><span className="text-[12px] text-[#757575] whitespace-nowrap">{patient.phone}</span></td>
                      <td className="px-3 py-2.5 text-center"><span className="text-[12px] text-[#757575]">{patient.age}</span></td>
                      <td className="px-3 py-2.5 text-center">
                        <span className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full ${isMale ? "bg-[#28A745] text-white" : "bg-[#FD7E14] text-white"}`}>{patient.gender}</span>
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => navigate(`/admin/edit-patient/${patient.id}`)} className="w-7 h-7 flex items-center justify-center rounded-[7px]  text-[#010218] hover: transition-colors" title="Edit"><FiEdit3 size={13} /></button>
                          <button onClick={() => openSingleDeleteModal(patient)} className="w-7 h-7 flex items-center justify-center rounded-[7px] text-[#DC3545] hover:bg-red-100 transition-colors" title="Delete"><FiTrash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="relative flex items-center gap-2 text-[12px] text-[#333CF5]">
              <span>Rows per page</span>
              <button onClick={() => setShowRPPMenu((v) => !v)} className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-200 rounded-full bg-white hover:bg-gray-50 text-[12px] font-semibold text-[#333CF5]">
                {rowsPerPage}<HiChevronDown size={12} />
              </button>
              {showRPPMenu && (
                <ul className="absolute left-24 bottom-full mb-1 z-20 bg-white border border-gray-200 rounded-[10px] shadow-lg overflow-hidden min-w-[70px] list-none p-1 m-0">
                  {ROWS_OPTIONS.map((opt) => (
                    <li key={opt} onClick={() => { setRowsPerPage(opt); setCurrentPage(1); setShowRPPMenu(false); }} className={`px-3 py-2 text-[12px] cursor-pointer rounded-[6px] transition-colors ${opt === rowsPerPage ? "bg-[#EFF6FF] text-[#155dfc] font-semibold" : "hover:bg-gray-50 text-gray-700"}`}>{opt}</li>
                  ))}
                </ul>
              )}
              <span>of {totalRows} rows</span>
            </div>
            <div className="flex items-center gap-1">
              <button disabled={safePage === 1} onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
                <HiChevronLeft size={14} />
              </button>
              {getPageNumbers().map((n) => (
                <button key={n} onClick={() => setCurrentPage(n)} className={`w-7 h-7 flex items-center justify-center rounded-full text-[12px] font-semibold transition-colors ${n === safePage ? "bg-[#333CF5] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{n}</button>
              ))}
              <button disabled={safePage === totalPages} onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
                <HiChevronRight size={14} />
              </button>
            </div>
          </div>
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
