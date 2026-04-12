import { Bot, Send, X } from "lucide-react";
import { useState } from "react";
import { askChatbot } from "../../api/chatbotApi";

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Namaste! How can I help with your complaint process?" },
  ]);

  const onSend = async () => {
    if (!query.trim()) return;
    const next = query.trim();
    setMessages((prev) => [...prev, { sender: "user", text: next }]);
    setQuery("");
    try {
      const res = await askChatbot(next);
      setMessages((prev) => [...prev, { sender: "bot", text: res.reply }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "Please try again in a moment." }]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-[320px] rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between rounded-t-2xl bg-[#0B3C5D] px-4 py-3 text-white">
            <p className="text-sm font-semibold">Rural Connect Assistant</p>
            <button onClick={() => setOpen(false)}><X size={16} /></button>
          </div>
          <div className="h-64 space-y-3 overflow-y-auto p-3">
            {messages.map((message, idx) => (
              <div key={idx} className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${message.sender === "user" ? "ml-auto bg-amber-100 text-slate-900" : "bg-slate-100 text-slate-700"}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-slate-100 p-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder="Type your question"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
            />
            <button onClick={onSend} className="rounded-xl bg-[#F59E0B] px-3 text-white">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen((v) => !v)} className="grid h-14 w-14 place-content-center rounded-full bg-[#F59E0B] text-white shadow-xl hover:scale-105">
        <Bot />
      </button>
    </div>
  );
}
