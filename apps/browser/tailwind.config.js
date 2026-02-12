/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@gitlantis/config-tailwind/tailwind-preset")],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/components/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/shared/src/**/*.{js,ts,jsx,tsx}",
  ],
};
