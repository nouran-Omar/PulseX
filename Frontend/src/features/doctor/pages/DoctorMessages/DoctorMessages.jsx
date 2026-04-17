import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import VideoCallContainer from '../../components/VideoCall/VideoCallContainer';
import ChatHeader from '../../components/Messages/ChatHeader';
import MessageInputBar from '../../components/Messages/MessageInputBar';
import MessagesList from '../../components/Messages/MessagesList';
import MessagesSidebar from '../../components/Messages/MessagesSidebar';

export const PATIENTS_LIST = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    specialty: 'Patient',
    status: 'online',
    time: '10m ago',
    lastMsg: 'Doctor, my chest pain is better today.',
    img: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=200&q=80',
  },
  {
    id: 2,
    name: 'Mona Youssef',
    specialty: 'Patient',
    status: 'online',
    time: '1h ago',
    lastMsg: 'Can I reschedule my appointment?',
    img: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&q=80',
  },
  {
    id: 3,
    name: 'Yara Adel',
    specialty: 'Patient',
    status: 'offline',
    time: '2d ago',
    lastMsg: 'Thank you, doctor. I feel much better.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    id: 4,
    name: 'Omar Khaled',
    specialty: 'Patient',
    status: 'offline',
    time: '1w ago',
    lastMsg: 'I uploaded my latest lab report.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
];

const INIT_CONVOS = {
  1: [
    { id: 101, from: 'patient', type: 'text', text: "Doctor, I have mild pain after exercise. Should I continue the same medication?", time: '10:30 AM' },
    { id: 102, from: 'me',      type: 'text', text: 'Yes, continue the same dose for now and monitor your blood pressure twice daily.', time: '10:32 AM' },
    { id: 103, from: 'patient', type: 'text', text: 'Understood. I will share the readings tonight.', time: '10:34 AM' },
  ],
  2: [{ id: 201, from: 'patient', type: 'text', text: 'Can I move my appointment to Thursday?', time: '09:15 AM' }],
  3: [{ id: 301, from: 'patient', type: 'text', text: 'No new symptoms. Sleep quality has improved.', time: 'Yesterday' }],
  4: [{ id: 401, from: 'patient', type: 'text', text: 'I uploaded all my reports in the app.', time: '1w ago' }],
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

  const fileRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    document.title = 'Messages | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Chat with your patients and review consultation messages.');
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [convos, activeId]);

  useEffect(() => {
    if (location.state?.patientId) setActiveId(location.state.patientId);
  }, [location.state]);

  const doctor = PATIENTS_LIST.find((d) => d.id === activeId);
  const filtered = PATIENTS_LIST.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

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
        from: 'patient',
        type: 'text',
        text: 'Thank you, doctor. I will follow your advice and update you soon.',
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

export default DoctorMessages;
