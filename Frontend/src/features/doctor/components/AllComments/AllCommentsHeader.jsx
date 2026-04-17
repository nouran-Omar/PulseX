import { HiOutlineChevronLeft } from 'react-icons/hi';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';

const AllCommentsHeader = ({ onBack, commentsCount, storyTitle }) => {
  return (
    <header className="flex flex-col gap-3">
      <button
        onClick={onBack}
        className="cursor-pointer flex items-center gap-1 text-sm text-gray-500 hover:text-brand-main transition w-fit"
      >
        <HiOutlineChevronLeft /> Back to Story
      </button>

      <div className="bg-white rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-1">
          <HiOutlineChatBubbleLeftRight className="text-xl text-black-main-text" />
          <h1 className="text-xl font-bold text-black-main-text">All Comments</h1>
        </div>
        <p className="text-sm text-[var(--comments-muted)]">{commentsCount} comments on "{storyTitle}"</p>
      </div>
    </header>
  );
};

export default AllCommentsHeader;
