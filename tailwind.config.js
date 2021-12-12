// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
        primary: colors.pink,
      },
      fontWeight: {
        bold: 600,
      },
    },
  },
  variants: {
    extend: {},
  },
};
