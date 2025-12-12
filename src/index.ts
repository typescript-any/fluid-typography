import plugin from "tailwindcss/plugin";

/**
 * Typography scale tuple: [minPx, preferredPx, maxPx]
 * Values scale between 375px and 1440px viewport widths
 */
export type ScaleTuple = [number, number, number];

/**
 * Typography scale definitions
 * Exported for advanced users who want to extend or reference the scale
 * 
 * Desktop sizes match Tailwind defaults (text-base = 16px, text-sm = 14px, etc.)
 * Mobile sizes scale down for better readability on small screens
 */
export const SCALE: Record<string, ScaleTuple> = {
  // Display (hero sections)
  "display-2xl": [48, 56, 72],  // Massive hero text
  "display-xl": [40, 48, 60],   // Large hero text
  "display-lg": [32, 40, 48],   // Medium hero text
  display: [28, 32, 36],         // Small hero text

  // Headings (h1-h3 only)
  h1: [28, 32, 36],  // matches text-4xl on desktop
  h2: [24, 26, 30],  // matches text-3xl on desktop
  h3: [20, 22, 24],  // matches text-2xl on desktop

  // Body text (matches Tailwind defaults on desktop)
  body: [14, 15, 16],      // = text-base (16px) on desktop
  "body-sm": [13, 13.5, 14],  // = text-sm (14px) on desktop
  "body-xs": [11, 11.5, 12],  // = text-xs (12px) on desktop

  // Small text
  caption: [10, 10.5, 11],   // For image captions, footnotes
  overline: [10, 10, 11],    // For labels (uppercase)
};

/**
 * Safelist array for all typography classes
 * Add to your tailwind.config.safelist if using conditional rendering
 */
export const typographySafelist = Object.keys(SCALE).map(
  (key) => `text-${key}`
);

/**
 * Generate fluid clamp() function from px values
 * Formula: clamp(min, preferred + viewport-based scaling, max)
 */
function clampFromPx([minPx, prefPx, maxPx]: ScaleTuple): string {
  const min = minPx / 16;
  const max = maxPx / 16;

  // Define viewport range in rem (375px = 23.4375rem, 1440px = 90rem)
  const minWidth = 23.4375; // 375px / 16
  const maxWidth = 90; // 1440px / 16

  // Calculate slope: change in size per change in viewport width
  const slope = (max - min) / (maxWidth - minWidth);

  // Calculate y-intercept for the linear function
  const intercept = min - slope * minWidth;

  // Convert slope to vw units (100vw = viewport width)
  const slopeVw = slope * 100;

  return `clamp(${min.toFixed(4)}rem, ${intercept.toFixed(4)}rem + ${slopeVw.toFixed(4)}vw, ${max.toFixed(4)}rem)`;
}

interface RuleConfig {
  size: ScaleTuple;
  lh: number;
  weight: string;
  tracking?: string;
  upper?: boolean;
}

const RULES: Record<string, RuleConfig> = {
  // Display (hero sections)
  ".text-display-2xl": {
    size: SCALE["display-2xl"],
    lh: 1.0,
    weight: "800",
    tracking: "-0.02em",
  },
  ".text-display-xl": {
    size: SCALE["display-xl"],
    lh: 1.05,
    weight: "800",
    tracking: "-0.02em",
  },
  ".text-display-lg": {
    size: SCALE["display-lg"],
    lh: 1.1,
    weight: "700",
    tracking: "-0.015em",
  },
  ".text-display": {
    size: SCALE.display,
    lh: 1.1,
    weight: "700",
    tracking: "-0.015em",
  },

  // Headings (h1-h3 only)
  ".text-h1": { size: SCALE.h1, lh: 1.2, weight: "700", tracking: "-0.015em" },
  ".text-h2": { size: SCALE.h2, lh: 1.3, weight: "700", tracking: "-0.01em" },
  ".text-h3": { size: SCALE.h3, lh: 1.4, weight: "600" },

  // Body text (desktop = Tailwind defaults)
  ".text-body": { size: SCALE.body, lh: 1.5, weight: "400" },      // = text-base
  ".text-body-sm": { size: SCALE["body-sm"], lh: 1.5, weight: "400" },  // = text-sm
  ".text-body-xs": { size: SCALE["body-xs"], lh: 1.5, weight: "400" },  // = text-xs

  // Small text
  ".text-caption": { size: SCALE.caption, lh: 1.4, weight: "400" },
  ".text-overline": {
    size: SCALE.overline,
    lh: 1.5,
    weight: "600",
    tracking: "0.1em",
    upper: true,
  },
};

/**
 * Fluid Typography Plugin for Tailwind CSS v3 and v4
 * 
 * Provides responsive typography utilities with fluid scaling between breakpoints.
 * Works out-of-the-box with zero configuration.
 * 
 * @example
 * ```ts
 * // tailwind.config.ts
 * import fluidTypography from 'fluid-typography'
 * 
 * export default {
 *   plugins: [fluidTypography]
 * }
 * ```
 */
export default plugin(({ addComponents }) => {
  const components: Record<string, Record<string, string>> = {};

  for (const [selector, cfg] of Object.entries(RULES)) {
    components[selector] = {
      fontSize: clampFromPx(cfg.size),
      lineHeight: String(cfg.lh),
      fontWeight: cfg.weight,
      ...(cfg.tracking && { letterSpacing: cfg.tracking }),
      ...(cfg.upper && { textTransform: "uppercase" }),
    };
  }

  addComponents(components);
});
