import { motion } from "motion/react";
import {
  User,
  Crown,
  ChevronRight,
  Bell,
  Shield,
  Palette,
  HelpCircle,
  Info,
  LogOut,
  Star,
} from "lucide-react";

const menuSections = [
  {
    items: [
      { icon: Crown, label: "会员中心", subtitle: "解锁更多AI投研能力", color: "text-amber-400", badge: "PRO" },
      { icon: Star, label: "我的收藏", subtitle: "已收藏 23 条研报", color: "text-amber-400/70" },
    ],
  },
  {
    items: [
      { icon: Bell, label: "消息通知", subtitle: "行情提醒、研报推送", color: "text-white/40" },
      { icon: Shield, label: "隐私与安全", subtitle: "", color: "text-white/40" },
      { icon: Palette, label: "外观设置", subtitle: "深色模式", color: "text-white/40" },
    ],
  },
  {
    items: [
      { icon: HelpCircle, label: "帮助与反馈", subtitle: "", color: "text-white/40" },
      { icon: Info, label: "关于识途", subtitle: "v2.1.0", color: "text-white/40" },
    ],
  },
];

export function ProfilePage() {
  return (
    <div className="h-full flex flex-col">
      <header className="px-5 pt-[env(safe-area-inset-top)] flex-shrink-0">
        <h2 className="text-white/90 h-14 flex items-center" style={{ fontSize: 18, fontFamily: "'Noto Serif SC', serif" }}>
          我的
        </h2>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-700/5 border border-amber-500/10 mb-5"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white/90" style={{ fontSize: 17 }}>投研用户</h3>
              <p className="text-amber-400/60 mt-0.5" style={{ fontSize: 12 }}>
                PRO会员 · 有效期至 2026.12.31
              </p>
            </div>
            <ChevronRight size={18} className="text-white/20" />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-around mt-5 pt-4 border-t border-white/[0.06]">
            <div className="text-center">
              <div className="text-white/80" style={{ fontSize: 18 }}>156</div>
              <div className="text-white/30 mt-0.5" style={{ fontSize: 11 }}>对话次数</div>
            </div>
            <div className="w-px h-8 bg-white/[0.06]" />
            <div className="text-center">
              <div className="text-white/80" style={{ fontSize: 18 }}>23</div>
              <div className="text-white/30 mt-0.5" style={{ fontSize: 11 }}>收藏研报</div>
            </div>
            <div className="w-px h-8 bg-white/[0.06]" />
            <div className="text-center">
              <div className="text-white/80" style={{ fontSize: 18 }}>89</div>
              <div className="text-white/30 mt-0.5" style={{ fontSize: 11 }}>关注股票</div>
            </div>
          </div>
        </motion.div>

        {/* Poetic quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-4 mb-4"
        >
          <p className="text-amber-400/30 tracking-[0.3em]" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 11 }}>
            乱花迷人眼，云深路欲无
          </p>
          <p className="text-amber-400/40 tracking-[0.3em] mt-1" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 11 }}>
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
            className="mb-3 rounded-2xl bg-white/[0.03] border border-white/[0.04] overflow-hidden"
          >
            {section.items.map((item, i) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3.5 px-4 py-3.5 active:bg-white/[0.03] transition-colors border-b border-white/[0.03] last:border-0"
              >
                <item.icon size={18} className={item.color} />
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-white/75" style={{ fontSize: 14 }}>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-500 to-amber-600 text-white" style={{ fontSize: 9 }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <span className="text-white/25" style={{ fontSize: 11 }}>{item.subtitle}</span>
                  )}
                </div>
                <ChevronRight size={16} className="text-white/15" />
              </button>
            ))}
          </motion.div>
        ))}

        {/* Logout */}
        <button className="w-full py-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center gap-2 text-red-400/60 active:bg-red-500/5 transition-colors mt-2">
          <LogOut size={16} />
          <span style={{ fontSize: 13 }}>退出登录</span>
        </button>
      </div>
    </div>
  );
}
