// ESLint 9 flat config. Next 16 removed `next lint`, so eslint runs directly
// (see the "lint" script) and this replaces the old .eslintrc.json.
import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  {
    ignores: [".next/**", "node_modules/**", "ui/RichTextEditor/**"]
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // The template's own code trips both of these; they stay visible as
      // warnings instead of failing the build.
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn"
    }
  }
]);
