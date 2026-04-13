import { useEffect, useMemo, useState } from 'react';
import {
  HiArrowLeftOnRectangle,
  HiArrowRightOnRectangle,
  HiChevronLeft,
  HiChevronRight,
  HiClipboardDocumentList,
  HiMagnifyingGlass,
  HiPencil,
  HiPlus,
  HiTrash,
} from 'react-icons/hi2';
import { FILTERS, getMockActivityLogs, ICON_STYLES } from '../shared/activityLogsMockData';

const ITEMS_PER_PAGE = 10;

const ICONS = {
  plus: <HiPlus className="text-base" />,
  pencil: <HiPencil className="text-base" />,
  login: <HiArrowRightOnRectangle className="text-base" />,
  logout: <HiArrowLeftOnRectangle className="text-base" />,
  trash: <HiTrash className="text-base" />,
};

const getIcon = (type) => ICONS[type] ?? ICONS.plus;

export default function ActivityLogsView() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadLogs = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setLogs(getMockActivityLogs());
      setIsLoading(false);
    };

    loadLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesFilter = filter === 'All' || log.type === filter;
      const term = searchQuery.toLowerCase();
      const matchesSearch =
        log.title.toLowerCase().includes(term) || log.description.toLowerCase().includes(term);

      return matchesFilter && matchesSearch;
    });
  }, [logs, filter, searchQuery]);

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const currentLogs = filteredLogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="flex flex-col gap-6 p-6" aria-label="Activity Logs">
      <style>{`
        @media (max-width: 640px) {
          .filter-chip-active {
            animation: filterDrop 260ms ease-out;
            will-change: transform, opacity;
          }
        }
        @keyframes filterDrop {
          0% { transform: translateY(-6px); opacity: 0.6; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <header className="mb-4 flex flex-col gap-1" aria-labelledby="activity-logs-title">
        <div className="mb-2 flex items-center gap-2">
          <HiClipboardDocumentList className="text-[22px] text-black-main-text" aria-hidden="true" />
          <h1 id="activity-logs-title" className="text-[24px] leading-none text-black-main-text sm:font-bold">
            Activity Logs
          </h1>
        </div>
        <p className="text-[18px] text-gray-text-dim2">
          Track recent changes, updates, and system activity.
        </p>
      </header>

      <section
        className="flex flex-col gap-3 rounded-2xl border border-[#F3F4F6] p-4 sm:flex-row sm:rounded-full sm:p-6"
        aria-label="Activity filters and search"
      >
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((button) => (
            <button
              key={button}
              onClick={() => {
                setFilter(button);
                setCurrentPage(1);
              }}
              className={`filter-chip cursor-pointer rounded-full px-4 py-1 text-[14px] font-normal transition-colors sm:px-6 ${
                filter === button
                  ? 'bg-[#333CF5] text-white filter-chip-active'
                  : 'bg-[#F6F7F8] text-gray-text-dim2'
              }`}
            >
              {button}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:ml-auto sm:hidden sm:w-auto">
          <HiMagnifyingGlass
            className="absolute top-1/2 left-3 -translate-y-1/2 text-[15px] text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search logs..."
            aria-label="Search activity logs"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-[10px] border border-gray-200 bg-[#00000000] py-2.5 pr-4 pl-9 text-[13px] transition-colors focus:border-[#155dfc] focus:ring-2 focus:ring-[#155dfc]/30 focus:outline-none sm:w-55"
          />
        </div>
      </section>

      <section className="flex flex-col gap-2" aria-label="Activity log list">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#333CF5] border-t-transparent" />
            <p className="text-[13px] text-gray-400">Loading activities...</p>
          </div>
        ) : currentLogs.length > 0 ? (
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {currentLogs.map((log) => {
              const style = ICON_STYLES[log.iconType] ?? ICON_STYLES.plus;
              return (
                <li
                  key={log.id}
                  className="flex items-start gap-4 rounded-xl border border-[#F3F4F6] p-6 transition-colors"
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.bg} ${style.text}`}>
                    {getIcon(log.iconType)}
                  </div>
                  <article className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                      <h2 className="text-[18px] leading-snug font-semibold text-black-main-text">
                        {log.title}
                      </h2>
                      <span className="shrink-0 whitespace-nowrap text-[14px] text-gray-text-dim2 sm:text-right">
                        {log.time}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[16px] text-[#4B5563]">{log.description}</p>
                  </article>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex items-center justify-center py-16 text-[13px] text-gray-400">
            No logs found matching your criteria.
          </div>
        )}
      </section>

      {!isLoading && totalPages > 1 ? (
        <nav
          className="m-6 flex flex-wrap items-center justify-center gap-2 pt-1"
          aria-label="Activity logs pagination"
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:flex"
          >
            <HiChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[14px] font-semibold transition-colors ${
                page === currentPage
                  ? 'bg-[#333CF5] text-white'
                  : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:flex"
          >
            <HiChevronRight size={14} />
          </button>
        </nav>
      ) : null}
    </section>
  );
}