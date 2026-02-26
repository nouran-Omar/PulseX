import React, { useState, useEffect, useRef } from 'react';
import styles from './PatientHeader.module.css';
import { HiOutlineBell, HiOutlineEnvelope, HiOutlineCheck, HiXMark } from 'react-icons/hi2';
import { LuCalendarDays, LuClock } from 'react-icons/lu';
import { MdOutlineReply, MdOutlineDelete, MdOutlineSend } from 'react-icons/md';

/* ── Mock Data ─────────────────────────────────────── */
const MOCK_NOTIFICATIONS = [
  {
    id: 1, unread: true, type: 'alert',
    icon: '⚠️', bg: '#FEE2E2', color: '#EF4444',
    title: 'High Risk Alert',
    desc: 'Your latest health assessment shows high risk indicators. Please consult with your doctor immediately.',
    time: 'Just now', tag: 'Urgent', tagColor: '#EF4444',
  },
  {
    id: 2, unread: true, type: 'message',
    icon: '💬', bg: '#EFF6FF', color: '#3B82F6',
    title: 'Message from Dr. Ahmed Hassan',
    desc: 'Please take your medication as prescribed and avoid heavy meals. Let me know if you have any side effects.',
    time: '5 minutes ago',
  },
  {
    id: 3, unread: true, type: 'payment',
    icon: '✅', bg: '#F0FDF4', color: '#22C55E',
    title: 'Payment Successful',
    desc: 'Your payment of EGP 500 has been processed successfully. Receipt #PAY-2024-789',
    time: '30 minutes ago',
  },
  {
    id: 4, unread: true, type: 'appointment',
    icon: '✅', bg: '#F5F3FF', color: '#8B5CF6',
    title: 'Appointment Confirmed',
    desc: 'Your appointment with Dr. Ahmed Hassan on Feb 16, 2026 at 10:00 AM has been confirmed.',
    time: '1 hour ago',
  },
];

const MOCK_MESSAGES = [
  {
    id: 1, unread: 2,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Dr. Ahmed Hassan', role: 'Cardiologist', time: '5 min ago',
    text: 'Please take your medication as prescribed and let me know if you experience any side effects.',
  },
  {
    id: 2, unread: 1,
    avatar: 'https://placehold.co/40x40/e0f2fe/155DFC?text=PS',
    name: 'PulseX Support', role: 'Customer Service', time: '1 hour ago',
    text: 'Your appointment has been confirmed for tomorrow at 10:00 AM. See you soon!',
  },
  {
    id: 3, unread: 0,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Dr. Noha Salem', role: 'General Practitioner', time: '3 hours ago',
    text: 'Your lab results look good! Keep up the healthy lifestyle.',
  },
  {
    id: 4, unread: 0,
    avatar: 'https://placehold.co/40x40/fef9c3/d97706?text=CL',
    name: 'City Medical Lab', role: 'Laboratory', time: 'Yesterday',
    text: 'Your test results are ready. You can view them in Medical Records.',
  },
];

/* ── Helpers ───────────────────────────────────────── */
function formatDate(d) {
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
function formatTime(d) {
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

/* ══════════════════════════════════════════════════════
   Reply Modal
══════════════════════════════════════════════════════ */
const ReplyModal = ({ target, onClose, onSend }) => {
  const [text, setText] = useState('');
  if (!target) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.replyModal} onClick={e => e.stopPropagation()}>
        <div className={styles.replyModalHeader}>
          <span className={styles.replyModalTitle}>Reply to {target.name || target.title}</span>
          <button className={styles.replyModalClose} onClick={onClose}><HiXMark /></button>
        </div>
        {target.avatar && (
          <div className={styles.replyModalMeta}>
            <img src={target.avatar} alt="" className={styles.replyModalAvatar} />
            <div>
              <div className={styles.replyModalName}>{target.name}</div>
              <div className={styles.replyModalRole}>{target.role}</div>
            </div>
          </div>
        )}
        <div className={styles.replyModalOrig}>
          <span className={styles.replyModalOrigLabel}>Original:</span>
          <span className={styles.replyModalOrigText}>{target.text || target.desc}</span>
        </div>
        <textarea
          className={styles.replyTextarea}
          placeholder="Write your reply..."
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          autoFocus
        />
        <div className={styles.replyModalFooter}>
          <button className={styles.cancelReplyBtn} onClick={onClose}>Cancel</button>
          <button
            className={styles.sendReplyBtn}
            onClick={() => { if (text.trim()) { onSend(text); onClose(); } }}
            disabled={!text.trim()}
          >
            <MdOutlineSend /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   PatientHeader Component
══════════════════════════════════════════════════════ */
const PatientHeader = () => {
  const [now, setNow]               = useState(new Date());
  const [notifOpen, setNotifOpen]   = useState(false);
  const [msgOpen, setMsgOpen]       = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [messages, setMessages]     = useState(MOCK_MESSAGES);
  const [replyTarget, setReplyTarget] = useState(null); // { name, text/desc, avatar?, role? }

  const notifRef = useRef(null);
  const msgRef   = useRef(null);

  /* Live clock */
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* Close panels on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (msgRef.current   && !msgRef.current.contains(e.target))   setMsgOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Counts */
  const unreadNotif = notifications.filter(n => n.unread).length;
  const unreadMsg   = messages.filter(m => m.unread > 0).length;

  /* Actions — Notifications */
  const markOneRead = (id) => setNotifications(p => p.map(n => n.id === id ? { ...n, unread: false } : n));
  const deleteNotif = (id) => setNotifications(p => p.filter(n => n.id !== id));
  const markAllRead = ()   => setNotifications(p => p.map(n => ({ ...n, unread: false })));

  /* Actions — Messages */
  const deleteMsg   = (id) => setMessages(p => p.filter(m => m.id !== id));

  /* Send reply (mock — logs to console, ready for API) */
  const handleSendReply = (text) => {
    console.log('[Reply sent]', { to: replyTarget?.name, message: text });
    // TODO: replace with API call: api.post('/messages/reply', { to: replyTarget.id, text })
  };

  return (
    <>
      <header className={styles.headerWrapper}>

        {/* ── Left: Date & Time ── */}
        <div className={styles.leftSection}>
          <div className={styles.dateChip}>
            <LuCalendarDays className={styles.chipIcon} />
            <span className={styles.chipText}>{formatDate(now)}</span>
          </div>
          <div className={styles.timeChip}>
            <LuClock className={`${styles.chipIcon} ${styles.timeIcon}`} />
            <span className={styles.chipText}>{formatTime(now)}</span>
          </div>
        </div>

        {/* ── Right: Icons + Avatar ── */}
        <div className={styles.rightSection}>

          {/* ── Messages Button ── */}
          <div className={styles.notifWrapper} ref={msgRef}>
            <button
              className={`${styles.bellBtn} ${msgOpen ? styles.bellActive : ''}`}
              onClick={() => { setMsgOpen(p => !p); setNotifOpen(false); }}
            >
              <HiOutlineEnvelope className={`${styles.bellIcon} ${msgOpen ? styles.bellIconActive : ''}`} />
              {unreadMsg > 0 && <span className={styles.badge}>{unreadMsg}</span>}
            </button>

            {msgOpen && (
              <div className={styles.msgPanel}>
                <div className={styles.msgHeader}>
                  <div>
                    <div className={styles.notifTitle}>Messages</div>
                    <div className={styles.notifSub}>{unreadMsg} unread messages</div>
                  </div>
                  <button className={styles.notifClose} onClick={() => setMsgOpen(false)}>
                    <HiXMark />
                  </button>
                </div>

                <div className={styles.notifList}>
                  {messages.map(msg => (
                    <div key={msg.id} className={styles.msgItem}>
                      <div className={styles.msgAvatarWrap}>
                        <img src={msg.avatar} alt={msg.name} className={styles.msgAvatar} />
                        {msg.unread > 0 && <span className={styles.msgOnlineDot} />}
                      </div>
                      <div className={styles.notifContent}>
                        <div className={styles.msgTopRow}>
                          <span className={styles.msgName}>{msg.name}</span>
                          <div className={styles.msgMeta}>
                            <span className={styles.notifItemTime}>{msg.time}</span>
                            {msg.unread > 0 && <span className={styles.msgUnreadBadge}>{msg.unread}</span>}
                          </div>
                        </div>
                        <span className={styles.msgRole}>{msg.role}</span>
                        <p className={styles.notifItemDesc}>{msg.text}</p>
                        <div className={styles.msgActions}>
                          <button className={styles.replyBtn} onClick={() => { setReplyTarget(msg); setMsgOpen(false); }}>
                            <MdOutlineReply /> Reply
                          </button>
                          <button className={`${styles.replyBtn} ${styles.deleteBtn}`} onClick={() => deleteMsg(msg.id)}>
                            <MdOutlineDelete /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Notifications Button ── */}
          <div className={styles.notifWrapper} ref={notifRef}>
            <button
              className={`${styles.bellBtn} ${notifOpen ? styles.bellActive : ''}`}
              onClick={() => { setNotifOpen(p => !p); setMsgOpen(false); }}
            >
              <HiOutlineBell className={`${styles.bellIcon} ${notifOpen ? styles.bellIconActive : ''}`} />
              {unreadNotif > 0 && <span className={styles.badge}>{unreadNotif}</span>}
            </button>

            {notifOpen && (
              <div className={styles.notifPanel}>
                <div className={styles.notifHeader}>
                  <div>
                    <div className={styles.notifTitle}>Notifications</div>
                    <div className={styles.notifSub}>{unreadNotif} unread notifications</div>
                  </div>
                  <div className={styles.notifHeaderRight}>
                    <button className={styles.markAllBtn} onClick={markAllRead}>
                      <HiOutlineCheck /> Mark all as read
                    </button>
                    <button className={styles.notifClose} onClick={() => setNotifOpen(false)}>
                      <HiXMark />
                    </button>
                  </div>
                </div>

                <div className={styles.notifList}>
                  {notifications.map(n => (
                    <div key={n.id} className={`${styles.notifItem} ${n.unread ? styles.notifUnread : ''}`}>
                      <div className={styles.notifDot} style={{ background: n.bg }}>
                        <span style={{ fontSize: 15 }}>{n.icon}</span>
                      </div>
                      <div className={styles.notifContent}>
                        <div className={styles.notifItemTitle}>{n.title}</div>
                        <div className={styles.notifItemDesc}>{n.desc}</div>
                        {n.tag && (
                          <span className={styles.notifTag} style={{ color: n.tagColor, borderColor: n.tagColor }}>
                            ⚠️ {n.tag}
                          </span>
                        )}
                        <div className={styles.notifFooter}>
                          <span className={styles.notifItemTime}>{n.time}</span>
                          <div className={styles.notifActions}>
                            {/* Reply button on notification */}
                            {(n.type === 'message' || n.type === 'alert') && (
                              <button className={styles.replyNotifBtn} onClick={() => { setReplyTarget({ name: n.title, desc: n.desc, avatar: null }); setNotifOpen(false); }}>
                                <MdOutlineReply /> Reply
                              </button>
                            )}
                            {n.unread && (
                              <button className={styles.markReadBtn} onClick={() => markOneRead(n.id)}>Mark read</button>
                            )}
                            <button className={styles.deleteNotifBtn} onClick={() => deleteNotif(n.id)}>Delete</button>
                          </div>
                        </div>
                      </div>
                      {n.unread && <span className={styles.unreadDot} style={{ background: '#3B82F6' }} />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Avatar ── */}
          <div className={styles.avatarWrapper}>
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Avatar" className={styles.avatar} />
            <div className={styles.avatarInfo}>
              <span className={styles.avatarName}>Mohamed Salem</span>
              <span className={styles.avatarRole}>Patient</span>
            </div>
          </div>

        </div>
      </header>

      {/* ── Reply Modal (rendered outside header to avoid z-index issues) ── */}
      <ReplyModal
        target={replyTarget}
        onClose={() => setReplyTarget(null)}
        onSend={handleSendReply}
      />
    </>
  );
};

export default PatientHeader;

