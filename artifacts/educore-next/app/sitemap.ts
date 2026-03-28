import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/login', '/about', '/features', '/pricing', '/demo', '/contact'].map((route) => ({
    url: `https://educore.app${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
