# Manual Installation

Don't want to install via npm? Copy this file directly into your project.

## Setup

1. Copy `fluid-typography.ts` to your project (e.g., `lib/`, `utils/`, or `config/`)

2. Import and add to your Tailwind config:

### Tailwind v3

```ts
// tailwind.config.ts
import fluidTypography from "./lib/fluid-typography"; // Adjust path

export default {
  plugins: [fluidTypography],
};
```

### Tailwind v4

```ts
// tailwind.config.ts
import fluidTypography from "./lib/fluid-typography"; // Adjust path

export default {
  plugins: [fluidTypography],
};
```

## Usage

Use in your components:

```tsx
<h1 className="text-display-xl">Hero Title</h1>
<h2 className="text-h1">Main Heading</h2>
<p className="text-body">Regular paragraph</p>
<span className="text-caption">Caption</span>
```

## Customization

Pass options to customize scales and viewport ranges:

```ts
import fluidTypography from "./lib/fluid-typography";

export default {
  plugins: [
    fluidTypography({
      customScales: {
        hero: {
          size: [50, 80],
          lineHeight: 1.1,
          fontWeight: "900",
          letterSpacing: "-0.02em",
        },
      },
      minViewportWidth: 320, // Default: 375
      maxViewportWidth: 1600, // Default: 1440
    }),
  ],
};
```

## Merge Feature (tailwind-merge Support)

Use with `tailwind-merge` to properly handle class conflicts:

```ts
import { extendTailwindMerge } from "tailwind-merge";
import { getFluidTypographyMergeConfig } from "./lib/fluid-typography";

const twMerge = extendTailwindMerge(getFluidTypographyMergeConfig());

// Now this works correctly:
twMerge("text-body text-h1"); // => 'text-h1'
```

With custom scales:

```ts
const twMerge = extendTailwindMerge(
  getFluidTypographyMergeConfig({
    customScales: {
      hero: { size: [50, 80], lineHeight: 1.1, fontWeight: "900" },
    },
  }),
);
```

## Preset Feature (Access Theme Values)

Use as a Tailwind preset to expose scale values in your theme:

```ts
import { getFluidTypographyPreset } from "./lib/fluid-typography";

export default {
  presets: [getFluidTypographyPreset()],
  // ... your config
};
```

Access theme values:

```ts
export const config: Config = {
  presets: [getFluidTypographyPreset()],
  theme: {
    extend: {
      colors: {
        // Access typography scales from theme
        text: "var(--color-text)",
      },
    },
  },
};
```

Get just the scale object:

```ts
import { getFluidTypographyScale } from "./lib/fluid-typography";

const customScale = {
  ...getFluidTypographyScale(),
  "custom-xl": [50, 80],
};
```

## Single File, Zero Dependencies

- ✅ No npm install needed
- ✅ Only depends on Tailwind (which you already have)
- ✅ Full TypeScript support
- ✅ Includes merge & preset features
- ✅ All features included

That's it! No complex setup required.
