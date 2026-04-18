import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StoriesFooter from '../../components/Stories/StoriesFooter';
import StoriesGrid from '../../components/Stories/StoriesGrid';
import StoriesHeader from '../../components/Stories/StoriesHeader';

const DoctorStories = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Stories | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Review and follow patient stories shared in the PulseX community.');
    }
  }, []);

  const allStories = [
    { id: 1, author: 'Sarah M.', date: 'March 15, 2024', title: 'Nutrition Changes That Transformed My Health', tags: ['Lifestyle', 'Health'], img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
    { id: 2, author: 'Salem R.', date: 'March 12, 2024', title: 'Overcoming Heart Surgery Recovery', tags: ['Challenges', 'Health'], img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    { id: 3, author: 'Noha Ali.', date: 'March 15, 2024', title: 'Overcoming Anxiety During Treatment', tags: ['Success Story', 'Lifestyle'], img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' },
    { id: 4, author: 'Nour R.', date: 'March 12, 2024', title: 'Finding Balance: Work and Chronic Pain', tags: ['Challenges', 'Health'], img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: 5, author: 'Sondos M.', date: 'March 15, 2024', title: 'Building a Support Network', tags: ['Lifestyle', 'Health'], img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: 6, author: 'Mohamed S.', date: 'March 12, 2024', title: 'My Journey to Recovery', tags: ['Success Story', 'Lifestyle'], img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    { id: 7, author: 'Ali K.', date: 'Feb 20, 2024', title: 'Life After Pacemaker Surgery', tags: ['Health'], img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
    { id: 8, author: 'Mona H.', date: 'Jan 10, 2024', title: 'Mental Strength in Recovery', tags: ['Lifestyle'], img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
    { id: 9, author: 'Khaled J.', date: 'Dec 05, 2023', title: 'Running a Marathon with Heart Health', tags: ['Success Story'], img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    { id: 10, author: 'Rana W.', date: 'Nov 15, 2023', title: 'How Daily Walking Saved Me', tags: ['Lifestyle'], img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' },
    { id: 11, author: 'Youssef T.', date: 'Oct 12, 2023', title: 'Managing High Blood Pressure', tags: ['Health'], img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    { id: 12, author: 'Alaa Z.', date: 'Sep 30, 2023', title: 'Healthy Eating for a Stronger Heart', tags: ['Lifestyle', 'Health'], img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(allStories.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentStories = allStories.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <main className="p-[24px]" style={{ "--story-muted": "#757575" }}>
        <StoriesHeader />

        <aside className="sr-only">
          <p>Doctor stories listing with pagination and quick actions.</p>
        </aside>

        <StoriesGrid stories={currentStories} onReadStory={(storyId) => navigate(`/doctor/stories/${storyId}`)} />

        <StoriesFooter
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          onGoToPage={(page) => setCurrentPage(page)}
        />
      </main>
    </>
  );
};

export default DoctorStories;
