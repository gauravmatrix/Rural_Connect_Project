import { useEffect, useState } from "react";
import { getCommunities, getCommunityMessages, joinCommunity, sendCommunityMessage } from "../../api/communityApi";
import PageSkeleton from "../../components/common/PageSkeleton";
import { getErrorMessage } from "../../api/client";

export default function CommunityPage() {
  const [communities, setCommunities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCommunities()
      .then((data) => {
        setCommunities(data);
        if (data.length > 0) setSelected(data[0].id);
      })
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selected) return;
    getCommunityMessages(selected).then(setMessages).catch((err) => setError(getErrorMessage(err)));
  }, [selected]);

  const onJoin = async () => {
    if (!selected) return;
    try {
      await joinCommunity(selected);
      const list = await getCommunityMessages(selected);
      setMessages(list);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const onSend = async () => {
    if (!text.trim() || !selected) return;
    try {
      await sendCommunityMessage({ communityId: selected, message: text.trim(), mediaUrl: null });
      setText("");
      const list = await getCommunityMessages(selected);
      setMessages(list);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) return <PageSkeleton rows={5} />;

  return (
    <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
      {error && (
        <div className="lg:col-span-2 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}
      <aside className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <h3 className="font-semibold text-slate-900">Communities</h3>
        <div className="mt-3 space-y-2">
          {communities.map((community) => (
            <button
              key={community.id}
              onClick={() => setSelected(community.id)}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm ${selected === community.id ? "bg-sky-100 text-[#0B3C5D]" : "bg-slate-50 text-slate-700"}`}
            >
              {community.villageName}
            </button>
          ))}
        </div>
        <button onClick={onJoin} className="mt-4 w-full rounded-full bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white">
          Join Selected
        </button>
      </aside>

      <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <h3 className="font-semibold text-slate-900">Community Chat</h3>
        <div className="mt-4 h-[420px] space-y-2 overflow-y-auto rounded-xl bg-slate-50 p-3">
          {messages.map((msg) => (
            <div key={msg.id} className="max-w-[85%] rounded-xl bg-white px-3 py-2 text-sm shadow-sm">
              <p>{msg.message}</p>
              <p className="mt-1 text-[11px] text-slate-400">{new Date(msg.createdAt).toLocaleString()}</p>
            </div>
          ))}
          {messages.length === 0 && <p className="text-sm text-slate-400">No messages yet</p>}
        </div>
        <div className="mt-3 flex gap-2">
          <input className="input-ui" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" />
          <button onClick={onSend} className="rounded-xl bg-[#F59E0B] px-4 text-sm font-semibold text-white">Send</button>
        </div>
      </section>
    </div>
  );
}
