import { Bell, LayoutDashboard, MessageSquare, Settings, Users } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../app/hooks/useAuth";

const menuByRole = {
  CITIZEN: [
    { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { to: "/complaints/new", icon: MessageSquare, label: "Raise Complaint" },
    { to: "/complaints/my", icon: Users, label: "My Complaints" },
    { to: "/community", icon: Users, label: "Community" },
    { to: "/notifications", icon: Bell, label: "Notifications" },
  ],
  PRADHAN: [
    { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { to: "/complaints/my", icon: MessageSquare, label: "Incoming Cases" },
    { to: "/community", icon: Users, label: "Community" },
    { to: "/notifications", icon: Bell, label: "Notifications" },
  ],
  DISTRICT: [
    { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { to: "/complaints/my", icon: MessageSquare, label: "Escalations" },
    { to: "/notifications", icon: Bell, label: "Notifications" },
    { to: "/community", icon: Users, label: "Community" },
  ],
};

export default function DashboardLayout() {
  const { user, signOut } = useAuth();
  const menu = menuByRole[user?.role] || menuByRole.CITIZEN;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-slate-200 bg-[#0B3C5D] px-4 py-6 text-white">
          <Link to="/" className="mb-8 block text-xl font-semibold">Rural Connect</Link>
          <p className="mb-4 text-xs text-slate-200">Role: {user?.role}</p>
          <nav className="space-y-1">
            {menu.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                      isActive ? "bg-amber-500 text-white" : "text-slate-100 hover:bg-sky-800"
                    }`
                  }
                >
                  <Icon size={16} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
          <button
            onClick={signOut}
            className="mt-8 w-full rounded-xl border border-slate-300/30 px-3 py-2 text-sm hover:bg-sky-800"
          >
            Logout
          </button>
        </aside>

        <main>
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur">
            <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
            <Link to="/notifications" className="rounded-full border border-slate-200 p-2">
              <Bell size={16} />
            </Link>
          </div>
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
