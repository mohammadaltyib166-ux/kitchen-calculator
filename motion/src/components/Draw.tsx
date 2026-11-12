import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { easeInOut, overshoot, progress } from "./motion";

/** SVG path that draws itself like a pen stroke. Use inside an <svg>. */
export const DrawPath: React.FC<{
  d: string;
  start?: number;
  duration?: number;
  stroke: string;
  strokeWidth?: number;
  fill?: string;
  dash?: string;
}> = ({ d, start = 0, duration = 30, stroke, strokeWidth = 4, fill = "none" }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, start, duration, easeInOut);
  return (
    <path
      d={d}
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - t}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
      fillOpacity={t}
    />
  );
};

/**
 * Architectural dimension line: grows outward from its centre,
 * then the end ticks snap on. Horizontal or vertical. Use inside an <svg>.
 */
export const DimensionLine: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  start?: number;
  color: string;
}> = ({ x1, y1, x2, y2, start = 0, color }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, start, 20, easeInOut);
  const tick = progress(frame, start + 16, 10, overshoot);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const vertical = x1 === x2;
  const ax = mx + (x1 - mx) * t;
  const ay = my + (y1 - my) * t;
  const bx = mx + (x2 - mx) * t;
  const by = my + (y2 - my) * t;
  const tickLen = 14 * tick;
  const tickPath = (x: number, y: number) =>
    vertical ? `M${x - tickLen} ${y} H${x + tickLen}` : `M${x} ${y - tickLen} V${y + tickLen}`;
  return (
    <g stroke={color} strokeWidth={2.5} strokeLinecap="round" opacity={t > 0 ? 1 : 0}>
      <path d={`M${ax} ${ay} L${bx} ${by}`} />
      <path d={tickPath(x1, y1)} />
      <path d={tickPath(x2, y2)} />
    </g>
  );
};

/** Round badge that fills, then a check mark draws inside it. */
export const CheckBadge: React.FC<{
  start?: number;
  size?: number;
  color: string;
  checkColor?: string;
}> = ({ start = 0, size = 64, color, checkColor = "white" }) => {
  const frame = useCurrentFrame();
  const pop = progress(frame, start, 12, overshoot);
  const draw = progress(frame, start + 6, 12, easeInOut);
  return (
    <svg viewBox="0 0 64 64" style={{ width: size, height: size, scale: pop, flexShrink: 0 }}>
      <circle cx={32} cy={32} r={30} fill={color} />
      <path
        d="M18 33 L28 43 L46 23"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
        stroke={checkColor}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

/** Empty checkbox outline (the "unchecked" state next to a CheckBadge). */
export const EmptyBox: React.FC<{ size?: number; color: string; start?: number }> = ({
  size = 64,
  color,
  start = 0,
}) => {
  const frame = useCurrentFrame();
  return (
    <svg viewBox="0 0 64 64" style={{ width: size, height: size, flexShrink: 0, opacity: interpolate(frame, [start, start + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
      <circle cx={32} cy={32} r={28} fill="none" stroke={color} strokeWidth={4} />
    </svg>
  );
};
