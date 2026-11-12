import React from "react";
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { cairo } from "../fonts";
import { StretchGlowTitle } from "../components/Kinetic";
import { Sparkle, SweepSlab } from "../components/Surfaces";
import { overshoot, progress } from "../components/motion";

// Style 3: talking-head footage with glowing yellow Arabic titles,
// orange light slabs sweeping through and twinkling sparkles.
const YELLOW = "#ffd23f";
const GLOW = "rgba(255,190,40,0.85)";
const ORANGE = "#ff9a1f";

export type GlowOverlayProps = {
  /** File inside motion/public, e.g. "footage.mp4". Leave empty for a placeholder background. */
  footage: string;
};

const Placeholder: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% ${40 + Math.sin(frame / 30) * 5}%, #5a4632 0%, #2a1f16 45%, #120d09 100%)`,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 120,
      }}
    >
      <div style={{ fontFamily: cairo, fontSize: 34, color: "rgba(255,255,255,0.35)", direction: "rtl" }}>
        ضع فيديوك في motion/public/footage.mp4
      </div>
    </AbsoluteFill>
  );
};

const Shade: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 30%, transparent 65%, rgba(0,0,0,0.55) 100%)",
    }}
  />
);

/** Small question pill under a title. */
const Pill: React.FC<{ text: string; start: number }> = ({ text, start }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, start, 14, overshoot);
  return (
    <div
      style={{
        padding: "10px 34px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.92)",
        color: "#1c1712",
        fontFamily: cairo,
        fontWeight: 800,
        fontSize: 42,
        direction: "rtl",
        scale: t,
        opacity: progress(frame, start, 6),
      }}
    >
      {text}
    </div>
  );
};

export const GlowOverlay: React.FC<GlowOverlayProps> = ({ footage }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "black", direction: "rtl" }}>
      {footage ? (
        <Video src={staticFile(footage)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <Placeholder />
      )}
      <Shade />

      {/* Beat 1: "قبل" stretched glow title + question */}
      <Sequence name="Before" from={0} durationInFrames={90} layout="absolute-fill">
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 260, gap: 30 }}>
          <StretchGlowTitle text="قبل" color={YELLOW} glow={GLOW} fontFamily={cairo} fontSize={220} />
          <Pill text="شلون تختار المنتج؟" start={18} />
        </AbsoluteFill>
        <Sparkle x={820} y={300} start={14} color={YELLOW} />
      </Sequence>

      {/* Beat 2: list of questions popping one by one */}
      <Sequence name="Checklist" from={80} durationInFrames={90} layout="absolute-fill">
        <SweepSlab start={0} color={ORANGE} />
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 22 }}>
          {["نوع الاستخدام", "كم ميزانيتك", "عدد المستخدمين"].map((t, i) => (
            <Pill key={i} text={t} start={10 + i * 8} />
          ))}
        </AbsoluteFill>
      </Sequence>

      {/* Beat 3: "الآن" big glow + white subtitle, slab sweeps back */}
      <Sequence name="Now" from={165} durationInFrames={135} layout="absolute-fill">
        <SweepSlab start={0} color={ORANGE} fromRight={false} />
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 300 }}>
          <StretchGlowTitle text="الآن" color={YELLOW} glow={GLOW} fontFamily={cairo} fontSize={240} start={6} />
          <div
            style={{
              marginTop: 10,
              fontFamily: cairo,
              fontWeight: 900,
              fontSize: 96,
              color: "white",
              direction: "rtl",
              textShadow: "0 4px 30px rgba(0,0,0,0.6)",
              opacity: progress(frame - 165, 22, 12),
              translate: `0px ${interpolate(progress(frame - 165, 22, 12), [0, 1], [40, 0])}px`,
            }}
          >
            القرار أسهل
          </div>
        </AbsoluteFill>
        <Sparkle x={250} y={420} start={20} color={YELLOW} size={110} />
        <Sparkle x={840} y={620} start={34} color="white" size={70} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const GLOW_OVERLAY_DURATION = 300;
