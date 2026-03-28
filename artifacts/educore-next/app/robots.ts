import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/management/', '/student/', '/teacher/', '/admin/'],
    },
    sitemap: 'https://educore.app/sitemap.xml',
  }
}
