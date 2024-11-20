// @ts-check
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  ...eslintPluginPrettierRecommended,
  rules: {
    ...eslintPluginPrettierRecommended.rules,
    "vue/no-multiple-template-root": "off",
  },
});
