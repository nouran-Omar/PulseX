import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiStar, HiOutlineStar } from 'react-icons/hi2';
import { MdOutlineSchedule } from 'react-icons/md';
import styles from './PatientRatingModal.module.css';

/**
 * PatientRatingModal
 *
 * Props:
 *  isOpen      – boolean
 *  onClose     – () => void   (X / Maybe Later)
 *  onSubmit    – (rating, feedback) => void
 *  doctor      – { name, specialty, img, appointmentDate }
 */
const PatientRatingModal = ({ isOpen, onClose, onSubmit, doctor }) => {
  const [rating,   setRating]   = useState(0);
  const [hovered,  setHovered]  = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const doctorName = doctor?.name        ?? 'Dr. Jehan Osama';
  const doctorImg  = doctor?.img         ?? 'https://images.unsplash.com/photo-1559839734-2b71f1536780?w=200&q=80';
  const apptDate   = doctor?.appointmentDate ?? 'December 15, 2024 at 3:00 PM';

  const handleSubmit = () => {
    if (!rating) return;
    setSubmitted(true);
    setTimeout(() => {
      onSubmit?.(rating, feedback);
      // reset for next use
      setRating(0);
      setHovered(0);
      setFeedback('');
      setSubmitted(false);
      onClose?.();
    }, 1400);
  };

  const handleClose = () => {
    setRating(0);
    setHovered(0);
    setFeedback('');
    setSubmitted(false);
    onClose?.();
  };

  const active = hovered || rating;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 30,  scale: 0.96 }}
            transition={{ duration: 0.26, ease: 'easeOut' }}
          >
            {/* ── close ── */}
            <button className={styles.closeBtn} onClick={handleClose}>
              <HiXMark />
            </button>

            {/* ── doctor avatar ── */}
            <div className={styles.avatarRing}>
              <img src={doctorImg} alt={doctorName} className={styles.docAvatar}
                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${doctorName}&background=5B65F8&color=fff`; }} />
            </div>

            {/* ── title ── */}
            <h2 className={styles.title}>How was your visit?</h2>
            <p className={styles.subtitle}>Rate your experience with {doctorName}</p>

            {/* ── appointment info pill ── */}
            <div className={styles.apptPill}>
              <div className={styles.apptIcon}>
                <MdOutlineSchedule />
              </div>
              <div>
                <p className={styles.apptLabel}>Recent Appointment</p>
                <p className={styles.apptDate}>{apptDate}</p>
              </div>
            </div>

            {/* ── star rating ── */}
            <p className={styles.rateLabel}>Rate your experience</p>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={styles.starBtn}
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(n)}
                >
                  {n <= active
                    ? <HiStar    className={styles.starFilled} />
                    : <HiOutlineStar className={styles.starEmpty} />
                  }
                </button>
              ))}
            </div>
            {!rating && <p className={styles.rateHint}>Select a rating</p>}
            {rating > 0 && (
              <p className={styles.rateHint}>
                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
              </p>
            )}

            {/* ── feedback textarea ── */}
            <div className={styles.feedbackWrap}>
              <label className={styles.feedbackLabel}>
                Share your feedback <span className={styles.optional}>(Optional)</span>
              </label>
              <textarea
                className={styles.textarea}
                rows={4}
                placeholder={`Tell us about your experience with ${doctorName}. What did you like? What could be improved?`}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <p className={styles.feedbackHint}>Your feedback helps us improve our services</p>
            </div>

            {/* ── submit ── */}
            <button
              className={[
                styles.submitBtn,
                submitted  ? styles.submitSuccess :
                rating > 0 ? styles.submitActive  :
                             styles.submitDisabled,
              ].join(' ')}
              onClick={handleSubmit}
              disabled={!rating || submitted}
            >
              {submitted ? (
                <span className={styles.submitInner}>
                  <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Review Submitted!
                </span>
              ) : (
                <span className={styles.submitInner}>
                  <svg className={styles.sendIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  Submit Review
                </span>
              )}
            </button>

            {/* ── maybe later ── */}
            <button className={styles.laterBtn} onClick={handleClose}>
              Maybe Later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PatientRatingModal;
