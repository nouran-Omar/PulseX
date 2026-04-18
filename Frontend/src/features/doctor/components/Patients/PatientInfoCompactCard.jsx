const PatientInfoCompactCard = ({ patient }) => {
  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4" aria-labelledby="patient-info-card-title">
      <h2 id="patient-info-card-title" className="text-[24px] font-bold text-black-main-text">Patient Information</h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[70px_1fr_1fr_1fr_1fr] items-center">
        <img src={patient.avatar} alt={patient.name} className="h-14 w-14 rounded-full object-cover" />
        <div><p className="text-[12px] text-[#6B7280]">Patient Name</p><p className="text-[14px] font-semibold">{patient.name}</p></div>
        <div><p className="text-[12px] text-[#6B7280]">Age</p><p className="text-[14px] font-semibold">{patient.age} years old</p></div>
        <div><p className="text-[12px] text-[#6B7280]">Gender</p><p className="text-[14px] font-semibold">{patient.gender}</p></div>
        <div><p className="text-[12px] text-[#6B7280]">Risk Level</p><p className="inline-block rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[12px] font-semibold text-[#166534]">{patient.riskLevel}</p></div>
      </div>
    </section>
  );
};

export default PatientInfoCompactCard;
