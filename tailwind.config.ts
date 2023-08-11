import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "15px",
          md: "30px"
        }
      },
      fontFamily: {
        "bricolage": ['Bricolage Grotesque', "sans-serif"],
        "sigmar": ["var(--font-sigmar)", "sans-serif"],
        "comic": ["var(--font-comic)", "sans-serif"],
      }
    },
  },
  plugins: [],
}
export default config
