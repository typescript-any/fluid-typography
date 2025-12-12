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
<h3 className="text-h2">Section Heading</h3>
<p className="text-body">Regular paragraph text</p>
<p className="text-body-sm">Smaller body text</p>
<span className="text-caption">Image caption</span>
```

That's it! No configuration needed.

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

MIT © [Ayan Ghosh](https://github.com/typescript-any)

---

**Questions?** [Open an issue](https://github.com/typescript-any/fluid-typography/issues)
