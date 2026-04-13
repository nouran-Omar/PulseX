const DoctorAbout = ({ doctor }) => {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7 mb-5" aria-labelledby="doctor-about-title">
      <h2 id="doctor-about-title" className="text-xl font-bold text-black-main-text mb-3 text-center sm:text-left">
        About {doctor.name}
      </h2>
      <p className="text-base text-[var(--doc-muted-2)] leading-relaxed">
        {doctor.name} is a highly experienced cardiologist with over a decade of practice in cardiovascular medicine.
        They specialize in preventive cardiology, heart disease management, and interventional procedures, committed to
        providing personalized, evidence-based care to each patient. Their approach combines the latest medical research
        with compassionate patient care, ensuring every individual receives the attention and expertise they deserve.
      </p>
    </section>
  );
};

export default DoctorAbout;
