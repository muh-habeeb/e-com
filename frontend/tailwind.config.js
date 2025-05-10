import flowbitePlugin from "flowbite/plugin";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        sprinkle:
          "url('./src/assets/images for bg/engin-akyurt-Hlkuojv_P6I-unsplash.jpg')",
        gradientCircle:
          "url('./src/assets/images for bg/steve-johnson-pyQ_WaTof0U-unsplash.jpg')",
        gradientTexture:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('./src/assets/images for bg/milad-fakurian-E8Ufcyxz514-unsplash.jpg')",
        stoke1: "url('./src/assets/images for bg/svg/stok.svg')",
        stoke2: "url('./src/assets/images for bg/svg/stok2.svg')",
        stoke3: "url('./src/assets/images for bg/svg/mob.svg')",
      },
    },
  },
  plugins: [flowbitePlugin],
};
