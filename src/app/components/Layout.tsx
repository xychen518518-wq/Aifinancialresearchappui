import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, MessageSquare, BarChart3, Clock, User } from "lucide-react";
import { motion } from "motion/react";

const tabs = [
  { path: "/", icon: Home, label: "首页" },
  { path: "/chat", icon: MessageSquare, label: "对话" },
  { path: "/market", icon: BarChart3, label: "行情" },
  { path: "/history", icon: Clock, label: "历史" },
  { path: "/profile", icon: User, label: "我的" },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide tab bar in active chat
  const hideTabBar = location.pathname.startsWith("/chat/");

  return (
    <div className="dark size-full flex flex-col bg-[#0a0a0f] text-white overflow-hidden" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      {!hideTabBar && (
        <nav className="flex-shrink-0 border-t border-white/5 bg-[#0a0a0f]/95 backdrop-blur-xl px-2 pb-[env(safe-area-inset-bottom)]">
          <div className="flex items-center justify-around h-14">
            {tabs.map((tab) => {
              const isActive =
                tab.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(tab.path);
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className="relative flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute -top-px left-3 right-3 h-0.5 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <tab.icon
                    size={20}
                    className={isActive ? "text-amber-400" : "text-white/35"}
                  />
                  <span
                    className={`text-[10px] ${
                      isActive ? "text-amber-400" : "text-white/35"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
