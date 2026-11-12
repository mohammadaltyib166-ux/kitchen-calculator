import { Easing, interpolate } from "remotion";

// Shared easing curves used across every style.
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1); // fast start, soft landing
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeIn = Easing.bezier(0.55, 0, 1, 0.45); // accelerating "slam"
export const overshoot = Easing.bezier(0.34, 1.56, 0.64, 1); // small bounce past target

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** 0 → 1 progress between two frames, eased. */
export const progress = (
  frame: number,
  start: number,
  duration: number,
  easing = easeOut,
) => interpolate(frame, [start, start + duration], [0, 1], { ...clamp, easing });

/**
 * Damped oscillation: starts at `amplitude`, swings back and forth and settles at 0.
 * Used for the hanging price tag and the stamp impact shake.
 */
export const damped = (
  frame: number,
  start: number,
  amplitude: number,
  { frequency = 0.22, decay = 0.07 } = {},
) => {
  const t = frame - start;
  if (t < 0) return amplitude;
  return amplitude * Math.exp(-decay * t) * Math.cos(frequency * t);
};
