/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#48cfad",
          "secondary": "#45dfb1",
          "accent": "#0ad1c8",
          "neutral": "#48cfad",
          "base-100": "#fffff0", // ivory
          "base-200": "#fbfcf8", // pearl
          "info": "#0000ff",
          "success": "#80ed99",
          "warning": "#ffcc00",
          "error": "#ff0000",
        },
      },
    ],
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

