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
import { useTheme } from "./ThemeContext";
import { GlassOverlay } from "./GlassCard";

const quickActions = [
  { icon: TrendingUp, label: "分析茅台走势", iconColor: "text-amber-400", iconColorLight: "text-amber-600", query: "帮我分析贵州茅台最近的走势" },
  { icon: BarChart3, label: "新能源前景", iconColor: "text-emerald-400", iconColorLight: "text-emerald-600", query: "分析新能源板块的投资前景" },
  { icon: Zap, label: "AI芯片龙头", iconColor: "text-blue-400", iconColorLight: "text-blue-600", query: "盘点AI芯片领域的龙头企业" },
  { icon: Globe, label: "港股机会", iconColor: "text-purple-400", iconColorLight: "text-purple-600", query: "当前港股有哪些投资机会" },
];

const hotTopics = [
  { title: "DeepSeek概念持续发酵", change: "+3.2%", up: true },
  { title: "光伏板块午后拉升", change: "+2.8%", up: true },
  { title: "白酒股集体回调", change: "-1.5%", up: false },
];

const BG_DARK =
  "https://images.unsplash.com/photo-1768992363350-b1f5b6176239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZm9nJTIwZm9yZXN0JTIwcGF0aCUyMG15c3RlcmlvdXN8ZW58MXx8fHwxNzczMjMyNDA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const BG_LIGHT =
  "https://images.unsplash.com/photo-1666039547733-3fe5ca97d474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmslMjB3YXNoJTIwbW91bnRhaW4lMjBsYW5kc2NhcGUlMjBkYXduJTIwbWlzdHxlbnwxfHx8fDE3NzMzNDA4MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function HomePage() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme();

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
      {/* Background atmosphere */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={isDark ? BG_DARK : BG_LIGHT}
          alt="bg"
          className={`w-full h-80 object-cover transition-opacity duration-700 ${
            isDark ? "opacity-20" : "opacity-25"
          }`}
        />
        <div
          className={`absolute inset-0 transition-colors duration-700 ${
            isDark
              ? "bg-gradient-to-b from-[#0a0a0f]/30 via-[#0a0a0f]/85 to-[#0a0a0f]"
              : "bg-gradient-to-b from-[#f5f2ed]/20 via-[#f5f2ed]/80 to-[#f5f2ed]"
          }`}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 pt-[env(safe-area-inset-top)] h-14 flex-shrink-0">
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
          <Menu size={22} className={isDark ? "text-white/50" : "text-black/35"} />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
            <span className="text-white" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 14 }}>识</span>
          </div>
          <span className={isDark ? "text-white/90" : "text-black/80"} style={{ fontSize: 15 }}>识途 AI 投研</span>
        </div>
        <button className="p-1">
          <Sparkles size={20} className={isDark ? "text-amber-400/50" : "text-amber-500/40"} />
        </button>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 px-5">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-10 mb-8 text-center"
        >
          <p
            className={isDark ? "text-amber-400/60" : "text-amber-600/45"}
            style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 12, marginBottom: 8, letterSpacing: "0.1em" }}
          >
            拨开千重雾，老马自识途
          </p>
          <h1
            className={isDark ? "text-white" : "text-[#1a1a1a]"}
            style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 26, lineHeight: 1.4, marginBottom: 4 }}
          >
            今天想了解
          </h1>
          <h1 style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 26, lineHeight: 1.4 }}>
            <span
              className={`bg-clip-text text-transparent ${
                isDark
                  ? "bg-gradient-to-r from-amber-300 to-amber-500"
                  : "bg-gradient-to-r from-amber-500 to-amber-700"
              }`}
            >
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
              className="relative overflow-hidden rounded-2xl p-4 text-left active:scale-[0.97] transition-transform"
            >
              <GlassOverlay intensity="elevated" />
              <action.icon size={22} className={`relative z-[1] mb-3 ${isDark ? action.iconColor : action.iconColorLight}`} />
              <span
                className={`relative z-[1] block ${isDark ? "text-white/75" : "text-black/60"}`}
                style={{ fontSize: 13 }}
              >
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
            <h3 className={isDark ? "text-white/40" : "text-black/35"} style={{ fontSize: 13 }}>
              <span className="inline-block w-1 h-3 bg-amber-500 rounded-full mr-2 relative top-px" />
              今日热点
            </h3>
            <button
              className={`flex items-center gap-0.5 ${isDark ? "text-white/25" : "text-black/20"}`}
              style={{ fontSize: 11 }}
            >
              更多 <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {hotTopics.map((topic) => (
              <button
                key={topic.title}
                onClick={() => handleQuickAction(`分析：${topic.title}`)}
                className="relative overflow-hidden w-full flex items-center justify-between p-3.5 rounded-xl transition-colors active:scale-[0.98]"
              >
                <GlassOverlay />
                <span
                  className={`relative z-[1] ${isDark ? "text-white/65" : "text-black/55"}`}
                  style={{ fontSize: 13 }}
                >
                  {topic.title}
                </span>
                <span
                  className={`relative z-[1] ${topic.up ? "text-emerald-400" : "text-red-400"}`}
                  style={{ fontSize: 13, fontFamily: "monospace" }}
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
        <div className="relative overflow-hidden flex items-center gap-2 rounded-2xl px-4 py-2.5">
          <GlassOverlay intensity="elevated" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="输入股票代码或问题..."
            className={`relative z-[1] flex-1 bg-transparent outline-none ${
              isDark
                ? "text-white/90 placeholder-white/25"
                : "text-black/80 placeholder-black/25"
            }`}
            style={{ fontSize: 14 }}
          />
          <button
            onClick={handleSubmit}
            className={`relative z-[1] p-2 rounded-xl transition-all ${
              query.trim()
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                : isDark
                ? "text-white/20"
                : "text-black/20"
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
