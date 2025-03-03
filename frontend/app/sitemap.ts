import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    // Base URL - replace with your actual domain when you have one
    const baseUrl = process.env.SITE_URL || 'https://sanithu-jayakody.me'

    // Current date for lastModified
    const currentDate = new Date()

    // Define the expected routes for a portfolio site
    // You can update this as you build out your site
    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 1,
        },
        // Placeholder for future pages - uncomment and modify as you build them
        /*
        {
          url: `${baseUrl}/about`,
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: 0.8,
        },
        {
          url: `${baseUrl}/projects`,
          lastModified: currentDate,
          changeFrequency: 'weekly',
          priority: 0.9,
        },
        {
          url: `${baseUrl}/contact`,
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: 0.7,
        },
        */
    ]
}