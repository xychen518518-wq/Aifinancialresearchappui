import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Plus, Send, Sparkles } from "lucide-react";

const recentChats = [
  {
    id: "1",
    title: "贵州茅台走势分析",
    preview: "茅台近期在1700-1800区间震荡，技术面呈现...",
    time: "今天 14:30",
    tag: "个股",
  },
  {
    id: "2",
    title: "新能源板块投资前景",
    preview: "2026年新能源板块整体呈现复苏态势...",
    time: "今天 10:15",
    tag: "行业",
  },
  {
    id: "3",
    title: "A股大盘走势预判",
    preview: "从技术指标看，沪指在3200点附近有较强支撑...",
    time: "昨天",
    tag: "大盘",
  },
  {
    id: "4",
    title: "半导体芯片龙头梳理",
    preview: "国产替代逻辑持续演绎，中芯国际、北方华创...",
    time: "昨天",
    tag: "行业",
  },
  {
    id: "5",
    title: "港股低估值机会",
    preview: "恒生科技指数估值处于历史低位，腾讯、美团...",
    time: "3月9日",
    tag: "港股",
  },
];

const tagColors: Record<string, string> = {
  个股: "bg-amber-500/15 text-amber-400",
  行业: "bg-emerald-500/15 text-emerald-400",
  大盘: "bg-blue-500/15 text-blue-400",
  港股: "bg-purple-500/15 text-purple-400",
};

export function ChatPage() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-[env(safe-area-inset-top)] h-14 flex-shrink-0">
        <h2 className="text-white/90" style={{ fontSize: 18, fontFamily: "'Noto Serif SC', serif" }}>
          对话
        </h2>
        <button
          onClick={() => navigate("/chat/new")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/20 text-amber-400 active:scale-95 transition-transform"
          style={{ fontSize: 12 }}
        >
          <Plus size={14} />
          新对话
        </button>
      </header>

      {/* Search */}
      <div className="px-5 py-3 flex-shrink-0">
        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3.5 py-2.5">
          <Sparkles size={16} className="text-white/20" />
          <input
            type="text"
            placeholder="搜索历史对话..."
            className="flex-1 bg-transparent text-white/80 placeholder-white/20 outline-none"
            style={{ fontSize: 13 }}
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-5">
        <div className="space-y-2">
          {recentChats.map((chat, i) => (
            <motion.button
              key={chat.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="w-full text-left p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] active:bg-white/[0.06] transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <h4 className="text-white/85 flex-1 truncate" style={{ fontSize: 14 }}>
                  {chat.title}
                </h4>
                <span className={`flex-shrink-0 px-2 py-0.5 rounded-md ${tagColors[chat.tag] || "bg-white/10 text-white/50"}`} style={{ fontSize: 10 }}>
                  {chat.tag}
                </span>
              </div>
              <p className="text-white/35 truncate mb-2" style={{ fontSize: 12 }}>
                {chat.preview}
              </p>
              <span className="text-white/20" style={{ fontSize: 11 }}>
                {chat.time}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
