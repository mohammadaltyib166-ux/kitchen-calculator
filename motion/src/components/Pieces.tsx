import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { damped, easeIn, easeInOut, easeOut, overshoot, progress } from "./motion";
import { MaskLine } from "./Text";

/* ───────────── Backgrounds ───────────── */

/** Navy drafting paper with a fine + coarse grid that slowly drifts. */
export const BlueprintBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = frame * 0.4;
  return (
    <AbsoluteFill style={{ background: "#0c1a2e" }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(126,200,255,0.07) 2px, transparent 2px), linear-gradient(90deg, rgba(126,200,255,0.07) 2px, transparent 2px), linear-gradient(rgba(126,200,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(126,200,255,0.035) 1px, transparent 1px)",
          backgroundSize: "180px 180px, 180px 180px, 36px 36px, 36px 36px",
          backgroundPosition: `${drift}px ${drift * 0.6}px`,
        }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(4,10,20,0.75) 100%)" }} />
    </AbsoluteFill>
  );
};

/** Pale brushed-aluminium surface: fine diagonal streaks sliding slowly. */
export const BrushedBackground: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "linear-gradient(170deg, #f2f3f1 0%, #e3e6e4 100%)" }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.55) 0px, rgba(255,255,255,0.55) 2px, transparent 2px, transparent 9px, rgba(0,0,0,0.018) 9px, rgba(0,0,0,0.018) 10px, transparent 10px, transparent 23px)",
          backgroundPosition: `${frame * 0.8}px 0px`,
        }}
      />
    </AbsoluteFill>
  );
};

/* ───────────── Cards & props ───────────── */

/** Tile that flips in around its vertical axis like a turned sample card. */
export const FlipTile: React.FC<{
  start?: number;
  selected?: number; // frame at which it becomes selected (optional)
  width: number;
  height: number;
  accent: string;
  children: React.ReactNode;
}> = ({ start = 0, selected, width, height, accent, children }) => {
  const frame = useCurrentFrame();
  const flip = progress(frame, start, 22, overshoot);
  const sel = selected === undefined ? 0 : progress(frame, selected, 14, overshoot);
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 28,
        background: "white",
        boxSizing: "border-box",
        border: `4px solid ${sel > 0.01 ? accent : "rgba(0,0,0,0.06)"}`,
        boxShadow: `0 ${interpolate(sel, [0, 1], [14, 34])}px ${interpolate(sel, [0, 1], [30, 60])}px rgba(20,40,40,${interpolate(sel, [0, 1], [0.1, 0.22])})`,
        transform: `perspective(1400px) rotateY(${interpolate(flip, [0, 1], [-95, 0])}deg)`,
        translate: `0px ${interpolate(sel, [0, 1], [0, -24])}px`,
        opacity: flip > 0.02 ? 1 : 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};

/** Rubber stamp that slams down onto the surface and shakes on impact. */
export const Stamp: React.FC<{
  start?: number;
  color: string;
  fontFamily: string;
  children: React.ReactNode;
}> = ({ start = 0, color, fontFamily, children }) => {
  const frame = useCurrentFrame();
  const slam = progress(frame, start, 8, easeIn);
  const impact = start + 8;
  return (
    <div
      style={{
        padding: "14px 40px",
        border: `6px solid ${color}`,
        borderRadius: 18,
        color,
        fontFamily,
        fontWeight: 700,
        fontSize: 64,
        opacity: frame < start ? 0 : interpolate(slam, [0, 1], [0.2, 0.92]),
        scale: interpolate(slam, [0, 1], [2.6, 1]),
        rotate: `${-10 + (frame > impact ? damped(frame, impact, 3, { frequency: 1.2, decay: 0.3 }) : 0)}deg`,
        translate: `${frame > impact ? damped(frame, impact, 10, { frequency: 1.6, decay: 0.35 }) : 0}px 0px`,
        direction: "rtl",
      }}
    >
      {children}
    </div>
  );
};

/** Price tag hanging on a string that drops in and swings until it settles. */
export const SwingTag: React.FC<{
  start?: number;
  x: number;
  stringLength?: number;
  color: string;
  textColor: string;
  children: React.ReactNode;
}> = ({ start = 0, x, stringLength = 260, color, textColor, children }) => {
  const frame = useCurrentFrame();
  const drop = progress(frame, start, 16, overshoot);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: x,
        translate: `-50% ${interpolate(drop, [0, 1], [-stringLength - 400, 0])}px`,
        transformOrigin: "50% 0%",
        rotate: `${damped(frame, start + 10, 18, { frequency: 0.18, decay: 0.045 })}deg`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: 3, height: stringLength, background: "rgba(255,255,255,0.8)" }} />
      <div
        style={{
          position: "relative",
          padding: "44px 46px 30px",
          background: color,
          color: textColor,
          borderRadius: "22px 22px 30px 30px",
          boxShadow: "0 24px 50px rgba(0,0,0,0.35)",
          textAlign: "center",
          direction: "rtl",
        }}
      >
        {/* punched hole */}
        <div style={{ position: "absolute", top: 14, left: "50%", translate: "-50% 0px", width: 22, height: 22, borderRadius: 11, background: "rgba(0,0,0,0.25)" }} />
        {children}
      </div>
    </div>
  );
};

/**
 * Callout: a dot pulses on a point of interest, a leader line draws
 * out at an angle, then turns and a label rises from behind the line.
 */
export const Callout: React.FC<{
  start?: number;
  x: number;
  y: number;
  dx: number; // horizontal reach of the leader (negative = to the left)
  dy: number; // vertical rise of the diagonal part
  color: string;
  label: string;
  fontFamily: string;
}> = ({ start = 0, x, y, dx, dy, color, label, fontFamily }) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  const dot = progress(frame, start, 10, overshoot);
  const ring = (local % 36) / 36;
  const diagX = dx * 0.35;
  const draw = progress(frame, start + 6, 20, easeInOut);
  // Path: point → diagonal → horizontal run
  const total = Math.hypot(diagX, dy) + Math.abs(dx - diagX);
  const firstLen = Math.hypot(diagX, dy) / total;
  const p1 = Math.min(draw / firstLen, 1);
  const p2 = Math.max(0, (draw - firstLen) / (1 - firstLen));
  const ex = x + diagX * p1 + (dx - diagX) * p2;
  const ey = y + dy * p1;
  const endX = x + dx;
  const endY = y + dy;
  if (local < 0) return null;
  return (
    <AbsoluteFill>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
        <circle cx={x} cy={y} r={16 + ring * 40} fill="none" stroke={color} strokeWidth={3} opacity={(1 - ring) * dot} />
        <circle cx={x} cy={y} r={14 * dot} fill={color} />
        <polyline
          points={p2 > 0 ? `${x},${y} ${x + diagX},${y + dy} ${ex},${ey}` : `${x},${y} ${ex},${ey}`}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: endY - 96,
          ...(dx < 0 ? { left: endX } : { right: 1080 - endX }),
          direction: "rtl",
        }}
      >
        <MaskLine start={start + 22} duration={16}>
          <div style={{ fontFamily, fontWeight: 800, fontSize: 52, color: "white", textShadow: "0 3px 18px rgba(0,0,0,0.6)", whiteSpace: "nowrap" }}>
            {label}
          </div>
        </MaskLine>
      </div>
    </AbsoluteFill>
  );
};

/** Black cover with a circular hole that opens up — an iris reveal. */
export const IrisReveal: React.FC<{ start?: number; duration?: number; cx: string; cy: string }> = ({
  start = 0,
  duration = 28,
  cx,
  cy,
}) => {
  const frame = useCurrentFrame();
  const r = interpolate(progress(frame, start, duration, easeInOut), [0, 1], [0, 1400]);
  if (r >= 1399) return null;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${cx} ${cy}, transparent ${r}px, #05080c ${r + 2}px)`,
      }}
    />
  );
};

/**
 * Lower-third name bar: the bar wipes open from the right edge,
 * a light sheen sweeps across it, and two text lines rise in.
 */
export const LowerThird: React.FC<{
  start?: number;
  end?: number;
  title: string;
  subtitle: string;
  color: string;
  fontFamily: string;
  titleFont: string;
}> = ({ start = 0, end = 9999, title, subtitle, color, fontFamily, titleFont }) => {
  const frame = useCurrentFrame();
  const open = progress(frame, start, 18, easeInOut);
  const close = progress(frame, end - 14, 14, easeInOut);
  const sheen = progress(frame, start + 20, 26, easeInOut);
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: 300,
        width: 860,
        padding: "28px 70px 28px 40px",
        boxSizing: "border-box",
        background: color,
        borderRadius: "40px 0 0 40px",
        overflow: "hidden",
        clipPath: `inset(0 0 0 ${(1 - open + close) * 100}%)`,
        direction: "rtl",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 160,
          left: `${interpolate(sheen, [0, 1], [110, -30])}%`,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
          rotate: "18deg",
        }}
      />
      <MaskLine start={start + 10}>
        <div style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 84, color: "white", lineHeight: 1.1 }}>{title}</div>
      </MaskLine>
      <MaskLine start={start + 16}>
        <div style={{ fontFamily, fontWeight: 600, fontSize: 44, color: "rgba(255,255,255,0.85)" }}>{subtitle}</div>
      </MaskLine>
    </div>
  );
};

/** Pill button that gets pressed (squash) and sends out a ripple ring. */
export const PressButton: React.FC<{
  start?: number;
  pressAt: number;
  color: string;
  fontFamily: string;
  children: React.ReactNode;
}> = ({ start = 0, pressAt, color, fontFamily, children }) => {
  const frame = useCurrentFrame();
  const enter = progress(frame, start, 16, overshoot);
  const press = interpolate(frame, [pressAt, pressAt + 4, pressAt + 14], [1, 0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const ripple = progress(frame, pressAt + 2, 24, easeOut);
  return (
    <div style={{ position: "relative", display: "inline-block", translate: `0px ${interpolate(enter, [0, 1], [220, 0])}px`, opacity: frame < start ? 0 : 1 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 999,
          border: `4px solid ${color}`,
          scale: `${1 + ripple * 0.35} ${1 + ripple * 0.9}`,
          opacity: frame < pressAt ? 0 : 1 - ripple,
        }}
      />
      <div
        style={{
          padding: "30px 64px",
          borderRadius: 999,
          background: color,
          color: "white",
          fontFamily,
          fontWeight: 800,
          fontSize: 50,
          direction: "rtl",
          scale: press,
          boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </div>
    </div>
  );
};

