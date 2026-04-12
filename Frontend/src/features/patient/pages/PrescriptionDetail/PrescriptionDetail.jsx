import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ALL_PRESCRIPTIONS } from '../Prescriptions/Prescriptions';
import ClinicalNotesSection from '../../components/PrescriptionDetail/ClinicalNotesSection';
import LabsSection from '../../components/PrescriptionDetail/LabsSection';
import MedicationsSection from '../../components/PrescriptionDetail/MedicationsSection';
import PrescriptionDetailHeader from '../../components/PrescriptionDetail/PrescriptionDetailHeader';

const PrescriptionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Prescription Details | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Review prescription details, lab requests, and clinical notes.');
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const fromState = location.state?.prescription;
    const found = fromState || ALL_PRESCRIPTIONS.find((p) => p.id === id) || ALL_PRESCRIPTIONS[0];
    const t = setTimeout(() => {
      setData(found);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f7f8] flex items-center justify-center">
        <p className="text-brand-main font-bold text-[16px] animate-pulse">Loading prescription...</p>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen"
      style={{
        "--rx-muted": "#4A5565",
        "--rx-muted-2": "#364153",
      }}
    >
      <h1 className="sr-only">Prescription Details</h1>

      <article className="rounded-[24px] overflow-hidden mx-auto w-full">
        <PrescriptionDetailHeader data={data} />

        <div className="p-6 sm:p-10 flex flex-col gap-8">
          <MedicationsSection data={data} />
          <LabsSection data={data} onUpload={() => navigate('/patient/records')} />
          <ClinicalNotesSection data={data} />
        </div>
      </article>

      <footer className="sr-only">
        <p>End of prescription details.</p>
      </footer>
    </main>
  );
};

export default PrescriptionDetail;
