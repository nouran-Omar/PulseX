import React, { useEffect, useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import QRCodeCard from '../../components/QRCode/QRCodeCard';
import QRCodeDetails from '../../components/QRCode/QRCodeDetails';
import QRCodeHeader from '../../components/QRCode/QRCodeHeader';

const PatientQRCode = () => {
  const qrRef = useRef(null);

  useEffect(() => {
    document.title = 'QR Code | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Access your medical records quickly using your personal QR code.');
    }
  }, []);

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
    <main className="flex flex-col gap-6 p-[24px]" style={{ "--qr-muted": "#757575" }}>
      <QRCodeHeader />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-20 px-0 sm:px-6 lg:px-10 justify-items-center" aria-label="QR code overview">
        <QRCodeCard qrRef={qrRef} userData={userData} onDownload={downloadPDF} />
        <aside>
          <QRCodeDetails items={['Blood Test Results', 'Radiology Scans', 'Medication Reports']} />
        </aside>
      </section>

      <footer className="sr-only">
        <p>End of QR code page.</p>
      </footer>
    </main>
  );
};

export default PatientQRCode;
