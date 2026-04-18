import React, { useEffect, useMemo, useState } from 'react';
import ConfirmModal from '../../../admin/components/ConfirmModal/ConfirmModal';
import AvailabilityCalendar from '../../components/ScheduleSettings/AvailabilityCalendar';
import ScheduleSettingsHeader from '../../components/ScheduleSettings/ScheduleSettingsHeader';
import TodaySlotsPanel from '../../components/ScheduleSettings/TodaySlotsPanel';
import WeeklyRecurringSchedule from '../../components/ScheduleSettings/WeeklyRecurringSchedule';

const MONTH_LABEL = 'February 2026';
const DEFAULT_DAY = 20;

const INITIAL_SLOTS_BY_DAY = {
  20: ['05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM'],
  21: ['04:00 PM', '04:30 PM', '05:00 PM'],
  25: ['10:00 AM', '10:30 AM'],
  26: ['11:00 AM', '11:30 AM'],
  27: ['12:00 PM', '12:30 PM'],
  28: ['01:00 PM', '01:30 PM'],
  15: ['03:00 PM'],
  18: ['09:00 AM', '09:30 AM'],
};

const INITIAL_RECURRING = {
  Monday: { startTime: '', endTime: '', hours: '8h' },
  Tuesday: { startTime: '', endTime: '', hours: '8h' },
  Wednesday: { startTime: '', endTime: '', hours: '8h' },
  Thursday: { startTime: '', endTime: '', hours: '8h' },
  Friday: { startTime: '', endTime: '', hours: '8h' },
  Saturday: { startTime: '', endTime: '', hours: '' },
  Sunday: { startTime: '', endTime: '', hours: '' },
};

const pad = (n) => String(n).padStart(2, '0');

const to12h = (time24) => {
  if (!time24) return '';
  const [h, m] = time24.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const normalized = h % 12 || 12;
  return `${pad(normalized)}:${pad(m)} ${suffix}`;
};

const ScheduleSettings = () => {
  const [selectedDay, setSelectedDay] = useState(DEFAULT_DAY);
  const [slotsByDay, setSlotsByDay] = useState(INITIAL_SLOTS_BY_DAY);
  const [recurringSchedule, setRecurringSchedule] = useState(INITIAL_RECURRING);
  const [draftSlot, setDraftSlot] = useState({ date: '', startTime: '', endTime: '' });
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');

  useEffect(() => {
    document.title = 'Schedule Settings | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Doctor availability management page for selecting days, slots, and recurring schedules.');
    }
  }, []);

  const availableDays = useMemo(
    () => Object.keys(slotsByDay).map((day) => Number(day)).sort((a, b) => a - b),
    [slotsByDay]
  );

  const selectedSlots = slotsByDay[selectedDay] || [];

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  const handleDraftChange = (field, value) => {
    setDraftSlot((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSlot = () => {
    if (!draftSlot.date || !draftSlot.startTime) {
      setFlashMessage('Please select date and start time first.');
      setTimeout(() => setFlashMessage(''), 1800);
      return;
    }

    let day = Number.NaN;
    if (draftSlot.date.includes('-')) {
      day = Number(draftSlot.date.split('-')[2]);
    } else if (draftSlot.date.includes('/')) {
      day = Number(draftSlot.date.split('/')[1]);
    }

    if (Number.isNaN(day)) {
      setFlashMessage('Please enter date as YYYY-MM-DD or MM/DD/YYYY.');
      setTimeout(() => setFlashMessage(''), 1800);
      return;
    }
    const slot = to12h(draftSlot.startTime);

    setSlotsByDay((prev) => {
      const current = prev[day] || [];
      if (current.includes(slot)) return prev;
      const next = [...current, slot].sort();
      return { ...prev, [day]: next };
    });

    setSelectedDay(day);
    setFlashMessage('Single slot added successfully.');
    setTimeout(() => setFlashMessage(''), 1800);
  };

  const handleScheduleChange = (day, key, value) => {
    setRecurringSchedule((prev) => {
      const row = { ...prev[day], [key]: value };
      return { ...prev, [day]: row };
    });
  };

  const handleConfirmSave = () => {
    setConfirmSaveOpen(false);
    setFlashMessage('Recurring schedule saved.');
    setTimeout(() => setFlashMessage(''), 1800);
  };

  return (
    <main className="p-4 sm:p-[24px] flex flex-col gap-5" style={{ '--appt-muted': '#757575' }}>
      <ConfirmModal
        isOpen={!!confirmSaveOpen}
        title="Save Recurring Schedule?"
        desc="Are you sure you want to save the recurring schedule changes?"
        onConfirm={handleConfirmSave}
        onCancel={() => setConfirmSaveOpen(false)}
      />

      {flashMessage && (
        <section className="fixed top-6 right-6 z-[1200] bg-black-main-text text-white px-4 py-2 rounded-xl shadow-lg text-[13px]">
          {flashMessage}
        </section>
      )}

      <ScheduleSettingsHeader />

      <section className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5">
        <section className="flex flex-col gap-4">
          <AvailabilityCalendar
            monthLabel={MONTH_LABEL}
            selectedDay={selectedDay}
            availableDays={availableDays}
            onSelectDay={handleSelectDay}
          />

          <WeeklyRecurringSchedule
            recurringSchedule={recurringSchedule}
            onScheduleChange={handleScheduleChange}
            onSave={() => setConfirmSaveOpen(true)}
          />
        </section>

        <TodaySlotsPanel
          selectedDateLabel={`Friday, February ${selectedDay}`}
          slots={selectedSlots}
          draftSlot={draftSlot}
          onDraftChange={handleDraftChange}
          onAddSlot={handleAddSlot}
        />
      </section>
    </main>
  );
};

export default ScheduleSettings;
