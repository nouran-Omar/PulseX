import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineXCircle,
} from 'react-icons/hi2';

const AppointmentsList = ({ list, activeTab, onCancel }) => {
  return (
    <section className="flex flex-col gap-4" aria-label="Appointments list">
      {list.length === 0 && (
        <p className="text-[16px] text-[var(--appt-muted)] text-center py-8">No {activeTab} appointments.</p>
      )}
      {list.map((app) => (
        <article
          key={app.id}
          className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col md:flex-row items-center md:items-center justify-between gap-5 transition-all hover:shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-4 w-full md:w-auto text-center sm:text-left">
            <img
              src={app.img}
              alt={`Avatar of ${app.doc}`}
              className="w-20 h-20 sm:w-16 sm:h-16 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
            />
            <div className="flex flex-col gap-2 sm:gap-1.5 w-full">
              <h3 className="text-[24px] font-bold text-black-main-text">{app.doc}</h3>
              <div className="flex flex-col sm:flex-row flex-wrap items-center sm:items-start justify-center sm:justify-start gap-2 sm:gap-4 w-full">
                <div className="flex items-center gap-1.5 text-[16px] text-[var(--appt-muted)] bg-gray-50 sm:bg-transparent px-3 py-1.5 sm:px-0 sm:py-0 rounded-lg shrink-0">
                  <HiOutlineCalendarDays className="text-[var(--appt-muted)]" aria-label="Date" />
                  {app.date} &ndash; {app.time}
                </div>
                <div className="hidden sm:block text-gray-300">•</div>
                <div className="flex items-center gap-1.5 text-[16px] text-[var(--appt-muted)] bg-gray-50 sm:bg-transparent px-3 py-1.5 sm:px-0 sm:py-0 rounded-lg shrink-0">
                  <HiOutlineBanknotes className="text-[var(--appt-muted)]" aria-label="Payment method" />
                  {app.method}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[16px] text-[var(--appt-muted)] bg-gray-50 sm:bg-transparent px-3 py-1.5 sm:px-0 sm:py-0 rounded-lg w-fit mx-auto sm:mx-0 shrink-0">
                <HiOutlineMapPin className="text-[var(--appt-muted)]" aria-label="Location" />
                {app.loc}
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto mt-2 md:mt-0 flex justify-center md:justify-end border-t border-gray-100 md:border-none pt-4 md:pt-0 shrink-0">
            {activeTab === 'upcoming' ? (
              <button
                className="flex flex-1 sm:flex-none items-center justify-center cursor-pointer gap-2 text-[#DC2626] bg-red-50 hover:bg-[#DC2626] hover:text-white rounded-xl px-5 py-2.5 text-[16px] font-bold transition-all"
                onClick={() => onCancel(app.id)}
              >
                <HiOutlineXCircle className="text-[20px]" aria-label="Cancel" /> Cancel Appointment
              </button>
            ) : (
              <span className="bg-[#D1FAE5] text-[#10B981] border border-[#10B981]/20 rounded-full px-6 flex items-center justify-center h-[44px] text-[16px] font-bold w-full sm:w-auto">
                Completed
              </span>
            )}
          </div>
        </article>
      ))}
    </section>
  );
};

export default AppointmentsList;
