import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lumintuglobal.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Opsional: cegah AI meng-crawl halaman admin atau API internal jika ada
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}