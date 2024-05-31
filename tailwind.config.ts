import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-4px)" },
          "75%": { transform: "translateY(4px)" },
        },
      },
      animation: {
        "bounce-slow": "bounce 10s linear infinite",
      },
      gridTemplateColumns: {
        mainGrid: "2fr 10fr",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        mainColor: "#F0C808",
        backgroundBodyColor: "#FFFDF4",
        secoundaryColor: "#E7F9FF",
        baseColour: "#93F8A9",
        isolatedColour: "#C1532C",
        mainGroupColour: "#ECEA9C",
        headerButtonColor: "#052F3D",
        headerButtonHoverColor: "#122A33",
        buttonColor: "#043039",
        buttonHoverColor: "#394FBF",
      },
      boxShadow: {
        exerciseCardShadow: "0 10px 15px rgb(0 0 0/5%)",
        exerciseCardHowerShadow: "15px 10px 15px rgb(0 0 0/5%)",

        cardElementShadow: "0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
        cardElementStartShadow: "0.2em 0.2em 1em rgba(0, 0, 0, 0.2)",
        cardButtonShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      },
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // },
};
export default config;
