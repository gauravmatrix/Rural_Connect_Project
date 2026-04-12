const roles = [
  { key: "CITIZEN", title: "Citizen", desc: "Raise and track complaints" },
  { key: "PRADHAN", title: "Pradhan", desc: "Manage and resolve village complaints" },
  { key: "DISTRICT", title: "District Officer", desc: "Monitor escalations and accountability" },
];

export default function RoleSelector({ value, onChange }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {roles.map((role) => (
        <button
          key={role.key}
          type="button"
          onClick={() => onChange(role.key)}
          className={`rounded-2xl border p-4 text-left transition ${
            value === role.key
              ? "border-[#2f66e4] bg-gradient-to-b from-[#eef4ff] to-[#e8fbff] shadow-[0_10px_20px_rgba(47,102,228,0.14)] ring-2 ring-[#d9e7ff]"
              : "border-slate-200 bg-white hover:border-sky-200 hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`h-4 w-4 rounded-full border transition ${
                value === role.key ? "border-[#2f66e4] bg-[#2f66e4] shadow-[0_0_0_3px_rgba(47,102,228,0.2)]" : "border-slate-300 bg-white"
              }`}
              aria-hidden
            />
            <p className="text-lg font-semibold text-slate-900">{role.title}</p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{role.desc}</p>
        </button>
      ))}
    </div>
  );
}
