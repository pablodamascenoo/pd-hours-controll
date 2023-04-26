/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "base-blue": "#4263EB",
        "base-purple": "#7048E8",
        "base-pink": "#F784AD",
        "base-black": "#212429",
        "gray-1": "#F8F9FA",
        "gray-2": "#DDE2E5",
        "gray-3": "#ACB5BD",
        "gray-4": "#495057",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
