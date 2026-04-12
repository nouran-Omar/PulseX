const DashboardWelcome = ({ patientName }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl md:text-3xl font-bold font-['Roboto'] text-black-main-text tracking-tight">
        Welcome Back , {patientName} 👋
      </h1>
      <p className="text-base md:text-lg text-gray-text-dim2 font-['Roboto']">
        Here&apos;s an overview of your current heart health status.
      </p>
    </div>
  );
};

export default DashboardWelcome;
