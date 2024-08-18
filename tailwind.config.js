const {nextui} = require("@nextui-org/react");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    {
      pattern: /bg-(blue|green|purple|pink|red|amber|yellow)-(400|500|600|800|900)/,
    },
    {
      pattern: /text-(blue|green|purple|pink|red|amber|yellow)-(400|500|600|800|900)/,
    },
  ],
  theme: {
    extend: {}
  },
  darkMode: "class",
  plugins: [nextui({ defaultTheme: "dark" })],
};
