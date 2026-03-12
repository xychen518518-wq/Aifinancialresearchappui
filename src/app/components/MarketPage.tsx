import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { GlassOverlay, useGlassStyle } from "./GlassCard";

const indices = [
  { name: "上证指数", code: "000001", value: "3,286.53", change: "+1.24%", up: true },
  { name: "深证成指", code: "399001", value: "10,532.18", change: "+1.56%", up: true },
  { name: "创业板指", code: "399006", value: "2,156.72", change: "+2.03%", up: true },
  { name: "恒生指数", code: "HSI", value: "22,415.60", change: "-0.32%", up: false },
];

const sectors = [
  { name: "人工智能", change: "+4.52%", up: true },
  { name: "半导体", change: "+3.18%", up: true },
  { name: "新能源车", change: "+2.76%", up: true },
  { name: "光伏", change: "+2.31%", up: true },
  { name: "医药生物", change: "+0.85%", up: true },
  { name: "白酒", change: "-1.23%", up: false },
  { name: "房地产", change: "-1.87%", up: false },
  { name: "银行", change: "-0.45%", up: false },
];

const watchlist = [
  { name: "贵州茅台", code: "600519", price: "1,756.00", change: "+1.32%", up: true },
  { name: "宁德时代", code: "300750", price: "218.50", change: "+3.45%", up: true },
  { name: "比亚迪", code: "002594", price: "312.80", change: "+2.18%", up: true },
  { name: "中芯国际", code: "688981", price: "76.35", change: "-0.82%", up: false },
  { name: "隆基绿能", code: "601012", price: "28.15", change: "+4.21%", up: true },
  { name: "腾讯控股", code: "00700", price: "412.60", change: "-0.56%", up: false },
];

const tabList = ["自选", "板块", "热门"];

export function MarketPage() {
  const [activeTab, setActiveTab] = useState("自选");
  const { isDark } = useTheme();
  const glassElevated = useGlassStyle("elevated");

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="px-5 pt-[env(safe-area-inset-top)] flex-shrink-0">
        <h2
          className={`h-14 flex items-center ${isDark ? "text-white/90" : "text-black/80"}`}
          style={{ fontSize: 18, fontFamily: "'Noto Serif SC', serif" }}
        >
          行情
        </h2>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Indices */}
        <div className="px-5 mb-5">
          <div className="grid grid-cols-2 gap-2.5">
            {indices.map((idx, i) => (
              <motion.div
                key={idx.code}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="relative overflow-hidden p-3.5 rounded-2xl"
              >
                <GlassOverlay intensity="elevated" />
                {/* Subtle color tint overlay */}
                <div
                  className="absolute inset-0 rounded-[inherit] pointer-events-none"
                  style={{
                    background: idx.up
                      ? "linear-gradient(135deg, rgba(52,211,153,0.06) 0%, transparent 60%)"
                      : "linear-gradient(135deg, rgba(248,113,113,0.06) 0%, transparent 60%)",
                  }}
                />
                <div className="relative z-[1]">
                  <div className="flex items-center justify-between mb-1">
                    <span className={isDark ? "text-white/45" : "text-black/35"} style={{ fontSize: 11 }}>{idx.name}</span>
                    {idx.up ? (
                      <ArrowUpRight size={14} className="text-emerald-400" />
                    ) : (
                      <ArrowDownRight size={14} className="text-red-400" />
                    )}
                  </div>
                  <div className={isDark ? "text-white/90" : "text-black/80"} style={{ fontSize: 16, fontFamily: "monospace" }}>
                    {idx.value}
                  </div>
                  <div
                    className={idx.up ? "text-emerald-400" : "text-red-400"}
                    style={{ fontSize: 12, fontFamily: "monospace" }}
                  >
                    {idx.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="px-5 mb-4 flex-shrink-0">
          <div className="flex gap-1 rounded-xl p-1" style={glassElevated}>
            {tabList.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  activeTab === tab
                    ? isDark
                      ? "bg-white/[0.1] text-amber-400"
                      : "bg-white/60 text-amber-600 shadow-sm"
                    : isDark
                    ? "text-white/35"
                    : "text-black/30"
                }`}
                style={{ fontSize: 13 }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-4">
          {activeTab === "自选" && (
            <div className="space-y-1">
              {watchlist.map((stock, i) => (
                <motion.div
                  key={stock.code}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className={`flex items-center justify-between py-3.5 ${
                    isDark
                      ? "shadow-[0_1px_0_0_rgba(255,255,255,0.03)]"
                      : "shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
                  }`}
                >
                  <div>
                    <div className={isDark ? "text-white/80" : "text-black/70"} style={{ fontSize: 14 }}>{stock.name}</div>
                    <div className={isDark ? "text-white/22" : "text-black/22"} style={{ fontSize: 11 }}>{stock.code}</div>
                  </div>
                  <div className="text-right">
                    <div className={isDark ? "text-white/80" : "text-black/70"} style={{ fontSize: 14, fontFamily: "monospace" }}>
                      {stock.price}
                    </div>
                    <div
                      className={stock.up ? "text-emerald-400" : "text-red-400"}
                      style={{ fontSize: 12, fontFamily: "monospace" }}
                    >
                      {stock.change}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "板块" && (
            <div className="space-y-1">
              {sectors.map((sector, i) => (
                <motion.div
                  key={sector.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className={`flex items-center justify-between py-3.5 ${
                    isDark
                      ? "shadow-[0_1px_0_0_rgba(255,255,255,0.03)]"
                      : "shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {sector.up ? (
                      <TrendingUp size={16} className="text-emerald-400" />
                    ) : (
                      <TrendingDown size={16} className="text-red-400" />
                    )}
                    <span className={isDark ? "text-white/75" : "text-black/60"} style={{ fontSize: 14 }}>{sector.name}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-lg ${
                      sector.up ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                    }`}
                    style={{ fontSize: 13, fontFamily: "monospace" }}
                  >
                    {sector.change}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "热门" && (
            <div className="space-y-1">
              {watchlist.slice(0, 4).map((stock, i) => (
                <motion.div
                  key={stock.code}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className={`flex items-center justify-between py-3.5 ${
                    isDark
                      ? "shadow-[0_1px_0_0_rgba(255,255,255,0.03)]"
                      : "shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center" style={{ fontSize: 10 }}>
                      {i + 1}
                    </span>
                    <div>
                      <div className={isDark ? "text-white/80" : "text-black/70"} style={{ fontSize: 14 }}>{stock.name}</div>
                      <div className={isDark ? "text-white/22" : "text-black/22"} style={{ fontSize: 11 }}>{stock.code}</div>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-lg ${
                      stock.up ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                    }`}
                    style={{ fontSize: 13, fontFamily: "monospace" }}
                  >
                    {stock.change}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
