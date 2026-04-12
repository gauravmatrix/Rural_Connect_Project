import { useState } from "react";
import { createComplaint } from "../../api/complaintApi";

export default function RaiseComplaintPage() {
  const [form, setForm] = useState({ category: "Water", description: "", mediaUrl: "" });
  const [status, setStatus] = useState({ loading: false, message: "", error: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", error: "" });
    try {
      const data = await createComplaint(form);
      setStatus({ loading: false, message: `Complaint #${data.id} submitted successfully`, error: "" });
      setForm({ category: "Water", description: "", mediaUrl: "" });
    } catch (err) {
      setStatus({ loading: false, message: "", error: err?.response?.data?.message || "Submission failed" });
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-xl font-semibold text-slate-900">Raise Complaint</h2>
      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        <select className="input-ui" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option>Water</option>
          <option>Road</option>
          <option>Electricity</option>
          <option>Sanitation</option>
          <option>Other</option>
        </select>
        <textarea className="input-ui min-h-32" placeholder="Describe your issue" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <input className="input-ui" placeholder="Media URL (optional)" value={form.mediaUrl} onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })} />
        {status.error && <p className="text-sm text-rose-600">{status.error}</p>}
        {status.message && <p className="text-sm text-emerald-700">{status.message}</p>}
        <button className="rounded-full bg-[#F59E0B] px-5 py-2 text-sm font-semibold text-white" disabled={status.loading}>
          {status.loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
}
