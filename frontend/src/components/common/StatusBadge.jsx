import clsx from "clsx";

const theme = {
  SUBMITTED: "bg-amber-100 text-amber-800",
  ACCEPTED: "bg-sky-100 text-sky-800",
  INSPECTION: "bg-indigo-100 text-indigo-800",
  VERIFIED: "bg-blue-100 text-blue-800",
  RESOLVED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-rose-100 text-rose-800",
  ESCALATED: "bg-orange-100 text-orange-800",
};

export default function StatusBadge({ value }) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        theme[value] || "bg-slate-100 text-slate-700"
      )}
    >
      {value || "NA"}
    </span>
  );
}
