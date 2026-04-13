import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  HiArrowLeft,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineHeart,
  HiOutlineShare,
  HiOutlineTrash,
} from 'react-icons/hi2';
import ConfirmModal from '../../../components/ConfirmModal/ConfirmModal';
import Toast from '../../../../../components/Toast/Toast';
import { applyStoriesSeo } from '../shared/seo';
import { MOCK_COMMENTS, MOCK_STORIES } from '../shared/storiesMockData';

export default function StoryDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stories, setStories] = useState(MOCK_STORIES);
  const story = stories.find((item) => String(item.id) === String(id));

  const [comments] = useState(MOCK_COMMENTS[id] || []);
  const [deleteModal, setDeleteModal] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  useEffect(() => {
    const pageTitle = story ? `${story.title} | Story Details | PulseX Admin` : 'Story Details | PulseX Admin';
    const description = story
      ? `Review and moderate the patient story titled ${story.title}, including engagement and comments.`
      : 'Review a full patient story, moderation status, engagement, and comments from the admin panel.';

    applyStoriesSeo({
      title: pageTitle,
      description,
      keywords: 'PulseX story details, story moderation, admin story review',
    });
  }, [story]);

  const showToast = (title, message) => {
    setToast({ visible: true, title, message });
    setTimeout(() => setToast((current) => ({ ...current, visible: false })), 3000);
  };

  if (!story) {
    return (
      <main className="h-full" aria-label="Story details page">
        <section className="flex flex-col items-center justify-center gap-4 px-4 py-20 sm:px-6">
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

  const handleDeleteConfirm = () => {
    setStories((previous) =>
      previous.map((item) => (item.id === story.id ? { ...item, status: 'Deleted' } : item))
    );
    setDeleteModal(false);
    showToast('Story Deleted Successfully', 'Your changes have been saved successfully.');
    setTimeout(() => navigate('/admin/stories/list'), 1500);
  };

  const handleHideConfirm = () => {
    const nextStatus = story.status === 'Hidden' ? 'Published' : 'Hidden';
    setStories((previous) =>
      previous.map((item) => (item.id === story.id ? { ...item, status: nextStatus } : item))
    );
    setHideModal(false);
    showToast(
      nextStatus === 'Hidden' ? 'Story Hidden Successfully' : 'Story Unhidden Successfully',
      'Your changes have been saved successfully.'
    );
  };

  const previewComments = comments.slice(0, 2);
  const totalComments = comments.length;

  const statusClass =
    story.status === 'Published'
      ? 'bg-[#DCFCE7] text-[#059669]'
      : story.status === 'Hidden'
        ? 'bg-[#FEF9C3] text-[#CA8A04]'
        : 'bg-red-100 text-red-600';

  return (
    <main className="h-full" aria-label="Story details page">
      <section className="flex flex-col gap-6 p-4 sm:p-5 lg:p-6" aria-labelledby="story-details-title">
        <Toast
          visible={toast.visible}
          title={toast.title}
          message={toast.message}
          type="success"
          onClose={() => setToast((current) => ({ ...current, visible: false }))}
        />

        <ConfirmModal
          isOpen={deleteModal}
          title="Delete Story?"
          desc="Are you sure you want to delete this story? This action is permanent and cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteModal(false)}
        />

        <ConfirmModal
          isOpen={hideModal}
          title={story.status === 'Hidden' ? 'Unhide Story?' : 'Hide Story?'}
          desc={
            story.status === 'Hidden'
              ? 'This story will become visible to the public again.'
              : 'This story will be hidden from public view.'
          }
          onConfirm={handleHideConfirm}
          onCancel={() => setHideModal(false)}
        />

        <header className="flex flex-col gap-0.5">
          <h1 id="story-details-title" className="flex items-center gap-2 text-[24px] font-bold text-black-main-text">
            <span aria-hidden="true">📖</span>
            Patient Story Details
          </h1>
          <p className="text-[18px] text-gray-text-dim2">Read full patient journey and shared experiences.</p>
        </header>

        <article className="flex flex-col items-start gap-4 rounded-2xl p-4 shadow-[0px_2px_3px_0px_rgba(0,0,0,0.10)] outline-1 -outline-offset-1 outline-gray-100 sm:flex-row sm:p-5">
          <img
            src={story.avatar}
            alt={story.author}
            className="h-14 w-14 shrink-0 rounded-full border-2 border-white object-cover shadow-sm"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-[20px] font-bold text-black-main-text">{story.author}</h2>
            <p className="mt-0.5 text-[14px] text-gray-text-dim2">Shared publicly to inspire other patients</p>
            <p className="mt-0.5 text-[14px] text-gray-600">{story.date}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(story.tags?.length ? story.tags : ['Success Story', 'Lifestyle', 'Health']).map((tagValue, index) => (
                <span
                  key={tagValue}
                  className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${
                    index === 0
                      ? 'bg-[#DCFCE7] text-[#059669]'
                      : index === 1
                        ? 'bg-[#EFF6FF] text-[#155dfc]'
                        : 'bg-red-100 text-red-600'
                  }`}
                >
                  {tagValue}
                </span>
              ))}
            </div>
          </div>
          <span className={`self-start rounded-full px-2.5 py-1 text-[12px] font-bold sm:self-auto ${statusClass}`}>
            {story.status}
          </span>
        </article>

        <article className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 lg:p-6" aria-labelledby="story-content-title">
          <h2 id="story-content-title" className="text-[30px] font-bold leading-snug text-black-main-text">
            {story.title}
          </h2>
          <div className="flex flex-col gap-3">
            {(story.content || story.desc).split('\n\n').map((paragraph, index) =>
              paragraph.trim() ? (
                <p key={`${story.id}-paragraph-${index}`} className="text-[16px] leading-relaxed text-gray-600">
                  {paragraph.trim()}
                </p>
              ) : null
            )}
          </div>
          {story.coverFull ? (
            <img
              src={story.coverFull}
              alt={story.title}
              className="mt-2 max-h-90 w-full rounded-xl object-cover"
            />
          ) : null}
        </article>

        <section className="flex flex-wrap items-center gap-3 px-4 py-3.5 sm:gap-6 sm:px-5" aria-label="Story engagement summary">
          <div className="flex items-center gap-2 rounded-2xl bg-red-50 p-1.5 text-[13px] font-semibold text-gray-600">
            <HiOutlineHeart className="rounded-full text-[18px] text-red-700" />
            <span>{story.likes || 132}</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-blue-50 p-1.5 text-[13px] font-semibold text-blue-600">
            <HiOutlineChatBubbleOvalLeft className="text-[18px]" />
            <span>{totalComments}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-600">
            <HiOutlineShare className="text-[18px]" />
            <span>{story.shares || 24}</span>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 sm:p-5" aria-label="Story comments preview">
          <header className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-[18px] font-bold text-black-main-text">Comments ({totalComments})</h3>
            <button
              onClick={() => navigate(`/admin/stories/${id}/comments`)}
              className="cursor-pointer text-[12px] font-semibold text-[#155dfc] hover:underline"
            >
              View All {'->'}
            </button>
          </header>

          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {previewComments.length === 0 ? (
              <li className="text-[16px] text-gray-400">No comments yet.</li>
            ) : (
              previewComments.map((comment) => (
                <li
                  key={comment.id}
                  className="last:border-0 flex items-start gap-3 rounded-2xl bg-gray-50 p-4 outline-[0.80px] outline-offset-[-0.80px] outline-gray-200 sm:p-5"
                >
                  {comment.avatar ? (
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="h-8 w-8 shrink-0 rounded-full border border-gray-100 object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-main to-[#9810fa] text-[16px] font-bold text-white">
                      {comment.author[0]}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[16px] font-semibold text-black-main-text">{comment.author}</span>
                      <span className="text-[12px] text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-[14px] leading-relaxed text-gray-700">{comment.text}</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>

        <footer className="flex flex-col items-stretch justify-between gap-3 rounded-3xl bg-white p-4 pt-2 shadow-[0px_2px_3px_0px_rgba(0,0,0,0.10)] outline-1 -outline-offset-1 outline-gray-100 sm:flex-row sm:items-center sm:p-5">
          <button
            onClick={() => navigate('/admin/stories/list')}
            className="flex cursor-pointer items-center justify-center gap-2 px-4 py-2 text-[14px] font-semibold text-black-main-text sm:justify-start"
          >
            <HiArrowLeft /> Back to Stories
          </button>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => setHideModal(true)}
              disabled={story.status === 'Deleted'}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-200 px-4 py-2 text-[14px] font-semibold text-black-main-text transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {story.status === 'Hidden' ? (
                <>
                  <HiOutlineEye /> Unhide Story
                </>
              ) : (
                <>
                  <HiOutlineEyeSlash /> Hide Story
                </>
              )}
            </button>
            <button
              onClick={() => setDeleteModal(true)}
              disabled={story.status === 'Deleted'}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-red-700 px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <HiOutlineTrash /> Delete Story
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}
