import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineMagnifyingGlass,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { FaBookOpen } from 'react-icons/fa6';
import ConfirmModal from '../../../components/ConfirmModal/ConfirmModal';
import Toast from '../../../../../components/Toast/Toast';
import { applyStoriesSeo } from '../shared/seo';
import {
  MOCK_STORIES as INITIAL_STORIES,
  SORT_OPTIONS,
  STATUS_OPTIONS,
  TAG_OPTIONS,
} from '../shared/storiesMockData';

const PAGE_SIZE = 3;
const MAX_VISIBLE_PAGES = 5;

export default function StoriesManagementPage() {
  const navigate = useNavigate();

  const [stories, setStories] = useState(INITIAL_STORIES);
  const [tag, setTag] = useState('All');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('Normal');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({ open: false, story: null });
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  useEffect(() => {
    applyStoriesSeo({
      title: 'Stories Management | PulseX Admin',
      description: 'Manage patient stories, moderate content, and review story activity in the admin panel.',
      keywords: 'PulseX admin stories, story moderation, patient stories management',
    });
  }, []);

  const showToast = (title, message) => {
    setToast({ visible: true, title, message });
    setTimeout(() => setToast((current) => ({ ...current, visible: false })), 3000);
  };

  const filtered = useMemo(() => {
    let list = [...stories];

    if (tag !== 'All') {
      list = list.filter((story) => (story.tags || []).includes(tag));
    }
    if (status !== 'All') {
      list = list.filter((story) => story.status === status);
    }
    if (search.trim()) {
      const term = search.toLowerCase();
      list = list.filter(
        (story) => story.title.toLowerCase().includes(term) || story.author.toLowerCase().includes(term)
      );
    }
    if (sort === 'Newest') {
      list = list.reverse();
    }
    if (sort === 'Oldest') {
      list = [...list].reverse();
    }

    return list;
  }, [stories, tag, status, search, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const liveStats = useMemo(
    () => ({
      total: stories.length,
      published: stories.filter((story) => story.status === 'Published').length,
      hidden: stories.filter((story) => story.status === 'Hidden').length,
      deleted: stories.filter((story) => story.status === 'Deleted').length,
    }),
    [stories]
  );

  const buildPageNums = () => {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    const pages = Array.from({ length: MAX_VISIBLE_PAGES }, (_, index) => index + 1);
    return [...pages, '...', totalPages];
  };

  const handlePageChange = (targetPage) => {
    if (targetPage >= 1 && targetPage <= totalPages) {
      setPage(targetPage);
    }
  };

  const handleRowClick = (story) => {
    navigate(`/admin/stories/${story.id}`);
  };

  const handleToggleHide = (event, story) => {
    event.stopPropagation();
    const nextStatus = story.status === 'Hidden' ? 'Published' : 'Hidden';
    setStories((previous) =>
      previous.map((item) => (item.id === story.id ? { ...item, status: nextStatus } : item))
    );
    showToast(
      nextStatus === 'Hidden' ? 'Story Hidden Successfully' : 'Story Unhidden Successfully',
      'Your changes have been saved successfully.'
    );
  };

  const handleDeleteClick = (event, story) => {
    event.stopPropagation();
    setDeleteModal({ open: true, story });
  };

  const handleDeleteConfirm = () => {
    if (!deleteModal.story) {
      return;
    }
    setStories((previous) =>
      previous.map((item) =>
        item.id === deleteModal.story.id ? { ...item, status: 'Deleted' } : item
      )
    );
    setDeleteModal({ open: false, story: null });
    showToast('Story Deleted Successfully', 'Your changes have been saved successfully.');
  };

  const pageNumbers = buildPageNums();

  return (
    <main className="h-full" aria-label="Stories management page">
      <section className="flex flex-col gap-6 p-6" aria-labelledby="stories-management-title">
        <Toast
          visible={toast.visible}
          title={toast.title}
          message={toast.message}
          type="success"
          onClose={() => setToast((current) => ({ ...current, visible: false }))}
        />

        <ConfirmModal
          isOpen={deleteModal.open}
          title="Delete Story?"
          desc="Are you sure you want to delete this story? This action is permanent."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteModal({ open: false, story: null })}
        />

        <header className="flex flex-col gap-1">
          <div className="mb-2 flex items-center gap-2">
            <HiOutlinePencilSquare className="text-[22px] text-black-main-text" aria-hidden="true" />
            <h1
              id="stories-management-title"
              className="text-[24px] sm:text-[24px] font-bold text-black-main-text leading-none"
            >
              Patient Stories
            </h1>
          </div>
          <p className="text-[18px] text-gray-text-dim2">
            Read and share inspiring patient journeys.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Stories summary statistics">
          <StatCard label="Total Stories" value={liveStats.total} icon={<FaBookOpen />} iconBg="#EEF2FF" iconColor="#333CF5" />
          <StatCard label="Published Stories" value={liveStats.published} icon={<FaEye />} iconBg="#ECFDF5" iconColor="#16A34A" />
          <StatCard label="Hidden Stories" value={liveStats.hidden} icon={<FaEyeSlash />} iconBg="#FFF7ED" iconColor="#757575" />
          <StatCard label="Deleted Stories" value={liveStats.deleted} icon={<FaTrash />} iconBg="#FEF2F2" iconColor="#EF4444" />
        </section>

        <section className="flex flex-col flex-wrap items-start gap-4 rounded-xl bg-[#F1F2F5] p-2 sm:flex-row sm:items-center sm:p-3" aria-label="Stories filters">
          {[
            { label: 'Tags:', value: tag, setter: setTag, options: TAG_OPTIONS },
            { label: 'Status:', value: status, setter: setStatus, options: STATUS_OPTIONS },
            { label: 'Sort By:', value: sort, setter: setSort, options: SORT_OPTIONS },
          ].map(({ label, value, setter, options }) => (
            <div key={label} className="order-2 flex w-full flex-row items-center gap-2 px-1 sm:order-1 sm:w-auto">
              <label className="min-w-15 whitespace-nowrap text-[14px] font-normal text-gray-500 sm:min-w-0">
                {label}
              </label>
              <select
                value={value}
                onChange={(event) => {
                  setter(event.target.value);
                  setPage(1);
                }}
                className="flex-1 cursor-pointer appearance-none rounded-full border border-gray-200 bg-white py-2 pl-4 pr-10 text-[12px] focus:outline-none focus:ring-2 focus:ring-[#155dfc]/30 sm:w-auto"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3e%3cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3e%3c/svg%3e")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '12px',
                }}
              >
                {options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}

          <div className="relative order-1 w-full sm:order-2 sm:ml-auto sm:w-auto">
            <HiOutlineMagnifyingGlass
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search stories..."
              aria-label="Search stories"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#155dfc]/30 sm:w-64"
            />
          </div>
        </section>

        <section className="w-full overflow-visible bg-white sm:overflow-x-auto" aria-label="Stories table">
          <table className="w-full min-w-full border-collapse sm:min-w-175">
            <thead className="hidden sm:table-header-group">
              <tr className="bg-[#333CF5] text-white">
                <th className="px-6 py-5 text-center text-[12px] font-normal uppercase tracking-wider whitespace-nowrap">Story</th>
                <th className="px-4 py-5 text-center text-[12px] font-normal uppercase tracking-wider whitespace-nowrap">Author</th>
                <th className="px-4 py-5 text-center text-[12px] font-normal uppercase tracking-wider whitespace-nowrap">Date Published</th>
                <th className="px-4 py-5 text-center text-[12px] font-normal uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-5 text-center text-[12px] font-normal uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((story, index) => (
                <tr
                  key={story.id}
                  onClick={() => handleRowClick(story)}
                  className={`block sm:table-row rounded-[14px] sm:rounded-none border-2 border-gray-100 sm:border-0 mb-3 sm:mb-0 transition-colors cursor-pointer ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'
                  } hover:bg-[#EFF6FF]/60`}
                >
                  <td className="block px-6 py-6 text-left sm:table-cell sm:py-8">
                    <article className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                      <img
                        src={story.cover}
                        alt={story.title}
                        className="h-20 w-16 shrink-0 rounded-xl border border-gray-100 object-cover shadow-sm"
                      />
                      <div className="flex min-w-0 flex-col gap-2">
                        <h3 className="text-[17px] font-bold leading-tight text-black-main-text">{story.title}</h3>
                        <p className="max-w-87.5 text-[14px] leading-relaxed text-gray-text-dim2">{story.desc}</p>
                      </div>
                    </article>
                  </td>

                  <td className="block px-4 py-4 sm:table-cell sm:py-8">
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={story.avatar}
                        alt={story.author}
                        className="h-8 w-8 shrink-0 rounded-full border border-gray-200 object-cover"
                      />
                      <span className="whitespace-nowrap text-[16px] font-semibold text-black-main-text">{story.author}</span>
                    </div>
                  </td>

                  <td className="block px-4 py-4 text-center text-[14px] font-medium text-gray-500 sm:table-cell sm:py-8">
                    {story.date}
                  </td>

                  <td className="block px-4 py-4 text-center sm:table-cell sm:py-8">
                    <span
                      className={`inline-block rounded-full px-4 py-1.5 text-[12px] font-bold ${
                        story.status === 'Published'
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : story.status === 'Hidden'
                            ? 'bg-gray-100 text-gray-text-dim2'
                            : 'bg-[#FEF2F2] text-[#EF4444]'
                      }`}
                    >
                      {story.status}
                    </span>
                  </td>

                  <td className="block px-4 py-4 text-center sm:table-cell sm:py-8" onClick={(event) => event.stopPropagation()}>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={(event) => handleToggleHide(event, story)}
                        title={story.status === 'Hidden' ? 'Unhide Story' : 'Hide Story'}
                        className={`h-10 w-10 cursor-pointer flex items-center justify-center transition-all ${
                          story.status === 'Hidden'
                            ? 'text-[#3335cf] hover:text-[#2628a0]'
                            : 'text-gray-500 hover:text-gray-500'
                        }`}
                      >
                        {story.status === 'Hidden' ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                      </button>
                      <button
                        onClick={(event) => handleDeleteClick(event, story)}
                        className="h-10 w-10 cursor-pointer flex items-center justify-center rounded-xl text-red-500 hover:text-red-600 transition-all"
                      >
                        <HiOutlineTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 sm:flex-row">
            <span className="w-full text-center text-[14px] text-gray-400 sm:w-auto sm:text-left">
              Showing {paginated.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}-
              {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} stories
            </span>
            <nav className="flex items-center gap-1" aria-label="Stories pagination">
              <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <HiChevronLeft size={14} />
              </button>
              {pageNumbers.map((pageNum, index) =>
                pageNum === '...' ? (
                  <span key={`ellipsis-${index}`} className="hidden px-1 text-[14px] text-gray-400 sm:inline">
                    ...
                  </span>
                ) : (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[12px] font-semibold transition-colors sm:flex ${
                      page === pageNum
                        ? 'bg-[#155dfc] text-white'
                        : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
              <button
                disabled={page === totalPages || totalPages === 0}
                onClick={() => handlePageChange(page + 1)}
                className="h-10 w-10 cursor-pointer flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <HiChevronRight size={14} />
              </button>
            </nav>
          </div>
        </section>
      </section>
    </main>
  );
}

function StatCard({ label, value, icon, iconBg, iconColor }) {
  return (
    <article className="flex w-full items-center justify-between rounded-[14px] border-gray-text-dim2 px-4 py-8 shadow-xl">
      <div className="flex flex-col gap-1">
        <p className="mb-2 text-[14px] font-normal tracking-wide text-gray-text-dim2">{label}</p>
        <p className="text-[30px] font-bold leading-none text-black-main-text">{value.toLocaleString()}</p>
      </div>
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[18px]"
        style={{ background: iconBg, color: iconColor }}
        aria-hidden="true"
      >
        {icon}
      </div>
    </article>
  );
}
