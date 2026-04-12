export default function Footer() {
  return (
    <footer className="mt-20 bg-[#0B3C5D] text-slate-100">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <section>
          <h4 className="text-lg font-semibold">Rural Connect</h4>
          <p className="mt-3 text-sm text-slate-200/90">
            Centralized and transparent rural grievance workflow with role-based accountability.
          </p>
        </section>
        <section>
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-200/90">
            <li>Dashboard</li>
            <li>Raise Complaint</li>
            <li>Community</li>
          </ul>
        </section>
        <section>
          <h4 className="text-lg font-semibold">Government Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-200/90">
            <li>Digital India</li>
            <li>MyGov</li>
            <li>RTI Portal</li>
          </ul>
        </section>
      </div>
      <div className="border-t border-slate-400/20 px-4 py-4 text-center text-xs text-slate-200/80">
        Copyright 2026 Rural Connect. Privacy and Terms.
      </div>
    </footer>
  );
}
