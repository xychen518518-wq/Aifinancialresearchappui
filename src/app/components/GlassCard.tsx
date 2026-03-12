import { type CSSProperties, type ReactNode } from "react";
import { useTheme } from "./ThemeContext";

/**
 * Liquid Glass v2 — "Material, not Overlay"
 *
 * Key principles:
 * - Glass is the card's OWN surface, not a div stacked on top
 * - No backdrop-blur (nothing meaningful to blur through)
 * - No border — inset shadow defines edges organically
 * - Two intensities: subtle (list items) and elevated (prominent cards)
 * - Content sits directly on the glass surface, no z-index hacks needed
 */

/* ─── Dark theme glass ─── */
const glassDarkSubtle: CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 50%, rgba(0,0,0,0.06) 100%)",
  boxShadow: [
    "inset 0 0.5px 0 0 rgba(255,255,255,0.08)",
    "inset 0 -0.5px 0 0 rgba(0,0,0,0.2)",
    "0 1px 3px 0 rgba(0,0,0,0.12)",
  ].join(", "),
};

const glassDarkElevated: CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, rgba(0,0,0,0.08) 100%)",
  boxShadow: [
    "inset 0 0.5px 0 0 rgba(255,255,255,0.12)",
    "inset 0 -0.5px 0 0 rgba(0,0,0,0.25)",
    "0 2px 8px 0 rgba(0,0,0,0.18)",
    "0 0.5px 0 0 rgba(255,255,255,0.04)",
  ].join(", "),
};

/* ─── Light theme glass ─── */
const glassLightSubtle: CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.2) 100%)",
  boxShadow: [
    "inset 0 0.5px 0 0 rgba(255,255,255,0.9)",
    "inset 0 -0.5px 0 0 rgba(0,0,0,0.05)",
    "0 1px 3px 0 rgba(0,0,0,0.04)",
  ].join(", "),
};

const glassLightElevated: CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.3) 100%)",
  boxShadow: [
    "inset 0 0.5px 0 0 rgba(255,255,255,1)",
    "inset 0 -0.5px 0 0 rgba(0,0,0,0.06)",
    "0 2px 8px 0 rgba(0,0,0,0.06)",
    "0 0.5px 0 0 rgba(255,255,255,0.5)",
  ].join(", "),
};

export type GlassIntensity = "subtle" | "elevated";

/** Returns glass CSSProperties for the current theme */
export function useGlassStyle(intensity: GlassIntensity = "subtle") {
  const { isDark } = useTheme();
  if (isDark) {
    return intensity === "elevated" ? glassDarkElevated : glassDarkSubtle;
  }
  return intensity === "elevated" ? glassLightElevated : glassLightSubtle;
}

/** Standalone glass overlay — place inside a relative/overflow-hidden parent */
export function GlassOverlay({
  className = "",
  intensity = "subtle",
}: {
  className?: string;
  intensity?: GlassIntensity;
}) {
  const style = useGlassStyle(intensity);
  return (
    <div
      className={`absolute inset-0 pointer-events-none rounded-[inherit] transition-all duration-500 ${className}`}
      style={style}
    />
  );
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  as?: "div" | "button";
  intensity?: GlassIntensity;
}

/** Card wrapper with built-in glass material */
export function GlassCard({
  children,
  className = "",
  style: customStyle,
  onClick,
  as: Component = "div",
  intensity = "subtle",
}: GlassCardProps) {
  const glassStyle = useGlassStyle(intensity);

  return (
    <Component
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ ...glassStyle, ...customStyle }}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
