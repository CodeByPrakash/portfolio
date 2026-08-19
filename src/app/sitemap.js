import { BLOG_POSTS } from '../data/blogPosts'

export default function sitemap() {
  const baseUrl = 'https://omprakashbehera.me'
  const currentDate = new Date().toISOString()

  // 1. Static Top-Level Pages
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      images: [
        `${baseUrl}/omprakash.png`,
        `${baseUrl}/logo.svg`,
      ],
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [`${baseUrl}/omprakash.png`],
    },
    {
      url: `${baseUrl}/resume.pdf`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
  ]

  // 2. Dynamic Blog Article Pages (All 12 Technical Articles)
  const blogRoutes = BLOG_POSTS.map((post) => {
    // Parse date into ISO timestamp
    let postDate = currentDate
    try {
      postDate = new Date(post.date).toISOString()
    } catch {
      postDate = currentDate
    }

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: postDate,
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [
        `${baseUrl}/blog/${post.slug}/opengraph-image`,
        `${baseUrl}/omprakash.png`,
      ],
    }
  })

  return [...staticRoutes, ...blogRoutes]
}
