import { SCALE } from "./index";

/**
 * tailwind-merge configuration for fluid typography classes
 * 
 * This eliminates the need for users to manually configure tailwind-merge
 * to handle typography utility classes.
 * 
 * @example
 * ```ts
 * import { extendTailwindMerge } from 'tailwind-merge'
 * import { withFluidTypography } from 'fluid-typography/merge'
 * 
 * const twMerge = extendTailwindMerge(withFluidTypography)
 * 
 * // Now this works correctly:
 * twMerge('text-body1 text-h1') // => 'text-h1'
 * ```
 */
export const withFluidTypography = {
  extend: {
    classGroups: {
      "font-size": [
        // Add all typography classes to the font-size group
        // This ensures they properly conflict with each other and built-in text utilities
        ...Object.keys(SCALE).map((key) => `text-${key}`),
      ],
    },
  },
};

/**
 * Alternative: Get configuration object directly
 * Useful if you need to merge with other configurations
 */
export function getFluidTypographyMergeConfig() {
  return withFluidTypography;
}
