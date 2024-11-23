import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        // Define custom dark mode colors
        dark: {
          background: "#121212", // Background for dark mode
          card: "#1E1E1E", // Card background for dark mode
          textPrimary: "#EDEDED", // Primary text color
          textSecondary: "#AAAAAA", // Secondary text color
          border: "#333333", // Border color
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
