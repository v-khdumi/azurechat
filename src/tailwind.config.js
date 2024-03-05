/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./features/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {},
    },
    extend: {
      colors: {
        brand: "hsl(var(--brand))", // adăugat din primul fișier
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
          DEFAULT: "hsl(var(--muted))", // adăugat din primul fișier
          foreground: "hsl(var(--muted-foreground))", // adăugat din primul fișier
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // adăugat din primul fișier
          foreground: "hsl(var(--accent-foreground))", // adăugat din primul fișier
        },
        popover: {
          DEFAULT: "hsl(var(--popover))", // adăugat din primul fișier
          foreground: "hsl(var(--popover-foreground))", // adăugat din primul fișier
        },
        card: {
          DEFAULT: "hsl(var(--card))", // adăugat din primul fișier
          foreground: "hsl(var(--card-foreground))", // adăugat din primul fișier
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
