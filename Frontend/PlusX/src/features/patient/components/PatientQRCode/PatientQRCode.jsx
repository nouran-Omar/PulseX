import React, { useState, useRef } from 'react';
import styles from './PatientQRCode.module.css';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import { LuQrCode, LuCalendarDays } from 'react-icons/lu';
import { HiOutlineCheckCircle, HiOutlineLightBulb } from 'react-icons/hi2';
import { RiNumbersLine } from 'react-icons/ri';

const PatientQRCode = () => {
  const qrRef = useRef(null);

  const [userData] = useState({
    name: 'Nouran Omar',
    generatedDate: '19/10/2024',
    totalFiles: 8,
    medicalImages: [
      'https://images.unsplash.com/photo-1530026405186-ed1f1305b3c2?w=500',
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500',
    ],
  });

  const downloadPDF = async () => {
    const doc = new jsPDF();

    // QR as SVG → Canvas → Image
    const svgEl = qrRef.current?.querySelector('svg');
    if (svgEl) {
      const svgData = new XMLSerializer().serializeToString(svgEl);
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      await new Promise((resolve) => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 200, 200);
          URL.revokeObjectURL(url);
          resolve();
        };
        img.src = url;
      });

      // Page 1: Header + QR
      doc.setFontSize(22);
      doc.setTextColor(1, 2, 24);
      doc.text('PulseX - Medical QR Report', 105, 20, { align: 'center' });

      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Patient: ${userData.name}`, 20, 35);
      doc.text(`Generated on: ${userData.generatedDate}`, 20, 43);
      doc.text(`Total Files: ${userData.totalFiles}`, 20, 51);

      const qrImgData = canvas.toDataURL('image/png');
      doc.addImage(qrImgData, 'PNG', 80, 60, 50, 50);

      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text('Scan this QR code to access all medical records securely.', 105, 118, { align: 'center' });
    }

    // Pages: Medical Images
    for (let i = 0; i < userData.medicalImages.length; i++) {
      doc.addPage();
      doc.setFontSize(14);
      doc.setTextColor(1, 2, 24);
      doc.text(`Medical Document ${i + 1}`, 20, 15);
      try {
        doc.addImage(userData.medicalImages[i], 'JPEG', 15, 25, 180, 150);
      } catch {
        doc.setFontSize(11);
        doc.setTextColor(150);
        doc.text('Image could not be loaded.', 20, 40);
      }
    }

    doc.save(`PulseX_Records_${userData.name.replace(' ', '_')}.pdf`);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <LuQrCode className={styles.headerIcon} />
          <h1 className={styles.title}>Your Personal QR Code</h1>
        </div>
        <p className={styles.subtitle}>
          Access all your medical records instantly by scanning this code.
        </p>
      </header>

      {/* Main Grid */}
      <div className={styles.mainGrid}>
        {/* ===== Left: QR Card ===== */}
        <div className={styles.qrCard}>
          <div className={styles.qrWrapper} ref={qrRef}>
            <QRCodeSVG
              value={`https://pulsex-app.com/records/${userData.name}`}
              size={200}
              bgColor="#ffffff"
              fgColor="#010218"
              level="H"
            />
          </div>

          <div className={styles.qrInfo}>
            <div className={styles.infoRow}>
              <LuCalendarDays className={styles.infoIcon} />
              <span>Generated on: {userData.generatedDate}</span>
            </div>
            <div className={styles.infoRow}>
              <RiNumbersLine className={styles.infoIcon} />
              <span>Total Files: {userData.totalFiles}</span>
            </div>
          </div>

          <button className={styles.downloadBtn} onClick={downloadPDF}>
            Download PDF
          </button>
        </div>

        {/* ===== Right: Details Column ===== */}
        <div className={styles.detailsColumn}>
          {/* What's inside */}
          <div className={styles.contentCard}>
            <h3>What's inside your QR Code?</h3>
            <ul className={styles.checkList}>
              <li>
                <HiOutlineCheckCircle className={styles.checkIcon} />
                Blood Test Results
              </li>
              <li>
                <HiOutlineCheckCircle className={styles.checkIcon} />
                Radiology Scans
              </li>
              <li>
                <HiOutlineCheckCircle className={styles.checkIcon} />
                Medication Reports
              </li>
            </ul>
          </div>

          {/* Tip Box */}
          <div className={styles.tipBox}>
            <div className={styles.tipTitle}>
              <HiOutlineLightBulb className={styles.tipIcon} />
              <span>Tip:</span>
            </div>
            <p>
              Show this QR code to your doctor during <br />  appointments — it gives
              instant access to all your records securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientQRCode;
