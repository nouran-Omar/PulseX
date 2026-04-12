import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlinePencilAlt, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { SiMicrodotblog } from "react-icons/si";
import { RiChatAiFill } from "react-icons/ri";
const PatientStories = () => {
  const navigate = useNavigate();

  // 1. داتا وهمية كتير (Fake Data) عشان السلايدر يشتغل بجد
  const allStories = [
    { id: 1, author: "Sarah M.", date: "March 15, 2024", title: "Nutrition Changes That Transformed My Health", tags: ["Lifestyle", "Health"], img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
    { id: 2, author: "Salem R.", date: "March 12, 2024", title: "Overcoming Heart Surgery Recovery", tags: ["Challenges", "Health"], img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
    { id: 3, author: "Noha Ali.", date: "March 15, 2024", title: "Overcoming Anxiety During Treatment", tags: ["Success Story", "Lifestyle"], img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" },
    { id: 4, author: "Nour R.", date: "March 12, 2024", title: "Finding Balance: Work and Chronic Pain", tags: ["Challenges", "Health"], img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    { id: 5, author: "Sondos M.", date: "March 15, 2024", title: "Building a Support Network", tags: ["Lifestyle", "Health"], img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    { id: 6, author: "Mohamed S.", date: "March 12, 2024", title: "My Journey to Recovery", tags: ["Success Story", "Lifestyle"], img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    { id: 7, author: "Ali K.", date: "Feb 20, 2024", title: "Life After Pacemaker Surgery", tags: ["Health"], img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100" },
    { id: 8, author: "Mona H.", date: "Jan 10, 2024", title: "Mental Strength in Recovery", tags: ["Lifestyle"], img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
    { id: 9, author: "Khaled J.", date: "Dec 05, 2023", title: "Running a Marathon with Heart Health", tags: ["Success Story"], img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    { id: 10, author: "Rana W.", date: "Nov 15, 2023", title: "How Daily Walking Saved Me", tags: ["Lifestyle"], img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" },
    { id: 11, author: "Youssef T.", date: "Oct 12, 2023", title: "Managing High Blood Pressure", tags: ["Health"], img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
    { id: 12, author: "Alaa Z.", date: "Sep 30, 2023", title: "Healthy Eating for a Stronger Heart", tags: ["Lifestyle", "Health"], img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
  ];

  // 2. منطق السلايدر (Dynamic Logic)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // عرض 4 قصص فقط في المرة

  const totalPages = Math.ceil(allStories.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentStories = allStories.slice(indexOfFirst, indexOfLast);

  return (
 <>
 <main className="p-[24px]" style={{ "--story-muted": "#757575" }}>
   <header className="flex flex-col pb-4 mb-8">
  
  {/* السطر الأول: الأيقونة + العنوان */}
  <div className="flex items-center gap-1">
    {/* حاوية الأيقونة - استخدمنا اللون الأسود كما في كودك الأصلي */}
    <div className="w-10 h-10 flex items-center justify-center rounded-full  text-white text-[20px] shrink-0">
      <RiChatAiFill className='text-black-main-text' />
    </div>

    {/* العنوان H1 */}
    <h1 className="text-[24px] font-bold text-black-main-text">
      Stories
    </h1>
  </div>

  {/* السطر الثاني: الوصف ينزل تحتهم */}
  <p className="text-[18px] text-[var(--story-muted)] max-w-2xl ml-2">
    Read and share inspiring patient journeys.
  </p>
  
</header>

      <aside className="sr-only">
        <p>Patient stories listing with pagination and quick actions.</p>
      </aside>

      {/* Stories grid — 2 cols */}
      <section className="flex flex-wrap gap-6" aria-label="Stories">
        {currentStories.map(story => (
          <article
            key={story.id}
            className="w-full lg:flex-[1_1_calc(50%-12px)] lg:max-w-[calc(50%-12px)] bg-white p-5 sm:p-8 rounded-[24px] border border-gray-100 shadow-sm hover:-translate-y-1 hover:border-brand-main transition-all duration-300"
          >
            {/* Author */}
            <div className="flex items-center gap-4 mb-6">
              <img src={story.img} alt={story.author} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="text-[14px] font-semibold text-black-main-text">{story.author}</h4>
                <span className="text-[12px] text-gray-400">{story.date}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-[16px] font-bold text-black-main-text leading-snug mb-3">{story.title}</h3>

            {/* Excerpt */}
            <p className="text-[13px] text-gray-500 leading-relaxed mb-6 line-clamp-3">
              "Last year, my heart health was at a critical point. Thanks to the right care and community support, I transformed my life..."
            </p>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2 mt-4 sm:mt-0">
              <div className="flex flex-wrap gap-2">
                {story.tags.map(tag => (
                  <span
                    key={tag}
                    className={`px-4 py-1 rounded-full text-[11px] font-medium ${
                      tag === 'Lifestyle' ? 'bg-orange-100 text-orange-600' : 'bg-blue-50 text-brand-main'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                className="flex items-center cursor-pointer gap-2 text-[12px] font-semibold text-brand-main hover:gap-3 transition-all"
                onClick={() => navigate(`/patient/stories/${story.id}`)}
              >
                Read Story <HiOutlineArrowRight />
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Pagination & Actions */}
      <footer className="mt-8 md:mt-12 flex flex-col-reverse md:flex-row justify-between items-center gap-6 py-5 relative">
        
        {/* Pagination Buttons */}
        <div className="flex items-center flex-wrap justify-center gap-2 md:absolute md:left-1/2 md:-translate-x-1/2">
          <button
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center transition-colors cursor-pointer hover:border-brand-main disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <HiOutlineChevronLeft />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={`cursor-pointer w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center text-[13px] font-semibold transition-colors ${
                currentPage === i + 1
                  ? 'bg-brand-main text-white border-brand-main'
                  : 'bg-white border-gray-200 text-black-main-text hover:border-brand-main'
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center transition-colors cursor-pointer hover:border-brand-main disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <HiOutlineChevronRight />
          </button>
        </div>

        {/* Write Story Button */}
        <button
          className="cursor-pointer flex items-center justify-center w-full md:w-auto md:ml-auto gap-2 px-7 py-3.5 rounded-[24px] text-white text-[13px] font-semibold shadow-[0_4px_12px_rgba(51,60,245,0.2)]"
          style={{ background: 'linear-gradient(90deg, #333CF5 0%, #ED0006 100%)' }}
          onClick={() => navigate('/patient/write-story')}
        >
          <HiOutlinePencilAlt /> Write Story
        </button>
      </footer>
    </main>
</>
  );
};

export default PatientStories;
