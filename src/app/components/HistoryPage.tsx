import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Calendar, MessageSquare, Trash2 } from "lucide-react";

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

  return (
    <div className="h-full flex flex-col">
      <header className="px-5 pt-[env(safe-area-inset-top)] flex-shrink-0">
        <h2 className="text-white/90 h-14 flex items-center" style={{ fontSize: 18, fontFamily: "'Noto Serif SC', serif" }}>
          历史记录
        </h2>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {historyGroups.map((group, gi) => (
          <div key={group.date} className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={13} className="text-amber-400/50" />
              <span className="text-white/30" style={{ fontSize: 12 }}>
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
                  className="w-full text-left flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.04] active:bg-white/[0.06] transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white/80 truncate" style={{ fontSize: 13 }}>
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <MessageSquare size={10} className="text-white/20" />
                      <span className="text-white/20" style={{ fontSize: 11 }}>
                        {item.messages} 条对话
                      </span>
                      <span className="text-white/15">·</span>
                      <span className="text-white/20" style={{ fontSize: 11 }}>
                        {item.time}
                      </span>
                    </div>
                  </div>
                  <Trash2
                    size={14}
                    className="text-white/10 group-active:text-red-400/50 flex-shrink-0 ml-3 transition-colors"
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
