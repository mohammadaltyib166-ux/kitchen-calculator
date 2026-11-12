import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { overshoot, progress } from "./motion";

/** Near-black background with a slowly drifting gold glow (dark-gold style). */
export const GoldGlowBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const x = interpolate(frame, [0, durationInFrames], [40, 60]);
  const y = interpolate(frame, [0, durationInFrames], [55, 40]);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${x}% ${y}%, rgba(214,170,74,0.28) 0%, rgba(120,90,30,0.10) 30%, #0b0a08 62%)`,
      }}
    />
  );
};

/** Warm cream background with soft moving shapes (cream-UI style). */
export const CreamBackground: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#f4efe8" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 80% 15%, rgba(255,255,255,0.9) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(232,220,205,0.9) 0%, transparent 50%)",
          translate: `${Math.sin(frame / 40) * 30}px ${Math.cos(frame / 50) * 20}px`,
        }}
      />
    </AbsoluteFill>
  );
};

/**
 * Card that springs up from below, out of a blur.
 * `variant` switches between frosted dark glass and white paper.
 */
export const PopCard: React.FC<{
  start?: number;
  variant: "darkGlass" | "paper";
  width?: number;
  height?: number;
  children?: React.ReactNode;
}> = ({ start = 0, variant, width = 760, height = 420, children }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, start, 20, overshoot);
  const fade = progress(frame, start, 10);
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 36,
        padding: 40,
        boxSizing: "border-box",
        opacity: fade,
        translate: `0px ${interpolate(t, [0, 1], [140, 0])}px`,
        scale: interpolate(t, [0, 1], [0.9, 1]),
        filter: `blur(${interpolate(fade, [0, 1], [14, 0])}px)`,
        background:
          variant === "darkGlass"
            ? "linear-gradient(160deg, rgba(60,55,45,0.75), rgba(25,23,20,0.85))"
            : "#ffffff",
        border:
          variant === "darkGlass"
            ? "1.5px solid rgba(214,170,74,0.25)"
            : "1.5px solid rgba(0,0,0,0.05)",
        boxShadow:
          variant === "darkGlass"
            ? "0 30px 80px rgba(0,0,0,0.6)"
            : "0 30px 70px rgba(120,90,60,0.18)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
      }}
    >
      {children}
    </div>
  );
};

/** "03 / 10" style chapter badge in the top corner. */
export const StepBadge: React.FC<{
  index: number;
  total: number;
  color: string;
  border: string;
  fontFamily: string;
}> = ({ index, total, color, border, fontFamily }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, 0, 12);
  return (
    <div
      style={{
        position: "absolute",
        top: 130,
        left: 90,
        padding: "8px 22px",
        borderRadius: 14,
        border: `2px solid ${border}`,
        color,
        fontFamily,
        fontWeight: 800,
        fontSize: 34,
        letterSpacing: 2,
        opacity: t,
        translate: `${interpolate(t, [0, 1], [-30, 0])}px 0px`,
      }}
    >
      {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </div>
  );
};

/** Thin progress line at the bottom that fills over the whole video. */
export const ProgressLine: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        bottom: 70,
        right: 90,
        left: 90,
        height: 5,
        borderRadius: 3,
        background: "rgba(255,255,255,0.12)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          marginLeft: "auto",
          width: `${(frame / (durationInFrames - 1)) * 100}%`,
          background: color,
        }}
      />
    </div>
  );
};

/** Four-point sparkle that twinkles (glow-overlay style). */
export const Sparkle: React.FC<{
  x: number;
  y: number;
  size?: number;
  start?: number;
  color: string;
}> = ({ x, y, size = 90, start = 0, color }) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  if (local < 0) return null;
  const s = interpolate(local, [0, 8, 18, 30], [0, 1.2, 0.9, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <svg
      viewBox="-50 -50 100 100"
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        scale: s,
        rotate: `${local * 3}deg`,
        filter: `drop-shadow(0 0 12px ${color})`,
      }}
    >
      <path d="M0 -50 Q6 -6 50 0 Q6 6 0 50 Q-6 6 -50 0 Q-6 -6 0 -50Z" fill={color} />
    </svg>
  );
};

/** Big blurred orange slab that sweeps across the frame as a transition accent. */
export const SweepSlab: React.FC<{ start?: number; color: string; fromRight?: boolean }> = ({
  start = 0,
  color,
  fromRight = true,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const t = progress(frame, start, 18);
  const dir = fromRight ? 1 : -1;
  return (
    <div
      style={{
        position: "absolute",
        top: "58%",
        left: 0,
        width: 520,
        height: 260,
        borderRadius: 40,
        background: color,
        filter: "blur(14px)",
        opacity: interpolate(t, [0, 0.2, 0.8, 1], [0, 0.9, 0.9, 0]),
        rotate: "-14deg",
        translate: `${interpolate(t, [0, 1], [dir * width, -dir * 600])}px 0px`,
      }}
    />
  );
};
