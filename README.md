# Fluid Typography

> Zero-config fluid typography plugin for Tailwind CSS v3 & v4

Responsive typography that scales smoothly between 375px and 1440px viewports using CSS `clamp()`.

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
<p className="text-body1">Regular paragraph</p>
<span className="text-caption">Small text</span>
```

That's it! No configuration needed.

---

## Typography Scale

| Class | Size Range | Weight | Use Case |
|-------|-----------|--------|----------|
| `text-display-xl` | 40px → 64px | 700 | Hero titles |
| `text-display-lg` | 32px → 48px | 700 | Large displays |
| `text-display` | 28px → 40px | 700 | Display text |
| `text-h1` | 24px → 32px | 600 | Main headings |
| `text-h2` | 20px → 24px | 600 | Subheadings |
| `text-h3` | 16px → 20px | 600 | Section titles |
| `text-subtitle` | 16px → 20px | 500 | Subtitles |
| `text-body1` | 16px → 18px | 400 | Body text |
| `text-body2` | 14px → 16px | 400 | Secondary body |
| `text-body3` | 12px → 14px | 400 | Small body |
| `text-caption` | 11px → 12px | 400 | Captions |
| `text-overline` | 11px → 12px | 600 | Labels (uppercase) |
| `text-micro` | 10px → 11px | 500 | Tiny text |

> All sizes scale fluidly between 375px and 1440px viewport widths.

---

## tailwind-merge Integration

### If You Have an Existing `cn` Utility

Most projects have a `cn` utility like this:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
```

**Update it to support fluid typography:**

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { withFluidTypography } from "fluid-typography/merge";

// Create extended merge
const twMerge = extendTailwindMerge(withFluidTypography);

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
```

**That's it!** Your existing code continues to work, now with proper merging:

```tsx
cn('text-body1 text-h1') // => 'text-h1' ✅
cn('text-display-xl font-bold text-body2') // => 'text-body2 font-bold' ✅
```

### If You Don't Use `cn` Yet

```ts
// lib/utils.ts
import { extendTailwindMerge } from 'tailwind-merge'
import { withFluidTypography } from 'fluid-typography/merge'

export const cn = extendTailwindMerge(withFluidTypography)
```

---

## FAQ

### Do I need to configure anything?

**No.** Just install, add to your Tailwind config, and use the classes.

### Can I customize the typography scale?

Not in v1. This is intentionally opinionated for zero-config simplicity. If you need custom scales, create your own Tailwind plugin.

### Do I need tailwind-merge integration?

**Only if you're already using tailwind-merge** in your project (via `cn()` utility or similar). Otherwise, skip it.

### Does it work with Tailwind v4?

Yes! Use `@plugin "fluid-typography"` in your CSS file (see Quick Start above).

### What if I use conditional classes?

Add the safelist to your config:

```ts
import fluidTypography, { typographySafelist } from 'fluid-typography'

export default {
  plugins: [fluidTypography],
  safelist: typographySafelist, // Optional: for dynamic classes
}
```

### How does the fluid scaling work?

Uses CSS `clamp()` to scale smoothly between 375px (mobile) and 1440px (desktop):

```css
font-size: clamp(2.5rem, 1.7656rem + 3.1250vw, 4rem);
```

---

## TypeScript

Full TypeScript support included:

```ts
import fluidTypography, { SCALE, typographySafelist } from 'fluid-typography'
import type { ScaleTuple } from 'fluid-typography'

// Reference scale values
const displayXL: ScaleTuple = SCALE['display-xl'] // [40, 48, 64]
```

---

## License

MIT © [Ayan Ghosh](https://github.com/ayanghosh)

---

**Questions?** [Open an issue](https://github.com/ayanghosh/fluid-typography/issues)
