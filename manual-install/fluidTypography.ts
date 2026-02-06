import plugin from "tailwindcss/plugin";

/**
 * Typography scale tuple: [minPx, maxPx]
 * Values scale between viewport widths (default: 375px to 1440px)
 */
export type ScaleTuple = [number, number];

/**
 * Configuration for custom typography scales
 * Each scale should have size, line height, font weight, and optional tracking/transform
 */
export interface ScaleConfig {
  size: ScaleTuple;
  lineHeight?: number;
  fontWeight?: string;
  letterSpacing?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
}

/**
 * Plugin options for customizing typography scales
 *
 * @example
 * ```ts
 * fluidTypography({
 *   customScales: {
 *     'hero': {
 *       size: [50, 80],
 *       lineHeight: 1.1,  // Optional, defaults to 1.5
 *       fontWeight: '900',  // Optional, defaults to '400'
 *       letterSpacing: '-0.02em'
 *     }
 *   },
 *   minViewportWidth: 375,
 *   maxViewportWidth: 1440
 * })
 * ```
 */
export interface PluginOptions {
  /**
   * Custom typography scales to add to the defaults
   * These will be merged with the default scales
   */
  customScales?: Record<string, ScaleConfig>;

  /**
   * Minimum viewport width in pixels for fluid scaling
   * @default 375
   */
  minViewportWidth?: number;

  /**
   * Maximum viewport width in pixels for fluid scaling
   * @default 1440
   */
  maxViewportWidth?: number;
}

/**
 * Default typography scale definitions
 * Exported for advanced users who want to extend or reference the scale
 *
 * Desktop sizes match Tailwind defaults (text-base = 16px, text-sm = 14px, etc.)
 * Mobile sizes scale down for better readability on small screens
 */
export const DEFAULT_SCALE: Record<string, ScaleTuple> = {
  // Display (hero sections)
  "display-2xl": [48, 72], // Massive hero text
  "display-xl": [40, 60], // Large hero text
  "display-lg": [32, 48], // Medium hero text
  display: [28, 36], // Small hero text

  // Headings (h1-h3 only)
  h1: [28, 36], // matches text-4xl on desktop
  h2: [24, 30], // matches text-3xl on desktop
  h3: [20, 24], // matches text-2xl on desktop

  // Body text (matches Tailwind defaults on desktop)
  "body-xl": [17, 20], // = text-xl (20px) on desktop
  "body-lg": [15, 18], // = text-lg (18px) on desktop
  body: [14, 16], // = text-base (16px) on desktop
  "body-sm": [13, 14], // = text-sm (14px) on desktop
  "body-xs": [11, 12], // = text-xs (12px) on desktop

  // Small text
  caption: [10, 11], // For image captions, footnotes
  overline: [10, 11], // For labels (uppercase)
};

/**
 * Safelist array for all typography classes
 * Add to your tailwind.config.safelist if using conditional rendering
 * @param options - Plugin options with custom scales
 */
export function getTypographySafelist(options?: PluginOptions): string[] {
  const scale = getMergedScale(options);
  return Object.keys(scale).map((key) => `text-${key}`);
}

/**
 * Backward compatibility: safelist with default scales only
 * @deprecated Use getTypographySafelist() instead
 */
export const typographySafelist = Object.keys(DEFAULT_SCALE).map(
  (key) => `text-${key}`,
);

/**
 * Generate fluid clamp() function from px values
 * Formula: clamp(min, preferred + viewport-based scaling, max)
 */
function clampFromPx(
  [minPx, maxPx]: ScaleTuple,
  minViewportPx = 375,
  maxViewportPx = 1440,
): string {
  const min = minPx / 16;
  const max = maxPx / 16;

  // Define viewport range in rem
  const minWidth = minViewportPx / 16;
  const maxWidth = maxViewportPx / 16;

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

/**
 * Merge default scales with custom scales
 */
function getMergedScale(options?: PluginOptions): Record<string, ScaleTuple> {
  if (!options?.customScales) {
    return { ...DEFAULT_SCALE };
  }

  const customScaleTuples: Record<string, ScaleTuple> = {};
  for (const [key, config] of Object.entries(options.customScales)) {
    customScaleTuples[key] = config.size;
  }

  return {
    ...DEFAULT_SCALE,
    ...customScaleTuples,
  };
}

/**
 * Generate rules from scale definitions
 */
function getDefaultRules(): Record<string, RuleConfig> {
  return {
    // Display (hero sections)
    ".text-display-2xl": {
      size: DEFAULT_SCALE["display-2xl"],
      lh: 1.0,
      weight: "800",
      tracking: "-0.02em",
    },
    ".text-display-xl": {
      size: DEFAULT_SCALE["display-xl"],
      lh: 1.05,
      weight: "800",
      tracking: "-0.02em",
    },
    ".text-display-lg": {
      size: DEFAULT_SCALE["display-lg"],
      lh: 1.1,
      weight: "700",
      tracking: "-0.015em",
    },
    ".text-display": {
      size: DEFAULT_SCALE.display,
      lh: 1.1,
      weight: "700",
      tracking: "-0.015em",
    },

    // Headings (h1-h3 only)
    ".text-h1": {
      size: DEFAULT_SCALE.h1,
      lh: 1.2,
      weight: "700",
      tracking: "-0.015em",
    },
    ".text-h2": {
      size: DEFAULT_SCALE.h2,
      lh: 1.3,
      weight: "700",
      tracking: "-0.01em",
    },
    ".text-h3": { size: DEFAULT_SCALE.h3, lh: 1.4, weight: "600" },

    // Body text (desktop = Tailwind defaults)
    ".text-body-xl": { size: DEFAULT_SCALE["body-xl"], lh: 1.5, weight: "400" }, // = text-xl
    ".text-body-lg": { size: DEFAULT_SCALE["body-lg"], lh: 1.5, weight: "400" }, // = text-lg
    ".text-body": { size: DEFAULT_SCALE.body, lh: 1.5, weight: "400" }, // = text-base
    ".text-body-sm": { size: DEFAULT_SCALE["body-sm"], lh: 1.5, weight: "400" }, // = text-sm
    ".text-body-xs": { size: DEFAULT_SCALE["body-xs"], lh: 1.5, weight: "400" }, // = text-xs

    // Small text
    ".text-caption": { size: DEFAULT_SCALE.caption, lh: 1.4, weight: "400" },
    ".text-overline": {
      size: DEFAULT_SCALE.overline,
      lh: 1.5,
      weight: "600",
      tracking: "0.1em",
      upper: true,
    },
  };
}

/**
 * Generate rules by merging default rules with custom scale configs
 */
function getMergedRules(options?: PluginOptions): Record<string, RuleConfig> {
  const defaultRules = getDefaultRules();

  if (!options?.customScales) {
    return defaultRules;
  }

  const customRules: Record<string, RuleConfig> = {};
  for (const [key, config] of Object.entries(options.customScales)) {
    customRules[`.text-${key}`] = {
      size: config.size,
      lh: config.lineHeight ?? 1.5, // Default line-height
      weight: config.fontWeight ?? "400", // Default font-weight
      tracking: config.letterSpacing,
      upper: config.textTransform === "uppercase",
    };
  }

  return {
    ...defaultRules,
    ...customRules,
  };
}

/**
 * Fluid Typography Plugin for Tailwind CSS v3 and v4
 *
 * Provides responsive typography utilities with fluid scaling between breakpoints.
 * Works out-of-the-box with zero configuration, or accepts custom scales.
 *
 * @example
 * ```ts
 * // Zero config
 * import fluidTypography from './fluidTypography'
 *
 * export default {
 *   plugins: [fluidTypography]
 * }
 * ```
 *
 * @example
 * ```ts
 * // With custom scales
 * import fluidTypography from './fluidTypography'
 *
 * export default {
 *   plugins: [
 *     fluidTypography({
 *       customScales: {
 *         'hero': {
 *           size: [50, 80],
 *           lineHeight: 1.1,
 *           fontWeight: '900',
 *           letterSpacing: '-0.02em'
 *         }
 *       }
 *     })
 *   ]
 * }
 * ```
 */
export default plugin.withOptions<PluginOptions>(
  (options = {}) =>
    ({ addComponents }) => {
      const rules = getMergedRules(options);
      const components: Record<string, Record<string, string>> = {};

      const minVw = options.minViewportWidth ?? 375;
      const maxVw = options.maxViewportWidth ?? 1440;

      for (const [selector, cfg] of Object.entries(rules)) {
        components[selector] = {
          fontSize: clampFromPx(cfg.size, minVw, maxVw),
          lineHeight: String(cfg.lh),
          fontWeight: cfg.weight,
          ...(cfg.tracking && { letterSpacing: cfg.tracking }),
          ...(cfg.upper && { textTransform: "uppercase" }),
        };
      }

      addComponents(components);
    },
);

/**
 * Backward compatibility: Export SCALE for existing users
 * @deprecated Use DEFAULT_SCALE instead
 */
export const SCALE = DEFAULT_SCALE;

// ============================================================================
// MERGE FEATURE - tailwind-merge Configuration
// ============================================================================

/**
 * Get merged scale keys including custom scales
 */
function getMergedScaleKeys(options?: PluginOptions): string[] {
  const defaultKeys = Object.keys(DEFAULT_SCALE);

  if (!options?.customScales) {
    return defaultKeys;
  }

  const customKeys = Object.keys(options.customScales);
  return [...defaultKeys, ...customKeys];
}

/**
 * Generate tailwind-merge configuration for fluid typography classes
 *
 * This eliminates the need for users to manually configure tailwind-merge
 * to handle typography utility classes.
 *
 * @example
 * ```ts
 * import { extendTailwindMerge } from 'tailwind-merge'
 * import { getFluidTypographyMergeConfig } from './fluidTypography'
 *
 * const twMerge = extendTailwindMerge(getFluidTypographyMergeConfig())
 *
 * // Now this works correctly:
 * twMerge('text-body text-h1') // => 'text-h1'
 * ```
 */
export function getFluidTypographyMergeConfig(options?: PluginOptions) {
  const scaleKeys = getMergedScaleKeys(options);
  return {
    extend: {
      classGroups: {
        "font-size": [
          // Add all typography classes to the font-size group
          // This ensures they properly conflict with each other and built-in text utilities
          ...scaleKeys.map((key) => `text-${key}`),
        ],
      },
    },
  };
}

/**
 * Backward compatibility: default merge config without options
 * @deprecated Use getFluidTypographyMergeConfig() instead
 */
export const withFluidTypography = {
  extend: {
    classGroups: {
      "font-size": [
        // Add all typography classes to the font-size group
        // This ensures they properly conflict with each other and built-in text utilities
        ...Object.keys(DEFAULT_SCALE).map((key) => `text-${key}`),
      ],
    },
  },
};

// ============================================================================
// PRESET FEATURE - Expose Theme Values
// ============================================================================

/**
 * Get merged scale including custom scales for preset
 */
function getMergedScaleForPreset(
  options?: PluginOptions,
): Record<string, ScaleTuple> {
  if (!options?.customScales) {
    return { ...DEFAULT_SCALE };
  }

  const customScaleTuples: Record<string, ScaleTuple> = {};
  for (const [key, config] of Object.entries(options.customScales)) {
    customScaleTuples[key] = config.size;
  }

  return {
    ...DEFAULT_SCALE,
    ...customScaleTuples,
  };
}

/**
 * Tailwind preset with fluid typography theme configuration
 *
 * For advanced users who want to access the theme values directly
 * or extend them with additional scales.
 *
 * @example
 * ```ts
 * import { getFluidTypographyPreset } from './fluidTypography'
 *
 * export default {
 *   presets: [getFluidTypographyPreset()],
 *   // ... your config
 * }
 * ```
 */
export function getFluidTypographyPreset(options?: PluginOptions) {
  const scale = getMergedScaleForPreset(options);
  return {
    theme: {
      extend: {
        // Expose scale as theme values for reference
        // Users can access via theme('fluidTypography.display')
        fluidTypography: scale,
      },
    },
  };
}

/**
 * Backward compatibility: preset without options
 * @deprecated Use getFluidTypographyPreset() instead
 */
export const fluidTypographyPreset = {
  theme: {
    extend: {
      // Expose scale as theme values for reference
      // Users can access via theme('fluidTypography.display')
      fluidTypography: DEFAULT_SCALE,
    },
  },
};

/**
 * Get the fluid typography scale object
 * Useful for extending or customizing the scale
 *
 * @example
 * ```ts
 * import { getFluidTypographyScale } from './fluidTypography'
 *
 * const customScale = {
 *   ...getFluidTypographyScale(),
 *   'custom-xl': [50, 80]
 * }
 * ```
 */
export function getFluidTypographyScale(
  options?: PluginOptions,
): Record<string, ScaleTuple> {
  return getMergedScaleForPreset(options);
}
