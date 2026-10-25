import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary, type Locale } from '@/dictionaries/get-dictionary';
import '@/app/globals.css';

// 1. Inisialisasi Font Asli Kamu
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-text',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-style',
  weight:['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

// Pre-render path dinamis untuk SEO
export async function generateStaticParams() {
  return [{ lang: 'id' }, { lang: 'en' }];
}

// 2. SEO & GEO METADATA (Diperbarui dengan standar pencarian AI)
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lumintuglobal.com'),
  title: {
    template: '%s | Lumintu Global',
    default: 'Lumintu Global | Worldwide Employment Partner',
  },
  description: 'Program Penyaluran Kerja Luar Negeri Resmi, Terlatih, dan Berizin bersama Kadin Kabupaten Sukabumi.',
  keywords: ['P3MI', 'PJTKI resmi', 'lowongan kerja luar negeri', 'kerja jepang', 'kerja malaysia', 'zero cost', 'Lumintu Global', 'PT Limpah Luhur Lumintu', 'Kadin Sukabumi'],
  authors: [{ name: 'Lumintu Global' }],
  openGraph: {
    title: 'Lumintu Global | Worldwide Employment Partner',
    description: 'Peluang karir internasional resmi melalui PT Limpah Luhur Lumintu.',
    url: 'https://lumintuglobal.com',
    siteName: 'Lumintu Global',
    locale: 'id_ID',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // Membungkus params dalam Promise untuk kompatibilitas Next.js 15+
  params: Promise<{ lang: string }> | { lang: string };
}) {
  // Resolusi params dan load dictionary di sisi server
  const resolvedParams = await params;
  const lang = (resolvedParams.lang || 'id') as Locale;
  const dict = await getDictionary(lang);

  // 3. SCHEMA MARKUP UNTUK GEO / AEO (Employment Agency)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "name": "Lumintu Global",
    "legalName": "PT Limpah Luhur Lumintu",
    "url": "https://lumintuglobal.com",
    "logo": "https://lumintuglobal.com/logo/logo-lumintuglobal-main-black.png",
    "description": "Perusahaan Penempatan Pekerja Migran Indonesia (P3MI) resmi yang diawasi oleh Kemenaker RI dan BP2MI.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kabupaten Sukabumi",
      "addressRegion": "Jawa Barat",
      "addressCountry": "ID"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-812-1625-1213",
      "contactType": "customer service",
      "email": "info@lumintuglobal.com",
      "availableLanguage": ["Indonesian", "English"]
    }
  };

  return (
    <html lang={lang} className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        {/* Inject JSON-LD secara aman di dalam <head> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="font-text antialiased bg-white text-dark min-h-screen flex flex-col selection:bg-green selection:text-dark"
        suppressHydrationWarning
      >
        <SmoothScroll>
          <Navbar lang={lang} dict={dict} />
          <main className="flex-1 w-full relative">
            {children}
          </main>
          <Footer lang={lang} dict={dict} />
          <Toaster 
            position="top-right" 
            richColors 
            closeButton 
            toastOptions={{
              className: 'font-text text-sm rounded-xl',
            }}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}