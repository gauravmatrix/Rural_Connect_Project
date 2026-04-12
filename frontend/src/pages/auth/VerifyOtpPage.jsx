import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../api/authApi";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await verifyOtp({ email, otp });
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-content-center bg-slate-100 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-3xl bg-white p-7 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">Verify OTP</h1>
        <p className="mt-1 text-sm text-slate-500">Enter OTP received on your email</p>

        <div className="mt-6 space-y-4">
          <input className="input-ui" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input-ui" placeholder="6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button className="w-full rounded-full bg-[#F59E0B] py-3 text-sm font-semibold text-white hover:bg-amber-600" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-slate-600">
          Back to <Link to="/register" className="font-semibold text-[#0B3C5D]">Register</Link>
        </p>
      </form>
    </div>
  );
}
