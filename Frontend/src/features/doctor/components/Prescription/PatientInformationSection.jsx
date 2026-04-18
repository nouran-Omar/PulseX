import { HiOutlineUser } from 'react-icons/hi2';

const PatientInformationSection = ({ selectedPatient, onPatientChange, patientOptions, selectedPatientDetails }) => {
  return (
    <section className="rounded-2xl border border-[#E6EAF0] bg-white overflow-hidden">
      <div className="bg-[#EEF3FB] px-4 py-3">
        <h2 className="flex items-center gap-2 text-[16px] font-semibold text-black-main-text">
          <HiOutlineUser className="text-[14px] text-[#2563EB]" />
          <span>Patient Information</span>
        </h2>
      </div>

      <div className="p-4 sm:p-5">
        {selectedPatientDetails ? (
          <article className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
            <div className="flex items-center gap-3">
              <img src={selectedPatientDetails.avatar} alt={selectedPatientDetails.name} className="h-11 w-11 rounded-full object-cover" />
              <h3 className="text-[16px] font-semibold text-black-main-text">{selectedPatientDetails.name}</h3>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-[12px] text-[#6B7280] sm:grid-cols-5">
              <div><p>Patient ID</p><p className="font-semibold text-black-main-text">{selectedPatientDetails.id.toUpperCase()}</p></div>
              <div><p>Gender</p><p className="font-semibold text-black-main-text">{selectedPatientDetails.gender}</p></div>
              <div><p>Age</p><p className="font-semibold text-black-main-text">{selectedPatientDetails.age}</p></div>
              <div><p>Visit Type</p><p className="font-semibold text-black-main-text">{selectedPatientDetails.visitType}</p></div>
            </div>
          </article>
        ) : (
          <>
            <label htmlFor="patient-select" className="mb-2 block text-[13px] font-semibold text-[#374151]">
              Select Patient <span className="text-[#DC2626]">*</span>
            </label>

            <input
              id="patient-select"
              type="text"
              list="doctor-prescription-patient-list"
              value={selectedPatient}
              onChange={(event) => onPatientChange(event.target.value)}
              placeholder="Search by name or patient ID..."
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-[14px] text-[#111827] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#333CF5]"
            />

            <datalist id="doctor-prescription-patient-list">
              {patientOptions.map((patient) => (
                <option key={patient.id} value={`${patient.name} - ${patient.id}`} />
              ))}
            </datalist>
          </>
        )}
      </div>
    </section>
  );
};

export default PatientInformationSection;
