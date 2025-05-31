import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/__docs__/*.stories.tsx", "../src/**/__docs__/*.mdx"],
  addons: ["@storybook/addon-onboarding", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    config.optimizeDeps ||= {};
    config.optimizeDeps.include ||= [];
    config.optimizeDeps.include.push("@storybook/blocks");
    return config;
  },
};
export default config;
