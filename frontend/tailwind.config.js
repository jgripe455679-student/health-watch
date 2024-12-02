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
          "base-100": "#fffafa", // snow
          "base-200": "#f9f6ee", // bone white
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
  plugins: [require("daisyui")],
}

