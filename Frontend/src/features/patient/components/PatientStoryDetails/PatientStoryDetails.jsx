import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TbBook } from 'react-icons/tb';
import {
  HiOutlineHeart, HiHeart,
  HiOutlineChatAlt2, HiOutlineShare,
  HiOutlineFlag, HiX,
  HiOutlinePencilAlt,
} from 'react-icons/hi';
import { IoSendSharp } from 'react-icons/io5';
import Toast from '../../../../components/Toast/Toast';

/* ─── Mock Data ─── */
const MOCK_STORIES = [
  {
    id: 1,
    author: 'Sarah M.',
    authorImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    date: 'March 12, 2024',
    categories: ['Lifestyle', 'Health'],
    title: 'Nutrition Changes That Transformed My Health',
    content: [
      "When I first joined PulseX six months ago, I was struggling with chronic fatigue, digestive issues, and constant brain fog...",
      "The turning point came when my PulseX care coordinator suggested we take a comprehensive look at my nutrition patterns...",
      "Working with my nutritionist through PulseX, we identified several trigger foods that were causing inflammation...",
      "The PulseX platform made this transition manageable with personalized meal plans and daily check-ins...",
      "Three months into my new nutrition plan, the changes were remarkable. My energy levels stabilized...",
      "To anyone struggling with similar health challenges, I want you to know that small, consistent changes can lead to transformative results.",
    ],
    coverImg: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
    likes: 132,
    commentsCount: 89,
    shares: 24,
  },
  {
    id: 2,
    author: 'Michael R.',
    authorImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    date: 'March 8, 2024',
    categories: ['Fitness', 'Recovery'],
    title: 'How Exercise Became My Medicine',
    content: [
      'I used to think exercise was only about weight, but after my diagnosis it became part of my treatment plan...',
      'My doctor and coach helped me start with short, low-impact routines that did not overwhelm my body...',
      'By week four, I could feel the difference in my mood and stamina, even on difficult days...',
      'Tracking sessions on PulseX gave me structure and motivation to stay consistent...',
      'Today I treat movement as daily medicine, not punishment, and it changed how I live.',
    ],
    coverImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
    likes: 98,
    commentsCount: 46,
    shares: 17,
  },
  {
    id: 3,
    author: 'Emma L.',
    authorImg: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100',
    date: 'March 5, 2024',
    categories: ['Mental Health', 'Wellness'],
    title: 'Managing Stress Through Mindfulness',
    content: [
      'Stress used to control every part of my day, especially after work and during sleepless nights...',
      'I started with just five minutes of guided breathing and journaling every evening...',
      'PulseX reminders helped me turn mindfulness into a habit I could actually maintain...',
      'Over time, my focus improved and I stopped feeling constantly on edge...',
      'Mindfulness did not remove all challenges, but it gave me tools to respond better.',
    ],
    coverImg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    likes: 121,
    commentsCount: 73,
    shares: 21,
  },
  {
    id: 4,
    author: 'David K.',
    authorImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    date: 'March 1, 2024',
    categories: ['Sleep', 'Lifestyle'],
    title: 'Sleep Quality Changed Everything',
    content: [
      'I ignored sleep for years, assuming coffee could fix everything in the morning...',
      'After logging patterns in PulseX, I saw how late meals and screen time disrupted recovery...',
      'I made simple changes: earlier dinner, less caffeine, and a fixed bedtime...',
      'Within weeks, my headaches dropped and my energy became more stable throughout the day...',
      'Better sleep improved my mood, focus, and even my workout recovery.',
    ],
    coverImg: 'https://images.unsplash.com/photo-1455642305367-68834a7c8e6d?w=800',
    likes: 87,
    commentsCount: 52,
    shares: 14,
  },
];

const MOCK_COMMENTS = {
  1: [
    { id: 1, user: 'Dr. Ahmed Hassan', avatar: null, initials: 'D', time: '2 hours ago', text: 'This is such an inspiring story! Your dedication to tracking your nutrition really paid off.' },
    { id: 2, user: 'Fatima Ali', avatar: null, initials: 'F', time: '5 hours ago', text: "Thank you for sharing this. I'm going through similar issues and this gives me hope." },
  ],
  2: [
    { id: 3, user: 'Mina Tarek', avatar: null, initials: 'M', time: '1 hour ago', text: 'Love how practical this is. Starting small really works.' },
    { id: 4, user: 'Dr. Nour', avatar: null, initials: 'N', time: '6 hours ago', text: 'Great example of sustainable recovery habits.' },
  ],
  3: [
    { id: 5, user: 'Salma H.', avatar: null, initials: 'S', time: '3 hours ago', text: 'This encouraged me to restart my breathing practice.' },
    { id: 6, user: 'Hany Adel', avatar: null, initials: 'H', time: '7 hours ago', text: 'Mindfulness has helped me too. Thanks for sharing.' },
  ],
  4: [
    { id: 7, user: 'Rana M.', avatar: null, initials: 'R', time: '4 hours ago', text: 'Sleep tracking changed my life as well.' },
    { id: 8, user: 'Youssef A.', avatar: null, initials: 'Y', time: '9 hours ago', text: 'Simple and powerful tips. Thank you!' },
  ],
};

const TAG_COLOURS = {
  Lifestyle: 'bg-[#FFF3E0] text-[#F57C00] border-[#FFE0B2]',
  Health: 'bg-[#E8EAF6] text-brand-main border-[#C5CAE9]',
  Fitness: 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]',
  Recovery: 'bg-[#FCE4EC] text-[#C62828] border-[#FFCDD2]',
  'Mental Health': 'bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]',
  Wellness: 'bg-[#E0F7FA] text-[#00695C] border-[#B2EBF2]',
  Sleep: 'bg-[#E3F2FD] text-[#1565C0] border-[#BBDEFB]',
};

const tagCls = (t) => TAG_COLOURS[t] || 'bg-gray-100 text-gray-600 border-gray-200';
const REPORT_CATS = ['Spam', 'Misinformation', 'Hate Speech', 'Harassment', 'Other'];

/* ─── Avatar helper ─── */
const Avatar = ({ img, initials, size = 'w-10 h-10' }) =>
  img ? (
    <img src={img} alt={initials} className={`${size} rounded-full object-cover`} />
  ) : (
    <div className={`${size} rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-bold`}>
      {initials}
    </div>
  );

/* ─── Report Modal ─── */
const ReportModal = ({ title, onClose, onSubmit }) => {
  const [cat, setCat] = useState('');
  const [reason, setReason] = useState('');
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-black-main-text">{title}</h3>
          <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-gray-600"><HiX className="text-xl" /></button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-black-main-text mb-1 block">Category</label>
            <select
              value={cat} onChange={(e) => setCat(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-[#F6F7F8] text-sm outline-none focus:border-brand-main"
            >
              <option value="select category">Select Category</option>
              {REPORT_CATS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-black-main-text mb-1 block">Reason</label>
            <textarea
              rows={4} value={reason} onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide details about why you're reporting this..."
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-[#F6F7F8] text-sm outline-none resize-none focus:border-brand-main"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 cursor-pointer py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-black-main-text hover:bg-gray-50 transition">Cancel</button>
          <button
            onClick={() => { onSubmit(); onClose(); }}
            className="flex-1 cursor-pointer py-2.5 rounded-xl bg-brand-main text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#2730d4] transition"
          >
            <IoSendSharp /> Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
const PatientStoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const storyId = Number(id) || 1;
  const story = MOCK_STORIES.find((s) => s.id === storyId) || MOCK_STORIES[0];
  const baseComments = MOCK_COMMENTS[story.id] || [];
  const relatedStories = MOCK_STORIES
    .filter((s) => s.id !== story.id)
    .slice(0, 3)
    .map((s) => ({
      id: s.id,
      author: s.author,
      date: s.date,
      title: s.title,
      tags: s.categories,
    }));

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(story.likes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(baseComments);
  const [reportStory, setReportStory] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false); // الحالة الجديدة للتحكم في ظهور الكومنتات
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  useEffect(() => {
    setIsLiked(false);
    setLikesCount(story.likes);
    setComment('');
    setComments(baseComments);
    setReportStory(false);
    setShowCommentBox(false);
  }, [story.id]);

  const showToast = (title, message) => {
    setToast({ visible: true, title, message });
  };

  const handleLike = () => {
    setIsLiked((p) => !p);
    setLikesCount((p) => (isLiked ? p - 1 : p + 1));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link Copied!', 'Story link copied to clipboard.');
  };

  const handlePostComment = () => {
    if (!comment.trim()) return;
    setComments((prev) => [
      { id: Date.now(), user: 'You', avatar: null, initials: 'Y', time: 'Just now', text: comment },
      ...prev,
    ]);
    setComment('');
    showToast('Comment Posted', 'Your comment has been added successfully.');
  };

  return (
    <>
      <Toast
        visible={toast.visible} title={toast.title} message={toast.message} duration={3000}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />

      {reportStory && (
        <ReportModal
          title="Report story"
          onClose={() => setReportStory(false)}
          onSubmit={() => showToast('Report Submitted', 'Thank you for your feedback.')}
        />
      )}

      <main className="story-details-root w-full flex flex-col gap-5 p-4 sm:p-6" style={{ "--story-muted": "#757575" }}>
        {/* ── Page Header ── */}
        <header>
          <div className="flex items-center gap-2 mb-1">
            <TbBook className="text-xl text-black-main-text" />
            <h1 className="text-lg font-bold text-black-main-text">Patient Story Details</h1>
          </div>
          <p className="text-sm text-[var(--story-muted)]">Read full patient journey and shared experiences.</p>
        </header>

        <aside className="sr-only">
          <p>Story details, engagement actions, and related stories.</p>
        </aside>

        <section className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm" aria-label="Story author">
  
          <div className="mt-4 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-full sm:w-auto flex justify-center sm:justify-start">
              <Avatar img={story.authorImg} initials={story.author[0]} size="w-14 h-14" />
            </div>
            <div className="w-full text-center sm:text-left">
              <p className="font-semibold text-xl text-black-main-text">{story.author}</p>
              <p className="text-sm text-[#6B7280]">Shared publicly to inspire other patients</p>
              <p className="text-sm text-[#4B5563] mt-0.5">{story.date}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {story.categories.map((c) => (
                  <span key={c} className={`px-3 py-1 rounded-full text-sm font-medium border ${tagCls(c)}`}>
                    {c} <span className="ml-0.5">✓</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Story Article ── */}
        <article className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-100 shadow-sm">
          <h2 className="text-3xl sm:text-2xl font-bold text-black-main-text mb-5">{story.title}</h2>
          <div className="flex flex-col gap-4 text-[16px] text-[#374151] leading-relaxed">
            {story.content.slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}
            <img src={story.coverImg} alt="Story cover" className="w-full rounded-xl object-cover max-h-[320px]" />
            {story.content.slice(2).map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </article>

        {/* ── Engagement Bar ── */}
        <section className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8" aria-label="Engagement">
          <button
            onClick={handleLike}
            className={`cursor-pointer flex items-center gap-1.5 text-sm rounded-full p-1 font-medium transition shrink-0 ${isLiked ? 'text-[#E7000B] bg-[#FEF2F2] rounded-full p-1' : 'text-[#4B5563]  hover:text-[#E7000B]'}`}
          >
            {isLiked ? <HiHeart className="text-lg" /> : <HiOutlineHeart className="text-lg" />}
            {likesCount}
          </button>

          <button
            onClick={() => setShowCommentBox(!showCommentBox)}
            className={`cursor-pointer flex items-center gap-1.5 text-sm font-medium transition shrink-0 ${showCommentBox ? 'text-brand-main bg-[#EFF6FF] rounded-full p-1 ' : 'text-[#4B5563] hover:text-brand-main'}`}
          >
            <HiOutlineChatAlt2 className="text-lg" /> {comments.length + story.commentsCount}
          </button>

          <button onClick={handleShare} className="cursor-pointer flex items-center gap-1.5 text-sm font-medium text-[#4B5563] hover:text-brand-main transition shrink-0">
            <HiOutlineShare className="text-lg" /> {story.shares}
          </button>

          <button onClick={() => setReportStory(true)} className="cursor-pointer flex items-center gap-1.5 text-sm font-medium text-[#4B5563] hover:text-red-500 transition shrink-0">
            <HiOutlineFlag className="text-lg" /> Report
          </button>
        </section>

        {/* ── Comment Box (Conditional) ── */}
        {showCommentBox && (
          <>
            <section className="bg-[#EFF6FF] rounded-2xl p-5 border border-[#BEDBFF] shadow-sm transition-all animate-in fade-in slide-in-from-top-2" aria-label="Add comment">
              <div className="flex items-start gap-3">
                <Avatar img={story.authorImg} initials="Y" size="w-9 h-9" />
                <div className="flex-1 bg-[#FFFFFF] rounded-xl px-4 py-3 min-h-[80px]">
                  <textarea
                    rows={2} value={comment}
                    autoFocus
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment..."
                    className="w-full bg-transparent text-sm outline-none resize-none text-black-main-text placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap justify-end gap-3 mt-3">
                <button onClick={() => { setComment(''); setShowCommentBox(false); }} className="w-full sm:w-auto cursor-pointer text-sm text-gray-500 hover:text-gray-700 transition">Cancel</button>
                <button
                  onClick={handlePostComment}
                  className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-brand-main text-white text-sm font-semibold hover:bg-[#2730d4] transition"
                >
                  <IoSendSharp /> Post Comment
                </button>
              </div>
            </section>

            {/* ── Comments Preview ── */}
            <section className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-4" aria-label="Comments preview">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-black-main-text">Comments ({comments.length + story.commentsCount})</h3>
                <button
                  onClick={() => navigate(`/patient/stories/${id}/comments`)}
                  className="text-xs cursor-pointer  font-semibold text-brand-main hover:underline flex items-center gap-1"
                >
                  View All <span>›</span>
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {comments.slice(0, 3).map((c) => (
                  <article key={c.id} className="flex items-start gap-3 bg-[#F9FAFB] rounded-xl p-3">
                    <Avatar img={c.avatar} initials={c.initials} size="w-8 h-8" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-black-main-text">{c.user}</p>
                        <p className="text-xs  text-[#6A7282]">{c.time}</p>
                      </div>
                      <p className="text-xs text-[#364153] mt-0.5">{c.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ── You May Also Like ── */}
        <section aria-label="Related stories">
          <h3 className="text-base font-bold text-black-main-text mb-4">You may also like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedStories.map((r) => (
              <article key={r.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <div>
                    <p className="text-xs font-semibold text-black-main-text">{r.author}</p>
                    <p className="text-xs text-[#6B7280]">{r.date}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-black-main-text leading-snug">{r.title}</p>
                <div className="flex flex-wrap gap-1">
                  {r.tags.map((t) => (
                    <span key={t} className={`px-2 py-0.5 rounded-full text-xs border ${tagCls(t)}`}>{t}</span>
                  ))}
                </div>
                <button onClick={() => navigate(`/patient/stories/${r.id}`)} className="text-xs font-semibold cursor-pointer text-brand-main hover:underline text-left mt-auto">
                  Read Story →
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* ── Footer Buttons ── */}
        <footer className="flex flex-col sm:flex-row justify-end gap-3 py-2">
          <button 
            onClick={() => navigate('/patient/stories')} 
            className="w-full sm:w-auto px-6 py-2.5 cursor-pointer rounded-full border border-gray-300 text-sm font-semibold text-black-main-text bg-white hover:bg-gray-50 transition"
          >
            Back to Stories
          </button>
          <button 
            onClick={() => navigate('/patient/write-story')} 
            className="w-full sm:w-auto flex items-center justify-center cursor-pointer gap-1.5 px-6 py-2.5 rounded-full bg-brand-main text-white text-sm font-semibold hover:bg-[#2730d4] transition"
          >
            <HiOutlinePencilAlt /> Write Story
          </button>
        </footer>

        <style dangerouslySetInnerHTML={{ __html: `
          .story-details-root button { cursor: pointer; }
          .story-details-root::-webkit-scrollbar { width: 6px; }
          .story-details-root::-webkit-scrollbar-track { background: transparent; }
          .story-details-root::-webkit-scrollbar-thumb { background: #333cf540; border-radius: 999px; }
          .story-details-root::-webkit-scrollbar-thumb:hover { background: #333CF5; }
          @media (max-width: 640px) { .story-details-root::-webkit-scrollbar { width: 4px; } }
        `}} />
      </main>
    </>
  );
};

export default PatientStoryDetails;