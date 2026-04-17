import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import FullVideoScreen from './FullVideoScreen';
import MinimizeModal from './MinimizeModal';
import FloatingCallWindow from './FloatingCallWindow';
import EndCallModal from './EndCallModal';

const VideoCallContainer = ({ isOpen, onClose, doctor }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showMinimizeModal, setShowMinimizeModal] = useState(false);
  const [showEndCallModal, setShowEndCallModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
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

  const resetLocalCallState = () => {
    setIsMinimized(false);
    setShowMinimizeModal(false);
    setShowEndCallModal(false);
    setIsMuted(false);
    setIsVideoOff(false);
    setIsSpeakerOn(true);
  };

  const handleRequestEndCall = () => {
    setShowMinimizeModal(false);
    setShowEndCallModal(true);
  };

  const handleConfirmEndCall = () => {
    resetLocalCallState();
    onClose();
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
            isSpeakerOn={isSpeakerOn}
            setIsSpeakerOn={setIsSpeakerOn}
            onBack={() => setShowMinimizeModal(true)}
            onEndCall={handleRequestEndCall}
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
        doctorName={doctor?.name || 'your doctor'}
      />

      <EndCallModal
        isOpen={showEndCallModal}
        onClose={() => setShowEndCallModal(false)}
        onConfirm={handleConfirmEndCall}
        duration={formatTime(duration)}
        doctorName={doctor?.name || 'your doctor'}
      />

      {isMinimized && (
        <FloatingCallWindow
          doctor={doctor}
          duration={formatTime(duration)}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted((prev) => !prev)}
          isSpeakerOn={isSpeakerOn}
          onToggleSpeaker={() => setIsSpeakerOn((prev) => !prev)}
          onExpand={() => setIsMinimized(false)}
          onEndCall={handleRequestEndCall}
        />
      )}
    </>
  );
};

export default VideoCallContainer;