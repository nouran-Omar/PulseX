import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import PatientSidebar from '../PatientSidebar/PatientSidebar';
import PatientHeader from '../PatientHeader/PatientHeader';
import PatientChatbot from '../PatientChatbot/PatientChatbot';
import { HiBars3 } from 'react-icons/hi2';

const PatientMainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const excludedRoutes = ['/patient/messages', '/patient/settings', '/chat-page'];
  const shouldShowChatbot = !excludedRoutes.includes(location.pathname);

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    localStorage.clear();
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-[#F6F7F8] font-roboto p-[20px] flex gap-[20px] relative box-border items-stretch">

      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar Column ── */}
      <div className={`
        fixed lg:relative top-0 left-0 z-50 transition-transform duration-300 ease-in-out shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        h-screen lg:h-auto 
      `}>
        <aside
          className="w-[260px] bg-white shadow-sm rounded-[24px] border border-gray-100/60 flex flex-col 
                     lg:sticky lg:top-[20px] lg:h-[calc(100vh-40px)]
                     overflow-y-auto scrollbar-none hover:scrollbar-thin"
        >
          <PatientSidebar 
            onClose={() => setSidebarOpen(false)} 
            onLogout={() => setIsLogoutModalOpen(true)} 
          /> 
        </aside>
      </div>

      {/* ── Right Column ── */}
      <div className="flex-1 flex flex-col gap-[20px] min-w-0">

        {/* Header */}
        <header className="h-[70px] bg-white shadow-sm rounded-[20px] px-6 flex items-center border border-gray-100/60 z-40 shrink-0">
          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 mr-3"
            onClick={() => setSidebarOpen(true)}
          >
            <HiBars3 className="w-6 h-6" />
          </button>
          <div className="flex-1 min-w-0">
            <PatientHeader onLogout={() => setIsLogoutModalOpen(true)} />
          </div>
        </header>

        {/* Main Content */}
        <main
          aria-label="Patient page content"
          className="bg-white shadow-sm rounded-[24px] border border-gray-100/60 flex-1 lg:min-h-[calc(100vh-130px)] overflow-hidden"
        >
          <Outlet />
        </main>
      </div>

      {/* ── Chatbot ── */}
      {shouldShowChatbot && <PatientChatbot />}
{isLogoutModalOpen && (
  <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center p-4">
    {/* Card */}
    <div className="bg-white rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-6 w-full max-w-[380px] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
      
      {/* Title */}
      <h2 className="text-[18px] font-bold text-center text-black-main-text">
        Log Out?
      </h2>
      
      {/* Description */}
      <p className="text-[16px] text-[#757575] leading-relaxed text-center">
        Are you sure you want to log out of your account?
      </p>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button 
          onClick={() => setIsLogoutModalOpen(false)} 
          className="px-6 py-2.5 text-[14px] cursor-pointer font-semibold text-gray-600 bg-[#EFEFEF] rounded-full hover:bg-gray-200 transition-colors"
        >
          No, Cancel
        </button>
        
        <button 
          onClick={handleConfirmLogout} 
          className="px-6 py-2.5 text-[14px] cursor-pointer font-semibold text-white bg-[#333CF5] rounded-full hover:bg-[#155dfc] transition-colors shadow-md shadow-blue-100"
        >
          Yes, Confirm
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default PatientMainLayout;