# Fluid Typography

[![npm](https://img.shields.io/npm/v/fluid-typography?style=flat-square)](https://www.npmjs.com/package/fluid-typography) [![Docs](https://img.shields.io/badge/docs-website-blue?style=flat-square)](https://fluid-typography.ayanghosh.in) [![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

> Fluid typography plugin for Tailwind CSS v3 & v4 — responsive, accessible, zero-config, and highly customizable. Uses CSS `clamp()` for smooth scaling across viewports. See full docs: https://fluid-typography.ayanghosh.in/

Responsive typography that scales smoothly between viewports using CSS `clamp()`. Works out-of-the-box with sensible defaults, or customize scales and viewport ranges to match your design system.

**✨ Install → Add to config → Done**

## Quick Start

```bash
npm install fluid-typography
```

### Tailwind v3

```ts
// tailwind.config.ts
import fluidTypography from 'fluid-typography'

export default {
  plugins: [fluidTypography],
}
```

### Tailwind v4

```css
/* app.css */
@import "tailwindcss";
@plugin "fluid-typography";
```

### Use in Components

```tsx
<h1 className="text-display-xl">Hero Title</h1>
<h2 className="text-h1">Main Heading</h2>
<h3 className="text-h2">Section Heading</h3>
<p className="text-body">Regular paragraph text</p>
<p className="text-body-sm">Smaller body text</p>
<span className="text-caption">Image caption</span>
```

That's it! No configuration needed.

---

## Customization (Optional)

### Add Custom Typography Scales

Extend the default scales with your own:

```ts
// tailwind.config.ts
import fluidTypography from 'fluid-typography'

export default {
  plugins: [
    fluidTypography({
      customScales: {
        'hero': {
          size: [50, 80],  // [minPx, maxPx]
          lineHeight: 1.1,  // Optional, defaults to 1.5
          fontWeight: '900',  // Optional, defaults to '400'
          letterSpacing: '-0.02em',  // Optional
          textTransform: 'uppercase'  // Optional: 'uppercase' | 'lowercase' | 'capitalize'
        },
        'mega': {
          size: [60, 120]  // Only size is required
        }
      }
    })
  ]
}
```

Use your custom scales:

```tsx
<h1 className="text-hero">Custom Hero</h1>
<h1 className="text-mega">Mega Text</h1>
```

### Customize Viewport Range

Change the min/max viewport widths (default: 375px → 1440px):

```ts
import fluidTypography from 'fluid-typography'

export default {
  plugins: [
    fluidTypography({
      minViewportWidth: 320,   // Scale from 320px
      maxViewportWidth: 1920   // Scale to 1920px
    })
  ]
}
```

### Combine Both

```ts
import fluidTypography from 'fluid-typography'

export default {
  plugins: [
    fluidTypography({
      customScales: {
        'hero': {
          size: [50, 80],
          fontWeight: '900'
        }
      },
      minViewportWidth: 320,
      maxViewportWidth: 1920
    })
  ]
}
```

### Tailwind v4 with Customization

```js
// tailwind.config.js
import fluidTypography from 'fluid-typography';

export default {
  plugins: [
    fluidTypography({
      customScales: {
        'hero': {
          size: [50, 80],
          fontWeight: '900'
        }
      },
      minViewportWidth: 320,
      maxViewportWidth: 1920
    })
  ]
};
```

```css
/* app.css */
@import "tailwindcss";
@config "./tailwind.config.js";
```

---

## Typography Scale

All sizes scale fluidly between **375px (mobile)** and **1440px (desktop)** viewports.

**Body variants match Tailwind's defaults on desktop** for easy mental mapping:
- `text-body` = `text-base` (16px) on desktop, scales down to 14px on mobile
- `text-body-sm` = `text-sm` (14px) on desktop, scales down to 13px on mobile  
- `text-body-xs` = `text-xs` (12px) on desktop, scales down to 11px on mobile

| Class | Mobile → Desktop | Weight | Use Case |
|-------|-----------------|--------|----------|
| **Display (Hero Sections)** |
| `text-display-2xl` | 48px → 72px | 800 | Massive hero titles |
| `text-display-xl` | 40px → 60px | 800 | Large hero titles |
| `text-display-lg` | 32px → 48px | 700 | Medium hero titles |
| `text-display` | 28px → 36px | 700 | Small hero titles |
| **Headings** |
| `text-h1` | 28px → 36px | 700 | Main page headings |
| `text-h2` | 24px → 30px | 700 | Section headings |
| `text-h3` | 20px → 24px | 600 | Subsection headings |
| **Body Text** |
| `text-body` | 14px → 16px | 400 | Regular paragraphs |
| `text-body-sm` | 13px → 14px | 400 | Smaller body text |
| `text-body-xs` | 11px → 12px | 400 | Extra small text |
| **Small Text** |
| `text-caption` | 10px → 11px | 400 | Image captions, footnotes |
| `text-overline` | 10px → 11px | 600 | Labels (uppercase) |

---

## tailwind-merge Integration

### Basic Setup

If you use `tailwind-merge`, extend it to support fluid typography classes:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { getFluidTypographyMergeConfig } from "fluid-typography/merge";

// Create extended merge
const twMerge = extendTailwindMerge(getFluidTypographyMergeConfig());

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
```

### With Custom Scales

If you're using custom scales, pass the same options:

```ts
// lib/utils.ts
import { extendTailwindMerge } from "tailwind-merge";
import { getFluidTypographyMergeConfig } from "fluid-typography/merge";

const twMerge = extendTailwindMerge(
  getFluidTypographyMergeConfig({
    customScales: {
      'hero': { size: [50, 80] }
    }
  })
);

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
```

Now your custom classes merge properly:

```tsx
cn('text-hero text-h1') // => 'text-h1' ✅
cn('text-display-xl font-bold text-body') // => 'text-body font-bold' ✅
```

---

## FAQ

### Do I need to configure anything?

**No.** Just install, add to your Tailwind config, and use the classes. Configuration is optional.

### Can I customize the typography scale?

**Yes!** Add custom scales alongside the defaults:

```ts
fluidTypography({
  customScales: {
    'hero': {
      size: [50, 80],  // [minPx, maxPx]
      fontWeight: '900'  // lineHeight and fontWeight are optional
    }
  }
})
```

Your custom scales are added to the defaults, so you get both `text-hero` (custom) and `text-h1` (default).

### Can I change the viewport range?

**Yes!** Customize min/max viewport widths:

```ts
fluidTypography({
  minViewportWidth: 320,   // Default: 375
  maxViewportWidth: 1920   // Default: 1440
})
```

### Do I need tailwind-merge integration?

**Only if you're already using tailwind-merge** in your project (via `cn()` utility or similar). Otherwise, skip it.

### Does it work with Tailwind v4?

### Can I override the font-weight?

Yes! Font weights are included by default for convenience, but you can override:

```tsx
<h1 className="text-h1 font-normal">Light heading</h1>
<p className="text-body font-semibold">Bold paragraph</p>
```

### Why do body variants match Tailwind defaults?

For easy mental mapping! On desktop:
- `text-body` = `text-base` (16px)
- `text-body-sm` = `text-sm` (14px)
- `text-body-xs` = `text-xs` (12px)

The difference? These scale down on mobile for better readability.

Yes! Use `@plugin "fluid-typography"` in your CSS file (see Quick Start above).

### What if I use conditional classes?

Add the safelist to your config:

```ts
import fluidTypography, { getTypographySafelist } from 'fluid-typography'

const options = {
  customScales: {
    'hero': { size: [50, 80] }
  }
}

export default {
  plugins: [fluidTypography(options)],
  safelist: getTypographySafelist(options)  // Pass same options
}
```

### How does the fluid scaling work?

Uses CSS `clamp()` to scale smoothly between viewports (default: 375px mobile → 1440px desktop):

```css
font-size: clamp(1.75rem, 1.5739rem + 0.7512vw, 2.25rem);
```

The formula automatically adjusts based on your `minViewportWidth` and `maxViewportWidth` settings.

---

## TypeScript

Full TypeScript support included:

```ts
import fluidTypography, { DEFAULT_SCALE, getTypographySafelist } from 'fluid-typography'
import type { ScaleTuple, PluginOptions, ScaleConfig } from 'fluid-typography'

// Reference scale values
const displayXL: ScaleTuple = DEFAULT_SCALE['display-xl'] // [40, 60]

// Type-safe options
const options: PluginOptions = {
  customScales: {
    'hero': {
      size: [50, 80],
      fontWeight: '900'
    }
  },
  minViewportWidth: 320,
  maxViewportWidth: 1920
}
```

---

## License

MIT © [Ayan Ghosh](https://github.com/typescript-any)

---

**Questions?** [Open an issue](https://github.com/typescript-any/fluid-typography/issues)
