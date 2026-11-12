import React from "react";
import { Composition, Folder } from "remotion";
import { Blueprint, BLUEPRINT_DURATION } from "./scenes/Blueprint";
import { Swatches, SWATCHES_DURATION } from "./scenes/Swatches";
import { Spotlight, SPOTLIGHT_DURATION } from "./scenes/Spotlight";
// First version, kept for reference. Code lives in src/الهام/.
import { GoldDark, GOLD_DARK_DURATION } from "./الهام/scenes/GoldDark";
import { CreamUI, CREAM_UI_DURATION } from "./الهام/scenes/CreamUI";
import { GlowOverlay, GLOW_OVERLAY_DURATION } from "./الهام/scenes/GlowOverlay";

// All videos are vertical 9:16 at 30fps.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Promo reels for the aluminium kitchen calculator */}
      <Folder name="Styles">
        <Composition id="Blueprint" component={Blueprint} durationInFrames={BLUEPRINT_DURATION} fps={30} width={1080} height={1920} />
        <Composition id="Swatches" component={Swatches} durationInFrames={SWATCHES_DURATION} fps={30} width={1080} height={1920} />
        <Composition
          id="Spotlight"
          component={Spotlight}
          durationInFrames={SPOTLIGHT_DURATION}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ footage: "" }}
        />
      </Folder>

      {/* "الهام": the first version, close to the inspiration videos.
          Remotion only allows Latin letters in folder/composition names. */}
      <Folder name="Ilham">
        <Composition id="Ilham-GoldDark" component={GoldDark} durationInFrames={GOLD_DARK_DURATION} fps={30} width={1080} height={1920} />
        <Composition id="Ilham-CreamUI" component={CreamUI} durationInFrames={CREAM_UI_DURATION} fps={30} width={1080} height={1920} />
        <Composition
          id="Ilham-GlowOverlay"
          component={GlowOverlay}
          durationInFrames={GLOW_OVERLAY_DURATION}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ footage: "" }}
        />
      </Folder>
    </>
  );
};
