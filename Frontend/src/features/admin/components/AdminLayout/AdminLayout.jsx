import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import AdminHeader from '../AdminHeader/AdminHeader';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { HiBars3, HiXMark } from 'react-icons/hi2';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    localStorage.clear(); 
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-roboto p-5 flex gap-5 relative box-border items-stretch">

      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── LEFT COLUMN: Admin Sidebar ── */}
      <div className={`
        fixed lg:relative top-0 left-0 z-50 transition-transform duration-300 ease-in-out shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        h-screen lg:h-auto 
      `}>
        <aside
          aria-label="Admin navigation"
          className="w-[280px] bg-white shadow-[0px_10px_30px_rgba(0,0,0,0.03)] rounded-[32px] border border-gray-100 flex flex-col 
                     lg:sticky lg:top-5 lg:h-[calc(100vh-40px)]
                     overflow-hidden"
        >
          {/* Close button — Mobile only */}
          <button
            className="lg:hidden absolute top-5 right-5 z-50 p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all"
            onClick={() => setSidebarOpen(false)}
          >
            <HiXMark className="w-5 h-5" />
          </button>

          <Sidebar 
            onClose={() => setSidebarOpen(false)} 
            onLogout={() => setIsLogoutModalOpen(true)} 
          /> 
        </aside>
      </div>

      {/* ── RIGHT COLUMN: Header + Content ── */}
      <div className="flex-1 flex flex-col gap-5 min-w-0">

        {/* 1. Admin Header */}
        <header className="h-[80px] bg-white shadow-sm rounded-[24px] px-8 flex items-center border border-gray-100 z-40 shrink-0 transition-all">
          <button
            className="lg:hidden p-2.5 rounded-xl bg-gray-50 text-gray-600 mr-4 hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <HiBars3 className="w-6 h-6" />
          </button>
          
          <div className="flex-1 min-w-0">
            <AdminHeader onLogout={() => setIsLogoutModalOpen(true)} />
          </div>
        </header>

        {/* 2. Admin Page Content */}
        <main
          aria-label="Admin page content"
          className="bg-white shadow-sm rounded-[32px] border border-gray-100 flex-1 relative overflow-hidden flex flex-col lg:min-h-[calc(100vh-145px)]"
        >
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
             <Outlet />
          </div>
        </main>
      </div>

     
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

export default AdminLayout;