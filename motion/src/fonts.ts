import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import fontFiles from "./font-files.json";

// Fonts are bundled locally in public/fonts (Arabic + Latin subsets from
// Google Fonts, OFL licence) so rendering works offline.
for (const f of fontFiles) {
  loadFont({
    family: f.family,
    url: staticFile(f.file),
    weight: f.weight,
    unicodeRange: f.unicodeRange,
    format: "woff2",
  });
}

// Cairo: clean Arabic sans for body and bold headlines.
export const cairo = "Cairo";
// Lalezar: heavy rounded Arabic display face for punchy titles.
export const lalezar = "Lalezar";
