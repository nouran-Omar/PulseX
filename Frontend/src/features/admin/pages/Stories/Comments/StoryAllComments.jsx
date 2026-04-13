import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  HiArrowLeft,
  HiOutlineArrowUturnLeft,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineExclamationTriangle,
  HiOutlineHandThumbUp,
  HiOutlineTrash,
} from 'react-icons/hi2';
import ConfirmModal from '../../../components/ConfirmModal/ConfirmModal';
import Toast from '../../../../../components/Toast/Toast';
import { applyStoriesSeo } from '../shared/seo';
import { MOCK_COMMENTS, MOCK_STORIES } from '../shared/storiesMockData';

export default function StoryAllCommentsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const story = MOCK_STORIES.find((item) => String(item.id) === String(id));
  const seedComments = MOCK_COMMENTS[id] || MOCK_COMMENTS[1] || [];
  const [comments, setComments] = useState(seedComments);
  const [deleteModal, setDeleteModal] = useState({ open: false, commentId: null });
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  useEffect(() => {
    const pageTitle = story
      ? `Comments on ${story.title} | PulseX Admin`
      : 'Story Comments | PulseX Admin';
    const description = story
      ? `Review and moderate comments for the story ${story.title}.`
      : 'Review and moderate all comments related to patient stories in the admin panel.';

    applyStoriesSeo({
      title: pageTitle,
      description,
      keywords: 'PulseX story comments, comments moderation, admin comments',
    });
  }, [story]);

  const showToast = (title, message) => {
    setToast({ visible: true, title, message });
    setTimeout(() => setToast((current) => ({ ...current, visible: false })), 3000);
  };

  const handleDeleteClick = (commentId) => {
    setDeleteModal({ open: true, commentId });
  };

  const handleDeleteConfirm = () => {
    setComments((previous) => previous.filter((comment) => comment.id !== deleteModal.commentId));
    setDeleteModal({ open: false, commentId: null });
    showToast('Comment Deleted', 'The comment has been removed successfully.');
  };

  if (!story) {
    return (
      <main className="h-full" aria-label="Story comments page">
        <section className="flex flex-col items-center justify-center gap-4 p-5 py-20">
          <h1 className="text-[18px] font-semibold text-black-main-text">Story not found.</h1>
          <button
            onClick={() => navigate('/admin/stories/list')}
            className="cursor-pointer flex items-center gap-2 rounded-[10px] bg-[#EFF6FF] px-4 py-2 text-[13px] font-semibold text-[#155dfc] transition-colors hover:bg-[#dbeafe]"
          >
            <HiArrowLeft /> Back to Stories
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="h-full" aria-label="Story comments page">
      <section className="flex flex-col gap-6 p-6" aria-labelledby="story-comments-title">
        <Toast
          visible={toast.visible}
          title={toast.title}
          message={toast.message}
          type="success"
          onClose={() => setToast((current) => ({ ...current, visible: false }))}
        />

        <ConfirmModal
          isOpen={deleteModal.open}
          title="Delete Comment?"
          desc="Are you sure you want to delete this comment? This action cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteModal({ open: false, commentId: null })}
        />

        <button
          onClick={() => navigate(`/admin/stories/${id}`)}
          className="cursor-pointer self-start flex items-center gap-2 px-4 text-[14px] font-semibold text-[#4A5565] hover:transition-colors"
        >
          <HiArrowLeft /> Back to Story
        </button>

        <header className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2.5 text-black-main-text">
            <HiOutlineChatBubbleOvalLeft className="text-[22px]" />
            <h1 id="story-comments-title" className="text-[24px] font-bold text-black-main-text">
              All Comments
            </h1>
          </div>
          <p className="text-[18px] text-gray-text-dim2">
            {comments.length} comments on &ldquo;{story.title}&rdquo;
          </p>
        </header>

        <ul className="m-0 flex list-none flex-col gap-3 p-0" aria-label="Story comments list">
          {comments.length === 0 ? (
            <li className="py-12 text-center text-[14px] text-gray-400">No comments yet.</li>
          ) : (
            comments.map((comment) => (
              <li
                key={comment.id}
                className={`overflow-hidden rounded-[14px] border p-4 transition-all ${
                  comment.flagged
                    ? 'border-[#FFA2A2] bg-white'
                    : 'border-[#E5E7EB] bg-white'
                }`}
              >
                {comment.flagged ? (
                  <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#FFA2A2] bg-[#FFE2E2] px-4 py-2 text-center text-[14px] font-semibold text-[#C10007] sm:flex-row sm:text-left">
                    <HiOutlineExclamationTriangle className="shrink-0 text-[15px]" />
                    <span>Flagged for Review - Potentially Inappropriate Content</span>
                  </div>
                ) : null}

                <article className="flex flex-col items-center gap-3 p-4 sm:flex-row sm:items-start">
                  {comment.avatar ? (
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="h-9 w-9 shrink-0 rounded-full border border-gray-100 object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-main to-[#9810fa] text-[16px] font-bold text-white">
                      {comment.author[0]}
                    </div>
                  )}

                  <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-2xl border-none p-2 text-center sm:items-start sm:text-left">
                    <header className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                        <span className="text-[16px] font-semibold text-black-main-text">{comment.author}</span>
                        {comment.role ? (
                          <span
                            className={`rounded-full px-2 py-0.5 text-[12px] font-semibold ${
                              comment.role === 'Doctor'
                                ? 'bg-[#DBEAFE] text-brand-main'
                                : 'bg-[#F3F4F6] text-[#364153]'
                            }`}
                          >
                            {comment.role}
                          </span>
                        ) : null}
                      </div>

                      <button
                        onClick={() => handleDeleteClick(comment.id)}
                        title="Delete comment"
                        className="h-7 w-7 cursor-pointer flex items-center justify-center rounded-[7px] text-[#E7000B] transition-colors hover:bg-red-100 shrink-0"
                      >
                        <HiOutlineTrash className="text-[20px]" />
                      </button>
                    </header>

                    <div className="flex w-full items-center justify-center gap-1 text-[14px] text-[#6A7282] sm:justify-start">
                      <span>📅</span>
                      {comment.time}
                    </div>

                    <p className="text-[14px] leading-relaxed text-[#364153]">{comment.text}</p>

                    <footer className="mt-1 flex w-full items-center justify-center gap-4 sm:justify-start">
                      <span className="flex items-center gap-1.5 text-[14px] text-[#4A5565]">
                        <HiOutlineHandThumbUp className="text-[14px]" />
                        {comment.likes}
                      </span>
                      <span className="flex items-center gap-1.5 text-[14px] text-[#4A5565]">
                        <HiOutlineArrowUturnLeft className="text-[14px]" />
                        {comment.replies} {comment.replies === 1 ? 'reply' : 'replies'}
                      </span>
                    </footer>
                  </div>
                </article>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}
