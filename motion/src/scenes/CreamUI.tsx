import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { cairo, lalezar } from "../fonts";
import { HighlightTitle } from "../components/Kinetic";
import { CreamBackground, PopCard } from "../components/Surfaces";
import { easeInOut, overshoot, progress } from "../components/motion";

// Style 2: cream paper, charcoal display type, orange accent, floating UI cards.
const INK = "#2b2a28";
const ORANGE = "#ee6c2b";
const GREY = "#b9b2a8";

const StackScene: React.FC = () => {
  const frame = useCurrentFrame();
  const line = (i: number) => progress(frame, i * 8, 16);
  const dot = progress(frame, 20, 40, easeInOut);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: lalezar, direction: "rtl" }}>
      {[
        { t: "الموشن", c: GREY, s: 110 },
        { t: "والتحريك", c: INK, s: 150 },
        { t: "والكلام اللي فيه", c: GREY, s: 100 },
      ].map((l, i) => (
        <div
          key={i}
          style={{
            color: l.c,
            fontSize: l.s,
            lineHeight: 1.3,
            opacity: line(i),
            translate: `0px ${interpolate(line(i), [0, 1], [60, 0])}px`,
            filter: `blur(${interpolate(line(i), [0, 1], [10, 0])}px)`,
          }}
        >
          {l.t}
        </div>
      ))}
      {/* Thin guide line with an orange dot travelling across it */}
      <div style={{ position: "relative", width: 600, height: 4, marginTop: 50, background: "rgba(0,0,0,0.08)", borderRadius: 2 }}>
        <div
          style={{
            position: "absolute",
            top: -11,
            right: `${dot * 100}%`,
            width: 26,
            height: 26,
            borderRadius: 13,
            background: ORANGE,
            translate: "50% 0px",
            opacity: progress(frame, 16, 6),
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const PromptScene: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = "حوّل وصفي لريل موشن بالعربي";
  const chars = Math.floor(interpolate(frame, [26, 70], [0, typed.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const send = progress(frame, 76, 12, overshoot);
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 420 }}>
      <HighlightTitle
        text="اوصف [بالعربي] وخلّيه يتحرك"
        start={0}
        color={INK}
        markerColor="transparent"
        markedTextColor={ORANGE}
        fontFamily={lalezar}
        fontWeight={400}
        fontSize={120}
      />
      <div style={{ marginTop: 100 }}>
        <PopCard start={14} variant="paper" width={840} height={360}>
          <div style={{ alignSelf: "stretch", direction: "rtl", fontFamily: cairo, fontWeight: 700, fontSize: 46, color: INK, minHeight: 130 }}>
            {typed.slice(0, chars)}
            <span style={{ color: ORANGE, opacity: Math.floor(frame / 8) % 2 ? 1 : 0 }}>|</span>
          </div>
          <div style={{ alignSelf: "stretch", display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: 42,
                background: ORANGE,
                color: "white",
                fontSize: 46,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                scale: interpolate(send, [0, 1], [1, 1.15]),
                boxShadow: `0 0 0 ${interpolate(send, [0, 1], [0, 18])}px rgba(238,108,43,0.18)`,
              }}
            >
              ↑
            </div>
          </div>
        </PopCard>
      </div>
    </AbsoluteFill>
  );
};

const TimelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const head = progress(frame, 30, 60, easeInOut);
  const rows = [
    { from: 0.05, w: 0.35 },
    { from: 0.3, w: 0.45 },
    { from: 0.15, w: 0.25 },
    { from: 0.55, w: 0.4 },
  ];
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 420 }}>
      <div style={{ fontFamily: lalezar, fontSize: 120, color: INK, direction: "rtl", opacity: progress(frame, 0, 12) }}>
        ولا قعدت <span style={{ color: ORANGE }}>ترتّب</span>
      </div>
      <div style={{ fontFamily: cairo, fontWeight: 600, fontSize: 46, color: GREY, opacity: progress(frame, 6, 12) }}>
        المشاهد على التايملاين
      </div>
      <div style={{ marginTop: 90 }}>
        <PopCard start={8} variant="paper" width={860} height={480}>
          <div style={{ position: "relative", alignSelf: "stretch", display: "flex", flexDirection: "column", gap: 26 }}>
            {rows.map((r, i) => {
              const t = progress(frame, 16 + i * 5, 18, overshoot);
              return (
                <div key={i} style={{ position: "relative", height: 52 }}>
                  <div
                    style={{
                      position: "absolute",
                      left: `${r.from * 100}%`,
                      width: `${r.w * 100}%`,
                      height: "100%",
                      borderRadius: 12,
                      background: i === 1 ? ORANGE : "#e9e3da",
                      translate: `${interpolate(t, [0, 1], [200, 0])}px 0px`,
                      opacity: progress(frame, 16 + i * 5, 8),
                    }}
                  />
                </div>
              );
            })}
            {/* Playhead */}
            <div style={{ position: "absolute", top: -20, bottom: -20, left: `${head * 100}%`, width: 4, background: ORANGE, borderRadius: 2, opacity: progress(frame, 28, 6) }} />
          </div>
        </PopCard>
      </div>
    </AbsoluteFill>
  );
};

const IconsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const icons = ["◐", "◆", "▶"];
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <PopCard start={0} variant="paper" width={760} height={760}>
        <div style={{ fontFamily: lalezar, fontSize: 140, color: ORANGE, direction: "rtl" }}>انتقالات</div>
        <div style={{ fontFamily: cairo, fontWeight: 600, fontSize: 48, color: GREY, opacity: progress(frame, 10, 12) }}>بين المشاهد</div>
        <div style={{ display: "flex", gap: 36, marginTop: 30 }}>
          {icons.map((ic, i) => {
            const t = progress(frame, 20 + i * 6, 16, overshoot);
            return (
              <div
                key={i}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 30,
                  background: "#f6f1ea",
                  color: ORANGE,
                  fontSize: 58,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  scale: t,
                  rotate: `${interpolate(t, [0, 1], [-25, 0])}deg`,
                }}
              >
                {ic}
              </div>
            );
          })}
        </div>
      </PopCard>
    </AbsoluteFill>
  );
};

export const CREAM_UI_DURATION = 80 + 100 + 100 + 80 - 3 * 14;

export const CreamUI: React.FC = () => (
  <AbsoluteFill style={{ direction: "rtl" }}>
    <CreamBackground />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Stack" durationInFrames={80}>
        <StackScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 14 })} />
      <TransitionSeries.Sequence name="Prompt" durationInFrames={100}>
        <PromptScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: 14 })} />
      <TransitionSeries.Sequence name="Timeline" durationInFrames={100}>
        <TimelineScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 14 })} />
      <TransitionSeries.Sequence name="Icons" durationInFrames={80}>
        <IconsScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
