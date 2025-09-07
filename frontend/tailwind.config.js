// import flowbitePlugin from "flowbite/plugin";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        sprinkle:
          "url('./src/assets/images_for_bg/engin-akyurt-Hlkuojv_P6I-unsplash.jpg')",
        gradientCircle:
          "url('./src/assets/images_for_bg/steve-johnson-pyQ_WaTof0U-unsplash.jpg')",
        gradientTexture:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('./src/assets/images_for_bg/milad-fakurian-E8Ufcyxz514-unsplash.jpg')",
        stoke1:
          "linear-gradient(rgba(0,0,0,0.3)),url('./src/assets/images_for_bg/svg/stok.svg')",
        stoke2:
          "linear-gradient(rgba(0,0,0,0.5)),url('./src/assets/images_for_bg/svg/stok2.svg')",
        stoke3: "url('./src/assets/images_for_bg/svg/mob.svg')",
        error404: "url(./src/assets/images_404_1_svg)",
      },
    },

    screens: {
      xs: { min: "339px" }, // mobile min width 339px
      sm: { min: "479px" }, // min 479px
      md: { min: "767px" }, // min 767px
      lg: { min: "1023px" }, // min 1023px
      xl: { min: "1279px" }, // min 1279px
      "1xl": { min: "1379px" }, // min 1279px
      "2xl": { min: "1535px" }, // min 1535px
    },
  },
  plugins: [],
};
