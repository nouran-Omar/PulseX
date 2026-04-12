import SectionHeader from './SectionHeader';
import ProgressRing from './ProgressRing';

const RightColumn = ({ navigate, patient }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] border border-zinc-200 min-h-47.25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.12)] w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center h-full gap-4">
          <div className="flex flex-col justify-between h-full gap-4">
            <h3 className="text-xl font-semibold font-['Roboto'] text-black-main-text">Health Summary</h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <span className="text-sm font-medium font-['Roboto'] text-black-main-text">Ai Risk Score</span>
                <span className="px-2.5 py-1 bg-emerald-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full">Low Risk</span>
              </div>
              <p className="text-neutral-500 text-xs sm:text-sm font-normal font-['Roboto'] leading-relaxed">
                Your heart condition is stable.<br className="hidden sm:block" />keep following your daily plan
              </p>
            </div>
          </div>
          <div className="self-start sm:self-auto">
            <ProgressRing percentage={25} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] border border-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.12)] w-full">
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-semibold font-['Roboto'] text-black-main-text">Smart Recommendation</h3>
          <div className="flex flex-col gap-4">
            {[
              { icon: '🥗', text: 'Try to reduce foods high in saturated fat.' },
              { icon: '🚶', text: 'Walk 30 mins daily.' },
              { icon: '😴', text: 'Sleep 7–8 hours.' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-black-main-text/70 text-sm font-medium font-['Roboto']">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] border border-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.12)] w-full">
        <div className="flex flex-col gap-3 w-full">
          <SectionHeader title="Upcoming Appointments" onViewMore={() => navigate('/patient/appointments')} />
          <div className="flex flex-col gap-4 w-full">
            {patient.appointments?.slice(0, 2).map((appointment, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 group cursor-pointer w-full">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={appointment.img}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 transition-transform duration-300 group-hover:scale-105"
                      alt={appointment.doctorName}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold font-['Roboto'] text-black-main-text wrap-break-word">
                        {appointment.doctorName || 'Dr: Ghada Adel'}
                      </span>
                      <span className="text-xs font-normal font-['Roboto'] text-neutral-400 mt-0.5">
                        {appointment.location || 'Cairo'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between sm:flex-col items-center sm:items-end gap-2 sm:gap-1 text-right w-full sm:w-auto border-t border-zinc-50 pt-2 sm:border-0 sm:pt-0">
                    <span className="text-sm font-semibold font-['Roboto'] text-black-main-text">
                      {appointment.date || '13/12/2025'}
                    </span>
                    <span className="text-xs font-normal font-['Roboto'] text-neutral-400">
                      at: {appointment.time || '7:00 PM'}
                    </span>
                  </div>
                </div>
                {index < patient.appointments.slice(0, 2).length - 1 && <div className="border-t border-zinc-100 w-full mt-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightColumn;
