import { MetadataRoute } from 'next';

// Ganti dengan domain asli Anda saat live nanti
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lumintuglobal.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['id', 'en'];
  
  // Daftar semua route (tanpa prefix bahasa)
  const routes = [
    '',
    '/peluang-kerja',
    '/peluang-kerja/skilled',
    '/peluang-kerja/general',
    '/panduan',
    '/tentang-kami',
    '/kontak',
    '/pendaftaran',
    '/terms-conditions',
    '/privacy-policy'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        // Root dan peluang kerja di-crawl harian, sisanya mingguan
        changeFrequency: route === '' || route.includes('peluang-kerja') ? 'daily' : 'weekly',
        // Prioritas AEO: Beranda dan Job List sangat tinggi
        priority: route === '' ? 1 : route.includes('peluang-kerja') ? 0.9 : 0.7,
      });
    });
  });

  return sitemapEntries;
}