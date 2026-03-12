import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Calendar, MessageSquare, Trash2 } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { GlassOverlay } from "./GlassCard";

const historyGroups = [
  {
    date: "今天",
    items: [
      { id: "1", title: "贵州茅台走势分析", messages: 6, time: "14:30" },
      { id: "2", title: "新能源板块投资前景", messages: 4, time: "10:15" },
    ],
  },
  {
    date: "昨天",
    items: [
      { id: "3", title: "A股大盘走势预判", messages: 8, time: "16:45" },
      { id: "4", title: "半导体芯片龙头梳理", messages: 5, time: "09:30" },
    ],
  },
  {
    date: "3月9日",
    items: [
      { id: "5", title: "港股低估值机会", messages: 3, time: "11:20" },
      { id: "6", title: "医药板块政策分析", messages: 7, time: "08:50" },
    ],
  },
  {
    date: "3月8日",
    items: [
      { id: "7", title: "量化策略回测分析", messages: 12, time: "15:30" },
      { id: "8", title: "可转债投资策略", messages: 4, time: "10:00" },
    ],
  },
];

export function HistoryPage() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <div className="h-full flex flex-col">
      <header className="px-5 pt-[env(safe-area-inset-top)] flex-shrink-0">
        <h2
          className={`h-14 flex items-center ${isDark ? "text-white/90" : "text-black/80"}`}
          style={{ fontSize: 18, fontFamily: "'Noto Serif SC', serif" }}
        >
          历史记录
        </h2>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {historyGroups.map((group, gi) => (
          <div key={group.date} className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={13} className={isDark ? "text-amber-400/40" : "text-amber-600/40"} />
              <span className={isDark ? "text-white/25" : "text-black/25"} style={{ fontSize: 12 }}>
                {group.date}
              </span>
            </div>
            <div className="space-y-2">
              {group.items.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: gi * 0.1 + i * 0.05 }}
                  onClick={() => navigate(`/chat/${item.id}`)}
                  className="relative overflow-hidden w-full text-left flex items-center justify-between p-3.5 rounded-xl transition-all active:scale-[0.98] group"
                >
                  <GlassOverlay />
                  <div className="relative z-[1] flex-1 min-w-0">
                    <h4
                      className={`truncate ${isDark ? "text-white/75" : "text-black/65"}`}
                      style={{ fontSize: 13 }}
                    >
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <MessageSquare size={10} className={isDark ? "text-white/18" : "text-black/18"} />
                      <span className={isDark ? "text-white/18" : "text-black/18"} style={{ fontSize: 11 }}>
                        {item.messages} 条对话
                      </span>
                      <span className={isDark ? "text-white/12" : "text-black/10"}>·</span>
                      <span className={isDark ? "text-white/18" : "text-black/18"} style={{ fontSize: 11 }}>
                        {item.time}
                      </span>
                    </div>
                  </div>
                  <Trash2
                    size={14}
                    className={`relative z-[1] flex-shrink-0 ml-3 transition-colors ${
                      isDark
                        ? "text-white/8 group-active:text-red-400/50"
                        : "text-black/8 group-active:text-red-400/50"
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
