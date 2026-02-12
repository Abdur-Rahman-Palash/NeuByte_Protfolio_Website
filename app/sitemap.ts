import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/markdown'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://neubyte.tech'
  const posts = getAllPosts();

  const blogPosts = posts.map((blog) => ({
    url: `${baseUrl}/blog-details/${blog.slug}`,
    lastModified: blog.publishDate ? new Date(blog.publishDate) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const routes = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/solutions',
    '/ceo',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes, ...blogPosts]
}
