import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      animation: {
        float: "float 2s linear forwards",
        beat: "beat 1s linear",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        beat: {
          "0%": { transform: "scale(110%)" },
          "20%": { transform: "scale(100%)" },
          "40%": { transform: "scale(110%)" },
          "60%": { transform: "scale(100%)" },
          "80%": { transform: "scale(110%)" },
          "100%": { tranform: "scale(100%)" },
        },
        float: {
          "0%": {
            opacity: "1",
            top: "-15px",
            transform: "rotateZ(0deg)",
          },
          "12%": {
            transform: "rotateZ(-20deg) scale(0.9)",
          },
          "24%": {
            transform: "rotateZ(20deg) scale(0.7)",
            left: "3px",
            opacity: "0.7",
          },
          "40%": {
            transform: "rotateZ(-11deg) scale(0.6)",
            left: "-3px",
          },
          "70%": {
            transform: "rotateZ(10deg) scale(0.4)",
            left: "3px",
            opacity: "0.5",
          },
          "90%": {
            transform: "scale(0.2)",
            left: "-3px",
          },
          "100%": {
            opacity: "0",
            top: "-120px",
            transform: "rotateZ(-5deg) scale(0.1)",
          },
        },
      },
      screens: {
        short: { raw: "(max-height: 700px)" },
      },

      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwindcss-animate"),
  ],
  darkMode: ["class"],
} satisfies Config;
