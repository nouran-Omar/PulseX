const PatientMessagesCard = ({ messages, onViewAll }) => {
  if (!messages.length) {
    return (
      <section className="rounded-3xl border border-[#E6EAF0] bg-white p-4" aria-labelledby="messages-title-empty">
        <h2 id="messages-title-empty" className="text-[24px] font-bold text-black-main-text">Patient Messages</h2>
        <div className="mx-auto mt-8 h-12 w-12 rounded-xl bg-[#E5E7EB]" />
        <p className="mt-8 text-center text-[22px] font-bold text-black-main-text">No Messages Yet</p>
        <p className="mt-2 text-center text-[14px] text-[#6B7280]">Patient messages will appear here. You will receive notifications when patients contact you.</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-[#E6EAF0] bg-white p-4" aria-labelledby="messages-title">
      <div className="flex items-center justify-between">
        <h2 id="messages-title" className="text-[24px] font-bold text-black-main-text">Patient Messages</h2>
        <span className="rounded-full bg-[#EF4444] px-2 py-0.5 text-[11px] font-semibold text-white">{messages.length}</span>
      </div>

      <div className="mt-3 space-y-2">
        {messages.map((message) => (
          <article key={message.id} className="rounded-2xl border border-[#EEF2F7] bg-[#F7FAFB] p-2.5">
            <div className="flex items-start gap-2.5">
              <img src={message.avatar} alt={message.name} className="h-8 w-8 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-black-main-text">{message.name}</p>
                <p className="truncate text-[12px] text-[#6B7280]">{message.text}</p>
                <p className="mt-0.5 text-[10px] text-[#9CA3AF]">{message.time}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button type="button" onClick={onViewAll} className="mt-3 h-9 w-full rounded-3xl bg-[#3340EE] text-[12px] font-medium text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
        View All Messages
      </button>
    </section>
  );
};

export default PatientMessagesCard;
