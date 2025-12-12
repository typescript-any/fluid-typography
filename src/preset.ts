import type { Config } from "tailwindcss";
import { SCALE, type ScaleTuple } from "./index";

/**
 * Tailwind preset with fluid typography theme configuration
 * 
 * For advanced users who want to access the theme values directly
 * or extend them with additional scales.
 * 
 * @example
 * ```ts
 * import { fluidTypographyPreset } from 'fluid-typography/preset'
 * 
 * export default {
 *   presets: [fluidTypographyPreset],
 *   // ... your config
 * }
 * ```
 */
export const fluidTypographyPreset: Partial<Config> = {
  theme: {
    extend: {
      // Expose scale as theme values for reference
      // Users can access via theme('fluidTypography.display')
      fluidTypography: SCALE,
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
 *   'custom-xl': [50, 60, 80]
 * }
 * ```
 */
export function getFluidTypographyScale(): Record<string, ScaleTuple> {
  return { ...SCALE };
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
export function getFluidTypographyTheme() {
  return {
    fluidTypography: SCALE,
  };
}
