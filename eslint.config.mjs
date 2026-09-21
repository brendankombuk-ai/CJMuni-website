import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * ESLint flat config.
 *
 * Replaces .eslintrc.json: eslint-config-next 16 requires ESLint 9 or newer,
 * which dropped eslintrc and the --ext flag. File extensions are now chosen by
 * the `files` patterns the shared configs carry, and the lint script just names
 * the directories to walk.
 */
export default [
  { ignores: [".next/**", "node_modules/**", "out/**", "build/**"] },
  ...coreWebVitals,
  ...typescript,
];
