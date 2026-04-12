export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[180px] items-center justify-center">
      <div className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
        <span className="h-3 w-3 animate-ping rounded-full bg-amber-500" />
        <span className="text-sm font-medium text-slate-700">{label}</span>
      </div>
    </div>
  );
}
