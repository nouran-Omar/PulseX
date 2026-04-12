const StarRating = ({ rating, max = 5 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <span key={i} style={{ color: i < rating ? '#FACC15' : '#E5E7EB', fontSize: '14px' }}>
        ★
      </span>
    ))}
  </div>
);

export default StarRating;
