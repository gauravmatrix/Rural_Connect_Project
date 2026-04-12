import { CheckCircle2, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = ["Home", "About", "Features", "Working"];

export default function AuthSplitLayout({
  badge,
  title,
  description,
  highlights,
  chips,
  ctaLabel,
  ctaTo,
  children,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_12%_14%,_#d8e7ff_0%,_#f4f7ff_35%,_#f8fafc_68%),radial-gradient(circle_at_96%_88%,_#d3f7f0_0%,_transparent_42%)] px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[-4rem] h-80 w-80 rounded-full bg-cyan-200/35 blur-3xl" />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-content-center rounded-xl border border-slate-200 bg-white text-[#0B3C5D] shadow-inner shadow-slate-200/70">
            <HeartPulse size={20} />
          </span>
          <div>
            <p className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Rural<span className="text-sky-600">Connect</span>
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="/"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#0B3C5D]"
            >
              {item}
            </a>
          ))}
          <Link
            to={ctaTo}
            className="rounded-full bg-gradient-to-r from-[#2f66e4] to-[#2453d0] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(42,96,226,0.35)] transition hover:brightness-105"
          >
            {ctaLabel}
          </Link>
        </nav>

        <Link
          to={ctaTo}
          className="rounded-full bg-gradient-to-r from-[#2f66e4] to-[#2453d0] px-4 py-2 text-sm font-semibold text-white md:hidden"
        >
          {ctaLabel}
        </Link>
      </header>

      <main className="mx-auto mt-6 w-full max-w-5xl rounded-[30px] border border-slate-200/60 bg-white/85 shadow-[0_25px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl">
        <div className="grid min-h-[640px] lg:grid-cols-[0.95fr_1.25fr]">
          <aside className="relative overflow-hidden rounded-t-[30px] bg-gradient-to-b from-[#2f6de7] via-[#237dc4] to-[#1299a3] p-7 text-white sm:p-8 lg:rounded-l-[30px] lg:rounded-tr-none">
            <div className="absolute right-6 top-16 h-16 w-16 rounded-full bg-white/18" />
            <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-white/22" />

            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/12 px-4 py-1.5 text-sm font-semibold shadow-md shadow-cyan-900/20 backdrop-blur">
              {badge}
            </span>

            <h1 className="mt-5 max-w-xs text-3xl font-bold leading-tight sm:text-[40px] sm:leading-[1.1]">{title}</h1>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-sky-50/95 sm:text-lg">{description}</p>

            <div className="mt-8 grid gap-3">
              {highlights.map((item) => (
                <p key={item} className="flex items-start gap-2 text-sm font-medium text-sky-50 sm:text-base">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  <span>{item}</span>
                </p>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {chips.map((item) => (
                <span key={item} className="rounded-full border border-white/25 bg-white/12 px-3 py-1.5 text-xs font-semibold text-white/95">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/22 bg-white/8 p-4 backdrop-blur-sm">
              <div className="h-1.5 rounded-full bg-white/20" />
              <div className="mt-4 h-1.5 w-2/3 rounded-full bg-white/45" />
            </div>
          </aside>

          <section className="rounded-b-[30px] bg-white/90 p-6 sm:p-8 lg:rounded-r-[30px] lg:rounded-bl-none lg:p-10">{children}</section>
        </div>
      </main>
    </div>
  );
}
