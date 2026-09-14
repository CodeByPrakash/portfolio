import { BLOG_POSTS } from '../data/blogPosts'
import { PROJECTS_DATA } from '../data/projectsData'

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
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
      images: [`${baseUrl}/omprakash.png`],
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [`${baseUrl}/omprakash.png`],
    },
    {
      url: `${baseUrl}/activity`,
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

  // 2. Dynamic Project Detail Pages (All 21 Engineering Projects)
  const projectRoutes = PROJECTS_DATA.map((p) => ({
    url: `${baseUrl}/projects/${p.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.88,
    images: [
      `${baseUrl}${p.image}`,
      `${baseUrl}/omprakash.png`,
    ],
  }))

  // 3. Dynamic Blog Article Pages (All Technical Articles)
  const blogRoutes = BLOG_POSTS.map((post) => {
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

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
