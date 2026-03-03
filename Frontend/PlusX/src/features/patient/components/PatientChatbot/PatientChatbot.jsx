import React, { useState, useRef, useEffect } from 'react';
import {
  HiOutlineXMark,
  HiOutlinePaperAirplane,
  HiOutlineSparkles,
} from 'react-icons/hi2';

const chatbotIcon = '/image/chatpot.svg';

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'assistant',
    text: "Hello! I'm your PulseX Health Assistant\nHow can I help you today? You can ask me about your vitals, medications, or upcoming appointments.",
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  },
];

const AUTO_REPLIES = [
  'Your heart rate of 75 bpm is within a healthy range. Keep it up!',
  'Remember to stay hydrated - it helps keep your blood pressure stable.',
  'Your next appointment with Dr. Ahmed Hassan is on Feb 20 at 10:00 AM.',
  'Based on your latest readings, your blood sugar is well-controlled. Great work!',
  'I recommend completing your weekly health survey for a more accurate risk assessment.',
];

let replyIdx = 0;

const PatientChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = {
      id: Date.now(),
      role: 'user',
      text,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const reply = AUTO_REPLIES[replyIdx % AUTO_REPLIES.length];
      replyIdx++;
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', text: reply, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      <div className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] bg-white rounded-[24px] border border-gray-100 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100" style={{ background: 'linear-gradient(to right, #EFF6FF, #EEF2FF)' }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={chatbotIcon} alt="Chatbot" className="w-9 h-9 rounded-full object-cover" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-black-main-text">PulseX Assistant</p>
              <p className="text-[11px] text-[#155dfc] flex items-center gap-1">
                <HiOutlineSparkles className="text-xs" /> AI-Powered Health Guide
              </p>
            </div>
          </div>
          <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors" onClick={() => setIsOpen(false)}>
            <HiOutlineXMark />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 max-h-[380px]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                  <img src={chatbotIcon} alt="bot" className="w-5 h-5" />
                </div>
              )}
              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[75%]`}>
                <div className={`px-3.5 py-2.5 rounded-[16px] text-[13px] leading-relaxed whitespace-pre-line ${msg.role === 'user' ? 'bg-brand-main text-white rounded-br-sm' : 'bg-gray-100 text-black-main-text rounded-bl-sm'}`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1">{msg.time}</span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <img src={chatbotIcon} alt="bot" className="w-5 h-5" />
              </div>
              <div className="bg-gray-100 rounded-[16px] rounded-bl-sm px-4 py-3 flex items-center gap-1">
                {[0,1,2].map((i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="flex items-center gap-2 px-3 py-3 border-t border-gray-100">
          <textarea
            ref={inputRef}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[13px] text-black-main-text placeholder:text-gray-400 outline-none resize-none focus:border-brand-main transition-colors"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your health..."
            rows={1}
          />
          <button
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${input.trim() ? 'bg-brand-main hover:bg-[#2830d4] text-white' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
            onClick={sendMessage}
            disabled={!input.trim()}
          >
            <HiOutlinePaperAirplane className="text-base" />
          </button>
        </div>
      </div>
      <button
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-gray-200 scale-95' : 'bg-white hover:scale-110'}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <HiOutlineXMark className="text-gray-600 text-xl" />
        ) : (
          <>
            <img src={chatbotIcon} alt="Chat" className="w-8 h-8" />
            <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-brand-main border-2 border-white animate-ping" />
          </>
        )}
      </button>
    </>
  );
};

export default PatientChatbot;