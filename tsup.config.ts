import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    merge: "src/merge.ts",
    preset: "src/preset.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: false,
  treeshake: true,
  splitting: false,
  minify: true,
  external: ["tailwindcss", "tailwind-merge"],
});
