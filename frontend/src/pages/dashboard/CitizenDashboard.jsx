import { Link } from "react-router-dom";

const cards = [
  { title: "Total Complaints", value: "--" },
  { title: "Pending", value: "--" },
  { title: "Resolved", value: "--" },
  { title: "Escalated", value: "--" },
];

export default function CitizenDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <p className="text-sm text-slate-500">{card.title}</p>
            <p className="mt-2 text-3xl font-bold text-[#0B3C5D]">{card.value}</p>
          </article>
        ))}
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Get Started</h2>
        <p className="mt-1 text-sm text-slate-500">Submit or track complaint progress quickly.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/complaints/new" className="rounded-full bg-[#F59E0B] px-4 py-2 text-sm font-semibold text-white">Raise Complaint</Link>
          <Link to="/complaints/my" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">My Complaints</Link>
        </div>
      </div>
    </div>
  );
}
