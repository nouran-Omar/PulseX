import React from 'react';
import { FiActivity, FiDroplet, FiThermometer, FiTrendingUp, FiFileText } from 'react-icons/fi';

const VITAL_ITEMS = [
  { key: 'heartRate', label: 'Heart Rate', unit: 'bpm', icon: FiActivity, color: 'bg-[#FEE2E2] text-[#E11D48]' },
  { key: 'bloodPressure', label: 'Blood Pressure', unit: 'mmHg', icon: FiDroplet, color: 'bg-[#DBEAFE] text-[#1D4ED8]' },
  { key: 'bloodSugar', label: 'Blood Sugar', unit: 'mg/dL', icon: FiThermometer, color: 'bg-[#FEF3C7] text-[#B45309]' },
  { key: 'cholesterol', label: 'Cholesterol', unit: 'mg/dL', icon: FiTrendingUp, color: 'bg-[#EDE9FE] text-[#7C3AED]' },
  { key: 'bloodCount', label: 'Blood Count', unit: 'CBC', icon: FiFileText, color: 'bg-[#DCFCE7] text-[#16A34A]' },
];

function PatientVitalsCards({ vitals }) {
  return (
    <section aria-label="Vital signs">
      <h2 className="mb-3 text-xl font-bold text-slate-900">Vital Signs</h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {VITAL_ITEMS.map((item) => {
          const Icon = item.icon;
          const value = vitals?.[item.key] ?? '--';

          return (
            <article key={item.key} className="rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md ${item.color}`}>
                  <Icon className="text-sm" />
                </span>
                <p className="text-xs font-semibold text-slate-500">{item.label}</p>
              </div>
              <p className="mt-3 text-3xl font-bold leading-none text-slate-900">{value}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">{item.unit}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default PatientVitalsCards;
