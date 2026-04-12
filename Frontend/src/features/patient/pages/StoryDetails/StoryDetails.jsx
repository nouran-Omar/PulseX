import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Toast from '../../../../components/Toast/Toast';
import AddCommentBox from '../../components/StoryDetails/AddCommentBox';
import CommentsPreview from '../../components/StoryDetails/CommentsPreview';
import EngagementBar from '../../components/StoryDetails/EngagementBar';
import RelatedStories from '../../components/StoryDetails/RelatedStories';
import ReportModal from '../../components/StoryDetails/ReportModal';
import StoryArticle from '../../components/StoryDetails/StoryArticle';
import StoryAuthorSection from '../../components/StoryDetails/StoryAuthorSection';
import StoryDetailsFooter from '../../components/StoryDetails/StoryDetailsFooter';
import StoryDetailsHeader from '../../components/StoryDetails/StoryDetailsHeader';

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

const PatientStoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Story Details | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Read patient stories in full with comments and related stories.');
    }
  }, []);

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
  const [showCommentBox, setShowCommentBox] = useState(false);
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
          categories={REPORT_CATS}
        />
      )}

      <main className="story-details-root w-full flex flex-col gap-5 p-4 sm:p-6" style={{ "--story-muted": "#757575" }}>
        <StoryDetailsHeader />

        <aside className="sr-only">
          <p>Story details, engagement actions, and related stories.</p>
        </aside>

        <StoryAuthorSection story={story} tagCls={tagCls} />

        <StoryArticle story={story} />

        <EngagementBar
          isLiked={isLiked}
          likesCount={likesCount}
          commentsCount={comments.length + story.commentsCount}
          shares={story.shares}
          showCommentBox={showCommentBox}
          onLike={handleLike}
          onToggleComments={() => setShowCommentBox(!showCommentBox)}
          onShare={handleShare}
          onReport={() => setReportStory(true)}
        />

        {showCommentBox && (
          <>
            <AddCommentBox
              storyAuthorImg={story.authorImg}
              comment={comment}
              onChange={(e) => setComment(e.target.value)}
              onCancel={() => { setComment(''); setShowCommentBox(false); }}
              onPost={handlePostComment}
            />

            <CommentsPreview
              comments={comments.slice(0, 3)}
              totalCount={comments.length + story.commentsCount}
              onViewAll={() => navigate(`/patient/stories/${id}/comments`)}
            />
          </>
        )}

        <RelatedStories
          stories={relatedStories}
          tagCls={tagCls}
          onReadStory={(storyIdValue) => navigate(`/patient/stories/${storyIdValue}`)}
        />

        <StoryDetailsFooter
          onBack={() => navigate('/patient/stories')}
          onWriteStory={() => navigate('/patient/write-story')}
        />

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
