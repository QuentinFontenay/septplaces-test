import baseConfig, { restrictEnvAccess } from "@septplaces/eslint-config/base";
import nextjsConfig from "@septplaces/eslint-config/nextjs";
import reactConfig from "@septplaces/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
