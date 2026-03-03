import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LuClipboardList, LuTrash2, LuFileText, LuQrCode,
} from 'react-icons/lu';
import { HiOutlineUpload } from 'react-icons/hi';
import { RiRocketLine } from 'react-icons/ri';
import { FaRegFileAlt, FaCalendarAlt, FaXRay, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { IoClose } from 'react-icons/io5';

const CATEGORY_CONFIG = {
  ECG: {
    label: 'ECG',
    icon: <TbActivityHeartbeat />,
    description: 'Keep track of your latest ECG results (Optional)',
    color: '#333CF5',
    bg: '#EEF0FF',
    accept: '.jpeg,.jpg,.png',
    formats: 'JPEG, PNG',
  },
  Radiology: {
    label: 'Radiology',
    icon: <FaXRay />,
    description: 'Upload your X-rays or CT (Optional)',
    color: '#333CF5',
    bg: '#EEF0FF',
    accept: '.jpeg,.jpg,.png',
    formats: 'JPEG, PNG',
  },
  'Medical File': {
    label: 'Other Medical Files',
    icon: <LuFileText />,
    description: 'Upload any additional medical reports, lab results, or scans.',
    color: '#333CF5',
    bg: '#EEF0FF',
    accept: '.jpeg,.jpg,.png,.pdf',
    formats: 'JPEG, PNG',
  },
};

const TYPE_COLORS = {
  PNG:  { bg: '#F0F4FF', color: '#333CF5' },
  PDF:  { bg: '#FFF0F0', color: '#E53E3E' },
  JPEG: { bg: '#F0FFF4', color: '#38A169' },
  JPG:  { bg: '#F0FFF4', color: '#38A169' },
};

const STAT_ITEMS = [
  { key: 'total',    label: 'Total Files Uploaded', icon: <LuClipboardList />, iconBg: '#DBEAFE', iconColor: '#2B7FFF', valueColor: '#2B7FFF' },
  { key: 'ecg',      label: 'ECG Files',             icon: <TbActivityHeartbeat />, iconBg: '#DCFCE7', iconColor: '#00C950', valueColor: '#00C950' },
  { key: 'xray',     label: 'X-rays Files',          icon: <FaXRay />,          iconBg: '#F3E8FF', iconColor: '#AD46FF', valueColor: '#AD46FF' },
  { key: 'medical',  label: 'Medical files',         icon: <FaRegFileAlt />,   iconBg: '#FEF9C2', iconColor: '#F0B100', valueColor: '#F0B100' },
  { key: 'lastDate', label: 'Last Upload',           icon: <FaCalendarAlt />,  iconBg: '#FFEDD4', iconColor: '#FF6900', valueColor: '#FF6900', isDate: true },
];

let nextId = 10;

const PatientMedicalRecords = () => {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([
    { id: 1, name: 'BloodT', type: 'PNG',  size: '29 KB', date: '18/10/2025', category: 'ECG' },
    { id: 2, name: 'BPdf',   type: 'PDF',  size: '1 MB',  date: '1/9/2025',  category: 'ECG' },
    { id: 3, name: 'BPdf',   type: 'PDF',  size: '1 MB',  date: '1/9/2025',  category: 'Medical File' },
    { id: 4, name: 'Scan',   type: 'JPEG', size: '26 KB', date: '18/8/2025', category: 'Radiology' },
    { id: 5, name: 'Photo',  type: 'PNG',  size: '2 KB',  date: '16/8/2025', category: 'Radiology' },
  ]);

  const [selected, setSelected]       = useState([]);
  const [dragOver, setDragOver]       = useState(null);
  const fileInputRefs                 = useRef({});

  // ── Confirm modal state ──────────────────────────
  const [confirmModal, setConfirmModal] = useState({ open: false, ids: [], label: '' });
  // ── Success toast state ──────────────────────────
  const [successToast, setSuccessToast] = useState({ open: false, message: '' });

  const showSuccess = (message) => {
    setSuccessToast({ open: true, message });
    setTimeout(() => setSuccessToast({ open: false, message: '' }), 3000);
  };

  const openConfirm = (ids, label) => setConfirmModal({ open: true, ids, label });
  const closeConfirm = () => setConfirmModal({ open: false, ids: [], label: '' });

  const confirmDelete = () => {
    const count = confirmModal.ids.length;
    setDocuments((prev) => prev.filter((d) => !confirmModal.ids.includes(d.id)));
    setSelected((prev) => prev.filter((s) => !confirmModal.ids.includes(s)));
    closeConfirm();
    showSuccess(count === 1 ? 'File deleted successfully.' : `${count} files deleted successfully.`);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getExt = (filename) => filename.split('.').pop().toUpperCase();

  const addFiles = useCallback((files, category) => {
    const newDocs = Array.from(files).map((file) => ({
      id: nextId++,
      name: file.name.replace(/\.[^.]+$/, ''),
      type: getExt(file.name),
      size: formatFileSize(file.size),
      date: new Date().toLocaleDateString('en-GB'),
      category,
    }));
    setDocuments((prev) => [...prev, ...newDocs]);
  }, []);

  const handleFileInput = (e, category) => {
    if (e.target.files?.length) addFiles(e.target.files, category);
    e.target.value = '';
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    setDragOver(null);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files, category);
  };

  const toggleSelect = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  const toggleAll = () =>
    setSelected(selected.length === documents.length ? [] : documents.map((d) => d.id));

  const stats = {
    total:    documents.length,
    ecg:      documents.filter((d) => d.category === 'ECG').length,
    xray:     documents.filter((d) => d.category === 'Radiology').length,
    medical:  documents.filter((d) => d.category === 'Medical File').length,
    lastDate: documents.length ? documents[documents.length - 1].date : '—',
  };

  const renderUploadZone = (categoryKey) => {
    const cfg = CATEGORY_CONFIG[categoryKey];
    const isActive = dragOver === categoryKey;
    return (
      <div
        key={categoryKey}
        className={`bg-white rounded-[22px] border ${isActive ? 'border-brand-main bg-blue-50/30' : 'border-gray-100'} shadow-sm p-5 flex flex-col gap-4 transition-colors`}
      >
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-[12px] flex items-center justify-center text-lg shrink-0" style={{ background: cfg.bg, color: cfg.color }}>
            {cfg.icon}
          </span>
          <div>
            <p className="text-[14px] font-bold text-black-main-text">{cfg.label}</p>
            <p className="text-[12px] text-gray-400 mt-0.5">{cfg.description}</p>
          </div>
        </div>

        <div
          className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:border-brand-main hover:bg-blue-50/20 transition-colors"
          onDragOver={(e) => { e.preventDefault(); setDragOver(categoryKey); }}
          onDragLeave={() => setDragOver(null)}
          onDrop={(e) => handleDrop(e, categoryKey)}
          onClick={() => fileInputRefs.current[categoryKey]?.click()}
        >
          <HiOutlineUpload className="text-brand-main text-2xl mb-2" />
          <p className="text-[13px] text-gray-600 text-center">
            Drag &amp; drop {cfg.label} files or{' '}
            <span className="text-brand-main font-semibold">Browse</span>
          </p>
          <p className="text-[11px] text-gray-400 mt-1">Supported formats: {cfg.formats}</p>
        </div>

        <input
          type="file"
          accept={cfg.accept}
          multiple
          hidden
          ref={(el) => (fileInputRefs.current[categoryKey] = el)}
          onChange={(e) => handleFileInput(e, categoryKey)}
        />
      </div>
    );
  };

  return (
    <section className="flex flex-col gap-6 p-5 ">

      {/* Success Toast */}
      {successToast.open && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-white border border-green-200 rounded-[16px] shadow-lg px-5 py-3">
          <FaCheckCircle className="text-green-500 text-lg shrink-0" />
          <span className="text-[13px] font-semibold text-black-main-text">{successToast.message}</span>
          <button className="text-gray-400 hover:text-gray-600 ml-2" onClick={() => setSuccessToast({ open: false, message: '' })}>
            <IoClose />
          </button>
        </div>
      )}

      {/* Confirm Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={closeConfirm}>
          <div className="bg-white rounded-[22px] shadow-xl p-6 max-w-sm w-full flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
              <FaExclamationTriangle className="text-[#E7000B] text-xl" />
            </div>
            <h3 className="text-[16px] font-bold text-black-main-text">
              Delete {confirmModal.ids.length > 1 ? `${confirmModal.ids.length} Files` : 'File'}?
            </h3>
            <p className="text-[13px] text-gray-500 text-center leading-relaxed">
              {confirmModal.ids.length > 1
                ? `Are you sure you want to delete ${confirmModal.ids.length} selected files? This action cannot be undone.`
                : `Are you sure you want to delete "${confirmModal.label}"? This action cannot be undone.`}
            </p>
            <div className="flex gap-3 w-full">
              <button className="flex-1 border border-gray-200 rounded-xl py-2.5 text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors" onClick={closeConfirm}>Cancel</button>
              <button className="flex-1 bg-[#E7000B] hover:bg-red-700 text-white rounded-xl py-2.5 text-[13px] font-bold flex items-center justify-center gap-2 transition-colors" onClick={confirmDelete}>
                <LuTrash2 /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <header className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 flex items-center justify-center rounded-[12px] bg-[#155dfc] text-white text-[20px] shrink-0">
          <LuClipboardList />
        </div>
        <div>
          <h1 className="text-[18px] font-bold text-black-main-text">Medical Records</h1>
          <p className="text-[12px] text-gray-500 mt-0.5">Upload and view your medical health easily.</p>
        </div>
      </header>

      {/* Upload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderUploadZone('ECG')}
        {renderUploadZone('Radiology')}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderUploadZone('Medical File')}
      </div>

      {/* Document List */}
      <div className="bg-white rounded-[22px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100" style={{ background: 'linear-gradient(to right, #EFF6FF, #EEF2FF)' }}>
          <LuClipboardList className="text-[#155DFC] text-lg" />
          <div>
            <h2 className="text-[14px] font-bold text-[#101828]">Document List</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">"Manage and operate your document files."</p>
          </div>
        </div>

        {selected.length > 0 && (
          <div className="flex items-center justify-between px-5 py-3 bg-blue-50 border-b border-blue-100">
            <span className="text-[13px] font-semibold text-[#155dfc]">{selected.length} selected</span>
            <button
              className="flex items-center gap-1.5 bg-[#E7000B] hover:bg-red-700 text-white rounded-xl px-4 py-2 text-[12px] font-bold transition-colors"
              onClick={() => openConfirm(selected, '')}
            >
              <LuTrash2 /> Delete Selected
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selected.length === documents.length && documents.length > 0}
                    onChange={toggleAll}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#364153]">File name</th>
                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#364153]">Type</th>
                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#364153]">Size</th>
                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#364153]">Uploaded Date</th>
                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#364153]">Record Type</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {documents.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-[13px] text-gray-400">
                    No documents yet. Upload your first file above.
                  </td>
                </tr>
              )}
              {documents.map((doc) => {
                const typeStyle = TYPE_COLORS[doc.type] || { bg: '#F5F5F5', color: '#555' };
                return (
                  <tr key={doc.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${selected.includes(doc.id) ? 'bg-blue-50/40' : ''}`}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(doc.id)}
                        onChange={() => toggleSelect(doc.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <LuFileText className="text-[#155dfc] shrink-0" />
                        <span className="text-black-main-text font-medium">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: typeStyle.bg, color: typeStyle.color }}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{doc.size}</td>
                    <td className="px-4 py-3 text-gray-400">{doc.date}</td>
                    <td className="px-4 py-3 text-black-main-text">{doc.category}</td>
                    <td className="px-4 py-3">
                      <button
                        className="text-gray-400 hover:text-[#E7000B] transition-colors p-1.5 rounded-lg hover:bg-red-50"
                        onClick={() => openConfirm([doc.id], doc.name)}
                        title="Delete"
                      >
                        <LuTrash2 />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CTA Box */}
        <div className="bg-linear-to-br from-brand-main to-[#0913C3] rounded-[22px] p-8 flex flex-col items-center text-center gap-4">
          <LuQrCode className="text-white text-4xl" />
          <h3 className="text-[16px] font-bold text-white">All your medical files are ready!</h3>
          <p className="text-[13px] text-blue-100 leading-relaxed">
            Your reports are now organized.<br />
            Generate your personal QR code to access them anytime.
          </p>
          <button
            className="flex items-center gap-2 bg-white text-brand-main font-bold rounded-full px-6 py-2.5 text-[13px] hover:bg-blue-50 transition-colors"
            onClick={() => navigate('/patient/qr')}
          >
            <RiRocketLine /> Generate QR Code →
          </button>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-[22px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100" style={{ background: 'linear-gradient(to right, #EFF6FF, #EEF2FF)' }}>
            <LuClipboardList className="text-[#155DFC] text-lg" />
            <h3 className="text-[14px] font-bold text-[#101828]">Statistics</h3>
          </div>
          <div className="flex flex-col divide-y divide-gray-50">
            {STAT_ITEMS.map((s) => (
              <div key={s.key} className={`flex items-center justify-between px-5 py-3 ${s.isDate ? 'bg-orange-50/30' : ''}`}>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-[10px] flex items-center justify-center text-sm" style={{ background: s.iconBg, color: s.iconColor }}>
                    {s.icon}
                  </span>
                  <span className="text-[13px] text-black-main-text">{s.label}</span>
                </div>
                <span className="text-[14px] font-bold" style={{ color: s.valueColor }}>
                  {stats[s.key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientMedicalRecords;