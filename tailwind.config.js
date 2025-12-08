// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  plugins: [require("daisyui")],

  // DaisyUI কনফিগারেশন অবজেক্ট
  daisyui: {
    themes: ["light", "dark"],
  },
};
