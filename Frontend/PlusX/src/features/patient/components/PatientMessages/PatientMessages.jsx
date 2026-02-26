import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { HiOutlinePaperClip, HiOutlineFaceSmile, HiOutlineVideoCamera } from 'react-icons/hi2';
import { MdSend, MdSearch, MdMenu } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PatientMessages.module.css';
import PatientRatingModal from '../PatientRatingModal/PatientRatingModal';

/* ═══════════════════════════  MOCK DATA  ═══════════════════════════ */
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

const EMOJIS = ['😊', '❤️', '👍', '🏥', '💊', '👨‍⚕️', '🙏', '💪', '😷', '🩺'];

/* ═══════════════════════════  COMPONENT  ═══════════════════════════ */
const PatientMessages = () => {
  const location = useLocation();

  // If navigated from booking/payment with a doctorId in state, auto-open that chat
  const initialId = location.state?.doctorId ?? 1;

  const [activeId,    setActiveId]    = useState(initialId);
  const [search,      setSearch]      = useState('');
  const [input,       setInput]       = useState('');
  const [showEmoji,   setShowEmoji]   = useState(false);
  const [convos,      setConvos]      = useState(INIT_CONVOS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showRating,  setShowRating]  = useState(false);

  const fileRef   = useRef(null);
  const bottomRef = useRef(null);

  /* auto-scroll to bottom */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [convos, activeId]);

  /* close emoji on outside click */
  useEffect(() => {
    const close = (e) => { if (!e.target.closest('[data-emoji]')) setShowEmoji(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  /* if state changes (e.g. navigated again), update activeId */
  useEffect(() => {
    if (location.state?.doctorId) setActiveId(location.state.doctorId);
  }, [location.state]);

  const doctor   = DOCTORS_LIST.find((d) => d.id === activeId);
  const filtered = DOCTORS_LIST.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

  const sendMsg = (content, type = 'text') => {
    if (type === 'text' && !content.trim()) return;
    const t   = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msg = { id: Date.now(), from: 'me', type, text: content, time: t };
    setConvos((p) => ({ ...p, [activeId]: [...(p[activeId] ?? []), msg] }));
    setInput('');
    setShowEmoji(false);
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1, from: 'doctor', type: 'text',
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

  const selectChat = (id) => { setActiveId(id); setSidebarOpen(false); };

  /* ─────────────────────────── render ─────────────────────────── */
  return (
    <div className={styles.root}>
      {/* ── Rating modal ── */}
      <PatientRatingModal
        isOpen={showRating}
        onClose={() => setShowRating(false)}
        onSubmit={(rating, feedback) => {
          console.log('Rating submitted:', { doctorId: activeId, rating, feedback });
        }}
        doctor={{
          name:            doctor?.name,
          img:             doctor?.img,
          appointmentDate: 'December 15, 2024 at 3:00 PM',
        }}
      />

      <div className={styles.card}>

        {/* ── mobile backdrop ── */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              key="bd"
              className={styles.backdrop}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* ═══════════  SIDEBAR  ═══════════ */}
        <aside className={[styles.sidebar, sidebarOpen ? styles.sidebarOpen : ''].join(' ')}>

          {/* sidebar header */}
          <div className={styles.sidebarHeader}>
            <div className={styles.sidebarTitle}>
              <span className={styles.titleText}>Messages</span>
              <span className={styles.titleBadge}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
              </span>
            </div>
            <div className={styles.searchBox}>
              <MdSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search doctor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* doctor list */}
          <div className={styles.docList}>
            {filtered.map((doc) => {
              const isActive = doc.id === activeId;
              return (
                <div
                  key={doc.id}
                  onClick={() => selectChat(doc.id)}
                  className={[styles.docItem, isActive ? styles.docItemActive : ''].join(' ')}
                >
                  {isActive && <span className={styles.activeLine} />}
                  <div className={styles.avatarWrap}>
                    <img src={doc.img} alt={doc.name} className={styles.avatar} />
                    <span className={[styles.statusDot, doc.status === 'online' ? styles.dotOnline : styles.dotOffline].join(' ')} />
                  </div>
                  <div className={styles.docInfo}>
                    <div className={styles.docRow}>
                      <span className={[styles.docName, isActive ? styles.docNameActive : ''].join(' ')}>{doc.name}</span>
                      <span className={styles.docTime}>{doc.time}</span>
                    </div>
                    <p className={styles.docLast}>{doc.lastMsg}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* ═══════════  CHAT WINDOW  ═══════════ */}
        <div className={styles.chatWin}>

          {/* chat header */}
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderLeft}>
              {/* hamburger mobile */}
              <button className={styles.hamburger} onClick={() => setSidebarOpen(true)}>
                <MdMenu className={styles.hamburgerIcon} />
              </button>
              <div className={styles.avatarWrap}>
                <img src={doctor?.img} alt={doctor?.name} className={styles.avatar} />
                <span className={styles.dotOnlineLg} />
              </div>
              <div>
                <p className={styles.chatDoctorName}>{doctor?.name}</p>
                <p className={styles.chatOnline}>Online</p>
              </div>
            </div>
            <div className={styles.chatHeaderRight}>
              <button className={styles.videoBtn} title="Video call">
                <HiOutlineVideoCamera className={styles.videoIcon} />
              </button>
              <button
                className={styles.endChatBtn}
                onClick={() => setShowRating(true)}
                title="End chat & rate"
              >
                End Chat
              </button>
            </div>
          </div>

          {/* messages area */}
          <div className={styles.msgArea}>
            {(convos[activeId] ?? []).map((msg) => {
              const isMe = msg.from === 'me';
              return (
                <div key={msg.id} className={isMe ? styles.rowMe : styles.rowDoc}>
                  {!isMe && (
                    <div className={styles.incomingWrap}>
                      <img src={doctor?.img} alt="av" className={styles.msgAvatar} />
                      <div>
                        <div className={styles.bubbleDoc}>
                          {msg.type === 'text' ? msg.text : <img src={msg.text} alt="img" className={styles.chatImg} />}
                        </div>
                        <span className={styles.msgTime}>{msg.time}</span>
                      </div>
                    </div>
                  )}
                  {isMe && (
                    <div className={styles.outgoingWrap}>
                      <div className={styles.bubbleMe}>
                        {msg.type === 'text' ? msg.text : <img src={msg.text} alt="img" className={styles.chatImg} />}
                      </div>
                      <span className={[styles.msgTime, styles.msgTimeRight].join(' ')}>{msg.time}</span>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* input bar */}
          <div className={styles.inputBar}>
            <p className={styles.privacyNote}>
              Start a new conversation with your doctor. Your messages are private and encrypted.
            </p>
            <div className={styles.inputRow}>
              {/* attachment */}
              <input type="file" ref={fileRef} className={styles.hidden} onChange={pickFile} accept="image/*" />
              <button className={styles.iconBtn} onClick={() => fileRef.current?.click()} title="Attach">
                <HiOutlinePaperClip className={styles.iconBtnSvg} />
              </button>

              {/* text field */}
              <div className={styles.textField}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMsg(input)}
                  className={styles.textInput}
                />
                {/* emoji */}
                <div data-emoji className={styles.emojiWrap}>
                  <button
                    data-emoji
                    className={styles.iconBtn}
                    onClick={() => setShowEmoji((s) => !s)}
                    title="Emoji"
                  >
                    <HiOutlineFaceSmile className={styles.iconBtnSvg} />
                  </button>
                  <AnimatePresence>
                    {showEmoji && (
                      <motion.div
                        data-emoji
                        className={styles.emojiPicker}
                        initial={{ opacity: 0, y: 6, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.94 }}
                        transition={{ duration: 0.13 }}
                      >
                        {EMOJIS.map((em) => (
                          <button
                            key={em}
                            data-emoji
                            className={styles.emojiBtn}
                            onClick={() => { setInput((v) => v + em); setShowEmoji(false); }}
                          >
                            {em}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* send */}
              <button
                className={[styles.sendBtn, !input.trim() ? styles.sendDisabled : ''].join(' ')}
                onClick={() => sendMsg(input)}
                disabled={!input.trim()}
                title="Send"
              >
                <MdSend className={styles.sendIcon} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientMessages;
