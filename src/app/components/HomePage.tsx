import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Menu,
  Send,
  TrendingUp,
  BarChart3,
  Zap,
  Globe,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const quickActions = [
  { icon: TrendingUp, label: "分析茅台走势", color: "from-amber-500/20 to-amber-600/5", iconColor: "text-amber-400", query: "帮我分析贵州茅台最近的走势" },
  { icon: BarChart3, label: "新能源前景", color: "from-emerald-500/20 to-emerald-600/5", iconColor: "text-emerald-400", query: "分析新能源板块的投资前景" },
  { icon: Zap, label: "AI芯片龙头", color: "from-blue-500/20 to-blue-600/5", iconColor: "text-blue-400", query: "盘点AI芯片领域的龙头企业" },
  { icon: Globe, label: "港股机会", color: "from-purple-500/20 to-purple-600/5", iconColor: "text-purple-400", query: "当前港股有哪些投资机会" },
];

const hotTopics = [
  { title: "DeepSeek概念持续发酵", change: "+3.2%", up: true },
  { title: "光伏板块午后拉升", change: "+2.8%", up: true },
  { title: "白酒股集体回调", change: "-1.5%", up: false },
];

export function HomePage() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (query.trim()) {
      navigate(`/chat/new?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleQuickAction = (q: string) => {
    navigate(`/chat/new?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="h-full flex flex-col relative overflow-y-auto">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1768992363350-b1f5b6176239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZm9nJTIwZm9yZXN0JTIwcGF0aCUyMG15c3RlcmlvdXN8ZW58MXx8fHwxNzczMjMyNDA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="bg"
          className="w-full h-72 object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/40 via-[#0a0a0f]/90 to-[#0a0a0f]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 pt-[env(safe-area-inset-top)] h-14 flex-shrink-0">
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
          <Menu size={22} className="text-white/60" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
            <span className="text-white" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 14 }}>识</span>
          </div>
          <span className="text-white/90" style={{ fontSize: 15 }}>识途 AI 投研</span>
        </div>
        <button className="p-1">
          <Sparkles size={20} className="text-amber-400/60" />
        </button>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 px-5">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-10 mb-8 text-center"
        >
          <p className="text-amber-400/70 mb-2 tracking-widest" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 12 }}>
            拨开千重雾，老马自识途
          </p>
          <h1 className="text-white mb-1" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 26, lineHeight: 1.4 }}>
            今天想了解
          </h1>
          <h1 style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 26, lineHeight: 1.4 }}>
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              哪只股票？
            </span>
          </h1>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          {quickActions.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              onClick={() => handleQuickAction(action.query)}
              className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br ${action.color} p-4 text-left group active:scale-[0.97] transition-transform`}
            >
              <div className="absolute inset-0 bg-white/[0.02] group-active:bg-white/[0.05] transition-colors" />
              <action.icon size={22} className={`${action.iconColor} mb-3`} />
              <span className="text-white/80 block" style={{ fontSize: 13 }}>
                {action.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Hot Topics */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white/50" style={{ fontSize: 13 }}>
              <span className="inline-block w-1 h-3 bg-amber-500 rounded-full mr-2 relative top-px" />
              今日热点
            </h3>
            <button className="text-white/30 flex items-center gap-0.5" style={{ fontSize: 11 }}>
              更多 <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {hotTopics.map((topic) => (
              <button
                key={topic.title}
                onClick={() => handleQuickAction(`分析：${topic.title}`)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.04] active:bg-white/[0.06] transition-colors"
              >
                <span className="text-white/70" style={{ fontSize: 13 }}>
                  {topic.title}
                </span>
                <span
                  className={`${
                    topic.up ? "text-emerald-400" : "text-red-400"
                  }`}
                  style={{ fontSize: 13 }}
                >
                  {topic.change}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Input Bar */}
      <div className="relative z-10 flex-shrink-0 px-4 pb-3">
        <div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-2xl px-4 py-2.5 backdrop-blur-sm">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="输入股票代码或问题..."
            className="flex-1 bg-transparent text-white/90 placeholder-white/25 outline-none"
            style={{ fontSize: 14 }}
          />
          <button
            onClick={handleSubmit}
            className={`p-2 rounded-xl transition-all ${
              query.trim()
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                : "text-white/20"
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
