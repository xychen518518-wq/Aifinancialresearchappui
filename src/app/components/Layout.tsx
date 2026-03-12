import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, MessageSquare, BarChart3, Clock, User } from "lucide-react";
import { motion } from "motion/react";
import { ThemeProvider, useTheme } from "./ThemeContext";

const tabs = [
  { path: "/", icon: Home, label: "首页" },
  { path: "/chat", icon: MessageSquare, label: "对话" },
  { path: "/market", icon: BarChart3, label: "行情" },
  { path: "/history", icon: Clock, label: "历史" },
  { path: "/profile", icon: User, label: "我的" },
];

function LayoutInner() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const hideTabBar = location.pathname.startsWith("/chat/");

  return (
    <div
      className={`size-full flex flex-col overflow-hidden transition-colors duration-500 ${
        isDark
          ? "dark bg-[#0a0a0f] text-white"
          : "bg-[#f5f2ed] text-[#1a1a1a]"
      }`}
      style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
    >
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      {!hideTabBar && (
        <nav
          className={`flex-shrink-0 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl transition-colors duration-500 ${
            isDark
              ? "bg-[#0a0a0f]/95 shadow-[0_-0.5px_0_0_rgba(255,255,255,0.05)]"
              : "bg-[#f5f2ed]/95 shadow-[0_-0.5px_0_0_rgba(0,0,0,0.06)]"
          }`}
        >
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
                    className={
                      isActive
                        ? "text-amber-400"
                        : isDark
                        ? "text-white/35"
                        : "text-black/30"
                    }
                  />
                  <span
                    className={`text-[10px] ${
                      isActive
                        ? "text-amber-400"
                        : isDark
                        ? "text-white/35"
                        : "text-black/30"
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

export function Layout() {
  return (
    <ThemeProvider>
      <LayoutInner />
    </ThemeProvider>
  );
}