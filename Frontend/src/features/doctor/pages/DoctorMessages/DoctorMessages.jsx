import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DoctorRatingModal from '../../components/DoctorRatingModal/DoctorRatingModal';
import VideoCallContainer from '../../components/VideoCall/VideoCallContainer';
import ChatHeader from '../../components/Messages/ChatHeader';
import MessageInputBar from '../../components/Messages/MessageInputBar';
import MessagesList from '../../components/Messages/MessagesList';
import MessagesSidebar from '../../components/Messages/MessagesSidebar';

export const PATIENTS_LIST = [
  {
    id: 1,
    name: 'Nour Eldin Hassan',
    specialty: 'Follow-up Case',
    status: 'online',
    time: '2m ago',
    lastMsg: 'Doctor, I uploaded my latest report for review.',
    img: 'https://randomuser.me/api/portraits/men/93.jpg',
  },
  {
    id: 2,
    name: 'Mona Farouk',
    specialty: 'Cardiac Recovery',
    status: 'online',
    time: '1h ago',
    lastMsg: 'Thanks, I am feeling much better this week.',
    img: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    id: 3,
    name: 'Ahmed Saber',
    specialty: 'Blood Pressure',
    status: 'offline',
    time: '1d ago',
    lastMsg: 'Should I continue the same medication dose?',
    img: 'https://randomuser.me/api/portraits/men/59.jpg',
  },
  {
    id: 4,
    name: 'Yasmin Taha',
    specialty: 'Post-op Follow-up',
    status: 'offline',
    time: '3d ago',
    lastMsg: 'Appointment reminder received. Thank you.',
    img: 'https://randomuser.me/api/portraits/women/27.jpg',
  },
];

const INIT_CONVOS = {
  1: [
    {
      id: 101,
      from: 'doctor',
      type: 'text',
      text: "Good morning. I checked your uploaded report, and your heart rate trend looks stable.",
      time: '09:30 AM',
    },
    {
      id: 102,
      from: 'me',
      type: 'text',
      text: 'Thank you doctor. Should I keep the same medicine schedule?',
      time: '09:33 AM',
    },
  ],
  2: [
    {
      id: 201,
      from: 'doctor',
      type: 'text',
      text: 'Keep tracking your pressure twice daily and send me updates tomorrow.',
      time: '08:15 AM',
    },
  ],
  3: [
    {
      id: 301,
      from: 'doctor',
      type: 'text',
      text: 'Please continue the current plan and avoid extra sodium this week.',
      time: 'Yesterday',
    },
  ],
  4: [
    {
      id: 401,
      from: 'doctor',
      type: 'text',
      text: 'Your next appointment is confirmed for Monday at 10:00 AM.',
      time: '3d ago',
    },
  ],
};

const DoctorMessages = () => {
  const location = useLocation();
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const initialId = location.state?.patientId ?? 1;

  const [activeId, setActiveId] = useState(initialId);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [convos, setConvos] = useState(INIT_CONVOS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const fileRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    document.title = 'Doctor Messages | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Doctor messaging workspace for patient follow-up and communication.');
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [convos, activeId]);

  useEffect(() => {
    if (location.state?.patientId) setActiveId(location.state.patientId);
  }, [location.state]);

  const patient = PATIENTS_LIST.find((d) => d.id === activeId);
  const filtered = PATIENTS_LIST.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMsg = (content, type = 'text') => {
    if (type === 'text' && !content.trim()) return;
    const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msg = { id: Date.now(), from: 'me', type, text: content, time: t };
    setConvos((p) => ({ ...p, [activeId]: [...(p[activeId] ?? []), msg] }));
    setInput('');
    setShowEmoji(false);

    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        from: 'doctor',
        type: 'text',
        text: 'Received. I will review this and update your treatment note shortly.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setConvos((p) => ({ ...p, [activeId]: [...(p[activeId] ?? []), reply] }));
    }, 1200);
  };

  const pickFile = (e) => {
    const f = e.target.files[0];
    if (f) sendMsg(URL.createObjectURL(f), 'image');
    e.target.value = '';
  };

  const selectChat = (id) => {
    setActiveId(id);
    setSidebarOpen(false);
  };

  return (
    <main
      className="h-[calc(100vh-120px)] min-h-[500px]"
      style={{
        '--msg-muted': '#6B7280',
        '--msg-muted-2': '#4B5563',
        '--msg-muted-3': '#9CA3AF',
      }}
    >
      <h1 className="sr-only">Doctor Messages</h1>

      <aside aria-live="polite">
        <VideoCallContainer
          isOpen={isVideoCallOpen}
          onClose={() => setIsVideoCallOpen(false)}
          doctor={patient}
        />
      </aside>

      <aside aria-live="polite">
        <DoctorRatingModal
          isOpen={showRating}
          onClose={() => setShowRating(false)}
          onSubmit={(rating, feedback) => {
            console.log('Doctor feedback submitted:', { patientId: activeId, rating, feedback });
          }}
          patient={{
            name: patient?.name,
            img: patient?.img,
          }}
        />
      </aside>

      <div className="flex h-full overflow-hidden relative">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              key="bd"
              className="fixed inset-0 z-20 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        <MessagesSidebar
          doctors={filtered}
          activeId={activeId}
          search={search}
          onSearch={setSearch}
          onSelect={selectChat}
          sidebarOpen={sidebarOpen}
        />

        <section
          className="flex-1 flex flex-col min-w-0 bg-gray-200 lg:rounded-tr-3xl lg:rounded-br-3xl relative"
          aria-label="Chat window"
        >
          <ChatHeader
            doctor={patient}
            onOpenSidebar={() => setSidebarOpen(true)}
            onStartVideo={() => setIsVideoCallOpen(true)}
          />

          <MessagesList
            messages={convos[activeId] ?? []}
            doctorImg={patient?.img}
            doctorName={patient?.name}
            bottomRef={bottomRef}
          />

          <MessageInputBar
            input={input}
            onChange={setInput}
            onSend={sendMsg}
            onPickFile={pickFile}
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
            fileRef={fileRef}
          />
        </section>
      </div>

      <footer className="sr-only">
        <p>End of doctor messages page.</p>
      </footer>
    </main>
  );
};

export default DoctorMessages;
