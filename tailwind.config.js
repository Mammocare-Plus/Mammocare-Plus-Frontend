/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Epilogue: ["Epilogue", "sans-serif"],
        Poppins: ["'Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
