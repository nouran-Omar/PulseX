import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Toast from '../../../../components/Toast/Toast';
import AddCommentSection from '../../components/AllComments/AddCommentSection';
import AllCommentsHeader from '../../components/AllComments/AllCommentsHeader';
import CommentsList from '../../components/AllComments/CommentsList';
import ReportModal from '../../components/AllComments/ReportModal';

const MOCK_COMMENTS = [
  {
    id: 1, user: 'Dr. Ahmed Hassan', initials: 'D', avatar: null, time: '2 hours ago',
    text: 'This is such an inspiring story! Your dedication to tracking your nutrition really paid off. I recommend this approach to many of my patients.',
    likes: 24,
    replies: [
      { id: 11, user: 'Sarah M.', initials: 'S', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', time: '1 hour ago', text: 'Thank you Dr. Hassan! Your support through PulseX was invaluable.', likes: 8 },
    ],
  },
  {
    id: 2, user: 'Fatima Ali', initials: 'F', avatar: null, time: '5 hours ago',
    text: "Thank you for sharing this. I'm going through similar issues and this gives me hope. Did you have any setbacks during your journey?",
    likes: 18, replies: [],
  },
  {
    id: 3, user: 'Omar Khaled', initials: 'O', avatar: null, time: '8 hours ago',
    text: 'Amazing transformation! How long did it take before you started noticing significant changes?',
    likes: 12,
    replies: [
      { id: 31, user: 'Sarah M.', initials: 'S', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', time: '6 hours ago', text: 'I started feeling better within 2 weeks, but the major changes came after 6-8 weeks of consistency.', likes: 15 },
      { id: 32, user: 'Omar Khaled', initials: 'O', avatar: null, time: '5 hours ago', text: "That's really encouraging! Thank you for the response.", likes: 3 },
    ],
  },
  {
    id: 4, user: 'Dr. Layla Ibrahim', initials: 'L', avatar: null, time: '12 hours ago',
    text: 'As a nutritionist, I love seeing patients take control of their health this way. The tracking aspect is crucial for identifying patterns.',
    likes: 31, replies: [],
  },
  {
    id: 5, user: 'Youssef Omar', initials: 'Y', avatar: null, time: '1 day ago',
    text: 'Did you work with a specific nutritionist on PulseX or did you follow the automated meal plans?',
    likes: 9, replies: [],
  },
  {
    id: 6, user: 'Nour Hassan', initials: 'N', avatar: null, time: '1 day ago',
    text: "This resonates so much with me! I've been dealing with brain fog for months. Going to try the nutrition tracking approach.",
    likes: 21,
    replies: [
      { id: 61, user: 'Sarah M.', initials: 'S', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', time: '20 hours ago', text: 'Best of luck! Feel free to reach out if you have questions. The community here is amazing.', likes: 6 },
    ],
  },
  {
    id: 7, user: 'Dr. Khaled Mansour', initials: 'D', avatar: null, time: '2 days ago',
    text: 'Excellent example of patient-centered care. The holistic approach through PulseX platform really makes a difference.',
    likes: 14, replies: [],
  },
  {
    id: 8, user: 'Mariam Ahmed', initials: 'M', avatar: null, time: '2 days ago',
    text: "What were the main trigger foods you had to eliminate? I'm curious if we might have similar sensitivities.",
    likes: 16, replies: [],
  },
  {
    id: 9, user: 'Salma Nasser', initials: 'S', avatar: null, time: '3 days ago',
    text: "I love how PulseX provides the accountability factor. That's what I've been missing in my health journey.",
    likes: 19, replies: [],
  },
];

const REPORT_CATS = ['Spam', 'Misinformation', 'Hate Speech', 'Harassment', 'Other'];

const DoctorAllComments = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'All Comments | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Read and join the conversation with patient story comments.');
    }
  }, []);

  const storyTitle = 'Nutrition Changes That Transformed My Health';

  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [reportTarget, setReportTarget] = useState(null);
  const [likedIds, setLikedIds] = useState({});
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  const showToast = (title, message) => setToast({ visible: true, title, message });

  const handleLike = (commentId, replyId = null) => {
    const key = replyId ? `${commentId}-${replyId}` : `${commentId}`;
    setLikedIds((prev) => ({ ...prev, [key]: !prev[key] }));
    setComments((prev) => prev.map((c) => {
      if (!replyId && c.id === commentId) return { ...c, likes: likedIds[key] ? c.likes - 1 : c.likes + 1 };
      if (replyId && c.id === commentId) return {
        ...c,
        replies: c.replies.map((r) =>
          r.id === replyId ? { ...r, likes: likedIds[key] ? r.likes - 1 : r.likes + 1 } : r
        ),
      };
      return c;
    }));
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      { id: Date.now(), user: 'You', initials: 'Y', avatar: null, time: 'Just now', text: newComment, likes: 0, replies: [] },
      ...prev,
    ]);
    setNewComment('');
    showToast('Comment Posted', 'Your comment has been added.');
  };

  const handlePostReply = (commentId) => {
    if (!replyText.trim()) return;
    setComments((prev) => prev.map((c) =>
      c.id === commentId
        ? { ...c, replies: [...c.replies, { id: Date.now(), user: 'You', initials: 'Y', avatar: null, time: 'Just now', text: replyText, likes: 0 }] }
        : c
    ));
    setReplyText('');
    setReplyingTo(null);
    showToast('Reply Posted', 'Your reply has been added.');
  };

  return (
    <>
      <Toast visible={toast.visible} title={toast.title} message={toast.message} duration={3000}
        onClose={() => setToast((t) => ({ ...t, visible: false }))} />

      {reportTarget && (
        <ReportModal
          onClose={() => setReportTarget(null)}
          onSubmit={() => showToast('Report Submitted', 'Thank you for your feedback.')}
          categories={REPORT_CATS}
        />
      )}

      <main className="w-full flex flex-col gap-5 p-5" style={{ "--comments-muted": "#757575" }}>
        <AllCommentsHeader
          onBack={() => navigate(`/doctor/stories/${id}`)}
          commentsCount={comments.length}
          storyTitle={storyTitle}
        />

        <aside className="sr-only">
          <p>Full comments thread with replies and reporting actions.</p>
        </aside>

        <AddCommentSection
          newComment={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onPost={handlePostComment}
        />

        <CommentsList
          comments={comments}
          likedIds={likedIds}
          replyingTo={replyingTo}
          replyText={replyText}
          onLike={handleLike}
          onReplyToggle={(idValue) => { setReplyingTo(replyingTo === idValue ? null : idValue); setReplyText(''); }}
          onReplyTextChange={(e) => setReplyText(e.target.value)}
          onPostReply={handlePostReply}
          onReport={setReportTarget}
        />

        <footer className="sr-only">
          <p>End of comments page.</p>
        </footer>
      </main>
    </>
  );
};

export default DoctorAllComments;
