/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Accent classes live in src/lib/cheatsheet/registry.ts (not scanned by the
  // content globs). Most accents survive because they also appear in scanned
  // components, but `fuchsia` (Fullstack topic) is unique to the registry —
  // safelist it so the hub card / sidebar accent isn't purged.
  safelist: [
    'text-fuchsia-300',
    'text-fuchsia-400',
    'hover:border-fuchsia-400/60',
    'ring-fuchsia-400/40',
    'from-fuchsia-500',
    'to-pink-700',
    'bg-fuchsia-400',
  ],
  theme: {
    extend: {
      colors: {
        foreground: '#f1f5f9',
        background: '#0f172a',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
