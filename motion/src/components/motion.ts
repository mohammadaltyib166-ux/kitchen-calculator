import { Easing, interpolate } from "remotion";

// Shared easing curves used across every style.
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1); // fast start, soft landing
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
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

/** Fade in at `start`, fade out so it is gone at `end`. */
export const inOut = (
  frame: number,
  start: number,
  end: number,
  fade = 8,
) =>
  interpolate(frame, [start, start + fade, end - fade, end], [0, 1, 1, 0], {
    ...clamp,
    easing: easeOut,
  });

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
