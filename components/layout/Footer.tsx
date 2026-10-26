'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { FiInstagram, FiLinkedin } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface FooterProps {
  lang: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}

export default function Footer({ lang, dict }: FooterProps) {
  if (!dict?.footer) return null;

  const ft = dict.footer;

  // 1. KUNCI NAVIGASI AMAN: Hanya arahkan ke halaman yang sudah kita buat malam ini.
  // Menggunakan label dari dict.nav agar terjemahan tetap berjalan.
  const safeMenus = [
    {
      title: lang === 'id' ? 'Peluang Kerja' : 'Job Opportunities',
      links: [
        { name: 'Skilled Worker', href: '/peluang-kerja/skilled' },
        { name: 'General Worker', href: '/peluang-kerja/general' },
        { name: lang === 'id' ? 'Semua Lowongan' : 'All Jobs', href: '/peluang-kerja' },
      ]
    },
    {
      title: dict.nav?.guide || 'Panduan',
      links: [
        { name: dict.nav?.guideMenu?.workflowTitle || 'Alur Proses', href: '/panduan#alur' },
        { name: dict.nav?.guideMenu?.docsTitle || 'Persyaratan Dokumen', href: '/panduan#dokumen' },
        { name: dict.nav?.guideMenu?.financeTitle || 'Transparansi Biaya', href: '/panduan#biaya' },
      ]
    },
    {
      title: lang === 'id' ? 'Perusahaan' : 'Company',
      links: [
        { name: dict.nav?.aboutMenu?.profileTitle || 'Profil Perusahaan', href: '/tentang-kami' },
        { name: dict.nav?.aboutMenu?.contactTitle || 'Hubungi Kami', href: '/kontak' },
      ]
    }
  ];

  return (
    <footer className="w-full bg-[#0f172a] pt-20 lg:pt-32 pb-8 overflow-hidden rounded-t-[2.5rem] lg:rounded-t-[4rem]">
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-0">
        <div className="w-full lg:px-12 xl:px-16 2xl:px-20">
          
          {/* 1. TOP SECTION: Massive Editorial CTA */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-16 lg:pb-24 border-b border-white/10">
            <div className="max-w-3xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-style font-semibold text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]"
              >
                {ft.ctaTitle}
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="shrink-0"
            >
              <Link 
                href={`/${lang}/kontak`}
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-blue text-white font-text font-bold text-sm transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue/20"
              >
                <span>{ft.ctaButton}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* 2. MIDDLE SECTION: Clean Grid Navigations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 py-16 lg:py-20">
            
            {/* Brand Info & Partner Logo (Span 4) */}
            <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-12">
              <Link href={`/${lang}`} className="mb-6 inline-block relative w-52 h-16">
                <Image 
                  src="/logo/logo-lumintuglobal-main-white.png" 
                  alt="Lumintu Global" 
                  fill
                  priority
                  className="object-contain object-left"
                  sizes="(max-width: 768px) 200px, 250px"
                />
              </Link>
              <p className="font-text text-sm sm:text-[15px] text-slate-400 leading-relaxed mb-8">
                {ft.brandDesc}
              </p>
              
              {/* Partner Card: Kadin Sukabumi */}
              <div className="flex flex-col gap-3 p-5 rounded-xl bg-white/5 border border-white/10 w-full max-w-[280px]">
                <span className="font-text text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  {ft.officialPartner ?? 'Mitra Resmi'}
                </span>
                <div className="relative w-full h-10">
                  <Image 
                    src="/logo/logo-kadinsukabumi.png" 
                    alt="Kadin Kota Sukabumi" 
                    fill
                    className="object-contain object-left opacity-90"
                    sizes="(max-width: 768px) 150px, 200px"
                  />
                </div>
              </div>
            </div>

            {/* Menu Links (Span 5 - Menggunakan Data AMAN) */}
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:px-4">
              {safeMenus.map((menu, idx) => (
                <div key={idx} className="flex flex-col">
                  <h4 className="font-text font-bold text-[13px] text-white tracking-widest uppercase mb-6">
                    {menu.title}
                  </h4>
                  <ul className="flex flex-col gap-4">
                    {menu.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link 
                          href={`/${lang}${link.href}`}
                          className="font-text text-sm sm:text-[15px] text-slate-400 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Contact Info & Socials (Span 3) */}
            <div className="lg:col-span-3 flex flex-col">
              <h4 className="font-text font-bold text-[13px] text-white tracking-widest uppercase mb-6">
                {ft.contact.title}
              </h4>
              
              <ul className="flex flex-col gap-5 mb-8">
                <li>
                  <a href={`mailto:${ft.contact.email}`} className="group flex items-start gap-3 text-slate-400 hover:text-white transition-colors">
                    <Mail className="w-5 h-5 shrink-0 mt-0.5 text-slate-500 group-hover:text-blue transition-colors" />
                    <span className="font-text text-sm sm:text-[15px] leading-relaxed break-all">
                      {ft.contact.email}
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${ft.contact.phone.replace(/[^0-9]/g, '')}`} className="group flex items-start gap-3 text-slate-400 hover:text-white transition-colors">
                    <Phone className="w-5 h-5 shrink-0 mt-0.5 text-slate-500 group-hover:text-green transition-colors" />
                    <span className="font-text text-sm sm:text-[15px] leading-relaxed">
                      {ft.contact.phone}
                    </span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-slate-400">
                    <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-slate-500" />
                    <span className="font-text text-sm sm:text-[15px] leading-relaxed max-w-[200px]">
                      {ft.contact.address}
                    </span>
                  </div>
                </li>
              </ul>

              <div className="flex items-center gap-3">
                <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
                  <FiInstagram className="w-4 h-4" />
                </a>
                <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
                  <FiLinkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* 3. BOTTOM SECTION: Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
            <p className="font-text text-xs sm:text-sm text-slate-500">
              {ft.copyright}
            </p>
            <div className="flex items-center gap-6">
              <Link 
                href={`/${lang}/privacy-policy`} 
                className="font-text text-xs sm:text-sm text-slate-500 hover:text-white transition-colors"
              >
                {ft.privacyPolicy ?? 'Kebijakan Privasi'}
              </Link>
              <Link 
                href={`/${lang}/terms-conditions`} 
                className="font-text text-xs sm:text-sm text-slate-500 hover:text-white transition-colors"
              >
                {ft.termsConditions ?? 'Syarat & Ketentuan'}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}