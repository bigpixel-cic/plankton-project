import type { Config } from 'tailwindcss'

export default {
  content: ['./app/(frontend)/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
} satisfies Config
