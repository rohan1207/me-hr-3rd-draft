/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Figtree", "system-ui", "sans-serif"],
        sans: ["Figtree", "system-ui", "sans-serif"],
      },
      colors: {
        mehr: {
          ink: "#111111",
          deep: "#0b5f58",
          black: "#0A0A0A",
          teal: "#14c4ad",
          "teal-dark": "#084740",
          "teal-soft": "#e4f6f2",
          charcoal: "#0a3d38",
          slate: "#0c4540",
          coral: "#14c4ad",
          "coral-soft": "#e4f6f2",
          mist: "#5a6e6a",
          muted: "#879994",
          soft: "#a5b6b1",
          fog: "#FFFFFF",
          panel: "#eef8f5",
          line: "rgba(11, 95, 88, 0.18)",
          "line-dark": "rgba(17, 17, 17, 0.12)",
        },
      },
      boxShadow: {
        soft: "0 4px 20px rgba(11, 95, 88, 0.08)",
        card: "0 10px 30px rgba(11, 95, 88, 0.1)",
        float: "0 18px 44px rgba(17, 17, 17, 0.08)",
        glow: "0 8px 28px rgba(20, 196, 173, 0.28)",
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin 28s linear infinite",
        "pulse-soft": "pulseSoft 5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.55" },
          "50%": { transform: "scale(1.06)", opacity: "0.9" },
        },
      },
      backgroundImage: {
        "mesh-teal":
          "radial-gradient(ellipse 70% 50% at 18% 18%, rgba(20,196,173,0.1), transparent 55%), radial-gradient(ellipse 55% 40% at 88% 12%, rgba(11,95,88,0.07), transparent 50%)",
        "grid-soft":
          "linear-gradient(rgba(11,95,88,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(11,95,88,0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
