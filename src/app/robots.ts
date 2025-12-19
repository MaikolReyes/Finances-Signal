import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/private/',
                    '/api/', // Opcional: bloquear APIs
                ],
            }
        ],
        sitemap: 'https://www.financessignal.com/sitemap.xml',
    }
}