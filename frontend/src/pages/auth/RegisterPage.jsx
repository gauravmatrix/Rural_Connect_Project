import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, User, UserSquare2, CalendarClock, Phone, MapPinHouse, MapPinned, Building2 } from "lucide-react";
import RoleSelector from "../../components/auth/RoleSelector";
import { registerUser } from "../../api/authApi";
import AuthSplitLayout from "../../components/auth/AuthSplitLayout";

const initial = {
  fullName: "",
  age: 18,
  email: "",
  phone: "",
  address: "",
  pincode: "",
  password: "",
  confirmPassword: "",
  role: "CITIZEN",
  villageName: "",
  districtName: "",
  officeId: "",
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isValid = useMemo(() => {
    const base =
      form.fullName &&
      Number(form.age) >= 18 &&
      /.+@.+\..+/.test(form.email) &&
      /^\d{10}$/.test(form.phone) &&
      form.address &&
      /^\d{6}$/.test(form.pincode) &&
      form.password.length >= 6 &&
      form.password === form.confirmPassword;

    if (!base) return false;
    if (form.role === "PRADHAN") return Boolean(form.villageName.trim());
    if (form.role === "DISTRICT") return Boolean(form.districtName.trim());
    return true;
  }, [form]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    setError("");

    try {
      const payload = {
        fullName: form.fullName,
        age: Number(form.age),
        email: form.email,
        phone: form.phone,
        address: form.address,
        pincode: form.pincode,
        password: form.password,
        role: form.role,
        villageName: form.villageName || null,
        districtName: form.districtName || null,
        officeId: form.officeId || null,
      };
      await registerUser(payload);
      navigate("/verify-otp", { state: { email: form.email } });
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const inputWrap =
    "group flex h-[52px] items-center rounded-2xl border border-[#d7e1ef] bg-slate-50 px-3.5 transition focus-within:border-sky-400 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(56,189,248,0.14)]";

  const iconClass = "mr-2 shrink-0 text-[#2f66e4]";

  const inputClass = "h-full w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400";

  const fieldLabel = "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <AuthSplitLayout
      badge="Trusted Onboarding"
      title="Create Your RuralConnect Account"
      description="Join a secure and trusted governance ecosystem built for citizens and officials."
      highlights={[
        "Role-based workflow from day one",
        "Email OTP identity verification",
        "Secure records with blockchain proof",
      ]}
      chips={["Guided + Secure", "Doctor / Patient Flow", "Smart Routing"]}
      ctaLabel="Login"
      ctaTo="/login"
    >
      <form onSubmit={onSubmit} className="mx-auto w-full max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-[#15406d]">Create Account</h2>
        <p className="mt-2 text-lg text-slate-500">Signup with role-based access and secure verification</p>

        <div className="mt-8 space-y-6">
          <RoleSelector value={form.role} onChange={(role) => update("role", role)} />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={fieldLabel}>Full Name</span>
              <span className={inputWrap}>
                <User size={18} className={iconClass} />
                <input className={inputClass} placeholder="Enter full name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required />
              </span>
            </label>

            <label className="block">
              <span className={fieldLabel}>Age</span>
              <span className={inputWrap}>
                <CalendarClock size={18} className={iconClass} />
                <input className={inputClass} type="number" min={18} placeholder="18+" value={form.age} onChange={(e) => update("age", e.target.value)} required />
              </span>
            </label>

            <label className="block">
              <span className={fieldLabel}>Email</span>
              <span className={inputWrap}>
                <Mail size={18} className={iconClass} />
                <input className={inputClass} type="email" placeholder="name@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} required />
              </span>
            </label>

            <label className="block">
              <span className={fieldLabel}>Phone</span>
              <span className={inputWrap}>
                <Phone size={18} className={iconClass} />
                <input className={inputClass} placeholder="10-digit phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
              </span>
            </label>

            <label className="block sm:col-span-2">
              <span className={fieldLabel}>Address</span>
              <span className={`${inputWrap} h-auto py-2`}>
                <MapPinHouse size={18} className={`${iconClass} mt-2 self-start`} />
                <textarea className="min-h-[88px] w-full resize-none bg-transparent py-1 text-sm text-slate-800 outline-none placeholder:text-slate-400" placeholder="Street, area, village/town" value={form.address} onChange={(e) => update("address", e.target.value)} required />
              </span>
            </label>

            <label className="block">
              <span className={fieldLabel}>Pin Code</span>
              <span className={inputWrap}>
                <MapPinned size={18} className={iconClass} />
                <input className={inputClass} placeholder="6-digit pin" value={form.pincode} onChange={(e) => update("pincode", e.target.value)} required />
              </span>
            </label>

            <label className="block">
              <span className={fieldLabel}>Password</span>
              <span className={inputWrap}>
                <Lock size={18} className={iconClass} />
                <input className={inputClass} type={showPassword ? "text" : "password"} placeholder="Create password" value={form.password} onChange={(e) => update("password", e.target.value)} required />
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

            <label className="block sm:col-span-2">
              <span className={fieldLabel}>Confirm Password</span>
              <span className={inputWrap}>
                <UserSquare2 size={18} className={iconClass} />
                <input className={inputClass} type={showConfirmPassword ? "text" : "password"} placeholder="Repeat password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} required />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="ml-2 rounded-full p-1.5 text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-700"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>

            {form.role === "PRADHAN" && (
              <label className="block sm:col-span-2">
                <span className={fieldLabel}>Village Name</span>
                <span className={inputWrap}>
                  <MapPinHouse size={18} className={iconClass} />
                  <input className={inputClass} placeholder="Enter village name" value={form.villageName} onChange={(e) => update("villageName", e.target.value)} required />
                </span>
              </label>
            )}

            {form.role === "DISTRICT" && (
              <>
                <label className="block">
                  <span className={fieldLabel}>District Name</span>
                  <span className={inputWrap}>
                    <MapPinHouse size={18} className={iconClass} />
                    <input className={inputClass} placeholder="District name" value={form.districtName} onChange={(e) => update("districtName", e.target.value)} required />
                  </span>
                </label>

                <label className="block">
                  <span className={fieldLabel}>Office ID (optional)</span>
                  <span className={inputWrap}>
                    <Building2 size={18} className={iconClass} />
                    <input className={inputClass} placeholder="Office identifier" value={form.officeId} onChange={(e) => update("officeId", e.target.value)} />
                  </span>
                </label>
              </>
            )}
          </div>

          {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

          <button
            disabled={!isValid || loading}
            className="w-full rounded-full bg-gradient-to-r from-[#2f66e4] to-[#2453d0] py-3.5 text-xl font-semibold text-white shadow-[0_12px_24px_rgba(47,102,228,0.35)] transition hover:scale-[1.01] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Sending OTP..." : "Create Account"}
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#c9d8f5] bg-[#edf4ff] px-3 py-1 text-xs font-semibold text-[#3562d7]">Quick onboarding</span>
            <span className="rounded-full border border-[#c9d8f5] bg-[#edf4ff] px-3 py-1 text-xs font-semibold text-[#3562d7]">Safe credential flow</span>
            <span className="rounded-full border border-[#c9d8f5] bg-[#edf4ff] px-3 py-1 text-xs font-semibold text-[#3562d7]">Role-based access</span>
          </div>

          <p className="text-lg text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#2f66e4] underline-offset-2 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthSplitLayout>
  );
}
