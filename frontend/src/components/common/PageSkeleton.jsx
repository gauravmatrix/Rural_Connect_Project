export default function PageSkeleton({ rows = 4 }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="h-7 w-52 animate-pulse rounded bg-slate-200" />
      <div className="mt-4 space-y-3">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="h-14 animate-pulse rounded-xl bg-slate-100" />
        ))}
      </div>
    </div>
  );
}
