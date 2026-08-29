import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cheat Hub',
    short_name: 'Cheat Hub',
    description: 'Шпаргалки та теорія для підготовки до співбесід: Architecture, React, Angular, JS/TS, Git, AI та практика LeetCode',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    theme_color: '#0f172a',
    background_color: '#0f172a',
    prefer_related_applications: false,
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['education', 'productivity', 'reference'],
  }
}
