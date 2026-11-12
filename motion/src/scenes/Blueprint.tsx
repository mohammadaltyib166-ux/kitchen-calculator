import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { cairo, kufi } from "../fonts";
import { MaskLine, RollingNumber, UnderlineCaption } from "../components/Text";
import { DimensionLine, DrawPath } from "../components/Draw";
import { BlueprintBackground } from "../components/Pieces";
import { progress } from "../components/motion";

// Style A — "Blueprint": the kitchen is drafted as a technical drawing,
// dimension lines measure it and the price is calculated like a formula.
const LINE = "#7ec8ff"; // drafting cyan
const WHITE = "#eaf4ff";
const DIM = "rgba(234,244,255,0.45)";
const MARK = "#ffcf5c"; // pencil-yellow for results

const PlanScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 230 }}>
      <MaskLine start={0}>
        <div style={{ fontFamily: kufi, fontWeight: 700, fontSize: 112, color: WHITE }}>كم يكلّف</div>
      </MaskLine>
      <MaskLine start={6}>
        <div style={{ fontFamily: kufi, fontWeight: 700, fontSize: 112, color: LINE }}>مطبخك؟</div>
      </MaskLine>

      {/* Top view of an L-shaped kitchen, drawn line by line */}
      <div style={{ position: "relative", marginTop: 90 }}>
      <svg viewBox="0 0 800 640" style={{ width: 880, height: 704 }}>
        <DrawPath d="M80 140 H720 V560 H630 V230 H80 Z" start={14} duration={40} stroke={LINE} strokeWidth={5} />
        {/* cabinet divisions */}
        {[240, 400, 560].map((x, i) => (
          <DrawPath key={x} d={`M${x} 140 V230`} start={46 + i * 4} duration={12} stroke={LINE} strokeWidth={2.5} />
        ))}
        <DrawPath d="M630 330 H720 M630 440 H720" start={58} duration={12} stroke={LINE} strokeWidth={2.5} />
        {/* sink + hob */}
        <DrawPath d="M280 158 h90 v54 h-90 Z" start={60} duration={16} stroke={WHITE} strokeWidth={3} />
        <DrawPath d="M455 172 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0 M505 198 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0" start={64} duration={16} stroke={WHITE} strokeWidth={3} />
        {/* dimensions */}
        <DimensionLine x1={80} y1={90} x2={720} y2={90} start={50} color={MARK} />
        <DimensionLine x1={770} y1={140} x2={770} y2={560} start={60} color={MARK} />
      </svg>

      {/* Dimension labels, positioned on the drawing (svg units × 1.1) */}
      <div style={{ position: "absolute", top: 36, left: 0, right: 0, textAlign: "center", fontFamily: cairo, fontWeight: 800, fontSize: 50, color: MARK, opacity: progress(frame, 62, 8) }}>
        <span style={{ display: "inline-flex", alignItems: "baseline", gap: 12, padding: "0 18px", background: "#0c1a2e" }}>
          <RollingNumber to="4.0" start={62} duration={22} /> م
        </span>
      </div>
      <div style={{ position: "absolute", top: 600, left: 280, fontFamily: cairo, fontWeight: 800, fontSize: 46, color: MARK, opacity: progress(frame, 72, 8) }}>
        شكل L
      </div>
      </div>

      <div style={{ position: "absolute", bottom: 200, left: 90, right: 90 }}>
        <UnderlineCaption text="ارسم وقِس قبل ما تدفع" start={30} color={WHITE} dimColor={DIM} barColor={MARK} fontFamily={cairo} />
      </div>
    </AbsoluteFill>
  );
};

const FormulaScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 18 }}>
      <MaskLine start={0}>
        <div style={{ fontFamily: cairo, fontWeight: 600, fontSize: 46, color: DIM }}>الطول × سعر المتر × معامل الشكل</div>
      </MaskLine>
      <MaskLine start={10}>
        <div style={{ direction: "ltr", fontFamily: cairo, fontWeight: 800, fontSize: 104, color: WHITE }}>
          4 <span style={{ color: LINE }}>×</span> 850 <span style={{ color: LINE }}>×</span> 1.15
        </div>
      </MaskLine>
      <svg viewBox="0 0 800 20" style={{ width: 800, height: 20 }}>
        <DrawPath d="M10 10 H790" start={28} duration={18} stroke={LINE} strokeWidth={4} />
      </svg>
      <MaskLine start={40}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 24, direction: "rtl", fontFamily: cairo, fontWeight: 900, fontSize: 150, color: MARK }}>
          <RollingNumber to="3,910" start={42} duration={34} />
          <span style={{ fontSize: 64 }}>د.ل</span>
        </div>
      </MaskLine>
      <MaskLine start={70}>
        <div style={{ fontFamily: cairo, fontWeight: 600, fontSize: 44, color: DIM }}>السعر الأساسي</div>
      </MaskLine>
    </AbsoluteFill>
  );
};

const TotalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const rows = [
    { label: "أساسي", value: "3,910" },
    { label: "أدراج 4 × 75", value: "300" },
    { label: "إضافات", value: "900" },
  ];
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 380 }}>
      <div style={{ width: 860, direction: "rtl", display: "flex", flexDirection: "column", gap: 14 }}>
        {rows.map((r, i) => (
          <MaskLine key={r.label} start={i * 8}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: cairo, fontWeight: 700, fontSize: 56, color: WHITE }}>
              <span>{r.label}</span>
              <span style={{ direction: "ltr", color: LINE }}>{i > 0 ? "+ " : ""}{r.value}</span>
            </div>
          </MaskLine>
        ))}
        <svg viewBox="0 0 860 16" style={{ width: 860, height: 16, marginTop: 10 }}>
          <DrawPath d="M0 8 H860" start={28} duration={18} stroke={MARK} strokeWidth={4} />
        </svg>
        <MaskLine start={40}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontFamily: cairo, fontWeight: 900, color: MARK }}>
            <span style={{ fontSize: 60 }}>الإجمالي</span>
            <span style={{ display: "flex", alignItems: "baseline", gap: 16, fontSize: 130 }}>
              <RollingNumber to="5,110" start={42} duration={36} />
              <span style={{ fontSize: 56 }}>د.ل</span>
            </span>
          </div>
        </MaskLine>
      </div>
      <div style={{ position: "absolute", bottom: 200, left: 90, right: 90, opacity: progress(frame, 70, 6) }}>
        <UnderlineCaption text="احسبها بنفسك في ثواني" start={74} color={WHITE} dimColor={DIM} barColor={LINE} fontFamily={cairo} fontSize={62} />
      </div>
    </AbsoluteFill>
  );
};

const T = 16; // transition length in frames
export const BLUEPRINT_DURATION = 130 + 110 + 130 - 2 * T;

export const Blueprint: React.FC = () => (
  <AbsoluteFill style={{ direction: "rtl" }}>
    <BlueprintBackground />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Plan" durationInFrames={130}>
        <PlanScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-top-right" })} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="Formula" durationInFrames={110}>
        <FormulaScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="Total" durationInFrames={130}>
        <TotalScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
