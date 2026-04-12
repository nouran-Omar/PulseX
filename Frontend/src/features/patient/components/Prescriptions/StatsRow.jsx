import StatCard from './StatCard';

const StatsRow = ({ total, active, completed, visible }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6" aria-label="Prescription stats">
      <StatCard label="Total Prescriptions" value={total}     accent="#333CF5" text="#010218" delay={0}   visible={visible} />
      <StatCard label="Active"               value={active}    accent="#00C950" text="#00A63E" delay={80}  visible={visible} />
      <StatCard label="Completed"            value={completed} accent="#99A1AF" text="#4A5565" delay={160} visible={visible} />
    </section>
  );
};

export default StatsRow;
