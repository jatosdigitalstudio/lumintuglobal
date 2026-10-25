import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';

import SmoothScroll from '@/components/providers/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary, type Locale } from '@/dictionaries/get-dictionary';
import '@/app/globals.css';

// 1. Inisialisasi Font
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

export const metadata: Metadata = {
  title: 'Lumintu Global | Worldwide Employment Partner',
  description: 'Program Penyaluran Kerja Luar Negeri Resmi, Terlatih, dan Berizin bersama Kadin Kabupaten Sukabumi.',
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

  return (
    <html lang={lang} className={`${inter.variable} ${jakarta.variable}`}>
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