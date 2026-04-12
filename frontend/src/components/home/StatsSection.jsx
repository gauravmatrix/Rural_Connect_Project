const stats = [
  { label: "Complaints Processed", value: "12K+" },
  { label: "Avg Resolution Time", value: "4.2 Days" },
  { label: "Villages Connected", value: "850+" },
  { label: "Citizen Satisfaction", value: "92%" },
];

export default function StatsSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.label} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <p className="text-3xl font-bold text-[#0B3C5D]">{stat.value}</p>
          <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
        </article>
      ))}
    </div>
  );
}
