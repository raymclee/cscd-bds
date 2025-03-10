const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateAreas: {
        "project-large": ["left center right"],
        "project-small": ["center center", "left right"],
      },
      gridTemplateColumns: {
        "project-large": ["1fr", "1.8fr", "1fr"],
        "project-small": ["1fr", "1fr"],
      },
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
        mono: [...defaultTheme.fontFamily.mono],
        title: ["Microsoft YaHei", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: "10px",
      },
      backgroundImage: {
        dashboard: "url('/src/assets/bg.png')",
        "dashboard-head": "url('/src/assets/head.png')",
        "dashboard-head-1": "url('/src/assets/head-1.png')",
        "project-dashboard": "url('/src/assets/base.png')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "dashboard-card":
          "rgb(0 0 0 / 76%) 0px 15px 25px, rgb(0 0 0 / 83%) 0px 15px 25px",
        marker:
          "rgb(0 0 0 / 50%) 0px 15px 25px, rgb(0 0 0 / 50%) 0px 15px 25px",
      },
      colors: {
        brand: "#3cb8e6",
        "brand-project": "#00f2ff",
        "brand-project-2": "#e79e2d",
        "brand-project-3": "#d5fafd",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      screens: {
        "large-screen": "1920px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
    require("@savvywombat/tailwindcss-grid-areas"),
  ],
};
