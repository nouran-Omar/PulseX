import { IoSendSharp } from 'react-icons/io5';
import Avatar from './Avatar';

const AddCommentBox = ({
  storyAuthorImg,
  comment,
  onChange,
  onPost,
}) => {
  return (
    <section className="bg-[#EFF6FF] rounded-2xl p-5 border border-[#BEDBFF] shadow-sm transition-all animate-in fade-in slide-in-from-top-2" aria-label="Add comment">
      <div className="flex items-start gap-3">
        <Avatar img={storyAuthorImg} initials="Y" size="w-9 h-9" />
        <div className="flex-1 bg-[#FFFFFF] rounded-xl px-4 py-3 min-h-[80px]">
          <textarea
            rows={2} value={comment}
            autoFocus
            onChange={onChange}
            placeholder="Write your comment..."
            className="w-full bg-transparent text-sm outline-none resize-none text-black-main-text placeholder:text-gray-400"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap justify-end gap-3 mt-3">
        <button
          onClick={onPost}
          className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-brand-main text-white text-sm font-semibold hover:bg-[#2730d4] transition"
        >
          <IoSendSharp /> Post Comment
        </button>
      </div>
    </section>
  );
};

export default AddCommentBox;
