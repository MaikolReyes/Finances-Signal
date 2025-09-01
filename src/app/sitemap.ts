// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://www.financessignal.com',
            lastModified: new Date('2025-02-23T18:03:59+00:00'),
            changeFrequency: 'weekly',
            priority: 1,
        },
        // Agrega más URLs de tu sitio aquí
    ]
}