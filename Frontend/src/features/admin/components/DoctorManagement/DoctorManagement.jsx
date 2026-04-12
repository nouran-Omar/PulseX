import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DataTable from '../DataTable/DataTable';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import EmptyState from '../shared/EmptyState/EmptyState';
import { Toast } from '../../../../components';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { FiSearch, FiUpload, FiPlus } from "react-icons/fi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineManageAccounts } from "react-icons/md";

/* ── Realistic dummy doctors with real avatar photos ── */
const DUMMY_DOCTORS = [
  { id: 1,  fullName: "Dr. Sarah Mitchell",   email: "sarah.mitchell@pulsex.com",   price: 300, joinedDate: "Jan 10, 2023",  image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2,  fullName: "Dr. James Thornton",   email: "james.thornton@pulsex.com",   price: 450, joinedDate: "Feb 14, 2023",  image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3,  fullName: "Dr. Layla Hassan",     email: "layla.hassan@pulsex.com",     price: 200, joinedDate: "Mar 2, 2023",   image: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 4,  fullName: "Dr. Omar Khalil",      email: "omar.khalil@pulsex.com",      price: 350, joinedDate: "Mar 20, 2023",  image: "https://randomuser.me/api/portraits/men/75.jpg" },
  { id: 5,  fullName: "Dr. Emily Carter",     email: "emily.carter@pulsex.com",     price: 500, joinedDate: "Apr 5, 2023",   image: "https://randomuser.me/api/portraits/women/21.jpg" },
  { id: 6,  fullName: "Dr. Ahmed Nasser",     email: "ahmed.nasser@pulsex.com",     price: 275, joinedDate: "Apr 18, 2023",  image: "https://randomuser.me/api/portraits/men/11.jpg" },
  { id: 7,  fullName: "Dr. Nora Williams",    email: "nora.williams@pulsex.com",    price: 400, joinedDate: "May 1, 2023",   image: "https://randomuser.me/api/portraits/women/55.jpg" },
  { id: 8,  fullName: "Dr. Karim Farouk",     email: "karim.farouk@pulsex.com",     price: 320, joinedDate: "May 22, 2023",  image: "https://randomuser.me/api/portraits/men/46.jpg" },
  { id: 9,  fullName: "Dr. Mia Johnson",      email: "mia.johnson@pulsex.com",      price: 480, joinedDate: "Jun 7, 2023",   image: "https://randomuser.me/api/portraits/women/33.jpg" },
  { id: 10, fullName: "Dr. Youssef Salem",    email: "youssef.salem@pulsex.com",    price: 230, joinedDate: "Jun 30, 2023",  image: "https://randomuser.me/api/portraits/men/60.jpg" },
  { id: 11, fullName: "Dr. Chloe Bennett",    email: "chloe.bennett@pulsex.com",    price: 370, joinedDate: "Jul 14, 2023",  image: "https://randomuser.me/api/portraits/women/10.jpg" },
  { id: 12, fullName: "Dr. Tarek Ibrahim",    email: "tarek.ibrahim@pulsex.com",    price: 290, joinedDate: "Jul 28, 2023",  image: "https://randomuser.me/api/portraits/men/83.jpg" },
  { id: 13, fullName: "Dr. Sophia Martinez",  email: "sophia.martinez@pulsex.com",  price: 420, joinedDate: "Aug 9, 2023",   image: "https://randomuser.me/api/portraits/women/79.jpg" },
  { id: 14, fullName: "Dr. Hassan Al-Amin",   email: "hassan.alamin@pulsex.com",    price: 260, joinedDate: "Aug 25, 2023",  image: "https://randomuser.me/api/portraits/men/27.jpg" },
  { id: 15, fullName: "Dr. Ava Thompson",     email: "ava.thompson@pulsex.com",     price: 510, joinedDate: "Sep 3, 2023",   image: "https://randomuser.me/api/portraits/women/62.jpg" },
  { id: 16, fullName: "Dr. Rami Azzam",       email: "rami.azzam@pulsex.com",       price: 340, joinedDate: "Sep 17, 2023",  image: "https://randomuser.me/api/portraits/men/54.jpg" },
  { id: 17, fullName: "Dr. Isabella Moore",   email: "isabella.moore@pulsex.com",   price: 390, joinedDate: "Oct 1, 2023",   image: "https://randomuser.me/api/portraits/women/47.jpg" },
  { id: 18, fullName: "Dr. Fady Mansour",     email: "fady.mansour@pulsex.com",     price: 215, joinedDate: "Oct 12, 2023",  image: "https://randomuser.me/api/portraits/men/19.jpg" },
  { id: 19, fullName: "Dr. Olivia Davis",     email: "olivia.davis@pulsex.com",     price: 460, joinedDate: "Nov 5, 2023",   image: "https://randomuser.me/api/portraits/women/88.jpg" },
  { id: 20, fullName: "Dr. Mostafa Gamal",    email: "mostafa.gamal@pulsex.com",    price: 310, joinedDate: "Nov 20, 2023",  image: "https://randomuser.me/api/portraits/men/36.jpg" },
  { id: 21, fullName: "Dr. Charlotte Wilson", email: "charlotte.wilson@pulsex.com", price: 430, joinedDate: "Dec 4, 2023",   image: "https://randomuser.me/api/portraits/women/25.jpg" },
  { id: 22, fullName: "Dr. Ali Sayed",        email: "ali.sayed@pulsex.com",        price: 250, joinedDate: "Dec 19, 2023",  image: "https://randomuser.me/api/portraits/men/70.jpg" },
  { id: 23, fullName: "Dr. Amelia Harris",    email: "amelia.harris@pulsex.com",    price: 475, joinedDate: "Jan 8, 2024",   image: "https://randomuser.me/api/portraits/women/14.jpg" },
  { id: 24, fullName: "Dr. Sameh Lotfy",      email: "sameh.lotfy@pulsex.com",      price: 280, joinedDate: "Jan 23, 2024",  image: "https://randomuser.me/api/portraits/men/90.jpg" },
  { id: 25, fullName: "Dr. Ella Robinson",    email: "ella.robinson@pulsex.com",    price: 395, joinedDate: "Feb 6, 2024",   image: "https://randomuser.me/api/portraits/women/72.jpg" },
  { id: 26, fullName: "Dr. Khaled Badawi",    email: "khaled.badawi@pulsex.com",    price: 335, joinedDate: "Feb 19, 2024",  image: "https://randomuser.me/api/portraits/men/41.jpg" },
  { id: 27, fullName: "Dr. Grace Lee",        email: "grace.lee@pulsex.com",        price: 520, joinedDate: "Mar 3, 2024",   image: "https://randomuser.me/api/portraits/women/37.jpg" },
  { id: 28, fullName: "Dr. Nader Shawky",     email: "nader.shawky@pulsex.com",     price: 245, joinedDate: "Mar 17, 2024",  image: "https://randomuser.me/api/portraits/men/64.jpg" },
  { id: 29, fullName: "Dr. Zoe Anderson",     email: "zoe.anderson@pulsex.com",     price: 415, joinedDate: "Apr 2, 2024",   image: "https://randomuser.me/api/portraits/women/92.jpg" },
  { id: 30, fullName: "Dr. Hany Ramadan",     email: "hany.ramadan@pulsex.com",     price: 270, joinedDate: "Apr 15, 2024",  image: "https://randomuser.me/api/portraits/men/22.jpg" },
  { id: 31, fullName: "Dr. Lily Thomas",      email: "lily.thomas@pulsex.com",      price: 445, joinedDate: "May 1, 2024",   image: "https://randomuser.me/api/portraits/women/57.jpg" },
  { id: 32, fullName: "Dr. Mahmoud Hegazy",   email: "mahmoud.hegazy@pulsex.com",   price: 300, joinedDate: "May 14, 2024",  image: "https://randomuser.me/api/portraits/men/49.jpg" },
  { id: 33, fullName: "Dr. Aria Jackson",     email: "aria.jackson@pulsex.com",     price: 380, joinedDate: "Jun 1, 2024",   image: "https://randomuser.me/api/portraits/women/4.jpg"  },
  { id: 34, fullName: "Dr. Walid Fouad",      email: "walid.fouad@pulsex.com",      price: 225, joinedDate: "Jun 20, 2024",  image: "https://randomuser.me/api/portraits/men/7.jpg"   },
  { id: 35, fullName: "Dr. Scarlett White",   email: "scarlett.white@pulsex.com",   price: 490, joinedDate: "Jul 5, 2024",   image: "https://randomuser.me/api/portraits/women/83.jpg" },
  { id: 36, fullName: "Dr. Amir Taha",        email: "amir.taha@pulsex.com",        price: 315, joinedDate: "Jul 22, 2024",  image: "https://randomuser.me/api/portraits/men/15.jpg" },
  { id: 37, fullName: "Dr. Luna Garcia",      email: "luna.garcia@pulsex.com",      price: 360, joinedDate: "Aug 8, 2024",   image: "https://randomuser.me/api/portraits/women/29.jpg" },
  { id: 38, fullName: "Dr. Sherif Darwish",   email: "sherif.darwish@pulsex.com",   price: 240, joinedDate: "Aug 25, 2024",  image: "https://randomuser.me/api/portraits/men/88.jpg" },
  { id: 39, fullName: "Dr. Penny Clark",      email: "penny.clark@pulsex.com",      price: 435, joinedDate: "Sep 10, 2024",  image: "https://randomuser.me/api/portraits/women/66.jpg" },
  { id: 40, fullName: "Dr. Sabry Al-Attar",   email: "sabry.alattar@pulsex.com",    price: 295, joinedDate: "Sep 28, 2024",  image: "https://randomuser.me/api/portraits/men/56.jpg" },
];



export default function DoctorManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const [doctors, setDoctors] = useState(DUMMY_DOCTORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [modal, setModal] = useState({ open: false, type: 'single', targetId: null });
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  // 1. استدعاء الـ Effects والـ Hooks أولاً لتجنب خطأ "Rendered fewer hooks than expected"
  useEffect(() => {
    if (location.state?.success) {
      setToast({
        visible: true,
        title: location.state.title || 'Done Successfully',
        message: location.state.message || 'Your changes have been saved successfully',
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // 2. معالجات الأحداث (Handlers)
  const handleSearch = (e) => setSearchQuery(e.target.value);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const openSingleDeleteModal = (item) => {
    setModal({ open: true, type: 'single', targetId: item.id });
  };

  const openBulkDeleteModal = () => {
    setModal({ open: true, type: 'bulk', targetId: null });
  };

  const handleDeleteConfirm = () => {
    if (modal.type === 'single') {
      setDoctors((prev) => prev.filter((d) => d.id !== modal.targetId));
      setSelectedIds((prev) => prev.filter((id) => id !== modal.targetId));
      setToast({ visible: true, title: 'Deleted Successfully', message: 'Doctor has been removed.' });
    } else {
      setDoctors((prev) => prev.filter((d) => !selectedIds.includes(d.id)));
      setSelectedIds([]);
      setToast({ visible: true, title: 'Deleted Successfully', message: `${selectedIds.length} doctors removed.` });
    }
    setModal({ open: false, type: 'single', targetId: null });
  };

  const handleExport = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Doctors');
      sheet.columns = [
        { header: 'Full Name', key: 'fullName', width: 30 },
        { header: 'Email', key: 'email', width: 35 },
        { header: 'Price ($)', key: 'price', width: 15 },
        { header: 'Joined Date', key: 'joinedDate', width: 20 },
      ];
      doctors.forEach((d) => sheet.addRow(d));
      const finalBuf = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([finalBuf]), 'PulseX_Doctors.xlsx');
    } catch (e) { console.error("Export failed", e); }
  };

  // 3. الفلترة
  const filteredDoctors = doctors.filter((d) =>
    d.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 4. حالة الصفحة الفارغة تماماً (Full Page Swap)
  // يتم وضعها هنا بعد استدعاء الـ Hooks وقبل الـ Return الأساسي
  if (doctors.length === 0) {
    return (
      <section className="flex items-center p-6 justify-center min-h-[80vh] bg-white">
      
        <EmptyState
  pageIcon={   <svg xmlns="http://www.w3.org/2000/svg" width="27" height="23" viewBox="0 0 27 23" fill="none">
  <path d="M2.66667 18.6667V17.8C2.66667 17.3467 2.88 16.92 3.21333 16.72C5.46667 15.3733 8.04 14.6667 10.6667 14.6667C10.7067 14.6667 10.7333 14.6667 10.7733 14.68C10.9067 13.7467 11.1733 12.8533 11.56 12.04C11.2667 12.0133 10.9733 12 10.6667 12C7.44 12 4.42667 12.8933 1.85333 14.4267C0.68 15.12 0 16.4267 0 17.8V21.3333H12.3467C11.7867 20.5333 11.3467 19.6267 11.0533 18.6667H2.66667ZM10.6667 10.6667C13.6133 10.6667 16 8.28 16 5.33333C16 2.38667 13.6133 0 10.6667 0C7.72 0 5.33333 2.38667 5.33333 5.33333C5.33333 8.28 7.72 10.6667 10.6667 10.6667ZM10.6667 2.66667C12.1333 2.66667 13.3333 3.86667 13.3333 5.33333C13.3333 6.8 12.1333 8 10.6667 8C9.2 8 8 6.8 8 5.33333C8 3.86667 9.2 2.66667 10.6667 2.66667ZM25 16C25 15.7067 24.96 15.44 24.92 15.16L26.44 13.8133L25.1067 11.5067L23.1733 12.16C22.7467 11.8 22.2667 11.52 21.7333 11.32L21.3333 9.33333H18.6667L18.2667 11.32C17.7333 11.52 17.2533 11.8 16.8267 12.16L14.8933 11.5067L13.56 13.8133L15.08 15.16C15.04 15.44 15 15.7067 15 16C15 16.2933 15.04 16.56 15.08 16.84L13.56 18.1867L14.8933 20.4933L16.8267 19.84C17.2533 20.2 17.7333 20.48 18.2667 20.68L18.6667 22.6667H21.3333L21.7333 20.68C22.2667 20.48 22.7467 20.2 23.1733 19.84L25.1067 20.4933L26.44 18.1867L24.92 16.84C24.96 16.56 25 16.2933 25 16ZM20 18.6667C18.5333 18.6667 17.3333 17.4667 17.3333 16C17.3333 14.5333 18.5333 13.3333 20 13.3333C21.4667 13.3333 22.6667 14.5333 22.6667 16C22.6667 17.4667 21.4667 18.6667 20 18.6667Z" fill="black"/>
</svg>}
  pageTitle="Doctor Management"
  pageSubtitle="View, edit, and manage all registered doctors."
    imgSrc="/no-patient.svg"
  title="No Doctors Found"
  description="You haven't added any Doctors yet. Start building your Doctor database by adding your first Doctor Details."
  buttonLabel="Add Doctor"
  onAction={() => navigate('/admin/AddDoctorBtn')}
/>
      </section>
    );
  }

  // 5. التصميم العادي في حالة وجود بيانات
  return (
    <section className="flex flex-col gap-6 p-6" aria-label="Doctor Management">
      <Toast
        visible={toast.visible}
        title={toast.title}
        message={toast.message}
        type="success"
        onClose={() => setToast(t => ({ ...t, visible: false }))}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="23" viewBox="0 0 27 23" fill="none">
 <path d="M2.66667 18.6667V17.8C2.66667 17.3467 2.88 16.92 3.21333 16.72C5.46667 15.3733 8.04 14.6667 10.6667 14.6667C10.7067 14.6667 10.7333 14.6667 10.7733 14.68C10.9067 13.7467 11.1733 12.8533 11.56 12.04C11.2667 12.0133 10.9733 12 10.6667 12C7.44 12 4.42667 12.8933 1.85333 14.4267C0.68 15.12 0 16.4267 0 17.8V21.3333H12.3467C11.7867 20.5333 11.3467 19.6267 11.0533 18.6667H2.66667ZM10.6667 10.6667C13.6133 10.6667 16 8.28 16 5.33333C16 2.38667 13.6133 0 10.6667 0C7.72 0 5.33333 2.38667 5.33333 5.33333C5.33333 8.28 7.72 10.6667 10.6667 10.6667ZM10.6667 2.66667C12.1333 2.66667 13.3333 3.86667 13.3333 5.33333C13.3333 6.8 12.1333 8 10.6667 8C9.2 8 8 6.8 8 5.33333C8 3.86667 9.2 2.66667 10.6667 2.66667ZM25 16C25 15.7067 24.96 15.44 24.92 15.16L26.44 13.8133L25.1067 11.5067L23.1733 12.16C22.7467 11.8 22.2667 11.52 21.7333 11.32L21.3333 9.33333H18.6667L18.2667 11.32C17.7333 11.52 17.2533 11.8 16.8267 12.16L14.8933 11.5067L13.56 13.8133L15.08 15.16C15.04 15.44 15 15.7067 15 16C15 16.2933 15.04 16.56 15.08 16.84L13.56 18.1867L14.8933 20.4933L16.8267 19.84C17.2533 20.2 17.7333 20.48 18.2667 20.68L18.6667 22.6667H21.3333L21.7333 20.68C22.2667 20.48 22.7467 20.2 23.1733 19.84L25.1067 20.4933L26.44 18.1867L24.92 16.84C24.96 16.56 25 16.2933 25 16ZM20 18.6667C18.5333 18.6667 17.3333 17.4667 17.3333 16C17.3333 14.5333 18.5333 13.3333 20 13.3333C21.4667 13.3333 22.6667 14.5333 22.6667 16C22.6667 17.4667 21.4667 18.6667 20 18.6667Z" fill="black"/>
</svg><h1 className="text-[24px] sm:text-[24px] font-bold text-black-main-text leading-none">
             Doctor Management
           </h1>
          </div>
          <p className="text-[18px] text-gray-text-dim2">View, edit, and manage all platform doctors.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search doctors…"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full sm:max-w-md pl-11 pr-4 py-3 text-[16px] bg-[#F6F7F8] border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#155dfc]/20 transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button onClick={handleExport} className="flex justify-center items-center gap-2 px-6 py-3 text-[16px] font-semibold text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all cursor-pointer">
            <FiUpload /> Export
          </button>
          <button onClick={() => navigate('/admin/AddDoctorBtn')} className="flex justify-center items-center gap-2 px-6 py-3 text-[16px] font-semibold text-white bg-[#333CF5] rounded-full hover:bg-[#0913C3] transition-all shadow-md cursor-pointer">
            <FiPlus /> Add Doctor
          </button>
        </div>
      </div>

      {/* في حالة البحث لا يعطي نتائج */}
      {filteredDoctors.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-gray-400 text-[18px]">No results match your search criteria.</p>
        </div>
      ) : (
        <DataTable
          data={filteredDoctors}
          selectedItems={selectedIds}
          onToggle={toggleSelect}
          onDeleteIndividual={openSingleDeleteModal}
          onEdit={(item) => navigate(`/admin/edit-doctor/${item.id}`)}
          onBulkDelete={openBulkDeleteModal}
          onClearSelection={() => setSelectedIds([])}
        />
      )}

      <ConfirmModal
        isOpen={modal.open}
        title={modal.type === 'bulk' ? `Delete ${selectedIds.length} Doctors?` : 'Delete Doctor?'}
        desc="This action is permanent and cannot be undone."
        onCancel={() => setModal({ open: false, type: 'single', targetId: null })}
        onConfirm={handleDeleteConfirm}
      />
    </section>
  );
}