import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Toast from '../../../../components/Toast/Toast';
import BookingCalendar from '../../components/Booking/BookingCalendar';
import BookingSidebar from '../../components/Booking/BookingSidebar';
import BookingTimeSlots from '../../components/Booking/BookingTimeSlots';

const DOCTORS_DB = {
  1:  { name: 'DR. Walid Ali',      title: 'Specialist Doctor',   rate: 4.9, reviews: 127, price: 200, img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&q=80' },
  2:  { name: 'DR. Tamer Megahd',   title: 'Cardiologist',        rate: 4.7, reviews: 98,  price: 80,  img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&q=80' },
  3:  { name: 'DR. Jehan Osama',    title: 'Heart Specialist',    rate: 4.5, reviews: 210, price: 400, img: 'https://images.unsplash.com/photo-1559839734-2b71f1536780?w=150&q=80' },
  4:  { name: 'DR. Ali Ramez',      title: 'Cardiologist',        rate: 4.8, reviews: 88,  price: 300, img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&q=80' },
  5:  { name: 'DR. Noha Ahmed',     title: 'Cardiac Surgeon',     rate: 4.4, reviews: 156, price: 85,  img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&q=80' },
  6:  { name: 'DR. Zena Mahmoud',   title: 'Heart Specialist',    rate: 4.6, reviews: 76,  price: 120, img: 'https://images.unsplash.com/photo-1623854767233-243a6496667a?w=150&q=80' },
  7:  { name: 'DR. Ahmed Hassan',   title: 'Senior Cardiologist', rate: 4.9, reviews: 210, price: 150, img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&q=80' },
  8:  { name: 'DR. Sara Khalil',    title: 'Cardiologist',        rate: 4.5, reviews: 85,  price: 100, img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=150&q=80' },
  9:  { name: 'DR. Layla Ibrahim',  title: 'Cardiac Specialist',  rate: 4.8, reviews: 176, price: 250, img: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=150&q=80' },
  10: { name: 'DR. Omar Farouk',    title: 'Heart Surgeon',       rate: 4.6, reviews: 95,  price: 180, img: 'https://images.unsplash.com/photo-1605684954998-685c79d6a018?w=150&q=80' },
  11: { name: 'DR. Mona Saeed',     title: 'Cardiologist',        rate: 4.3, reviews: 60,  price: 70,  img: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=150&q=80' },
  12: { name: 'DR. Khaled Mansour', title: 'Senior Specialist',   rate: 4.9, reviews: 310, price: 350, img: 'https://images.unsplash.com/photo-1638202993928-7d113b8e4519?w=150&q=80' },
};

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const ALL_TIMES = ['05:30 PM', '06:30 PM', '07:30 PM', '08:30 PM', '09:30 PM'];

const getAvailableDays = (year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const available = new Set();
  for (let d = 1; d <= daysInMonth; d++) {
    const dow = new Date(year, month, d).getDay();
    if (dow === 5 || dow === 6) continue;
    if (d % 2 !== 0 || d > 10) available.add(d);
  }
  return available;
};

const getTimesForDay = (day) => {
  if (day % 3 === 0) return ALL_TIMES.slice(0, 3);
  if (day % 2 === 0) return ALL_TIMES.slice(1, 4);
  return ALL_TIMES;
};

const PatientBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = DOCTORS_DB[Number(id)] || DOCTORS_DB[1];

  const [calYear, setCalYear] = useState(2025);
  const [calMonth, setCalMonth] = useState(9);
  const [selectedDate, setSelectedDate] = useState({ day: 15, month: 9, year: 2025 });
  const [selectedTime, setSelectedTime] = useState(null);
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  useEffect(() => {
    document.title = 'Booking | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Book your appointment with a doctor.');
    }
  }, []);

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
  const availableDays = getAvailableDays(calYear, calMonth);
  const timesForDay = getTimesForDay(selectedDate.day);

  const isSelectedDay = (day) => selectedDate.day === day && selectedDate.month === calMonth && selectedDate.year === calYear;
  const stepperDateLabel = `${selectedDate.day} ${MONTH_NAMES[selectedDate.month].slice(0, 3)}, ${selectedDate.year}`;
  const selectedDow = new Date(selectedDate.year, selectedDate.month, selectedDate.day).getDay();
  const dayOfWeekLabel = `${DAY_NAMES[selectedDow]}, ${selectedDate.day}. ${MONTH_NAMES[selectedDate.month]}`;
  const calHeaderLabel = `${MONTH_NAMES[calMonth]} ${calYear}`;

  const goPrevMonth = useCallback(() => {
    if (calMonth === 0) { setCalYear((y) => y - 1); setCalMonth(11); }
    else setCalMonth((m) => m - 1);
    setSelectedTime(null);
  }, [calMonth]);

  const goNextMonth = useCallback(() => {
    if (calMonth === 11) { setCalYear((y) => y + 1); setCalMonth(0); }
    else setCalMonth((m) => m + 1);
    setSelectedTime(null);
  }, [calMonth]);

  const handleDayClick = (day) => {
    if (!availableDays.has(day)) return;
    setSelectedDate({ day, month: calMonth, year: calYear });
    setSelectedTime(null);
  };

  const handleConfirm = () => {
    if (!selectedTime) {
      setToast({ visible: true, title: 'No Time Selected', message: 'Please choose a time slot.' });
      return;
    }
    navigate(`/patient/payment/${id}`, {
      state: {
        doctorName: doctor.name,
        date: stepperDateLabel,
        time: selectedTime,
        price: doctor.price,
      },
    });
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-start bg-[#F9FAFB] p-4 sm:p-6 lg:p-8"
      style={{
        "--book-muted": "#010218B2",
        "--book-muted-2": "#757575B2",
        "--book-muted-3": "#9CA3AF",
      }}
    >
      <h1 className="sr-only">Book an appointment</h1>

      <aside aria-live="polite">
        <Toast {...toast} onClose={() => setToast((t) => ({ ...t, visible: false }))} />
      </aside>

      <article className="w-full max-w-5xl bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="flex flex-col lg:flex-row">
          <BookingSidebar
            doctor={doctor}
            stepperDateLabel={stepperDateLabel}
            selectedTime={selectedTime}
            locationLabel="City Medical Center"
          />

          <section className="flex-1 p-6 sm:p-8" aria-label="Select date and time">
            <h2 className="text-2xl font-bold text-black-main-text mb-6 sm:mb-8 text-center sm:text-left">Select date &amp; time</h2>

            <div className="flex flex-col xl:flex-row gap-8 sm:gap-10">
              <BookingCalendar
                calHeaderLabel={calHeaderLabel}
                weekDays={WEEK_DAYS}
                daysInMonth={daysInMonth}
                firstDayOfWeek={firstDayOfWeek}
                availableDays={availableDays}
                isSelectedDay={isSelectedDay}
                onPrev={goPrevMonth}
                onNext={goNextMonth}
                onDayClick={handleDayClick}
              />

              <BookingTimeSlots
                dayLabel={dayOfWeekLabel}
                timesForDay={timesForDay}
                selectedTime={selectedTime}
                onSelect={setSelectedTime}
              />
            </div>
          </section>
        </div>
      </article>

      <button
        onClick={handleConfirm}
        className="cursor-pointer bg-[#333cf5] text-white font-bold text-base px-10 sm:px-16 py-3.5 sm:py-4 rounded-full hover:bg-blue-700 transition shadow-xl shadow-blue-100 active:scale-95 w-full sm:w-auto max-w-[90%]"
      >
        Confirm Appointment
      </button>

      <footer className="sr-only">
        <p>End of booking page.</p>
      </footer>
    </main>
  );
};

export default PatientBooking;
