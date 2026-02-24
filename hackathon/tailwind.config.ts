import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      // --- COPY FROM HERE ---
      keyframes: {
        constantShake: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(1.5px, 1.5px)' },
          '50%': { transform: 'translate(-1.5px, 2px)' },
          '75%': { transform: 'translate(-2.5px, -1.5px)' },
        },
      },
      animation: {
        'shake-infinite': 'constantShake 0.15s infinite',
      },
      // --- TO HERE ---
    },
  },
  plugins: [],
};
export default config;