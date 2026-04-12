import { Globe, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../app/hooks/useAuth";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/community", label: "Community" },
  { to: "/notifications", label: "Notifications" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-content-center rounded-xl bg-gradient-to-br from-[#0B3C5D] to-sky-500 text-sm font-bold text-white">RC</div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Rural Connect</p>
            <p className="text-xs text-slate-500">Grievance Resolution</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? "text-[#0B3C5D]" : "text-slate-600 hover:text-[#0B3C5D]"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600">
            <Globe size={14} /> EN
          </button>
          {isAuthenticated ? (
            <button
              onClick={signOut}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="rounded-full bg-[#F59E0B] px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600">
              Login
            </Link>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen((prev) => !prev)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50" onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <Link to="/login" className="mt-2 rounded-xl bg-[#F59E0B] px-3 py-2 text-center text-sm font-semibold text-white" onClick={() => setOpen(false)}>
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
