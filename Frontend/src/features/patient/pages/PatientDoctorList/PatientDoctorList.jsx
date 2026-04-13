import React, { useEffect, useMemo, useState } from 'react';
import DoctorFilters from '../../components/DoctorList/DoctorFilters';
import DoctorGrid from '../../components/DoctorList/DoctorGrid';
import DoctorListHeader from '../../components/DoctorList/DoctorListHeader';
import DoctorListStats from '../../components/DoctorList/DoctorListStats';
import DoctorPagination from '../../components/DoctorList/DoctorPagination';

const ALL_DOCTORS = [
  { id: 1,  name: 'Dr. Walid Ali',      loc: 'Cairo',      rate: 5, reviews: 124, price: 200, img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80' },
  { id: 2,  name: 'Dr. Tamer Megahd',   loc: 'Giza',       rate: 4, reviews: 124, price: 80,  img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80' },
  { id: 3,  name: 'Dr. Jehan Osama',    loc: 'Menoufia',   rate: 4, reviews: 124, price: 400, img: 'https://images.unsplash.com/photo-1559839734-2b71f1536780?w=300&q=80' },
  { id: 4,  name: 'Dr. Ali Ramez',      loc: 'Cairo',      rate: 3, reviews: 124, price: 300, img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&q=80' },
  { id: 5,  name: 'Dr. Noha Ahmed',     loc: 'Alexandria', rate: 3, reviews: 124, price: 80,  img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&q=80' },
  { id: 6,  name: 'Dr. Zena Mahmoud',   loc: 'Fayoum',     rate: 2, reviews: 124, price: 120, img: 'https://images.unsplash.com/photo-1623854767233-243a6496667a?w=300&q=80' },
  { id: 7,  name: 'Dr. Ahmed Hassan',   loc: 'Cairo',      rate: 5, reviews: 210, price: 150, img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&q=80' },
  { id: 8,  name: 'Dr. Sara Khalil',    loc: 'Giza',       rate: 4, reviews: 85,  price: 100, img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=300&q=80' },
  { id: 9,  name: 'Dr. Layla Ibrahim',  loc: 'Alexandria', rate: 5, reviews: 176, price: 250, img: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&q=80' },
  { id: 10, name: 'Dr. Omar Farouk',    loc: 'Cairo',      rate: 4, reviews: 95,  price: 180, img: 'https://images.unsplash.com/photo-1605684954998-685c79d6a018?w=300&q=80' },
  { id: 11, name: 'Dr. Mona Saeed',     loc: 'Giza',       rate: 3, reviews: 60,  price: 70,  img: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=300&q=80' },
  { id: 12, name: 'Dr. Khaled Mansour', loc: 'Menoufia',   rate: 5, reviews: 310, price: 350, img: 'https://images.unsplash.com/photo-1638202993928-7d113b8e4519?w=300&q=80' },
];

const LOCATIONS = ['All', ...new Set(ALL_DOCTORS.map((d) => d.loc))];
const PRICE_RANGES = [
  { label: 'All',        min: 0,   max: Infinity },
  { label: '$0–$100',    min: 0,   max: 100 },
  { label: '$100–$200',  min: 100, max: 200 },
  { label: '$200+',      min: 200, max: Infinity },
];
const PER_PAGE = 6;

const PatientDoctorList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('All');
  const [priceRange, setPriceRange] = useState(0);
  const [rating, setRating] = useState('all');

  useEffect(() => {
    document.title = 'Doctor List | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Browse and book appointments with heart specialists.');
    }
  }, []);

  const filtered = useMemo(() => {
    const pr = PRICE_RANGES[priceRange];
    return ALL_DOCTORS.filter((d) => {
      const matchName = d.name.toLowerCase().includes(search.toLowerCase());
      const matchLoc = location === 'All' || d.loc === location;
      const matchPrice = d.price >= pr.min && d.price < pr.max;
      const matchRate = rating === 'all' || d.rate >= parseInt(rating, 10);
      return matchName && matchLoc && matchPrice && matchRate;
    });
  }, [search, location, priceRange, rating]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);
  const goTo = (p) => setPage(Math.min(Math.max(1, p), totalPages));
  const pageNums = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 4);

  return (
    <main
      className="min-h-screen p-6 sm:p-[24px]"
      style={{
        "--doc-list-muted": "#757575",
        "--doc-list-muted-2": "#ACACAC",
        "--doc-list-muted-3": "#9CA3AF",
      }}
    >
      <DoctorListHeader />

      <DoctorListStats totalDoctors={ALL_DOCTORS.length} />

      <DoctorFilters
        search={search}
        onSearch={(value) => { setSearch(value); setPage(1); }}
        rating={rating}
        onRatingChange={(value) => { setRating(value); setPage(1); }}
        location={location}
        onLocationChange={(value) => { setLocation(value); setPage(1); }}
        priceRange={priceRange}
        onPriceRangeChange={(value) => { setPriceRange(value); setPage(1); }}
        locations={LOCATIONS}
        priceRanges={PRICE_RANGES}
      />

      <DoctorGrid doctors={visible} />

      <DoctorPagination
        safePage={safePage}
        totalPages={totalPages}
        pageNums={pageNums}
        onGoTo={goTo}
      />

      <footer className="sr-only">
        <p>End of doctor list page.</p>
      </footer>
    </main>
  );
};

export default PatientDoctorList;
