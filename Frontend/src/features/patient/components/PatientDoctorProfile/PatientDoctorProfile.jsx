import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  HiStar, HiOutlineLocationMarker, HiOutlineBriefcase,
  HiOutlineUserGroup, HiOutlineChat
} from 'react-icons/hi';
import { MdOutlineAttachMoney } from 'react-icons/md';

/* ── Mock doctors data ── */
const DOCTORS_DB = {
  1:  { name: 'Dr. Walid Ali',      title: 'Specialist Doctor - Cardiology',  rate: 4.9, reviews: 127, price: 200, loc: 'Cairo, Egypt',      patients: '500+', exp: '10+ Years', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80', hasAppointment: false },
  2:  { name: 'Dr. Tamer Megahd',   title: 'Cardiologist',                    rate: 4.7, reviews: 98,  price: 80,  loc: 'Giza, Egypt',       patients: '300+', exp: '7+ Years',  img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80', hasAppointment: true  },
  3:  { name: 'Dr. Jehan Osama',    title: 'Heart Specialist',                rate: 4.5, reviews: 210, price: 400, loc: 'Menoufia, Egypt',   patients: '700+', exp: '15+ Years', img: 'https://images.unsplash.com/photo-1559839734-2b71f1536780?w=200&q=80',  hasAppointment: false },
  4:  { name: 'Dr. Ali Ramez',      title: 'Cardiologist',                    rate: 4.8, reviews: 88,  price: 300, loc: 'Cairo, Egypt',      patients: '400+', exp: '12+ Years', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80', hasAppointment: true  },
  5:  { name: 'Dr. Noha Ahmed',     title: 'Cardiac Surgeon',                 rate: 4.4, reviews: 156, price: 85,  loc: 'Alexandria, Egypt', patients: '600+', exp: '9+ Years',  img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80',  hasAppointment: false },
  6:  { name: 'Dr. Zena Mahmoud',   title: 'Heart Specialist',                rate: 4.6, reviews: 76,  price: 120, loc: 'Fayoum, Egypt',     patients: '250+', exp: '8+ Years',  img: 'https://images.unsplash.com/photo-1623854767233-243a6496667a?w=200&q=80', hasAppointment: false },
  7:  { name: 'Dr. Ahmed Hassan',   title: 'Senior Cardiologist',             rate: 4.9, reviews: 210, price: 150, loc: 'Cairo, Egypt',      patients: '800+', exp: '18+ Years', img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&q=80',  hasAppointment: true  },
  8:  { name: 'Dr. Sara Khalil',    title: 'Cardiologist',                    rate: 4.5, reviews: 85,  price: 100, loc: 'Giza, Egypt',       patients: '350+', exp: '6+ Years',  img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=200&q=80',  hasAppointment: false },
  9:  { name: 'Dr. Layla Ibrahim',  title: 'Cardiac Specialist',              rate: 4.8, reviews: 176, price: 250, loc: 'Alexandria, Egypt', patients: '550+', exp: '11+ Years', img: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&q=80',  hasAppointment: true  },
  10: { name: 'Dr. Omar Farouk',    title: 'Heart Surgeon',                   rate: 4.6, reviews: 95,  price: 180, loc: 'Cairo, Egypt',      patients: '420+', exp: '13+ Years', img: 'https://images.unsplash.com/photo-1605684954998-685c79d6a018?w=200&q=80',  hasAppointment: false },
  11: { name: 'Dr. Mona Saeed',     title: 'Cardiologist',                    rate: 4.3, reviews: 60,  price: 70,  loc: 'Giza, Egypt',       patients: '200+', exp: '5+ Years',  img: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=200&q=80',  hasAppointment: false },
  12: { name: 'Dr. Khaled Mansour', title: 'Senior Heart Specialist',         rate: 4.9, reviews: 310, price: 350, loc: 'Menoufia, Egypt',   patients: '900+', exp: '20+ Years', img: 'https://images.unsplash.com/photo-1638202993928-7d113b8e4519?w=200&q=80', hasAppointment: true  },
};

const EXPERIENCE = [
  { icon: '🏥', title: 'Senior Cardiologist',             place: 'Cairo Heart Institute • 2018 - Present',           desc: 'Leading cardiology department, specializing in complex interventional procedures and heart failure management.' },
  { icon: '🏥', title: 'Cardiology Consultant',           place: 'Al-Noor Medical Center • 2014 - 2018',             desc: 'Provided comprehensive cardiac care including diagnostics, treatment planning, and patient follow-ups.' },
  { icon: '🎓', title: 'Medical Degree & Specialization', place: 'Cairo University Faculty of Medicine • 2008 - 2014', desc: 'M.D. in Internal Medicine with specialization in Cardiovascular Diseases.' },
  { icon: '📜', title: 'Board Certifications',            place: '',                                                  desc: '• Board Certified in Cardiovascular Disease\n• Fellow of the American College of Cardiology (FACC)\n• Advanced Cardiac Life Support (ACLS) Certified' },
];

const StatItem = ({ icon, bg, color, label, value }) => (
  <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-2 sm:gap-3 lg:border-r lg:border-gray-100 last:border-0 sm:pr-2 lg:pr-4 text-center sm:text-left justify-center sm:justify-start">
    <div className={`w-9 h-9 rounded-full ${bg} ${color} flex items-center justify-center text-2xl shrink-0`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-text-dim2">{label}</p>
      <p className="text-lg font-semibold text-black-main-text">{value}</p>
    </div>
  </div>
);

const PatientDoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = DOCTORS_DB[Number(id)] || DOCTORS_DB[1];

  const handleMessage = () => {
    if (doctor.hasAppointment) navigate('/patient/messages', { state: { doctorId: Number(id) } });
  };

  return (
    <div className="min-h-screen">

      {/* ── Hero Card ── */}
      <div className="bg-brand-main rounded-2xl p-6 sm:p-10 lg:p-14 mb-5 flex flex-col md:flex-row items-center md:items-start lg:items-center gap-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 flex-1 w-full">
          <img
            src={doctor.img} alt={doctor.name}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover border-4 border-white shrink-0"
            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${doctor.name}&background=5B65F8&color=fff`; }}
          />
          <div className="flex flex-col items-center sm:items-start w-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center sm:text-left">{doctor.name}</h1>
            <p className="text-[#DBEAFE] text-base sm:text-lg mt-0.5">{doctor.title}</p>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2 bg-[#FFFFFF33] rounded-full px-3 py-2 w-fit mx-auto sm:mx-0">
              <HiStar className="text-[#FDC700] text-lg " />
              <span className="text-white text-lg font-semibold">{doctor.rate}</span>
              <span className="text-[#DBEAFE] text-base">· {doctor.reviews} reviews</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3.5 w-full md:w-auto shrink-0 mt-4 md:mt-0">
          <button
            onClick={() => navigate(`/patient/booking/${id}`)}
            className="bg-white cursor-pointer text-brand-main font-semibold text-base px-6 py-2.5 rounded-xl hover:bg-blue-50 transition w-full md:w-50"
          >
            Book Appointment
          </button>
          <button
            onClick={handleMessage}
            disabled={!doctor.hasAppointment}
            title={!doctor.hasAppointment ? 'Book an appointment first to message' : 'Go to messages'}
            className={`flex items-center justify-center gap-2 font-semibold text-base px-6 py-2.5 rounded-xl border transition w-full md:w-50 cursor-pointer disabled:cursor-not-allowed
              ${doctor.hasAppointment
                ? 'bg-white text-brand-main border-white/30 hover:bg-white'
                : 'bg-[#E5E7EB] border-white/15 text-gray-text-dim2'}`}
          >
            <HiOutlineChat className="text-base" />
            Message Now
          </button>
        </div>
      </div>
      <div className='p-4 sm:p-5'>
      {/* ── Stats Row ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 sm:px-8 py-4 mb-5 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
        <StatItem icon={<MdOutlineAttachMoney />} bg="bg-[#DCFCE7]"  color="text-[#00A63E]"  label="Price"      value={`$${doctor.price} / session`} />
        <StatItem icon={<HiOutlineLocationMarker />} bg="bg-[#DBEAFE]" color="text-brand-main"  label="Location"   value={doctor.loc} />
        <StatItem icon={<HiOutlineUserGroup />}    bg="bg-[#F3E8FF]" color="text-[#9810FA]" label="Patients"   value={doctor.patients} />
        <StatItem icon={<HiOutlineBriefcase />}    bg="bg-[#FFEDD4]" color="text-[#F54900]" label="Experience" value={doctor.exp} />
      </div>

      {/* ── About ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7 mb-5">
        <h2 className="text-xl font-bold text-black-main-text mb-3 text-center sm:text-left">About {doctor.name}</h2>
        <p className="text-base text-[#4A5565] leading-relaxed">
          {doctor.name} is a highly experienced cardiologist with over a decade of practice in cardiovascular medicine.
          They specialize in preventive cardiology, heart disease management, and interventional procedures, committed to
          providing personalized, evidence-based care to each patient. Their approach combines the latest medical research
          with compassionate patient care, ensuring every individual receives the attention and expertise they deserve.
        </p>
      </div>

      {/* ── Professional Experience ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7">
        <h2 className="text-lg font-bold text-black-main-text mb-4 text-center sm:text-left">Professional Experience</h2>
        <div className="flex flex-col gap-5">
          {EXPERIENCE.map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
              <div className="w-9 h-9 rounded-xl bg-[#4C51F71A] text-[#4C51F7] flex items-center justify-center text-base shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-black-main-text text-center sm:text-left">{item.title}</h3>
                {item.place && <p className="text-sm text-gray-text-dim2 mt-0.5">{item.place}</p>}
                <p className="text-sm text-gray-text-dim2 mt-1 whitespace-pre-line">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
</div>
    </div>
  );
};

export default PatientDoctorProfile;
