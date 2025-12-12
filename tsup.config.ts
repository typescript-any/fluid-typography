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
  sourcemap: true,
  treeshake: true,
  splitting: false,
  minify: false,
  external: ["tailwindcss", "tailwind-merge"],
});
