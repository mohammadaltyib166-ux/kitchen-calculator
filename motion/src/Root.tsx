import React from "react";
import { Composition, Folder } from "remotion";
import { GoldDark, GOLD_DARK_DURATION } from "./scenes/GoldDark";
import { CreamUI, CREAM_UI_DURATION } from "./scenes/CreamUI";
import { GlowOverlay, GLOW_OVERLAY_DURATION } from "./scenes/GlowOverlay";

// All styles are vertical 9:16 reels at 30fps (same as the inspiration videos).
export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Styles">
      <Composition
        id="GoldDark"
        component={GoldDark}
        durationInFrames={GOLD_DARK_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CreamUI"
        component={CreamUI}
        durationInFrames={CREAM_UI_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="GlowOverlay"
        component={GlowOverlay}
        durationInFrames={GLOW_OVERLAY_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ footage: "" }}
      />
    </Folder>
  );
};
