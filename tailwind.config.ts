import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        title: ['Roboto', 'serif'], // Exactamente como en Vite
        secondary: ['Lato', 'serif'], // Exactamente como en Vite
      },
      screens: {
        mobile: '480px',
        tablet: '768px',
        desktop: '1280px',
        'large-desktop': '1536px',
      },
      colors: {
        'finance-blue': '#0066cc',
        'finance-dark': '#1a1a1a',
      },
    },
  },
}

export default config;