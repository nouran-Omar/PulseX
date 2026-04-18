import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineBell, HiOutlineEnvelope, HiXMark } from 'react-icons/hi2';
import { LuCalendarDays, LuClock } from 'react-icons/lu';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    unread: true,
    title: 'Emergency Patient Alert',
    desc: 'Patient Ahmed Ali reported severe chest pain. Immediate attention required.',
    time: 'Just now',
    level: 'Urgent',
  },
  {
    id: 2,
    unread: true,
    title: 'New Appointment Request',
    desc: 'Sarah Mohamed requested an appointment for tomorrow at 10:00 AM.',
    time: '5 minutes ago',
    level: 'Appointment',
  },
  {
    id: 3,
    unread: true,
    title: 'Patient Message - Urgent',
    desc: 'Omar Khaled: Doctor, I am experiencing side effects from the new medication.',
    time: '15 minutes ago',
    level: 'Urgent',
  },
  {
    id: 4,
    unread: false,
    title: 'Lab Results Ready',
    desc: 'Blood test results for Fatma Hassan are now available for review.',
    time: '35 minutes ago',
    level: 'Result',
  },
];

const MOCK_MESSAGES = [
  {
    id: 1,
    unread: 2,
    name: 'Sarah Mohamed',
    role: 'Patient',
    text: 'Doctor, can I take the medication with food? Also, when should I come for follow-up?',
    time: '2 min ago',
    avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
    urgent: true,
  },
  {
    id: 2,
    unread: 1,
    name: 'Ahmed Ali',
    role: 'Patient',
    text: 'Thank you doctor for the prescription. I am feeling much better now!',
    time: '20 min ago',
    avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
    urgent: false,
  },
  {
    id: 3,
    unread: 1,
    name: 'Dr. Noha Salem',
    role: 'Colleague - Cardiology',
    text: 'Could you consult on this ECG? Patient shows some abnormalities.',
    time: '1 hour ago',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    urgent: false,
  },
  {
    id: 4,
    unread: 0,
    name: 'Omar Khaled',
    role: 'Patient',
    text: 'I need to reschedule my appointment to next week. Is Thursday available?',
    time: '3 hours ago',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    urgent: false,
  },
];

const formatDate = (d) =>
  d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const formatTime = (d) =>
  d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

const DoctorHeader = () => {
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());
  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [messages] = useState(MOCK_MESSAGES);

  const notifRef = useRef(null);
  const msgRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onClickAway = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (msgRef.current && !msgRef.current.contains(e.target)) setMsgOpen(false);
    };
    document.addEventListener('mousedown', onClickAway);
    return () => document.removeEventListener('mousedown', onClickAway);
  }, []);

  const unreadNotif = notifications.filter((n) => n.unread).length;
  const unreadMsg = messages.filter((m) => m.unread > 0).length;

  return (
    <header className="flex items-center justify-between w-full h-full gap-3">
      <div className="flex items-center gap-[10px] shrink-0">
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-[10px]">
          <span className="h-4 w-4 rounded-[4px] border border-[#2563EB]" />
          <LuCalendarDays className="text-[15px] text-[#155dfc] shrink-0" />
          <span className="text-[13px] font-bold text-black-main-text whitespace-nowrap font-roboto">
            {formatDate(now)}
          </span>
        </div>
        <div className="hidden min-[480px]:flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-white">
          <LuClock className="text-[15px] text-[#00a63e] shrink-0" />
          <span className="text-[13px] font-bold text-black-main-text whitespace-nowrap font-roboto">
            {formatTime(now)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="relative" ref={msgRef}>
          <button
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white border-[1.5px] border-gray-200 cursor-pointer transition-all shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-[#EEF3FF] hover:border-[#155DFC]"
            onClick={() => {
              setMsgOpen((p) => !p);
              setNotifOpen(false);
            }}
            aria-label="Toggle doctor messages"
          >
            <HiOutlineEnvelope className="text-[18px] text-[#6b7280]" />
            {unreadMsg > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#00C950] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white font-roboto">
                {unreadMsg}
              </span>
            )}
          </button>

          {msgOpen && (
            <div className="fixed top-[76px] left-1/2 -translate-x-1/2 sm:absolute sm:top-[calc(100%+10px)] sm:left-auto sm:translate-x-0 sm:right-0 w-[320px] sm:w-[430px] max-w-[calc(100vw-24px)] bg-white rounded-[14px] border border-[#D1D5DB] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden z-[300]">
              <div className="flex items-center justify-between px-[16px] py-3 bg-[#05A24E]">
                <div>
                  <div className="text-[20px] font-bold text-white font-roboto">Messages</div>
                  <div className="text-[12px] text-white/80 mt-0.5 font-roboto">4 unread messages</div>
                </div>
                <button
                  className="rounded-lg w-7 h-7 flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors"
                  onClick={() => setMsgOpen(false)}
                  aria-label="Close messages"
                >
                  <HiXMark />
                </button>
              </div>

              <div className="max-h-[420px] overflow-y-auto bg-white">
                {messages.map((msg) => (
                  <article
                    key={msg.id}
                    className="border-b border-[#E5E7EB] px-3 py-2.5"
                  >
                    <div className="flex items-start gap-2.5">
                      <img src={msg.avatar} alt={msg.name} className="w-[34px] h-[34px] rounded-full object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[13px] font-bold text-black-main-text truncate">{msg.name}</span>
                            {msg.urgent ? <span className="rounded-full bg-[#FEE2E2] px-1.5 py-0.5 text-[9px] font-semibold text-[#B91C1C]">Urgent</span> : null}
                          </div>
                          <span className="text-[10px] text-[#9ca3af] shrink-0">{msg.time}</span>
                        </div>
                        <p className="text-[10px] text-[#9ca3af]">{msg.role}</p>
                        <p className="text-[11px] text-[#374151] leading-4">{msg.text}</p>
                        <div className="mt-1.5 flex items-center gap-3 text-[10px] font-semibold">
                          <button onClick={() => navigate('/doctor/messages')} className="text-[#16A34A] cursor-pointer">Reply</button>
                          <button onClick={() => navigate('/doctor/patients')} className="text-[#2563EB] cursor-pointer">View Profile</button>
                          <button className="text-[#DC2626] cursor-pointer">Delete</button>
                        </div>
                      </div>
                      {msg.unread > 0 ? <span className="h-4 min-w-4 px-1 rounded-full bg-[#16A34A] text-[9px] font-semibold text-white flex items-center justify-center">{msg.unread}</span> : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={notifRef}>
          <button
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white border-[1.5px] border-gray-200 cursor-pointer transition-all shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-[#EEF3FF] hover:border-[#155DFC]"
            onClick={() => {
              setNotifOpen((p) => !p);
              setMsgOpen(false);
            }}
            aria-label="Toggle notifications"
          >
            <HiOutlineBell className="text-[18px] text-[#6b7280]" />
            {unreadNotif > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#ef4444] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white font-roboto">
                {unreadNotif}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="fixed top-[76px] left-1/2 -translate-x-1/2 sm:absolute sm:top-[calc(100%+10px)] sm:left-auto sm:translate-x-0 sm:right-0 w-[320px] sm:w-[430px] max-w-[calc(100vw-24px)] bg-white rounded-[14px] border border-[#D1D5DB] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden z-[300]">
              <div className="flex items-center justify-between px-[16px] py-3 bg-[#3340EE]">
                <div>
                  <div className="text-[20px] font-bold text-white font-roboto">Notifications</div>
                  <div className="text-[12px] text-white/80">{unreadNotif} unread notifications</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="text-[11px] font-semibold text-white/90 hover:text-white cursor-pointer"
                    onClick={() => setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })))}
                  >
                    Mark all as read
                  </button>
                  <button
                    className="rounded-lg w-7 h-7 flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors"
                    onClick={() => setNotifOpen(false)}
                    aria-label="Close notifications"
                  >
                    <HiXMark />
                  </button>
                </div>
              </div>

              <div className="max-h-[420px] overflow-y-auto bg-white">
                {notifications.map((n) => (
                  <article key={n.id} className="px-3 py-2.5 border-b border-gray-100">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[13px] font-semibold text-black-main-text">{n.title}</p>
                      {n.unread ? <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" /> : null}
                    </div>
                    <p className="text-[11px] text-[#374151] mt-1 leading-4">{n.desc}</p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {n.level === 'Urgent' ? <span className="rounded-full bg-[#FEE2E2] px-1.5 py-0.5 text-[9px] font-semibold text-[#B91C1C]">Urgent</span> : null}
                        <span className="text-[10px] text-[#9ca3af]">{n.time}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[10px] font-semibold">
                        {n.unread ? (
                          <button
                            className="text-[#2563EB] cursor-pointer"
                            onClick={() =>
                              setNotifications((prev) =>
                                prev.map((item) =>
                                  item.id === n.id ? { ...item, unread: false } : item
                                )
                              )
                            }
                          >
                            Mark read
                          </button>
                        ) : null}
                        <button className="text-[#DC2626] cursor-pointer">Delete</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className="flex items-center gap-[10px] pl-2 cursor-pointer group"
          onClick={() => navigate('/doctor/settings')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') navigate('/doctor/settings');
          }}
          aria-label="Open doctor profile settings"
        >
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="Doctor avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#e0eaff]"
          />
          <div className="hidden md:flex flex-col">
            <span className="text-[13px] font-bold text-black-main-text whitespace-nowrap font-roboto">
              Noha Salem
            </span>
            <span className="text-[10px] text-[#6b7280] uppercase tracking-wider font-roboto">
              Doctor
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DoctorHeader;
