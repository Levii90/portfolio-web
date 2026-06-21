interface StatsCardProps {
  label: string;
  value: string;
}

function StatsCard({ label, value }: StatsCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#071420]/90 p-5">
      <p className="text-sm uppercase tracking-[0.24em] text-accent">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-text">{value}</p>
    </div>
  );
}

export default StatsCard;
