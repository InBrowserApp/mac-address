import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVitest from "@vitest/eslint-plugin";
import { globalIgnores } from "eslint/config";

export default tseslint.config(
  globalIgnores(["src/data/**/*"]),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"],
  },
);
