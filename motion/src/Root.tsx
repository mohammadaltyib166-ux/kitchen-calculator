import React from "react";
import { Composition, Folder } from "remotion";
import { Blueprint, BLUEPRINT_DURATION } from "./scenes/Blueprint";
import { Swatches, SWATCHES_DURATION } from "./scenes/Swatches";
import { Spotlight, SPOTLIGHT_DURATION } from "./scenes/Spotlight";

// Three promo reels for the aluminium kitchen calculator.
// All are vertical 9:16 at 30fps.
export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Styles">
      <Composition
        id="Blueprint"
        component={Blueprint}
        durationInFrames={BLUEPRINT_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Swatches"
        component={Swatches}
        durationInFrames={SWATCHES_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
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
  );
};
