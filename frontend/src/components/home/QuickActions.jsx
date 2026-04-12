import { ClipboardPlus, MessageSquareText, Users } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  { icon: ClipboardPlus, label: "Raise Complaint", to: "/complaints/new" },
  { icon: MessageSquareText, label: "Track Complaints", to: "/complaints/my" },
  { icon: Users, label: "Community", to: "/community" },
];

export default function QuickActions() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Link key={card.label} to={card.to} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-4 inline-flex rounded-full bg-sky-100 p-3 text-[#0B3C5D]">
              <Icon size={22} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{card.label}</h3>
            <p className="mt-2 text-sm text-slate-500">Open secure workflow in one click.</p>
          </Link>
        );
      })}
    </div>
  );
}
