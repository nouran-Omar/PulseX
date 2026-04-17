import React, { useState } from 'react';
import { HiX } from 'react-icons/hi';
import { IoSendSharp } from 'react-icons/io5';

const ReportModal = ({ onClose, onSubmit, categories }) => {
  const [cat, setCat] = useState('');
  const [reason, setReason] = useState('');
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-black-main-text">Report Comment</h3>
          <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-gray-600"><HiX className="text-xl" /></button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-black-main-text mb-1 block">Category</label>
            <select value={cat} onChange={(e) => setCat(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-[#F6F7F8] text-sm outline-none focus:border-brand-main">
              <option value="" />
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-black-main-text mb-1 block">Reason</label>
            <textarea rows={4} value={reason} onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide details about why you're reporting this..."
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-[#F6F7F8] text-sm outline-none resize-none focus:border-brand-main" />
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={() => { onSubmit(); onClose(); }}
            className="cursor-pointer w-full py-2.5 rounded-xl bg-brand-main text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#2730d4]">
            <IoSendSharp /> Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
