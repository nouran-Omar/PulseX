import { useEffect, useMemo, useState } from 'react';
import ConfirmModal from '../../../admin/components/ConfirmModal/ConfirmModal';
import AboutSection from '../../components/SettingsProfile/AboutSection';
import AccountSettingsSection from '../../components/SettingsProfile/AccountSettingsSection';
import PasswordChangeModal from '../../components/SettingsProfile/PasswordChangeModal';
import PersonalInfoSection from '../../components/SettingsProfile/PersonalInfoSection';
import ProfessionalExperienceSection from '../../components/SettingsProfile/ProfessionalExperienceSection';
import SettingsHeader from '../../components/SettingsProfile/SettingsHeader';
import StatusToast from '../../components/SettingsProfile/StatusToast';

const INITIAL_FORM = {
  photo: 'https://randomuser.me/api/portraits/women/68.jpg',
  firstName: 'Noha',
  lastName: 'Salem',
  email: 'noha.salem@pulsex.com',
  phone: '+20 1234567890',
  dob: '1985-06-15',
  location: 'Cairo, Egypt',
  experienceYears: 'e.g., 10 or 10+',
  gender: 'female',
};

const INITIAL_EXPERIENCES = [
  {
    id: 1,
    type: 'work',
    typeLabel: 'Work',
    institution: 'Cairo Heart Institute',
    position: 'Senior Cardiologist',
    startDate: '2018',
    endDate: 'Present',
    description: '',
  },
  {
    id: 2,
    type: 'education',
    typeLabel: 'Education',
    institution: 'Cairo University Faculty of Medicine',
    position: 'Medical Degree & Specialization',
    startDate: '2008',
    endDate: '2014',
    description: '',
  },
];

const SettingsProfile = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [about, setAbout] = useState('');
  const [experiences, setExperiences] = useState(INITIAL_EXPERIENCES);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [emailNotif, setEmailNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  useEffect(() => {
    document.title = 'Settings & Profile | PulseX Doctor';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Doctor settings page to manage profile details, professional experience, and account preferences.');
    }
  }, []);

  useEffect(() => {
    if (!toast.visible) return undefined;
    const timer = setTimeout(() => {
      setToast((state) => ({ ...state, visible: false }));
    }, 2500);
    return () => clearTimeout(timer);
  }, [toast.visible]);

  const canDeleteExperience = useMemo(() => experiences.length > 1, [experiences.length]);

  const showToast = (title, message) => {
    setToast({ visible: true, title, message });
  };

  const handleAddExperience = () => {
    const nextId = experiences.length ? Math.max(...experiences.map((item) => item.id)) + 1 : 1;
    setExperiences((state) => [
      ...state,
      {
        id: nextId,
        type: 'work',
        typeLabel: 'Work',
        institution: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const handleChangeExperience = (id, field, value) => {
    setExperiences((state) =>
      state.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDeleteExperience = () => {
    if (!canDeleteExperience) return;
    setExperiences((state) => state.filter((item) => item.id !== pendingDeleteId));
    setPendingDeleteId(null);
    showToast('Deleted Successfully', 'Experience entry has been removed successfully.');
  };

  return (
    <main className="min-h-full bg-[#F8F9FB] p-4 sm:p-6" aria-label="Doctor settings and profile page">
      <StatusToast visible={toast.visible} title={toast.title} message={toast.message} />

      <ConfirmModal
        isOpen={pendingDeleteId !== null}
        title="Delete Experience?"
        desc="Are you sure you want to delete this experience item?"
        onConfirm={handleDeleteExperience}
        onCancel={() => setPendingDeleteId(null)}
      />

      <PasswordChangeModal
        isOpen={pwModalOpen}
        onClose={() => setPwModalOpen(false)}
        onSuccess={() => showToast('Password Changed Successfully', 'Your changes have been saved successfully.')}
      />

      <section className="mx-auto flex w-full max-w-[1120px] flex-col gap-5">
        <SettingsHeader />

        <section className="flex flex-col gap-5">
          <PersonalInfoSection
            form={form}
            setForm={setForm}
            onSave={() => showToast('Saved Successfully', 'Your changes have been saved successfully.')}
          />

          <AboutSection
            value={about}
            onChange={setAbout}
            onSave={() => showToast('Saved Successfully', 'Your changes have been saved successfully.')}
          />

          <ProfessionalExperienceSection
            experiences={experiences}
            onAdd={handleAddExperience}
            onChange={handleChangeExperience}
            onDeleteRequest={(id) => {
              if (canDeleteExperience) setPendingDeleteId(id);
            }}
            onSave={() => showToast('Saved Successfully', 'Your changes have been saved successfully.')}
          />

          <AccountSettingsSection
            emailNotif={emailNotif}
            setEmailNotif={setEmailNotif}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onOpenPassword={() => setPwModalOpen(true)}
          />
        </section>
      </section>
    </main>
  );
};

export default SettingsProfile;
