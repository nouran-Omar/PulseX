import React from 'react';
import { Outlet } from 'react-router-dom';
import DoctorSidebar from '../DoctorSidebar/DoctorSidebar';
import DoctorHeader from '../DoctorHeader/DoctorHeader';

const DoctorLayout = () => {
  return (
    // p-6 بتعمل مسافة 24 بكسل من كل الحواف الخارجية
    // gap-6 بتعمل مسافة 24 بكسل بين الـ Sidebar والعمود اليمين
    <div className="flex h-screen bg-[#F4F7FE] p-6 gap-6 overflow-hidden font-roboto">
      
      {/* Sidebar - واخد الارتفاع كله ومفصول بـ 24 بكسل */}
      <aside className="w-[260px] shrink-0 h-full bg-white rounded-[24px] shadow-sm overflow-hidden">
        <DoctorSidebar />
      </aside>

      {/* العمود اليمين (Header + Content) */}
      <div className="flex flex-col flex-1 min-w-0 gap-6">
        
        {/* Header - مفصول عن المحتوى بـ gap-6 (24 بكسل) */}
        <header className="shrink-0 h-[80px] bg-white rounded-[24px] shadow-sm px-6">
          <DoctorHeader />
        </header>

        {/* محتوى الصفحة (Dashboard) */}
        <main className="flex-1 overflow-y-auto rounded-[24px] pb-4">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DoctorLayout;