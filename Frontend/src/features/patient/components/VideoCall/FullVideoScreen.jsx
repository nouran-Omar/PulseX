import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMicrophone, HiOutlineVideoCamera, HiOutlineSpeakerWave } from 'react-icons/hi2';
import { MdCallEnd, MdArrowBackIosNew, MdMicOff, MdVolumeOff } from 'react-icons/md';

const FullVideoScreen = ({ doctor, isMuted, setIsMuted, isVideoOff, setIsVideoOff, isSpeakerOn, setIsSpeakerOn, onBack, onEndCall, duration }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-60 bg-[#1a1a1a] flex flex-col font-['Inter']"
    >
      <div className="absolute inset-0">
        <img 
          src={doctor.img} 
          className="w-full h-full object-cover opacity-75" 
          alt="Video Feed" 
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/35 via-transparent to-black/45" />
      </div>

      <div className="relative p-4 sm:p-5 flex justify-between items-start">
        <div className="bg-black/45 backdrop-blur-md rounded-2xl px-3 py-2 flex items-center gap-2.5 border border-white/10 shadow-lg">
          <div className="relative">
            <img src={doctor.img} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-white/30" alt="" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border border-black/80 rounded-full" />
          </div>
          <div>
            <h3 className="text-white text-[12px] sm:text-[13px] font-semibold leading-tight">{doctor.name}</h3>
            <p className="text-white/75 text-[10px] sm:text-[11px] flex items-center gap-1 mt-0.5">
              <span>Connected</span>
              <span className="text-white/40">•</span>
              <span>{duration}</span>
            </p>
          </div>
        </div>

        <div className="w-29.5 h-40 sm:w-33 sm:h-44 bg-gray-800/80 rounded-xl overflow-hidden border border-sky-200/70 shadow-2xl relative">
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" 
            className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`} 
            alt="Me" 
          />
          {isVideoOff && <div className="flex items-center justify-center h-full text-white/60 text-[11px]">Camera Off</div>}
          <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/45 px-2 py-1 rounded-md text-[9px] text-white/95 backdrop-blur-sm truncate">
            You (Mohamed Salem)
          </div>
        </div>
      </div>

      <div className="mt-auto relative w-full pb-5 sm:pb-6 px-4 flex flex-col items-center gap-3">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-2xl flex justify-center items-center gap-2 sm:gap-3 transition-all w-full max-w-92.5 border border-white/70">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`cursor-pointer shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors border ${isMuted ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
          >
            {isMuted ? <MdMicOff size={18} /> : <HiOutlineMicrophone size={18} />}
          </button>
          
          <button 
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`cursor-pointer shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors border ${isVideoOff ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
          >
            <HiOutlineVideoCamera size={18} />
          </button>

          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`cursor-pointer shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors border ${isSpeakerOn ? 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50' : 'bg-red-500 text-white border-red-500'}`}
          >
            {isSpeakerOn ? <HiOutlineSpeakerWave size={18} /> : <MdVolumeOff size={18} />}
          </button>

          <button 
            onClick={onEndCall}
            className="cursor-pointer shrink-0 bg-[#F0152D] hover:bg-[#e10f25] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl flex justify-center items-center gap-1.5 font-semibold text-[12px] sm:text-[13px] transition-transform active:scale-95 min-w-27.5"
          >
            <MdCallEnd size={16} /> End Call
          </button>
        </div>

        <div className="bg-black/35 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10 shadow-lg">
          <div className="flex gap-0.5">
            {[1, 2, 3].map(i => <div key={i} className="w-0.5 h-2.5 bg-green-500 rounded-full" />)}
          </div>
          <span className="text-white text-[9px] sm:text-[10px]">Excellent Connection</span>
        </div>

        <button 
          onClick={onBack}
          className="cursor-pointer absolute left-4 bottom-5 sm:left-6 sm:bottom-6 bg-black/35 hover:bg-black/55 text-white px-3.5 py-2 flex items-center justify-center gap-1.5 backdrop-blur-md rounded-xl border border-white/10 transition-all text-[11px] sm:text-[12px]"
        >
          <MdArrowBackIosNew size={12} /> Back
        </button>

        {isMuted && (
          <div className="absolute -top-14 right-4 sm:right-6 bg-red-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg text-[11px] animate-bounce">
            <MdMicOff size={14} /> Muted
          </div>
        )}

        {!isSpeakerOn && (
          <div className="absolute -top-14 left-4 sm:left-6 bg-red-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg text-[11px] animate-bounce">
            <MdVolumeOff size={14} /> Speaker Off
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FullVideoScreen;