import {
  createExtensionEslintConfig,
  createWebEslintConfig,
} from "@gitlantis/config-eslint";

export default [...createWebEslintConfig(), ...createExtensionEslintConfig()];
