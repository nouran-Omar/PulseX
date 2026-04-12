import { useState } from 'react';
import {
  LuActivity,
  LuDroplet,
  LuRuler,
} from 'react-icons/lu';
import { FaHeartPulse } from 'react-icons/fa6';
import Toast from '../../../../components/Toast/Toast';
import NumberField from './NumberField';
import SelectField from './SelectField';

const HEART_RATE_OPTIONS = [
  { label: 'Low (< 60 bpm)', value: '<60' },
  { label: 'Normal (60-100 bpm)', value: '60-100' },
  { label: 'Slightly High (101-120 bpm)', value: '>100' },
  { label: 'High (> 120 bpm)', value: '>120' },
];

const BP_OPTIONS = [
  { label: 'Low (< 90/60 mmHg)', value: 'low' },
  { label: 'Normal (90-120 / 60-80 mmHg)', value: 'normal' },
  { label: 'Pre-Hypertension (120-139 / 80-89 mmHg)', value: 'elevated' },
  { label: 'High - Stage 1 (140-159 / 90-99 mmHg)', value: 'high' },
  { label: 'High - Stage 2 (>= 160 / >= 100 mmHg)', value: 'very_high' },
];

const BLOOD_COUNT_OPTIONS = [
  { label: 'Low (< 30%)', value: 'low' },
  { label: 'Normal (30%-45%)', value: 'normal' },
  { label: 'High  (> 45%)', value: 'high' },
];

const UpdateHealthForm = ({ onSave }) => {
  const [toast, setToast] = useState({ visible: false, title: '', msg: '' });
  const [form, setForm] = useState({
    heartRate: '',
    bloodPressure: '',
    bloodCount: '',
    height: '',
    bloodSugar: '',
    weight: '',
  });
  const [errors, setErrors] = useState({});

  const showToast = (title, msg) => {
    setToast({ visible: true, title, msg });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3500);
  };

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.heartRate) e.heartRate = 'Required';
    if (!form.bloodPressure) e.bloodPressure = 'Required';
    if (!form.bloodCount) e.bloodCount = 'Required';
    if (!form.height) e.height = 'Required';
    if (!form.bloodSugar) e.bloodSugar = 'Required';
    if (!form.weight) e.weight = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    showToast('Health Data Updated', 'Your health information has been saved successfully.');
    onSave();
  };

  return (
    <section className="overflow-hidden" aria-labelledby="update-health-title">
      <aside aria-live="polite">
        <Toast
          visible={toast.visible}
          title={toast.title}
          message={toast.msg}
          type="success"
          onClose={() => setToast((t) => ({ ...t, visible: false }))}
        />
      </aside>

      <article>
        <header className="flex items-center justify-center mx-8 my-6">
          <h2 id="update-health-title" className="text-[#101828] font-bold text-3xl">
            Updating Health Data
          </h2>
        </header>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="sm:col-span-2">
              <SelectField
                label="Heart Rate"
                icon={<FaHeartPulse />}
                iconLabel="Heart rate"
                value={form.heartRate}
                onChange={(v) => set('heartRate', v)}
                options={HEART_RATE_OPTIONS}
                placeholder="Select your heart rate range"
                required
              />
              {errors.heartRate && (
                <p className="text-[#DC2626] text-xs mt-1">{errors.heartRate}</p>
              )}
            </div>

            <div>
              <NumberField
                label="Height"
                icon={<LuRuler />}
                iconLabel="Height"
                value={form.height}
                onChange={(v) => set('height', v)}
                placeholder="cm"
                unit="cm"
                required
              />
              {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}
            </div>

            <div className="sm:col-span-2">
              <SelectField
                label="Blood Pressure"
                icon={<LuDroplet />}
                iconLabel="Blood pressure"
                value={form.bloodPressure}
                onChange={(v) => set('bloodPressure', v)}
                options={BP_OPTIONS}
                placeholder="Select your blood pressure range"
                required
              />
              {errors.bloodPressure && (
                <p className="text-red-500 text-xs mt-1">{errors.bloodPressure}</p>
              )}
            </div>

            <div>
              <NumberField
                label="Blood Sugar"
                icon={<LuActivity />}
                iconLabel="Blood sugar"
                value={form.bloodSugar}
                onChange={(v) => set('bloodSugar', v)}
                placeholder="mg/dL"
                unit="mg/dL"
                required
              />
              {errors.bloodSugar && (
                <p className="text-red-500 text-xs mt-1">{errors.bloodSugar}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <SelectField
                label="Blood Count"
                icon={<LuActivity />}
                iconLabel="Blood count"
                value={form.bloodCount}
                onChange={(v) => set('bloodCount', v)}
                options={BLOOD_COUNT_OPTIONS}
                placeholder="Select your blood count range"
                required
              />
              {errors.bloodCount && (
                <p className="text-red-500 text-xs mt-1">{errors.bloodCount}</p>
              )}
            </div>

            <div>
              <NumberField
                label="Weight"
                icon={<LuActivity />}
                iconLabel="Weight"
                value={form.weight}
                onChange={(v) => set('weight', v)}
                placeholder="kg"
                unit="kg"
                required
              />
              {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={handleSave}
              className="cursor-pointer bg-brand-main hover:bg-blue-700 text-white px-12 py-3 rounded-full font-bold flex items-center gap-2 transition-colors text-sm shadow-md shadow-blue-200 mt-4"
            >
              Save  Changes
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default UpdateHealthForm;
