import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PatientRatingModal from '../../components/PatientRatingModal/PatientRatingModal';
import VideoCallContainer from '../../components/VideoCall/VideoCallContainer';
import ChatHeader from '../../components/Messages/ChatHeader';
import MessageInputBar from '../../components/Messages/MessageInputBar';
import MessagesList from '../../components/Messages/MessagesList';
import MessagesSidebar from '../../components/Messages/MessagesSidebar';

export const DOCTORS_LIST = [
  {
    id: 1,
    name: 'Dr. Jehan Osama',
    specialty: 'Cardiologist',
    status: 'online',
    time: '2h ago',
    lastMsg: 'Your test results are ready for review...',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80',
  },
  {
    id: 2,
    name: 'Dr. Osama Ali',
    specialty: 'Surgeon',
    status: 'online',
    time: '1d ago',
    lastMsg: 'Please take your medication as pr...',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80',
  },
  {
    id: 3,
    name: 'Dr. Sarah Omar',
    specialty: 'Specialist',
    status: 'offline',
    time: '3d ago',
    lastMsg: 'How are you feeling today?',
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80',
  },
  {
    id: 4,
    name: 'Dr. Ali Seif',
    specialty: 'Consultant',
    status: 'offline',
    time: '1w ago',
    lastMsg: 'Your appointment is confirmed fo...',
    img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80',
  },
];

const INIT_CONVOS = {
  1: [
    { id: 101, from: 'doctor', type: 'text', text: "Hello! I've reviewed your recent lab results and everything looks good. Your blood pressure has improved significantly since our last visit.", time: '10:30 AM' },
    { id: 102, from: 'me',     type: 'text', text: "That's great news! I've been following the diet plan you recommended and taking my medication regularly.", time: '10:32 AM' },
    { id: 103, from: 'doctor', type: 'text', text: "Hello! I've reviewed your recent lab results and everything looks good. Your blood pressure has improved significantly since our last visit.", time: '10:30 AM' },
    { id: 104, from: 'me',     type: 'text', text: "That's great news! I've been following the diet plan you recommended and taking my medication regularly.", time: '10:32 AM' },
    { id: 105, from: 'doctor', type: 'text', text: "Hello! I've reviewed your recent lab results and everything looks good. Your blood pressure has improved significantly since our last visit.", time: '10:30 AM' },
  ],
  2: [{ id: 201, from: 'doctor', type: 'text', text: 'Please take your medication as prescribed. How are you feeling today?', time: '09:15 AM' }],
  3: [{ id: 301, from: 'doctor', type: 'text', text: 'How are you feeling today? Any new symptoms to report?', time: 'Yesterday' }],
  4: [{ id: 401, from: 'doctor', type: 'text', text: 'Your appointment is confirmed for next Monday at 10 AM.', time: '1w ago' }],
};

const PatientMessages = () => {
  const location = useLocation();
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const initialId = location.state?.doctorId ?? 1;

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
    document.title = 'Messages | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Chat with your doctors and review messages.');
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [convos, activeId]);

  useEffect(() => {
    if (location.state?.doctorId) setActiveId(location.state.doctorId);
  }, [location.state]);

  const doctor = DOCTORS_LIST.find((d) => d.id === activeId);
  const filtered = DOCTORS_LIST.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

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
        text: "Thank you for your message. I'll review it and get back to you shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setConvos((p) => ({ ...p, [activeId]: [...(p[activeId] ?? []), reply] }));
    }, 1500);
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
        "--msg-muted": "#6B7280",
        "--msg-muted-2": "#4B5563",
        "--msg-muted-3": "#9CA3AF",
      }}
    >
      <h1 className="sr-only">Messages</h1>

      <aside aria-live="polite">
        <VideoCallContainer
          isOpen={isVideoCallOpen}
          onClose={() => setIsVideoCallOpen(false)}
          doctor={doctor}
        />
      </aside>

      <aside aria-live="polite">
        <PatientRatingModal
          isOpen={showRating}
          onClose={() => setShowRating(false)}
          onSubmit={(rating, feedback) => {
            console.log('Rating submitted:', { doctorId: activeId, rating, feedback });
          }}
          doctor={{
            name: doctor?.name,
            img: doctor?.img,
            appointmentDate: 'December 15, 2024 at 3:00 PM',
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

        <section className="flex-1 flex flex-col min-w-0 bg-gray-200 lg:rounded-tr-3xl lg:rounded-br-3xl relative" aria-label="Chat window">
          <ChatHeader
            doctor={doctor}
            onOpenSidebar={() => setSidebarOpen(true)}
            onStartVideo={() => setIsVideoCallOpen(true)}
          />

          <MessagesList
            messages={convos[activeId] ?? []}
            doctorImg={doctor?.img}
            doctorName={doctor?.name}
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
        <p>End of messages page.</p>
      </footer>
    </main>
  );
};

export default PatientMessages;
