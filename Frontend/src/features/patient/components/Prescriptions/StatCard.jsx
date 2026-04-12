const StatCard = ({ label, value, accent, text, delay, visible }) => (
  <article
    className="bg-white rounded-2xl p-6 shadow-sm border-l-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default"
    style={{
      borderLeftColor: accent,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
    }}
  >
    <p className="text-[14px] text-[var(--rx-muted)] mb-2 m-0">{label}</p>
    <h2
      className="text-[30px] font-extrabold m-0 leading-none"
      style={{ color: text }}
    >
      {value}
    </h2>
  </article>
);

export default StatCard;
