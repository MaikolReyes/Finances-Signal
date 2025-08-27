// tailwind.config.js
module.exports = {
  corePlugins: {
    preflight: false, // 🚫 desactiva el reset de Tailwind
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: { /* ... */ },
  plugins: [],
  darkMode: 'class',
};
