import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './PatientSidebar.module.css';
import { LuLayoutDashboard, LuClipboardList, LuQrCode, LuActivity, LuUsers } from 'react-icons/lu';
import { FaHeartPulse, FaUserDoctor } from 'react-icons/fa6';
import {
  HiOutlineCalendarDays,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineDocumentText,
  HiOutlineClipboardDocumentList,
  HiOutlineQrCode,
  HiOutlineBookOpen,
} from 'react-icons/hi2';
import { MdOutlineMedicalInformation } from 'react-icons/md';
import { RiFileList3Line } from 'react-icons/ri';
import ConfirmModal from '../../../admin/components/ConfirmModal/ConfirmModal';
import logo from '../../../../assets/Images/f1.png';

const MENU_ITEMS = [
  { label: 'Dashboard',            path: '/patient/dashboard',    icon: <LuLayoutDashboard /> },
  { label: 'Health Survey',        path: '/patient/survey',       icon: <LuClipboardList /> },
  { label: 'Heart Risk Assessment',path: '/patient/heart-risk',   icon: <FaHeartPulse /> },
  { label: 'Doctor List',          path: '/patient/doctors',      icon: <FaUserDoctor /> },
  { label: 'Appointments',         path: '/patient/appointments', icon: <HiOutlineCalendarDays /> },
  { label: 'Messages',             path: '/patient/messages',     icon: <HiOutlineChatBubbleLeftRight /> },
  { label: 'Prescription',         path: '/patient/prescription', icon: <HiOutlineDocumentText /> },
  { label: 'Medical Records',      path: '/patient/records',      icon: <MdOutlineMedicalInformation /> },
  { label: 'QR Code',              path: '/patient/qr',           icon: <HiOutlineQrCode /> },
  { label: 'Stories & community',  path: '/patient/stories',      icon: <HiOutlineBookOpen /> },
];

const PatientSidebar = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  return (
    <aside className={styles.sidebarContainer}>
      <div className={styles.sidebarContent}>

        {/* ── Logo ── */}
        <div className={styles.logoSection}>
          <img src="/logo/logo.svg" alt="PulseX" className={styles.logoImg} onError={e => { e.target.style.display='none'; }} />
          <span className={styles.logoText}>Pulse<span className={styles.logoAccent}>X</span></span>
        </div>

        <nav className={styles.nav}>
          <p className={styles.sectionLabel}>Menu</p>
          <ul className={styles.menuList}>
            {MENU_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  <span className={styles.labelText}>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles.generalSection}>
            <p className={styles.sectionLabel}>General</p>
            <NavLink
              to="/patient/settings"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.icon}><HiOutlineCog6Tooth /></span>
              <span className={styles.labelText}>Settings & Profile</span>
            </NavLink>

            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className={`${styles.navLink} ${styles.logoutBtn}`}
            >
              <span className={styles.icon}><HiOutlineArrowLeftOnRectangle /></span>
              <span className={styles.labelText}>Log out</span>
            </button>
          </div>
        </nav>
      </div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="Log Out?"
        desc="Are you sure you want to log out of your account?"
        onConfirm={confirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </aside>
  );
};

export default PatientSidebar;
