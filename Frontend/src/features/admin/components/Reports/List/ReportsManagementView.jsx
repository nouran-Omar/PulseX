import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiArrowPath,
  HiExclamationTriangle,
  HiOutlineBookOpen,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineEye,
  HiOutlineFlag,
  HiOutlineTrash,
  HiOutlineXCircle,
} from 'react-icons/hi2';
import { FiCheckCircle } from 'react-icons/fi';
import Toast from '../../../../../components/Toast/Toast';
import { MOCK_REPORTS } from '../shared/reportsMockData';

function DeleteContentModal({ report, onConfirm, onCancel }) {
  if (!report) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(event) => event.target === event.currentTarget && onCancel()}
    >
      <div className="flex w-full max-w-100 flex-col gap-4 rounded-[20px] bg-white p-6 shadow-xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
          <HiExclamationTriangle />
        </div>

        <div className="text-center">
          <h2 className="text-[16px] font-bold text-black-main-text">Delete Content</h2>
          <p className="mt-0.5 text-[12px] text-gray-400">This action cannot be undone</p>
        </div>

        <div className="flex flex-col gap-1.5 rounded-xl bg-[#F6F7F8] p-4">
          <p className="text-[12px] text-gray-600">
            <strong>Type:</strong> {report.contentType.toLowerCase()}
          </p>
          <p className="text-[12px] text-gray-600">
            <strong>Author:</strong> {report.contentAuthor}
          </p>
          <p className="line-clamp-3 text-[12px] italic text-gray-500">"{report.contentText}"</p>
        </div>

        <p className="text-center text-[12px] text-gray-500">
          Are you sure you want to permanently delete this content? This will remove it from the platform and notify the author.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 cursor-pointer rounded-[10px] bg-[#F6F7F8] py-2.5 text-[13px] font-semibold text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 cursor-pointer rounded-[10px] bg-red-500 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const STATUS_BADGE = {
  Pending: 'bg-orange-100 text-orange-700 outline outline-[0.8px] outline-orange-200',
  Reviewed: 'bg-green-100 text-green-700 outline outline-[0.8px] outline-green-200',
  Dismissed: 'bg-gray-100 text-gray-700 outline outline-[0.8px] outline-gray-200',
};

const CATEGORY_BADGE = {
  Spam: 'bg-purple-100 text-purple-700 outline outline-[0.8px] outline-red-200',
  Misinformation: 'bg-yellow-200 text-yellow-700 outline outline-[0.8px] outline-orange-200',
  Harassment: 'bg-red-100 text-red-700 outline outline-[0.8px] outline-red-200',
  'Inappropriate Content': 'bg-red-100 text-[#C10007] outline outline-[0.8px] outline-red-200',
  Other: 'bg-blue-100 text-[#155DFC] outline outline-[0.8px] outline-blue-200',
};

function ReportCard({ report, onMarkReviewed, onDismiss, onReopen, onDelete, onView }) {
  const isPending = report.status === 'Pending';
  const isReviewed = report.status === 'Reviewed';
  const isDismissed = report.status === 'Dismissed';

  const contentTypeIcon =
    report.contentType === 'Comment' || report.contentType === 'Reply' ? (
      <HiOutlineChatBubbleOvalLeft size={13} />
    ) : (
      <HiOutlineBookOpen size={13} />
    );

  const statusBadge = STATUS_BADGE[report.status] ?? STATUS_BADGE.Dismissed;
  const categoryBadge =
    CATEGORY_BADGE[report.category] ??
    'bg-gray-100 text-gray-600 outline outline-[0.8px] outline-gray-200';

  return (
    <article className="flex flex-col gap-4 rounded-2xl bg-white px-6 pt-6 pb-5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10),0px_1px_2px_-1px_rgba(0,0,0,0.10)] outline-[0.8px] outline-gray-200">
      <div className="flex flex-col items-start gap-4 sm:flex-row">
        {report.reporterAvatar ? (
          <img
            src={report.reporterAvatar}
            alt={report.reportedBy}
            className="h-12 w-12 shrink-0 rounded-full border border-gray-200 object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-[#E7000B]">
            <HiOutlineFlag size={20} />
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <span className="text-[16px] leading-6 font-semibold text-black-main-text">
              Reported by {report.reportedBy}
            </span>
            <span className="text-[12px] font-normal text-gray-500">{report.reporterTime}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[12px] leading-4 font-medium ${statusBadge}`}
            >
              {report.status}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[12px] leading-4 font-medium ${categoryBadge}`}
            >
              {report.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-[12px] leading-4 font-medium text-gray-700 outline-[0.8px] outline-gray-200">
              {contentTypeIcon}
              {report.contentType}
            </span>
          </div>
        </div>
      </div>

      <p className="text-[14px] text-gray-600">
        In story: <em className="not-italic font-medium text-gray-700">"{report.storyTitle}"</em>
      </p>

      <div className="flex flex-col gap-1.5 rounded-xl border border-[#FFC9C9] bg-[#FEF2F2] px-4 py-3">
        <p className="flex items-center gap-1.5 text-[14px] font-semibold text-red-700">
          <HiExclamationTriangle className="text-red-600" size={14} />
          Content by {report.contentAuthor}:
        </p>
        <p className="text-[14px] leading-relaxed italic text-gray-700">"{report.contentText}"</p>
      </div>

      <div className="flex flex-col gap-1 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
        <p className="text-[14px] font-semibold text-black-main-text">Report Reason:</p>
        <p className="text-[14px] leading-relaxed text-gray-700">{report.reportReason}</p>
      </div>

      <div className="flex w-full flex-col flex-wrap gap-2 pt-1 sm:flex-row">
        <button
          onClick={onView}
          className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#155DFC] px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#0913C3] sm:flex-none"
        >
          <HiOutlineEye size={14} /> View Content
        </button>

        {isPending ? (
          <>
            <button
              onClick={onDelete}
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#E7000B] px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#C10007] sm:flex-none"
            >
              <HiOutlineTrash size={14} /> Delete Content
            </button>
            <button
              onClick={onMarkReviewed}
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#00A63E] px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#008236] sm:flex-none"
            >
              <HiOutlineCheckCircle size={14} /> Mark Reviewed
            </button>
            <button
              onClick={onDismiss}
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-gray-600 px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-gray-700 sm:flex-none"
            >
              <HiOutlineXCircle size={14} /> Dismiss
            </button>
          </>
        ) : null}

        {isReviewed ? (
          <>
            <button
              onClick={onDelete}
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#E7000B] px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#C10007] sm:flex-none"
            >
              <HiOutlineTrash size={14} /> Delete Content
            </button>
            <button
              onClick={onDismiss}
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#F3F4F6] px-4 py-2 text-[14px] font-semibold text-[#4A5565] transition-colors hover:bg-[#E5E7EB] sm:flex-none"
            >
              <HiOutlineXCircle size={14} /> Dismiss
            </button>
            <button
              onClick={onReopen}
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#FFEDD4] px-4 py-2 text-[12px] font-semibold text-[#CA3500] transition-colors hover:bg-orange-200 sm:flex-none"
            >
              <HiArrowPath size={14} /> Reopen
            </button>
          </>
        ) : null}

        {isDismissed ? (
          <button
            onClick={onReopen}
            className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#FFEDD4] px-4 py-2 text-[12px] font-semibold text-[#CA3500] transition-colors hover:bg-orange-200 sm:flex-none"
          >
            <HiArrowPath size={14} /> Re-open
          </button>
        ) : null}
      </div>
    </article>
  );
}

export default function ReportsManagementView() {
  const navigate = useNavigate();
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  const showToast = (title, message) => {
    setToast({ visible: true, title, message });
    setTimeout(() => setToast((current) => ({ ...current, visible: false })), 3000);
  };

  const stats = useMemo(
    () => ({
      total: reports.length,
      pending: reports.filter((report) => report.status === 'Pending').length,
      reviewed: reports.filter((report) => report.status === 'Reviewed').length,
      dismissed: reports.filter((report) => report.status === 'Dismissed').length,
    }),
    [reports]
  );

  const handleMarkReviewed = (id) => {
    setReports((previous) =>
      previous.map((report) =>
        report.id === id ? { ...report, status: 'Reviewed' } : report
      )
    );
    showToast('Marked as Reviewed', 'The report has been marked as reviewed.');
  };

  const handleDismiss = (id) => {
    setReports((previous) =>
      previous.map((report) =>
        report.id === id ? { ...report, status: 'Dismissed' } : report
      )
    );
    showToast('Report Dismissed', 'The report has been dismissed successfully.');
  };

  const handleReopen = (id) => {
    setReports((previous) =>
      previous.map((report) =>
        report.id === id ? { ...report, status: 'Pending' } : report
      )
    );
    showToast('Report Reopened', 'The report has been moved back to Pending.');
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setReports((previous) => previous.filter((report) => report.id !== deleteTarget.id));
    setDeleteTarget(null);
    showToast('Content Deleted', 'The reported content has been permanently removed.');
  };

  const handleViewContent = (report) => {
    if (report.storyId) {
      navigate(`/admin/stories/${report.storyId}`);
    }
  };

  return (
    <section className="flex flex-col gap-6 p-6" aria-label="Reports Management">
      <Toast
        visible={toast.visible}
        title={toast.title}
        message={toast.message}
        type="success"
        onClose={() => setToast((current) => ({ ...current, visible: false }))}
      />

      <DeleteContentModal
        report={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <header className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5 text-black-main-text">
          <HiOutlineFlag className="shrink-0 text-[24px]" aria-hidden="true" />
          <h1 className="text-[24px] leading-tight sm:font-bold">Reports Management</h1>
        </div>
        <p className="text-[18px] leading-relaxed text-gray-text-dim2">
          Review and manage reported content from the community.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-3 px-2 py-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4" aria-label="Report statistics">
        {[
          {
            label: 'Total Reports',
            value: stats.total,
            icon: <HiOutlineFlag />,
            bg: 'from-blue-500 to-blue-600',
          },
          {
            label: 'Pending Review',
            value: stats.pending,
            icon: <HiOutlineClock />,
            bg: 'from-orange-500 to-orange-600',
          },
          {
            label: 'Reviewed',
            value: stats.reviewed,
            icon: <FiCheckCircle />,
            bg: 'from-green-500 to-green-600',
          },
          {
            label: 'Dismissed',
            value: stats.dismissed,
            icon: <HiOutlineXCircle />,
            bg: 'from-gray-500 to-gray-600',
          },
        ].map(({ label, value, icon, bg }) => (
          <article key={label} className={`flex flex-col gap-2 rounded-2xl bg-linear-to-br ${bg} p-8 text-white`}>
            <div className="text-2xl opacity-80">{icon}</div>
            <p className="text-[14px] font-semibold uppercase tracking-wide opacity-80">{label}</p>
            <p className="text-[30px] leading-none font-bold">{value}</p>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-4" aria-label="Reports list">
        {reports.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-[13px] text-gray-400">
            No reports found.
          </div>
        ) : (
          reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onMarkReviewed={() => handleMarkReviewed(report.id)}
              onDismiss={() => handleDismiss(report.id)}
              onReopen={() => handleReopen(report.id)}
              onDelete={() => setDeleteTarget(report)}
              onView={() => handleViewContent(report)}
            />
          ))
        )}
      </section>
    </section>
  );
}