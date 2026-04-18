const riskClass = (risk) => {
  if (risk === 'High Risk') return 'bg-[#FEE2E2] text-[#B91C1C]';
  if (risk === 'Moderate') return 'bg-[#FEF3C7] text-[#92400E]';
  return 'bg-[#DCFCE7] text-[#166534]';
};

const CriticalPatientsCard = ({ patients, onViewMore }) => {
  if (!patients.length) {
    return (
      <section className="rounded-3xl border border-[#E6EAF0] bg-white p-4" aria-labelledby="critical-title-empty">
        <h2 id="critical-title-empty" className="text-[24px] font-bold text-black-main-text">Critical Patients</h2>
        <div className="mx-auto mt-8 h-12 w-12 rounded-full bg-[#DCFCE7]" />
        <p className="mt-8 text-center text-[22px] font-bold text-black-main-text">All Patients Stable</p>
        <p className="mt-2 text-center text-[14px] text-[#6B7280]">Great news! You currently have no critical patients.</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-[#E6EAF0] bg-white p-4" aria-labelledby="critical-title">
      <div className="flex items-center justify-between rounded-2xl bg-[#F3F4F6] px-3 py-2">
        <h2 id="critical-title" className="text-[24px] font-bold text-black-main-text">Critical Patients</h2>
        <button type="button" onClick={onViewMore} className="text-[12px] font-semibold text-[#6B7280]">View More</button>
      </div>

      <div className="mt-3 space-y-0">
        {patients.map((patient) => (
          <article key={patient.id} className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-3 py-3 last:border-b-0">
            <div className="flex items-center gap-2">
              <img src={patient.avatar} alt={patient.name} className="h-8 w-8 rounded-full object-cover" />
              <div>
                <p className="text-[13px] font-semibold text-black-main-text">{patient.name}</p>
                <p className="text-[11px] text-[#9CA3AF]">{patient.date}</p>
              </div>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${riskClass(patient.risk)}`}>
              {patient.risk}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CriticalPatientsCard;
