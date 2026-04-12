import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartPulse } from 'react-icons/fa6';
import { LuActivity, LuDroplet, LuPencil, LuRuler } from 'react-icons/lu';
import ConfirmModal from '../../../admin/components/ConfirmModal/ConfirmModal';
import Toast from '../../../../components/Toast/Toast';
import usePatientData from '../../../../PatientHooks/usePatientData';
import {
  checkReqs,
  formatWithUnit,
  getInitialFormFromPatient,
  getStoriesWithFallback,
} from '../../components/PatientSettingsProfile/constants';
import AccountSettingsSection from '../../components/PatientSettingsProfile/AccountSettingsSection';
import HealthInfoSection from '../../components/PatientSettingsProfile/HealthInfoSection';
import PasswordModal from '../../components/PatientSettingsProfile/PasswordModal';
import PersonalInfoSection from '../../components/PatientSettingsProfile/PersonalInfoSection';
import SettingsHeader from '../../components/PatientSettingsProfile/SettingsHeader';
import StoriesSection from '../../components/PatientSettingsProfile/StoriesSection';

export default function PatientSettingsProfile() {
  const { patient } = usePatientData();
  const navigate = useNavigate();

  const [toast, setToast] = useState({ visible: false, title: '', msg: '' });
  const showToast = (title, msg) => {
    setToast({ visible: true, title, msg });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3500);
  };

  const fileRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
    showToast('Photo Updated', 'Your profile photo has been changed successfully.');
  };

  const [form, setForm] = useState(() => getInitialFormFromPatient(patient));
  const handleField = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSaveProfile = () => showToast('Saved Successfully', 'Your profile has been updated successfully.');

  const [pwModal, setPwModal] = useState(false);
  const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [pwError, setPwError] = useState('');
  const reqs = checkReqs(pwForm.newPw);

  const handleSavePassword = () => {
    if (!pwForm.current) { setPwError('Please enter your current password.'); return; }
    if (!reqs.length || !reqs.mixed || !reqs.number) { setPwError('New password does not meet requirements.'); return; }
    if (pwForm.newPw !== pwForm.confirm) { setPwError('Passwords do not match.'); return; }
    setPwModal(false);
    setPwForm({ current: '', newPw: '', confirm: '' });
    setPwError('');
    showToast('Password Changed', 'Your password has been updated successfully.');
  };

  const [emailNotif, setEmailNotif] = useState(Boolean(patient?.settings?.emailNotifications ?? true));
  const [darkMode, setDarkMode] = useState(Boolean(patient?.settings?.darkMode ?? false));

  const [stories, setStories] = useState(() => getStoriesWithFallback(patient));
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    setForm(getInitialFormFromPatient(patient));
    setStories(getStoriesWithFallback(patient));
    setEmailNotif(Boolean(patient?.settings?.emailNotifications ?? true));
    setDarkMode(Boolean(patient?.settings?.darkMode ?? false));
    if (patient?.avatarUrl) setPhoto(patient.avatarUrl);
  }, [patient]);

  const handleDeleteStory = () => {
    setStories(s => s.filter(x => x.id !== deleteTarget));
    setDeleteTarget(null);
    showToast('Story Deleted', 'Your story has been removed successfully.');
  };

  const v = patient?.vitals;
  const bloodPressureDisplay =
    v?.bloodPressure?.display
    ?? ((v?.bloodPressure?.systolic && v?.bloodPressure?.diastolic)
      ? `${v.bloodPressure.systolic}/${v.bloodPressure.diastolic}`
      : '--/--');

  const healthCards = [
    { label: 'Height', value: formatWithUnit(v?.height?.value ?? patient?.height, v?.height?.unit ?? 'cm'), icon: <LuRuler /> },
    { label: 'Weight', value: formatWithUnit(v?.weight?.value ?? patient?.weight, v?.weight?.unit ?? 'kg'), icon: <LuActivity /> },
    { label: 'Blood Pressure', value: bloodPressureDisplay, icon: <LuDroplet /> },
    { label: 'Blood Sugar', value: formatWithUnit(v?.bloodSugar?.value, v?.bloodSugar?.unit ?? 'mg/dL'), icon: <LuPencil /> },
    { label: 'Blood Count', value: formatWithUnit(v?.bloodCount?.value, v?.bloodCount?.unit ?? 'g/dL'), icon: <LuActivity /> },
    { label: 'Heart Rate', value: formatWithUnit(v?.heartRate?.value, v?.heartRate?.unit ?? 'bpm'), icon: <FaHeartPulse /> },
  ];

  return (
    <div className="flex flex-col gap-4 sm:gap-6 font-roboto px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-6">
      <Toast
        visible={toast.visible}
        title={toast.title}
        message={toast.msg}
        type="success"
        onClose={() => setToast(t => ({ ...t, visible: false }))}
      />

      <SettingsHeader />

      <main className="flex flex-col gap-4 sm:gap-6">
        <section aria-labelledby="settings-personal-heading">
          <PersonalInfoSection
            form={form}
            fileRef={fileRef}
            photo={photo}
            handlePhotoChange={handlePhotoChange}
            handleField={handleField}
            handleSaveProfile={handleSaveProfile}
          />
        </section>

        <section aria-labelledby="settings-health-heading">
          <HealthInfoSection healthCards={healthCards} navigate={navigate} />
        </section>

        <section aria-labelledby="settings-stories-heading">
          <StoriesSection stories={stories} navigate={navigate} setDeleteTarget={setDeleteTarget} />
        </section>

        <aside aria-labelledby="settings-account-heading">
          <AccountSettingsSection
            setPwError={setPwError}
            setPwModal={setPwModal}
            emailNotif={emailNotif}
            setEmailNotif={setEmailNotif}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </aside>
      </main>

      <footer className="sr-only">
        <p>Settings page footer</p>
      </footer>

      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="Delete Story?"
        desc="Are you sure you want to delete this story? This action cannot be undone."
        onConfirm={handleDeleteStory}
        onCancel={() => setDeleteTarget(null)}
      />

      <PasswordModal
        pwModal={pwModal}
        setPwModal={setPwModal}
        pwError={pwError}
        pwForm={pwForm}
        showPw={showPw}
        setShowPw={setShowPw}
        setPwForm={setPwForm}
        reqs={reqs}
        handleSavePassword={handleSavePassword}
      />

      <style>{`
        @keyframes pwSlideIn {
          from { transform: translateY(-18px) scale(.97); opacity: 0; }
          to   { transform: translateY(0)     scale(1);   opacity: 1; }
        }
        .line-clamp-1 { overflow:hidden; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; }
        .line-clamp-2 { overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
      `}</style>
    </div>
  );
}
