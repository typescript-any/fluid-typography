import { DEFAULT_SCALE, type PluginOptions } from "./index";

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
 * import { getFluidTypographyMergeConfig } from 'fluid-typography/merge'
 * 
 * const twMerge = extendTailwindMerge(getFluidTypographyMergeConfig())
 * 
 * // Now this works correctly:
 * twMerge('text-body text-h1') // => 'text-h1'
 * ```
 * 
 * @example
 * ```ts
 * // With custom scales
 * import { getFluidTypographyMergeConfig } from 'fluid-typography/merge'
 * 
 * const twMerge = extendTailwindMerge(getFluidTypographyMergeConfig({
 *   customScales: {
 *     'hero': { size: [50, 60, 80], lineHeight: 1.1, fontWeight: '900' }
 *   }
 * }))
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

