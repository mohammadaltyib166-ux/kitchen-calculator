import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { cairo } from "../../fonts";
import { CountUp, HighlightTitle, WordCaption } from "../components/Kinetic";
import {
  GoldGlowBackground,
  PopCard,
  ProgressLine,
  StepBadge,
} from "../components/Surfaces";
import { easeInOut, progress } from "../../components/motion";

// Style 1: black + gold, highlighted headline, glass cards, word-by-word captions.
const GOLD = "#e3b75a";
const CREAM = "#f3ead8";
const MUTED = "rgba(243,234,216,0.55)";

const Caption: React.FC<{ text: string; start?: number }> = ({ text, start = 6 }) => (
  <div style={{ position: "absolute", bottom: 190, left: 90, right: 90 }}>
    <WordCaption text={text} start={start} color={CREAM} accent={GOLD} fontFamily={cairo} />
  </div>
);

const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 300 }}>
      <div style={{ color: MUTED, fontFamily: cairo, fontSize: 44, fontWeight: 600, opacity: progress(frame, 0, 10) }}>
        لما تعمل فيديو بدون حركة…
      </div>
      <div style={{ marginTop: 20 }}>
        <HighlightTitle
          text="كأنه [مونتير] مبتدئ؟"
          start={4}
          color={CREAM}
          markerColor={GOLD}
          markedTextColor="#1a1408"
          fontFamily={cairo}
        />
      </div>
      <div style={{ marginTop: 90 }}>
        <PopCard start={22} variant="darkGlass" width={800} height={360}>
          {/* Fake timeline: clips slide in one after another */}
          {[0.9, 0.6, 0.75].map((w, i) => (
            <div key={i} style={{ width: "100%", height: 34, borderRadius: 10, background: "rgba(255,255,255,0.06)", overflow: "hidden", direction: "rtl" }}>
              <div
                style={{
                  height: "100%",
                  width: `${w * 100 * progress(frame, 34 + i * 6, 16)}%`,
                  borderRadius: 10,
                  background: i === 0 ? GOLD : "rgba(227,183,90,0.35)",
                }}
              />
            </div>
          ))}
        </PopCard>
      </div>
      <Caption text="الفيديو بدون موشن يبان صامت وممل" start={30} />
    </AbsoluteFill>
  );
};

const CounterScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: MUTED, fontFamily: cairo, fontSize: 48, fontWeight: 600, opacity: progress(frame, 0, 10) }}>
        الحل؟
      </div>
      <CountUp to={5} start={6} color={GOLD} glow="rgba(227,183,90,0.7)" fontFamily={cairo} />
      <div style={{ color: CREAM, fontFamily: cairo, fontSize: 90, fontWeight: 900, opacity: progress(frame, 24, 12) }}>
        أدوات
      </div>
      <Caption text="خمس أدوات تحوّل الكود لحركة" start={10} />
    </AbsoluteFill>
  );
};

const CurveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = progress(frame, 18, 30, easeInOut);
  // Point travelling along the easing curve (same bezier as the path below).
  const t = progress(frame, 48, 30, easeInOut);
  const bx = (u: number) => 3 * (1 - u) ** 2 * u * 300 + 3 * (1 - u) * u ** 2 * 300 + u ** 3 * 600;
  const by = (u: number) => 3 * (1 - u) ** 2 * u * 0 + 3 * (1 - u) * u ** 2 * 300 + u ** 3 * 300;
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 300 }}>
      <StepBadge index={1} total={5} color={GOLD} border="rgba(227,183,90,0.4)" fontFamily={cairo} />
      <div style={{ color: CREAM, fontFamily: cairo, fontSize: 104, fontWeight: 900, direction: "ltr", opacity: progress(frame, 0, 12) }}>
        /easing
      </div>
      <div style={{ color: MUTED, fontFamily: cairo, fontSize: 44, fontWeight: 600, opacity: progress(frame, 6, 12) }}>
        التوقيت هو سر الحركة الاحترافية
      </div>
      <div style={{ marginTop: 80 }}>
        <PopCard start={10} variant="darkGlass" width={800} height={520}>
          <svg viewBox="-20 -20 640 340" style={{ width: 680, height: 380 }}>
            <path d="M0 300 H600 M0 300 V0" stroke="rgba(255,255,255,0.15)" strokeWidth={3} fill="none" />
            <path
              d="M0 300 C300 300 300 0 600 0"
              stroke={GOLD}
              strokeWidth={6}
              fill="none"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - draw}
              strokeLinecap="round"
            />
            <circle cx={bx(t)} cy={300 - by(t)} r={16} fill={CREAM} opacity={t > 0 ? 1 : 0} style={{ filter: `drop-shadow(0 0 12px ${GOLD})` }} />
          </svg>
        </PopCard>
      </div>
      <Caption text="بداية سريعة ونهاية ناعمة" start={20} />
    </AbsoluteFill>
  );
};

const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <HighlightTitle
        text="استوديو [كامل] بكود واحد"
        start={0}
        color={CREAM}
        markerColor={GOLD}
        markedTextColor="#1a1408"
        fontFamily={cairo}
        fontSize={100}
      />
      <div
        style={{
          marginTop: 60,
          color: GOLD,
          fontFamily: cairo,
          fontSize: 54,
          fontWeight: 800,
          opacity: progress(frame, 24, 12),
          scale: interpolate(progress(frame, 24, 12), [0, 1], [0.9, 1]),
        }}
      >
        علّق «موشن» 👇
      </div>
    </AbsoluteFill>
  );
};

export const GOLD_DARK_DURATION = 105 + 75 + 110 + 80 - 3 * 12;

export const GoldDark: React.FC = () => (
  <AbsoluteFill style={{ background: "#0b0a08", direction: "rtl" }}>
    <GoldGlowBackground />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={105}>
        <HookScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />
      <TransitionSeries.Sequence name="Counter" durationInFrames={75}>
        <CounterScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />
      <TransitionSeries.Sequence name="Curve" durationInFrames={110}>
        <CurveScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />
      <TransitionSeries.Sequence name="Outro" durationInFrames={80}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <ProgressLine color={GOLD} />
  </AbsoluteFill>
);
