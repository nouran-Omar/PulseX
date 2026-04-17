import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMicrophone, HiOutlineVideoCamera, HiOutlineSpeakerWave } from 'react-icons/hi2';
import { MdCallEnd, MdArrowBackIosNew, MdMicOff } from 'react-icons/md';

const FullVideoScreen = ({ doctor, isMuted, setIsMuted, isVideoOff, setIsVideoOff, onBack, onEndCall, duration }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-[#1a1a1a] flex flex-col font-['Inter']"
    >
      {/* Background Doctor Image (Placeholder for Video) */}
      <div className="absolute inset-0">
        <img 
          src={doctor.img} 
          className="w-full h-full object-cover opacity-60" 
          alt="Video Feed" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Top Header Overlay */}
      <div className="relative p-6 flex justify-between items-start">
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3 border border-white/10">
          <img src={doctor.img} className="w-10 h-10 rounded-full object-cover border-2 border-green-500" alt="" />
          <div>
            <h3 className="text-white text-[14px] font-bold">{doctor.name}</h3>
            <p className="text-white/80 text-[12px] flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Connected • {duration}
            </p>
          </div>
        </div>

        {/* User Preview */}
        <div className="w-32 h-44 md:w-48 md:h-64 bg-gray-800 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl relative">
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" 
            className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`} 
            alt="Me" 
          />
          {isVideoOff && <div className="flex items-center justify-center h-full text-white/50">Camera Off</div>}
          <div className="absolute bottom-2 left-2 bg-black/40 px-2 py-1 rounded text-[10px] text-white backdrop-blur-sm">
            You (Mohamed Salem)
          </div>
        </div>
      </div>

      {/* Action Buttons Container */}
      <div className="mt-auto relative w-full pb-8 md:pb-12 px-4 flex flex-col items-center gap-5 md:gap-6">
        
        {/* Connection Status */}
        <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-3 bg-green-500 rounded-full" />)}
          </div>
          <span className="text-white text-[12px]">Excellent Connection</span>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-[32px] p-2 sm:p-3 shadow-2xl flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-8 transition-all w-full max-w-[360px] md:max-w-none">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`cursor-pointer shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
          >
            {isMuted ? <MdMicOff size={24} /> : <HiOutlineMicrophone size={24} />}
          </button>
          
          <button 
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`cursor-pointer shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isVideoOff ? 'bg-red-500 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
          >
            <HiOutlineVideoCamera size={24} />
          </button>

          <button className="cursor-pointer shrink-0 w-12 h-12 rounded-2xl bg-gray-50 text-gray-700 hover:bg-gray-100 flex items-center justify-center">
            <HiOutlineSpeakerWave size={24} />
          </button>

          <button 
            onClick={onEndCall}
            className="cursor-pointer shrink-0 bg-[#E7000B] hover:bg-red-700 text-white px-6 sm:px-8 py-3 rounded-2xl flex flex-1 sm:flex-none justify-center items-center gap-2 font-bold text-[16px] transition-transform active:scale-95"
          >
            <MdCallEnd size={22} /> End Call
          </button>
        </div>

        {/* Back Button */}
        <button 
          onClick={onBack}
          className="cursor-pointer relative mt-2 md:mt-0 md:absolute md:left-6 md:bottom-12 bg-black/40 hover:bg-black/60 text-white px-8 md:px-5 py-3 flex items-center justify-center gap-2 backdrop-blur-md rounded-xl border border-white/10 transition-all"
        >
          <MdArrowBackIosNew size={16} /> Back
        </button>

        {/* Muted Notification Toast */}
        {isMuted && (
          <div className="absolute top-[-80px] md:top-[-100px] right-4 md:right-6 bg-red-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg animate-bounce">
            <MdMicOff size={20} /> Muted
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FullVideoScreen;