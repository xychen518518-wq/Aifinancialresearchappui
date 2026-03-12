import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Send, MoreVertical, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useGlassStyle } from "./GlassCard";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const mockResponses: Record<string, Message[]> = {
  "1": [
    { id: "1", role: "user", content: "帮我分析贵州茅台最近的走势", time: "14:28" },
    {
      id: "2",
      role: "assistant",
      content:
        "📊 **贵州茅台 (600519) 走势分析**\n\n**近期表现：**\n茅台近5个交易日在1720-1785区间震荡，成交量较前期有所放大。\n\n**技术面：**\n• MACD金叉形成，短期偏多\n• 5日均线上穿10日均线\n• RSI指标处于55附近，中性偏强\n\n**基本面：**\n• 2025年报营收1736亿，同比+15.7%\n• 直营渠道占比持续提升\n• 出厂价稳定，批价小幅回升\n\n**风险提示：**\n白酒行业政策面存在不确定性，需关注消费数据变化。\n\n💡 *建议关注1700支撑位，若放量突破1800可考虑加仓。*",
      time: "14:28",
    },
  ],
  "2": [
    { id: "1", role: "user", content: "分析新能源板块的投资前景", time: "10:12" },
    {
      id: "2",
      role: "assistant",
      content:
        "🔋 **新能源板块投资前景分析**\n\n**行业趋势：**\n2026年全球新能源装机量预计增长22%，中国光伏、储能出口持续高增。\n\n**细分赛道：**\n• **光伏**：N型电池渗透率突破60%，关注HJT路线\n• **储能**：大储招标量同比+45%，盈利改善\n• **风电**：海风招标回暖，深远海项目启动\n• **锂电**：碳酸锂价格企稳，材料端利润修复\n\n**重点关注标的：**\n隆基绿能、阳光电源、宁德时代、中天科技\n\n⚡ *新能源板块估值处于历史中低位，中长期配置价值凸显。*",
      time: "10:15",
    },
  ],
};

export function ChatDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const { isDark } = useTheme();
  const glassSubtle = useGlassStyle("subtle");
  const glassElevated = useGlassStyle("elevated");

  const [messages, setMessages] = useState<Message[]>(() => {
    if (id === "new" && initialQuery) {
      return [
        { id: "1", role: "user", content: initialQuery, time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }) },
      ];
    }
    return mockResponses[id || ""] || [];
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(id === "new" && !!initialQuery);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: String(prev.length + 1),
            role: "assistant",
            content:
              "🔍 **分析进行中...**\n\n正在为您检索相关数据并生成分析报告。识途AI将从技术面、基本面、资金面三个维度为您全面解析。\n\n• 已获取最新行情数据\n• 正在分析历史走势规律\n• 结合宏观经济环境研判\n\n💡 *拨开千重雾，为您指出投资的方向。请稍候片刻...*",
            time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setIsTyping(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        role: "user",
        content: input.trim(),
        time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setInput("");
    setIsTyping(true);
  };

  const chatTitle = id === "new" ? "新对话" : messages[0]?.content.slice(0, 10) + "..." || "对话";

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header
        className={`flex items-center gap-3 px-4 pt-[env(safe-area-inset-top)] h-14 flex-shrink-0 ${
          isDark ? "shadow-[0_1px_0_0_rgba(255,255,255,0.04)]" : "shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
        }`}
      >
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={20} className={isDark ? "text-white/60" : "text-black/45"} />
        </button>
        <div className="flex-1 min-w-0">
          <h4 className={`truncate ${isDark ? "text-white/85" : "text-black/75"}`} style={{ fontSize: 15 }}>
            {chatTitle}
          </h4>
        </div>
        <button className="p-1">
          <MoreVertical size={18} className={isDark ? "text-white/40" : "text-black/30"} />
        </button>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id + i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                <span className="text-white" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 11 }}>识</span>
              </div>
            )}
            <div
              className="max-w-[80%] rounded-2xl px-4 py-3"
              style={
                msg.role === "user"
                  ? {
                      background: isDark
                        ? "linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(217,119,6,0.08) 100%)"
                        : "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(217,119,6,0.06) 100%)",
                      boxShadow: isDark
                        ? "inset 0 0.5px 0 0 rgba(245,158,11,0.2), 0 1px 3px 0 rgba(0,0,0,0.1)"
                        : "inset 0 0.5px 0 0 rgba(255,255,255,0.6), 0 1px 3px 0 rgba(0,0,0,0.04)",
                    }
                  : glassSubtle
              }
            >
              <p
                className={`whitespace-pre-wrap ${isDark ? "text-white/80" : "text-black/70"}`}
                style={{ fontSize: 13, lineHeight: 1.7 }}
              >
                {msg.content}
              </p>
              <span className={`block text-right mt-1 ${isDark ? "text-white/18" : "text-black/15"}`} style={{ fontSize: 10 }}>
                {msg.time}
              </span>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center flex-shrink-0">
              <span className="text-white" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 11 }}>识</span>
            </div>
            <div className="rounded-2xl px-4 py-3 flex items-center gap-1.5" style={glassSubtle}>
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="flex items-center gap-1"
              >
                <Sparkles size={14} className="text-amber-400" />
                <span className={isDark ? "text-white/40" : "text-black/35"} style={{ fontSize: 12 }}>识途正在思考...</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div
        className={`flex-shrink-0 px-4 pb-3 pt-2 ${
          isDark ? "shadow-[0_-1px_0_0_rgba(255,255,255,0.04)]" : "shadow-[0_-1px_0_0_rgba(0,0,0,0.06)]"
        }`}
      >
        <div className="rounded-2xl px-4 py-2.5 flex items-center gap-2" style={glassElevated}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="继续提问..."
            className={`flex-1 bg-transparent outline-none ${
              isDark ? "text-white/90 placeholder-white/25" : "text-black/80 placeholder-black/25"
            }`}
            style={{ fontSize: 14 }}
          />
          <button
            onClick={handleSend}
            className={`p-2 rounded-xl transition-all ${
              input.trim()
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
