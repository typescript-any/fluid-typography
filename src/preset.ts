import type { Config } from "tailwindcss";
import { DEFAULT_SCALE, type ScaleTuple, type PluginOptions } from "./index";

/**
 * Get merged scale including custom scales
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
 * Tailwind preset with fluid typography theme configuration
 * 
 * For advanced users who want to access the theme values directly
 * or extend them with additional scales.
 * 
 * @example
 * ```ts
 * import { getFluidTypographyPreset } from 'fluid-typography/preset'
 * 
 * export default {
 *   presets: [getFluidTypographyPreset()],
 *   // ... your config
 * }
 * ```
 * 
 * @example
 * ```ts
 * // With custom scales
 * import { getFluidTypographyPreset } from 'fluid-typography/preset'
 * 
 * export default {
 *   presets: [getFluidTypographyPreset({
 *     customScales: {
 *       'hero': {
 *         size: [50, 80],
 *         lineHeight: 1.1,
 *         fontWeight: '900'
 *       }
 *     }
 *   })],
 * }
 * ```
 */
export function getFluidTypographyPreset(options?: PluginOptions): Partial<Config> {
  const scale = getMergedScale(options);
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
export const fluidTypographyPreset: Partial<Config> = {
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
 * import { getFluidTypographyScale } from 'fluid-typography/preset'
 * 
 * const customScale = {
 *   ...getFluidTypographyScale(),
 *   'custom-xl': [50, 80]
 * }
 * ```
 */
export function getFluidTypographyScale(options?: PluginOptions): Record<string, ScaleTuple> {
  return getMergedScale(options);
}

/**
 * Get theme extension object for manual configuration
 * 
 * @example
 * ```ts
 * import { getFluidTypographyTheme } from 'fluid-typography/preset'
 * 
 * export default {
 *   theme: {
 *     extend: {
 *       ...getFluidTypographyTheme()
 *     }
 *   }
 * }
 * ```
 */
export function getFluidTypographyTheme(options?: PluginOptions) {
  const scale = getMergedScale(options);
  return {
    fluidTypography: scale,
  };
}
