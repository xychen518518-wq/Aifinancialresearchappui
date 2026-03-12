import { motion } from "motion/react";
import {
  User,
  Crown,
  ChevronRight,
  Bell,
  Shield,
  HelpCircle,
  Info,
  LogOut,
  Star,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "./ThemeContext";
import { GlassOverlay, useGlassStyle } from "./GlassCard";

export function ProfilePage() {
  const { isDark, toggleTheme } = useTheme();
  const glassElevated = useGlassStyle("elevated");

  const menuSections = [
    {
      items: [
        { icon: Crown, label: "会员中心", subtitle: "解锁更多AI投研能力", color: "text-amber-400", colorLight: "text-amber-600", badge: "PRO" },
        { icon: Star, label: "我的收藏", subtitle: "已收藏 23 条研报", color: "text-amber-400/70", colorLight: "text-amber-600/70" },
      ],
    },
    {
      items: [
        { icon: Bell, label: "消息通知", subtitle: "行情提醒、研报推送", color: "text-white/40", colorLight: "text-black/35" },
        { icon: Shield, label: "隐私与安全", subtitle: "", color: "text-white/40", colorLight: "text-black/35" },
      ],
    },
    {
      items: [
        { icon: HelpCircle, label: "帮助与反馈", subtitle: "", color: "text-white/40", colorLight: "text-black/35" },
        { icon: Info, label: "关于识途", subtitle: "v2.1.0", color: "text-white/40", colorLight: "text-black/35" },
      ],
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <header className="px-5 pt-[env(safe-area-inset-top)] flex-shrink-0">
        <h2
          className={`h-14 flex items-center ${isDark ? "text-white/90" : "text-black/80"}`}
          style={{ fontSize: 18, fontFamily: "'Noto Serif SC', serif" }}
        >
          我的
        </h2>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden p-5 rounded-2xl mb-5"
          style={{
            ...glassElevated,
            background: isDark
              ? "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(255,255,255,0.04) 40%, rgba(0,0,0,0.06) 100%)"
              : "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.3) 100%)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className={isDark ? "text-white/90" : "text-black/80"} style={{ fontSize: 17 }}>投研用户</h3>
              <p className={isDark ? "text-amber-400/55" : "text-amber-600/55"} style={{ fontSize: 12, marginTop: 2 }}>
                PRO会员 · 有效期至 2026.12.31
              </p>
            </div>
            <ChevronRight size={18} className={isDark ? "text-white/18" : "text-black/12"} />
          </div>

          {/* Stats */}
          <div
            className="flex items-center justify-around mt-5 pt-4"
            style={{
              boxShadow: isDark
                ? "0 -0.5px 0 0 rgba(255,255,255,0.06)"
                : "0 -0.5px 0 0 rgba(0,0,0,0.06)",
            }}
          >
            {[
              { val: "156", label: "对话次数" },
              { val: "23", label: "收藏研报" },
              { val: "89", label: "关注股票" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                <div className="text-center">
                  <div className={isDark ? "text-white/80" : "text-black/70"} style={{ fontSize: 18 }}>{stat.val}</div>
                  <div className={isDark ? "text-white/25" : "text-black/22"} style={{ fontSize: 11, marginTop: 2 }}>{stat.label}</div>
                </div>
                {i < 2 && (
                  <div
                    className="w-px h-8 ml-8"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="relative overflow-hidden mb-4 rounded-2xl"
        >
          <GlassOverlay intensity="elevated" />
          <button
            onClick={toggleTheme}
            className={`relative z-[1] w-full flex items-center gap-3.5 px-4 py-4 transition-colors ${
              isDark ? "active:bg-white/[0.03]" : "active:bg-black/[0.02]"
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isDark ? "bg-amber-500/15" : "bg-amber-500/10"
            }`}>
              {isDark ? (
                <Moon size={18} className="text-amber-400" />
              ) : (
                <Sun size={18} className="text-amber-600" />
              )}
            </div>
            <div className="flex-1 text-left">
              <span className={isDark ? "text-white/70" : "text-black/60"} style={{ fontSize: 14 }}>
                外观模式
              </span>
              <span className={isDark ? "text-white/22" : "text-black/22"} style={{ fontSize: 11, display: "block" }}>
                {isDark ? "深色 · 暗夜识途" : "浅色 · 晨雾山行"}
              </span>
            </div>
            <div
              className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
                isDark ? "bg-amber-500/30" : "bg-amber-500/25"
              }`}
            >
              <motion.div
                className="absolute top-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg"
                animate={{ left: isDark ? 2 : 22 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
          </button>
        </motion.div>

        {/* Poetic quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-4 mb-4"
        >
          <p
            className={isDark ? "text-amber-400/25" : "text-amber-600/20"}
            style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 11, letterSpacing: "0.3em" }}
          >
            乱花迷人眼，云深路欲无
          </p>
          <p
            className={isDark ? "text-amber-400/35" : "text-amber-600/30"}
            style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 11, letterSpacing: "0.3em", marginTop: 4 }}
          >
            拨开千重雾，老马自识途
          </p>
        </motion.div>

        {/* Menu Sections */}
        {menuSections.map((section, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + si * 0.08 }}
            className="relative overflow-hidden mb-3 rounded-2xl"
          >
            <GlassOverlay />
            {section.items.map((item, ii) => (
              <button
                key={item.label}
                className={`relative z-[1] w-full flex items-center gap-3.5 px-4 py-3.5 transition-colors ${
                  isDark ? "active:bg-white/[0.03]" : "active:bg-black/[0.02]"
                } ${
                  ii < section.items.length - 1
                    ? isDark
                      ? "shadow-[0_1px_0_0_rgba(255,255,255,0.03)]"
                      : "shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
                    : ""
                }`}
              >
                <item.icon size={18} className={isDark ? item.color : item.colorLight} />
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className={isDark ? "text-white/70" : "text-black/60"} style={{ fontSize: 14 }}>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-500 to-amber-600 text-white" style={{ fontSize: 9 }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <span className={isDark ? "text-white/22" : "text-black/22"} style={{ fontSize: 11 }}>{item.subtitle}</span>
                  )}
                </div>
                <ChevronRight size={16} className={isDark ? "text-white/12" : "text-black/10"} />
              </button>
            ))}
          </motion.div>
        ))}

        {/* Logout */}
        <button
          className={`relative overflow-hidden w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors mt-2 active:scale-[0.98] ${
            isDark ? "text-red-400/50" : "text-red-500/45"
          }`}
        >
          <GlassOverlay />
          <LogOut size={16} className="relative z-[1]" />
          <span className="relative z-[1]" style={{ fontSize: 13 }}>退出登录</span>
        </button>
      </div>
    </div>
  );
}
