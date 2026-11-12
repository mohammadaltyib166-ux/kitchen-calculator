import React from "react";
import { useCurrentFrame } from "remotion";
import { easeInOut, progress } from "./motion";

/**
 * A line of text that rises into view from behind an invisible edge
 * (a "mask reveal"). Stays sharp the whole time — no blur, no fade.
 */
export const MaskLine: React.FC<{
  start?: number;
  duration?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ start = 0, duration = 18, style, children }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, start, duration);
  return (
    <div style={{ overflow: "hidden", padding: "0.12em 0.05em", ...style }}>
      <div style={{ translate: `0px ${(1 - t) * 115}%` }}>{children}</div>
    </div>
  );
};

/**
 * Caption where an underline bar hops from word to word in reading order.
 * Each word's bar grows in from the right and shrinks away to the left,
 * so together they read as one bar travelling along the sentence.
 */
export const UnderlineCaption: React.FC<{
  text: string;
  start?: number;
  perWord?: number;
  color: string;
  dimColor: string;
  barColor: string;
  fontFamily: string;
  fontSize?: number;
}> = ({ text, start = 0, perWord = 9, color, dimColor, barColor, fontFamily, fontSize = 58 }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  return (
    <MaskLine start={start - 4} duration={14}>
      <div
        style={{
          direction: "rtl",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 0.3em",
          fontFamily,
          fontWeight: 800,
          fontSize,
          lineHeight: 1.5,
        }}
      >
        {words.map((w, i) => {
          const s = start + i * perWord;
          const grow = progress(frame, s, 6, easeInOut);
          const leave = progress(frame, s + perWord, 6, easeInOut);
          const isLast = i === words.length - 1;
          const active = frame >= s && (isLast || frame < s + perWord);
          return (
            <span key={i} style={{ position: "relative", display: "inline-block", color: active || frame >= s ? color : dimColor }}>
              {w}
              <span
                style={{
                  position: "absolute",
                  right: 0,
                  left: 0,
                  bottom: "0.08em",
                  height: "0.09em",
                  borderRadius: 4,
                  background: barColor,
                  transformOrigin: isLast || leave === 0 ? "right" : "left",
                  scale: `${isLast ? grow : grow * (1 - leave)} 1`,
                }}
              />
            </span>
          );
        })}
      </div>
    </MaskLine>
  );
};

/**
 * Number whose digits roll like a mechanical counter.
 * `from` and `to` are formatted strings of the same shape, e.g. "4,210" → "4,510".
 * Columns further to the right spin extra turns, giving a staggered cascade.
 */
export const RollingNumber: React.FC<{
  to: string;
  from?: string;
  start?: number;
  duration?: number;
  style?: React.CSSProperties;
}> = ({ to, from, start = 0, duration = 30, style }) => {
  const frame = useCurrentFrame();
  const source = from ?? to.replace(/\d/g, "0");
  const chars = to.split("");
  const digitCount = chars.filter((c) => /\d/.test(c)).length;
  let digitIndex = 0;
  return (
    <div style={{ direction: "ltr", display: "inline-flex", lineHeight: 1.15, ...style }}>
      {chars.map((c, i) => {
        if (!/\d/.test(c)) return <span key={i}>{c}</span>;
        const di = digitIndex++;
        const a = Number(source[i] ?? 0);
        const b = Number(c);
        // First appearance: right-hand columns spin extra turns for a cascade.
        // Updates (from → to): each column just rolls forward to its new digit.
        const spins = from ? 0 : digitCount - di;
        const steps = spins * 10 + ((b - a + 10) % 10);
        const t = progress(frame, start + di * 3, duration, easeInOut);
        const pos = a + steps * t;
        return (
          <span key={i} style={{ position: "relative", display: "inline-block", height: "1.15em", overflow: "hidden", width: "0.62em", textAlign: "center" }}>
            <span style={{ position: "absolute", left: 0, right: 0, top: 0, translate: `0px ${-pos * 1.15}em` }}>
              {Array.from({ length: Math.ceil(a + steps) + 2 }, (_, k) => (
                <span key={k} style={{ display: "block", height: "1.15em" }}>
                  {k % 10}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </div>
  );
};
