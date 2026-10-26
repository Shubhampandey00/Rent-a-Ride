import defaultTheme from "tailwindcss/defaultTheme";

const tailwindConfig = {
  // IMPORTANT:
  // This enables Tailwind dark mode using:
  // <html class="dark">
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "url('/Users/jeevan/copy/Rent a drive/client/src/pages/admin/data/welcome-bg.svg')",
      },
    },
  },

  plugins: [],
};

const combinedConfig = {
  ...defaultTheme,
  ...tailwindConfig,
};

export default combinedConfig;