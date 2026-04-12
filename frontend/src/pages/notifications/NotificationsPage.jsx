import { useEffect, useState } from "react";
import { getNotifications, markNotificationRead } from "../../api/notificationApi";
import PageSkeleton from "../../components/common/PageSkeleton";
import { getErrorMessage } from "../../api/client";

export default function NotificationsPage() {
  const [items, setItems] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotifications = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getNotifications(false);
      setItems(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(loadNotifications);
  }, [refreshKey]);

  const onRead = async (id) => {
    try {
      await markNotificationRead(id);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) return <PageSkeleton rows={5} />;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-xl font-semibold text-slate-900">Notifications</h2>
      {error && <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-700">{item.message}</p>
                <p className="mt-1 text-[11px] text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
              {!item.isRead && (
                <button onClick={() => onRead(item.id)} className="rounded-full bg-[#0B3C5D] px-3 py-1 text-xs font-semibold text-white">
                  Mark Read
                </button>
              )}
            </div>
          </article>
        ))}
        {items.length === 0 && <p className="text-sm text-slate-500">No notifications yet</p>}
      </div>
    </div>
  );
}
