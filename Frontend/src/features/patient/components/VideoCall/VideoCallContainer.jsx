import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import FullVideoScreen from './FullVideoScreen';
import MinimizeModal from './MinimizeModal';
import FloatingCallWindow from './FloatingCallWindow';

const VideoCallContainer = ({ isOpen, onClose, doctor }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showMinimizeModal, setShowMinimizeModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [duration, setDuration] = useState(0);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isOpen) {
      interval = setInterval(() => setDuration((prev) => prev + 1), 1000);
    } else {
      setDuration(0);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <FullVideoScreen
            doctor={doctor}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            isVideoOff={isVideoOff}
            setIsVideoOff={setIsVideoOff}
            onBack={() => setShowMinimizeModal(true)}
            onEndCall={onClose}
            duration={formatTime(duration)}
          />
        )}
      </AnimatePresence>

      <MinimizeModal
        isOpen={showMinimizeModal}
        onClose={() => setShowMinimizeModal(false)}
        onConfirm={() => {
          setIsMinimized(true);
          setShowMinimizeModal(false);
        }}
        duration={formatTime(duration)}
      />

      {isMinimized && (
        <FloatingCallWindow
          doctor={doctor}
          duration={formatTime(duration)}
          onExpand={() => setIsMinimized(false)}
          onEndCall={onClose}
        />
      )}
    </>
  );
};

export default VideoCallContainer;