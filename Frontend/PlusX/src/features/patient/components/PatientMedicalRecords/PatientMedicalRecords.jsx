import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PatientMedicalRecords.module.css';
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
    return (
      <div
        key={categoryKey}
        className={`${styles.uploadCard} ${dragOver === categoryKey ? styles.dragActive : ''}`}
      >
        <div className={styles.uploadCardHeader}>
          <span className={styles.uploadCardIcon} style={{ background: cfg.bg, color: cfg.color }}>
            {cfg.icon}
          </span>
          <div>
            <p className={styles.uploadCardTitle}>{cfg.label}</p>
            <p className={styles.uploadCardDesc}>{cfg.description}</p>
          </div>
        </div>

        <div
          className={styles.dropZone}
          onDragOver={(e) => { e.preventDefault(); setDragOver(categoryKey); }}
          onDragLeave={() => setDragOver(null)}
          onDrop={(e) => handleDrop(e, categoryKey)}
          onClick={() => fileInputRefs.current[categoryKey]?.click()}
        >
          <HiOutlineUpload className={styles.dropIcon} />
          <p className={styles.dropText}>
            Drag &amp; drop {cfg.label} files or{' '}
            <span className={styles.browseLink}>Browse</span>
          </p>
          <p className={styles.dropFormats}>Supported formats: {cfg.formats}</p>
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
    <div className={styles.page}>

      {/* ── Success Toast ────────────────────────── */}
      {successToast.open && (
        <div className={styles.toast}>
          <FaCheckCircle className={styles.toastIcon} />
          <span>{successToast.message}</span>
          <button className={styles.toastClose} onClick={() => setSuccessToast({ open: false, message: '' })}>
            <IoClose />
          </button>
        </div>
      )}

      {/* ── Confirm Modal ────────────────────────── */}
      {confirmModal.open && (
        <div className={styles.modalOverlay} onClick={closeConfirm}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIconWrap}>
              <FaExclamationTriangle className={styles.modalIcon} />
            </div>
            <h3 className={styles.modalTitle}>Delete {confirmModal.ids.length > 1 ? `${confirmModal.ids.length} Files` : 'File'}?</h3>
            <p className={styles.modalDesc}>
              {confirmModal.ids.length > 1
                ? `Are you sure you want to delete ${confirmModal.ids.length} selected files? This action cannot be undone.`
                : `Are you sure you want to delete "${confirmModal.label}"? This action cannot be undone.`}
            </p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancelBtn} onClick={closeConfirm}>Cancel</button>
              <button className={styles.modalDeleteBtn} onClick={confirmDelete}>
                <LuTrash2 /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page Header ──────────────────────────── */}
      <div className={styles.pageHeader}>
        <LuClipboardList className={styles.pageHeaderIcon} />
        <div>
          <h1 className={styles.pageTitle}>Medical Records</h1>
          <p className={styles.pageSubtitle}>Upload and view your medical health easily.</p>
        </div>
      </div>

      {/* ── Upload Grid ──────────────────────────── */}
      <div className={styles.uploadGrid}>
        {renderUploadZone('ECG')}
        {renderUploadZone('Radiology')}
      </div>
      <div className={styles.uploadGridCenter}>
        {renderUploadZone('Medical File')}
      </div>

      {/* ── Document List ────────────────────────── */}
      <div className={styles.tableSection}>
        <div className={styles.tableSectionHeader}>
          <div className={styles.tableTitleRow}>
            <LuClipboardList className={styles.tableTitleIcon} />
            <h2 className={styles.tableTitle}>Document List</h2>
          </div>
          <p className={styles.tableSubtitle}>"Manage and operate your document files."</p>
        </div>

        {selected.length > 0 && (
          <div className={styles.bulkBar}>
            <span>{selected.length} selected</span>
            <button
              className={styles.bulkDeleteBtn}
              onClick={() => openConfirm(selected, '')}
            >
              <LuTrash2 /> Delete Selected
            </button>
          </div>
        )}

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selected.length === documents.length && documents.length > 0}
                    onChange={toggleAll}
                    className={styles.checkbox}
                  />
                </th>
                <th>File name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Uploaded Date</th>
                <th>Record Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {documents.length === 0 && (
                <tr>
                  <td colSpan={7} className={styles.emptyRow}>
                    No documents yet. Upload your first file above.
                  </td>
                </tr>
              )}
              {documents.map((doc) => {
                const typeStyle = TYPE_COLORS[doc.type] || { bg: '#F5F5F5', color: '#555' };
                return (
                  <tr key={doc.id} className={selected.includes(doc.id) ? styles.selectedRow : ''}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(doc.id)}
                        onChange={() => toggleSelect(doc.id)}
                        className={styles.checkbox}
                      />
                    </td>
                    <td>
                      <div className={styles.fileNameCell}>
                        <LuFileText className={styles.fileIcon} />
                        <span>{doc.name}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={styles.typeBadge}
                        style={{ background: typeStyle.bg, color: typeStyle.color }}
                      >
                        {doc.type}
                      </span>
                    </td>
                    <td className={styles.mutedCell}>{doc.size}</td>
                    <td className={styles.mutedCell}>{doc.date}</td>
                    <td className={styles.categoryCell}>{doc.category}</td>
                    <td>
                      <button
                        className={styles.deleteBtn}
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

      {/* ── Bottom Row ───────────────────────────── */}
      <div className={styles.bottomRow}>
        <div className={styles.ctaBox}>
          <LuQrCode className={styles.ctaQrIcon} />
          <h3 className={styles.ctaTitle}>All your medical files are ready!</h3>
          <p className={styles.ctaDesc}>
            Your reports are now organized<br />
            Generate your personal QR code to access them anytime.
          </p>
          <button
            className={styles.ctaBtn}
            onClick={() => navigate('/patient/qr')}
          >
            <RiRocketLine className={styles.ctaBtnIcon} />
            Generate QR Code →
          </button>
        </div>

        <div className={styles.statsCard}>
          <div className={styles.statsHeader}>
            <span className={styles.statsHeaderIcon}><LuClipboardList /></span>
            <h3 className={styles.statsTitle}>Statistics</h3>
          </div>
          <div className={styles.statsList}>
            {STAT_ITEMS.map((s) => (
              <div key={s.key} className={`${styles.statRow} ${s.isDate ? styles.statRowHighlight : ''}`}>
                <div className={styles.statLeft}>
                  <span
                    className={styles.statIcon}
                    style={{ background: s.iconBg, color: s.iconColor }}
                  >
                    {s.icon}
                  </span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
                <span
                  className={styles.statValue}
                  style={{ color: s.valueColor }}
                >
                  {stats[s.key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientMedicalRecords;