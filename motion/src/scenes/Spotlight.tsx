import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { cairo, kufi } from "../fonts";
import { Callout, IrisReveal, LowerThird, PressButton, SwingTag } from "../components/Pieces";

// Style C — "Spotlight": graphics layered on real footage of a kitchen.
// Iris opens on the shot, callouts point at features, a price tag swings in,
// and a call-to-action button gets pressed.
const GREEN = "#1fa65a";
const WHITE = "#ffffff";

export type SpotlightProps = {
  /** File inside motion/public, e.g. "footage.mp4". Leave empty for a placeholder background. */
  footage: string;
};

/** Stand-in "kitchen" when no footage is supplied: counter, cabinets, soft light. */
const Placeholder: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #2b3138 0%, #1a1e23 55%, #121417 100%)" }}>
      {/* wall cabinets */}
      <div style={{ position: "absolute", top: 520, left: 120, right: 120, height: 300, display: "flex", gap: 14 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, borderRadius: 10, background: "linear-gradient(160deg, #c9cfd4, #9aa3aa)" }} />
        ))}
      </div>
      {/* counter + base units */}
      <div style={{ position: "absolute", top: 1080, left: 60, right: 60, height: 40, borderRadius: 6, background: "linear-gradient(90deg, #e8e4dc, #f6f3ee, #ddd7cc)" }} />
      <div style={{ position: "absolute", top: 1120, left: 80, right: 80, height: 420, display: "flex", gap: 14 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ flex: 1, borderRadius: 10, background: "linear-gradient(160deg, #aab2b8, #7f878e)" }} />
        ))}
      </div>
      {/* moving light */}
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${45 + Math.sin(frame / 40) * 10}% 35%, rgba(255,240,210,0.25), transparent 50%)` }} />
      <div style={{ position: "absolute", bottom: 60, left: 0, right: 0, textAlign: "center", fontFamily: cairo, fontSize: 30, color: "rgba(255,255,255,0.35)", direction: "rtl" }}>
        ضع فيديو مطبخك في motion/public/footage.mp4
      </div>
    </AbsoluteFill>
  );
};

export const Spotlight: React.FC<SpotlightProps> = ({ footage }) => {
  return (
    <AbsoluteFill style={{ background: "black", direction: "rtl" }}>
      {footage ? (
        <Video src={staticFile(footage)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <Placeholder />
      )}

      <Sequence name="Name bar" from={14} durationInFrames={130} layout="absolute-fill">
        <LowerThird start={0} end={130} title="مطابخ ألمنيوم" subtitle="تفصيل حسب المقاس" color={GREEN} fontFamily={cairo} titleFont={kufi} />
      </Sequence>

      <Sequence name="Callouts" from={120} durationInFrames={110} layout="absolute-fill">
        <Callout start={0} x={360} y={660} dx={-260} dy={-170} color={WHITE} label="خزائن معلقة" fontFamily={cairo} />
        <Callout start={18} x={720} y={1100} dx={260} dy={180} color={WHITE} label="سطح رخام" fontFamily={cairo} />
      </Sequence>

      <Sequence name="Price tag" from={190} durationInFrames={140} layout="absolute-fill">
        <SwingTag start={0} x={760} color="white" textColor="#14171a">
          <div style={{ fontFamily: cairo, fontWeight: 600, fontSize: 36, color: "#5d666d" }}>يبدأ من</div>
          <div style={{ fontFamily: cairo, fontWeight: 900, fontSize: 92, lineHeight: 1.05, color: GREEN }}>850</div>
          <div style={{ fontFamily: cairo, fontWeight: 700, fontSize: 36 }}>د.ل للمتر</div>
        </SwingTag>
      </Sequence>

      <Sequence name="CTA" from={240} durationInFrames={90} layout="absolute-fill">
        <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 220 }}>
          <PressButton start={0} pressAt={34} color={GREEN} fontFamily={cairo}>
            احسب سعرك واطلب عبر واتساب
          </PressButton>
        </AbsoluteFill>
      </Sequence>

      <IrisReveal start={0} duration={26} cx="50%" cy="42%" />
    </AbsoluteFill>
  );
};

export const SPOTLIGHT_DURATION = 330;
