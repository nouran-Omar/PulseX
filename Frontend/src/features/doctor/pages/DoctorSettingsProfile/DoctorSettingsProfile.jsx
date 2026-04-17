import React, { useEffect, useRef, useState } from 'react';
import ConfirmModal from '../../../admin/components/ConfirmModal/ConfirmModal';
import Toast from '../../../../components/Toast/Toast';
import AccountSettingsSection from '../../components/DoctorSettingsProfile/AccountSettingsSection';
import AboutSection from '../../components/DoctorSettingsProfile/AboutSection';
import {
  checkReqs,
  getDoctorWithFallback,
  getInitialBioFromDoctor,
  getInitialExperiencesFromDoctor,
  getInitialFormFromDoctor,
} from '../../components/DoctorSettingsProfile/constants';
import PasswordModal from '../../components/DoctorSettingsProfile/PasswordModal';
import PersonalInfoSection from '../../components/DoctorSettingsProfile/PersonalInfoSection';
import ProfessionalExperienceSection from '../../components/DoctorSettingsProfile/ProfessionalExperienceSection';
import SettingsHeader from '../../components/DoctorSettingsProfile/SettingsHeader';

export default function DoctorSettingsProfile() {
  const doctor = getDoctorWithFallback();

  useEffect(() => {
    document.title = 'Doctor Settings & Profile | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Manage your doctor profile, bio, professional experience, security, and account preferences.');
    }
  }, []);

  const [toast, setToast] = useState({ visible: false, title: '', msg: '' });
  const showToast = (title, msg) => {
    setToast({ visible: true, title, msg });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3500);
  };

  const fileRef = useRef(null);
  const [photo, setPhoto] = useState(doctor.avatarUrl || null);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
    showToast('Photo Updated', 'Your profile photo has been changed successfully.');
  };

  const [form, setForm] = useState(() => getInitialFormFromDoctor(doctor));
  const handleField = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSaveProfile = () => showToast('Saved Successfully', 'Your profile has been updated successfully.');

  const [bio, setBio] = useState(() => getInitialBioFromDoctor(doctor));
  const handleSaveBio = () => showToast('Saved Successfully', 'Your bio has been updated successfully.');

  const [experiences, setExperiences] = useState(() => getInitialExperiencesFromDoctor(doctor));
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleAddExperience = () => {
    setExperiences(prev => ([
      ...prev,
      {
        id: Date.now(),
        type: '',
        institution: '',
        title: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]));
  };

  const handleExperienceField = (index, key, value) => {
    setExperiences(prev => prev.map((experience, i) => (
      i === index ? { ...experience, [key]: value } : experience
    )));
  };

  const handleDeleteExperience = () => {
    setExperiences(prev => prev.filter(experience => experience.id !== deleteTarget));
    setDeleteTarget(null);
    showToast('Experience Deleted', 'The selected experience entry has been removed.');
  };

  const handleSaveExperience = () => {
    showToast('Saved Successfully', 'Your professional experience has been updated successfully.');
  };

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

  const [emailNotif, setEmailNotif] = useState(Boolean(doctor?.settings?.emailNotifications ?? true));
  const [darkMode, setDarkMode] = useState(Boolean(doctor?.settings?.darkMode ?? false));

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

        <section aria-labelledby="settings-about-heading">
          <AboutSection
            bio={bio}
            setBio={setBio}
            handleSaveBio={handleSaveBio}
          />
        </section>

        <section aria-labelledby="settings-experience-heading">
          <ProfessionalExperienceSection
            experiences={experiences}
            handleAddExperience={handleAddExperience}
            handleExperienceField={handleExperienceField}
            setDeleteTarget={setDeleteTarget}
            handleSaveExperience={handleSaveExperience}
          />
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

      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="Delete Experience?"
        desc="Are you sure you want to delete this experience entry? This action cannot be undone."
        onConfirm={handleDeleteExperience}
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
      `}</style>
    </div>
  );
}
