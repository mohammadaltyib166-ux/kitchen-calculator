import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { easeOut, overshoot, progress } from "./motion";

/**
 * Word-by-word caption (bottom subtitles in the dark-gold reference).
 * Each word rises out of a blur; the word being "spoken" gets the accent colour.
 */
export const WordCaption: React.FC<{
  text: string;
  start?: number;
  perWord?: number; // frames between words
  color: string;
  accent: string;
  fontFamily: string;
  fontSize?: number;
}> = ({ text, start = 0, perWord = 6, color, accent, fontFamily, fontSize = 64 }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  return (
    <div
      style={{
        direction: "rtl",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0 0.28em",
        fontFamily,
        fontWeight: 800,
        fontSize,
        lineHeight: 1.35,
      }}
    >
      {words.map((w, i) => {
        const t = progress(frame, start + i * perWord, 10);
        const isActive =
          frame >= start + i * perWord && frame < start + (i + 1) * perWord + 4;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: t,
              translate: `0px ${interpolate(t, [0, 1], [28, 0])}px`,
              filter: `blur(${interpolate(t, [0, 1], [10, 0])}px)`,
              color: isActive ? accent : color,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

/**
 * Headline with one highlighted word: a marker block sweeps in from the right
 * (reading direction for Arabic) behind the word, then the word pops.
 * Mark the word with square brackets: "كأنه [مونتير] مبتدئ؟"
 */
export const HighlightTitle: React.FC<{
  text: string;
  start?: number;
  color: string;
  markerColor: string;
  markedTextColor: string;
  fontFamily: string;
  fontSize?: number;
  fontWeight?: number;
}> = ({
  text,
  start = 0,
  color,
  markerColor,
  markedTextColor,
  fontFamily,
  fontSize = 110,
  fontWeight = 900,
}) => {
  const frame = useCurrentFrame();
  const parts = text.split(/(\[[^\]]+\])/).filter(Boolean);
  let wordIndex = 0;
  return (
    <div
      style={{
        direction: "rtl",
        textAlign: "center",
        width: 900, // keeps text inside the 90px safe area on a 1080px frame
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight: 1.25,
        color,
      }}
    >
      {parts.map((part, pi) => {
        const marked = part.startsWith("[");
        const clean = marked ? part.slice(1, -1) : part;
        return clean.split(" ").filter(Boolean).map((w, wi) => {
          const i = wordIndex++;
          const t = progress(frame, start + i * 4, 14);
          if (!marked) {
            return (
              <span
                key={`${pi}-${wi}`}
                style={{
                  display: "inline-block",
                  margin: "0 0.14em",
                  opacity: t,
                  translate: `0px ${interpolate(t, [0, 1], [40, 0])}px`,
                }}
              >
                {w}
              </span>
            );
          }
          const sweep = progress(frame, start + i * 4 + 6, 14);
          const pop = progress(frame, start + i * 4 + 12, 12, overshoot);
          return (
            <span
              key={`${pi}-${wi}`}
              style={{
                position: "relative",
                display: "inline-block",
                margin: "0 0.14em",
                padding: "0 0.18em",
                opacity: t,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: "0.12em 0",
                  borderRadius: "0.14em",
                  background: markerColor,
                  transformOrigin: "right center",
                  scale: `${sweep} 1`,
                }}
              />
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  color: sweep > 0.5 ? markedTextColor : color,
                  scale: interpolate(pop, [0, 1], [0.85, 1]),
                }}
              >
                {w}
              </span>
            </span>
          );
        });
      })}
    </div>
  );
};

/**
 * Big counter that rolls up to a number with a soft glow ("10 أدوات").
 */
export const CountUp: React.FC<{
  to: number;
  start?: number;
  duration?: number;
  color: string;
  glow: string;
  fontFamily: string;
  fontSize?: number;
}> = ({ to, start = 0, duration = 24, color, glow, fontFamily, fontSize = 380 }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, start, duration, easeOut);
  return (
    <div
      style={{
        fontFamily,
        fontWeight: 900,
        fontSize,
        lineHeight: 1,
        color,
        textShadow: `0 0 ${interpolate(t, [0, 1], [0, 80])}px ${glow}`,
        scale: interpolate(t, [0, 1], [0.6, 1]),
        opacity: t,
      }}
    >
      {Math.round(t * to)}
    </div>
  );
};

/**
 * Stretched glowing title (third reference): the word grows horizontally
 * like an Arabic kashida stretch, then settles, with a neon glow.
 */
export const StretchGlowTitle: React.FC<{
  text: string;
  start?: number;
  color: string;
  glow: string;
  fontFamily: string;
  fontSize?: number;
}> = ({ text, start = 0, color, glow, fontFamily, fontSize = 150 }) => {
  const frame = useCurrentFrame();
  const appear = progress(frame, start, 10);
  const stretch = interpolate(
    frame,
    [start, start + 10, start + 26],
    [0.4, 1.35, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut },
  );
  return (
    <div
      style={{
        direction: "rtl",
        fontFamily,
        fontWeight: 900,
        fontSize,
        lineHeight: 1.1,
        color,
        opacity: appear,
        scale: `${stretch} 1`,
        filter: `blur(${interpolate(appear, [0, 1], [12, 0])}px)`,
        textShadow: `0 0 18px ${glow}, 0 0 60px ${glow}`,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};
