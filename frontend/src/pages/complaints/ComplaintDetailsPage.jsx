import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../app/hooks/useAuth";
import { getComplaintDetails, pradhanAction } from "../../api/complaintApi";
import Loader from "../../components/common/Loader";
import StatusBadge from "../../components/common/StatusBadge";
import { useParams } from "react-router-dom";

const stepByStatus = {
  SUBMITTED: ["accept", "reject"],
  ACCEPTED: ["inspection"],
  INSPECTION: ["verify"],
  VERIFIED: ["resolve", "reject"],
};

export default function ComplaintDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadDetails = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getComplaintDetails(id);
      setData(result);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    Promise.resolve().then(loadDetails);
  }, [loadDetails, refreshKey]);

  const actions = useMemo(() => {
    return user?.role === "PRADHAN" ? stepByStatus[data?.complaint?.status] || [] : [];
  }, [data, user]);

  const onAction = async (action) => {
    const body = action === "reject" ? { reason: "Rejected by Pradhan" } : {};
    await pradhanAction(id, action, body);
    setRefreshKey((prev) => prev + 1);
  };

  if (loading) return <Loader label="Loading complaint details..." />;
  if (!data) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-xl font-semibold text-slate-900">Complaint #{data.complaint.id}</h2>
        <p className="mt-2 text-sm text-slate-500">{data.complaint.description}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <StatusBadge value={data.complaint.status} />
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">{data.complaint.category}</span>
        </div>

        {actions.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {actions.map((action) => (
              <button key={action} onClick={() => onAction(action)} className="rounded-full bg-[#0B3C5D] px-4 py-2 text-xs font-semibold uppercase text-white hover:bg-sky-700">
                {action.replace("inspection", "start inspection")}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">Timeline</h3>
        <div className="mt-4 space-y-4">
          {data.timeline.map((step) => (
            <div key={step.id} className="relative border-l-2 border-sky-100 pl-4">
              <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-[#F59E0B]" />
              <p className="text-sm font-semibold text-slate-800">{step.status}</p>
              <p className="text-xs text-slate-500">{step.remarks}</p>
              <p className="mt-1 text-[11px] text-slate-400">{new Date(step.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
