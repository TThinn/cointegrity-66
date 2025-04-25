
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      borderColor: {
        border: 'hsl(var(--border))',
      },
      boxShadow: {
        'glass': '0 4px 15px 0 rgba(0, 0, 0, 0.1)',
        'glass-md': '0 8px 30px 0 rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
};
export default config;
