import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { flip } from "@remotion/transitions/flip";
import { cairo, kufi } from "../fonts";
import { MaskLine, RollingNumber } from "../components/Text";
import { CheckBadge, DrawPath, EmptyBox } from "../components/Draw";
import { BrushedBackground, FlipTile, Stamp } from "../components/Pieces";
import { easeInOut, overshoot, progress } from "../components/motion";

// Style B — "Swatches": options are physical sample tiles that flip over,
// add-ons tick themselves and fly into a receipt whose total keeps rolling.
const INK = "#1d2b2a";
const TEAL = "#0f6b63";
const SOFT = "#7b8a87";
const STAMP = "#c2402f";

const ShapeScene: React.FC = () => {
  const shapes = [
    { name: "مستقيم", d: "M20 50 H140" },
    { name: "حرف L", d: "M20 30 H140 V120" },
    { name: "حرف U", d: "M20 120 V30 H140 V120" },
  ];
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 330 }}>
      <MaskLine start={0}>
        <div style={{ fontFamily: kufi, fontWeight: 700, fontSize: 120, color: INK }}>اختر الشكل</div>
      </MaskLine>
      <MaskLine start={6}>
        <div style={{ fontFamily: cairo, fontWeight: 600, fontSize: 46, color: SOFT }}>كل شكل له معامل سعر مختلف</div>
      </MaskLine>
      <div style={{ display: "flex", gap: 30, marginTop: 110 }}>
        {shapes.map((s, i) => (
          <FlipTile key={s.name} start={14 + i * 7} selected={i === 1 ? 62 : undefined} width={280} height={360} accent={TEAL}>
            <svg viewBox="0 0 160 150" style={{ width: 170, height: 160 }}>
              <DrawPath d={s.d} start={30 + i * 7} duration={20} stroke={i === 1 ? TEAL : INK} strokeWidth={14} />
            </svg>
            <div style={{ fontFamily: cairo, fontWeight: 800, fontSize: 46, color: INK }}>{s.name}</div>
            {i === 1 ? (
              <div style={{ position: "absolute", top: -26, left: -26 }}>
                <CheckBadge start={66} size={76} color={TEAL} />
              </div>
            ) : null}
          </FlipTile>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/** One add-on row: tick (or not), and a "+price" chip that flies up into the receipt. */
const AddOnRow: React.FC<{ label: string; price: number; at: number; picked: boolean; index: number }> = ({
  label,
  price,
  at,
  picked,
  index,
}) => {
  const frame = useCurrentFrame();
  const fly = progress(frame, at + 8, 18, easeInOut);
  const chipPop = progress(frame, at + 2, 10, overshoot);
  return (
    <MaskLine start={10 + index * 5} style={{ overflow: "visible" }}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 28, padding: "22px 30px", background: "white", borderRadius: 24, boxShadow: "0 8px 24px rgba(20,40,40,0.08)", direction: "rtl" }}>
        {picked && frame >= at ? <CheckBadge start={at} size={64} color={TEAL} /> : <EmptyBox size={64} color="#c9d1cf" />}
        <div style={{ flex: 1, fontFamily: cairo, fontWeight: 700, fontSize: 48, color: picked ? INK : SOFT }}>{label}</div>
        <div style={{ fontFamily: cairo, fontWeight: 700, fontSize: 40, color: SOFT, direction: "ltr" }}>+{price}</div>
        {picked ? (
          <div
            style={{
              position: "absolute",
              left: 40,
              top: 10,
              padding: "6px 22px",
              borderRadius: 999,
              background: TEAL,
              color: "white",
              fontFamily: cairo,
              fontWeight: 800,
              fontSize: 38,
              direction: "ltr",
              opacity: frame < at + 2 ? 0 : 1 - fly,
              scale: chipPop * (1 - fly * 0.5),
              translate: `${fly * 120}px ${-fly * (260 + index * 150)}px`,
            }}
          >
            +{price}
          </div>
        ) : null}
      </div>
    </MaskLine>
  );
};

const AddOnScene: React.FC = () => {
  const frame = useCurrentFrame();
  const rows = [
    { label: "خزائن معلقة", price: 300, picked: true },
    { label: "إكسسوارات", price: 250, picked: false },
    { label: "سطح رخام", price: 400, picked: true },
    { label: "توصيل وتركيب", price: 200, picked: true },
  ];
  // Each picked row ticks at its own time; the receipt rolls to the new total when the chip lands.
  const ticks = [30, -1, 56, 82];
  const totals = ["4,210", "4,510", "4,910", "5,110"];
  const steps = [0, 30 + 24, 56 + 24, 82 + 24];
  let current = 0;
  steps.forEach((s, i) => {
    if (frame >= s) current = i;
  });
  const bump = interpolate(frame - steps[current], [0, 4, 14], [1, 1.06, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 200 }}>
      {/* Receipt */}
      <div style={{ width: 860, padding: "30px 44px", boxSizing: "border-box", background: INK, borderRadius: 30, color: "white", direction: "rtl", display: "flex", justifyContent: "space-between", alignItems: "center", scale: bump, opacity: progress(frame, 0, 10) }}>
        <div style={{ fontFamily: cairo, fontWeight: 600, fontSize: 44, color: "rgba(255,255,255,0.7)" }}>المجموع</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, fontFamily: cairo, fontWeight: 900, fontSize: 96 }}>
          <RollingNumber key={current} from={current === 0 ? undefined : totals[current - 1]} to={totals[current]} start={steps[current]} duration={current === 0 ? 26 : 14} />
          <span style={{ fontSize: 44 }}>د.ل</span>
        </div>
      </div>
      <MaskLine start={4} style={{ marginTop: 70 }}>
        <div style={{ fontFamily: kufi, fontWeight: 700, fontSize: 100, color: INK }}>أضف ما تحتاجه</div>
      </MaskLine>
      <div style={{ width: 860, display: "flex", flexDirection: "column", gap: 24, marginTop: 40 }}>
        {rows.map((r, i) => (
          <AddOnRow key={r.label} index={i} label={r.label} price={r.price} picked={r.picked} at={ticks[i]} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const ReceiptScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: 820, padding: "70px 60px", boxSizing: "border-box", background: "white", borderRadius: 34, boxShadow: "0 30px 70px rgba(20,40,40,0.16)", direction: "rtl", textAlign: "center", translate: `0px ${interpolate(progress(frame, 0, 18), [0, 1], [120, 0])}px` }}>
        <MaskLine start={4}>
          <div style={{ fontFamily: cairo, fontWeight: 600, fontSize: 46, color: SOFT }}>مطبخ حرف L — 4 متر</div>
        </MaskLine>
        <MaskLine start={10}>
          <div style={{ fontFamily: cairo, fontWeight: 900, fontSize: 170, color: INK, lineHeight: 1.1 }}>
            5,110 <span style={{ fontSize: 70 }}>د.ل</span>
          </div>
        </MaskLine>
        <MaskLine start={16}>
          <div style={{ fontFamily: cairo, fontWeight: 600, fontSize: 38, color: SOFT }}>السعر النهائي بعد المعاينة</div>
        </MaskLine>
        <div style={{ position: "absolute", bottom: -70, left: 40 }}>
          <Stamp start={34} color={STAMP} fontFamily={kufi}>سعر تقديري</Stamp>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const T = 18;
export const SWATCHES_DURATION = 110 + 140 + 90 - 2 * T;

export const Swatches: React.FC = () => (
  <AbsoluteFill style={{ direction: "rtl" }}>
    <BrushedBackground />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Shape" durationInFrames={110}>
        <ShapeScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={flip({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="AddOns" durationInFrames={140}>
        <AddOnScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={flip({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="Receipt" durationInFrames={90}>
        <ReceiptScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
