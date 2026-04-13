import { HiOutlineLocationMarker, HiStar } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Stars = ({ rate }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map((i) => (
      <HiStar key={i} className={i <= rate ? 'text-yellow-400 text-sm' : 'text-gray-200 text-sm'} aria-label={i <= rate ? 'Filled star' : 'Empty star'} />
    ))}
  </div>
);

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center gap-2 hover:shadow-md transition">
      <img
        src={doctor.img}
        alt={`Avatar of ${doctor.name}`}
        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${doctor.name}&background=E8EAF6&color=333CF5`; }}
      />
      <h3 className="text-[20px] font-bold text-black-main-text mt-1">{doctor.name}</h3>
      <div className="flex items-center gap-1 text-[14px] text-[var(--doc-list-muted)]">
        <HiOutlineLocationMarker className="text-[var(--doc-list-muted)]" aria-label="Location" /> {doctor.loc}
      </div>
      <div className="flex items-center gap-1.5">
        <Stars rate={doctor.rate} />
        <span className="text-[14px] text-[var(--doc-list-muted)]">({doctor.reviews} reviews)</span>
      </div>
      <p className="text-sm text-[var(--doc-list-muted)] mt-1">
        <span className="text-[24px] font-bold text-black-main-text">${doctor.price}</span>
        <span className="text-[14px] text-[var(--doc-list-muted)]"> / session</span>
      </p>
      <button
        onClick={() => navigate(`/patient/doctor-profile/${doctor.id}`)}
        className="w-full mt-4 cursor-pointer py-2.5 rounded-full bg-brand-main text-white text-sm font-semibold hover:bg-[#2730d4] transition"
      >
        Book Now
      </button>
    </article>
  );
};

export default DoctorCard;
