import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DoctorAbout from '../../components/DoctorProfile/DoctorAbout';
import DoctorExperience from '../../components/DoctorProfile/DoctorExperience';
import DoctorHero from '../../components/DoctorProfile/DoctorHero';
import DoctorStats from '../../components/DoctorProfile/DoctorStats';

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

const PatientDoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Doctor Profile | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'View doctor profile details, ratings, and experience.');
    }
  }, []);

  const doctor = DOCTORS_DB[Number(id)] || DOCTORS_DB[1];

  const handleMessage = () => {
    if (doctor.hasAppointment) navigate('/patient/messages', { state: { doctorId: Number(id) } });
  };

  return (
    <main
      className="min-h-screen"
      style={{
        "--doc-muted": "#6B7280",
        "--doc-muted-2": "#4A5565",
      }}
    >
      <DoctorHero
        doctor={doctor}
        onBook={() => navigate(`/patient/booking/${id}`)}
        onMessage={handleMessage}
      />

      <section className="p-4 sm:p-5" aria-label="Doctor profile details">
        <DoctorStats doctor={doctor} />
        <DoctorAbout doctor={doctor} />
        <DoctorExperience experience={EXPERIENCE} />
      </section>

      <footer className="sr-only">
        <p>End of doctor profile page.</p>
      </footer>
    </main>
  );
};

export default PatientDoctorProfile;
