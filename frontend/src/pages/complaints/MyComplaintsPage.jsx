import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyComplaints } from "../../api/complaintApi";
import PageSkeleton from "../../components/common/PageSkeleton";
import StatusBadge from "../../components/common/StatusBadge";
import { getErrorMessage } from "../../api/client";

export default function MyComplaintsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyComplaints()
      .then(setItems)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageSkeleton rows={6} />;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-xl font-semibold text-slate-900">My Complaints</h2>
      {error && <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="py-3">ID</th>
              <th className="py-3">Category</th>
              <th className="py-3">Status</th>
              <th className="py-3">Created</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="py-3">#{item.id}</td>
                <td className="py-3">{item.category}</td>
                <td className="py-3"><StatusBadge value={item.status} /></td>
                <td className="py-3">{new Date(item.createdAt).toLocaleString()}</td>
                <td className="py-3">
                  <Link className="text-[#0B3C5D] underline" to={`/complaints/${item.id}`}>View</Link>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="py-8 text-center text-slate-500" colSpan={5}>No complaints found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
