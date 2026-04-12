import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "../../app/hooks/useAuth";
import AuthSplitLayout from "../../components/auth/AuthSplitLayout";

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout
      badge="Protected Access"
      title="One Login, Total Rural Security."
      description="Access your blockchain-backed grievance dashboard with trust, speed, and transparency."
      highlights={[
        "Role-based secure dashboard routing",
        "OTP verification before full access",
        "Tamper-aware blockchain verification",
      ]}
      chips={["OTP + Session", "Chain Protected", "Fast Access"]}
      ctaLabel="Register"
      ctaTo="/register"
    >
      <form onSubmit={onSubmit} className="mx-auto w-full max-w-xl">
        <h2 className="text-3xl font-bold tracking-tight text-[#15406d]">Rural Connect Login</h2>
        <p className="mt-2 text-lg text-slate-500">Sign in to your secure grievance workspace</p>

        <div className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Email Address</span>
            <span className="group flex h-[52px] items-center rounded-2xl border border-[#d7e1ef] bg-slate-50 px-3.5 transition focus-within:border-sky-400 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(56,189,248,0.14)]">
              <Mail size={18} className="mr-2 shrink-0 text-[#2f66e4]" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-full w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
            <span className="group flex h-[52px] items-center rounded-2xl border border-[#d7e1ef] bg-slate-50 px-3.5 transition focus-within:border-sky-400 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(56,189,248,0.14)]">
              <Lock size={18} className="mr-2 shrink-0 text-[#2f66e4]" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="h-full w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="ml-2 rounded-full p-1.5 text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>
        </div>

        {error && <p className="mt-3 text-sm font-medium text-rose-600">{error}</p>}

        <button
          disabled={loading}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-[#2f66e4] to-[#2453d0] py-3.5 text-xl font-semibold text-white shadow-[0_12px_24px_rgba(47,102,228,0.35)] transition hover:scale-[1.01] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login Securely"}
        </button>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#c9d8f5] bg-[#edf4ff] px-3 py-1 text-xs font-semibold text-[#3562d7]">Fast secure login</span>
          <span className="rounded-full border border-[#c9d8f5] bg-[#edf4ff] px-3 py-1 text-xs font-semibold text-[#3562d7]">Encrypted auth flow</span>
          <span className="rounded-full border border-[#c9d8f5] bg-[#edf4ff] px-3 py-1 text-xs font-semibold text-[#3562d7]">OTP guarded access</span>
        </div>

        <p className="mt-6 text-lg text-slate-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold text-[#2f66e4] underline-offset-2 hover:underline">
            Create One
          </Link>
        </p>
      </form>
    </AuthSplitLayout>
  );
}
