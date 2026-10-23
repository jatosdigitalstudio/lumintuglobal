'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowRight, BookOpen, FileCheck, Landmark } from 'lucide-react';
import { motion, AnimatePresence, Variants} from 'framer-motion';

interface NavbarProps {
  lang: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 30 } 
  },
  exit: { 
    opacity: 0, 
    y: 5, 
    scale: 0.98, 
    transition: { duration: 0.15, ease: 'easeIn' } 
  }
};

export default function Navbar({ lang, dict }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }

  const switchLanguage = (newLang: string) => {
    if (newLang === lang) return;
    if (!pathname) {
      router.push(`/${newLang}`);
      return;
    }
    const segments = pathname.split('/');
    if (segments.length > 1 && (segments[1] === 'id' || segments[1] === 'en')) {
      segments[1] = newLang;
    } else {
      segments.splice(1, 0, newLang);
    }
    router.push(segments.join('/') || `/${newLang}`);
  };

  if (!dict || !dict.nav) {
    return <header className="h-[72px] bg-white border-b border-slate-200" />;
  }

  const isJobsActive = activeDropdown === 'jobs';
  const isGuideActive = activeDropdown === 'guide';
  const isAboutActive = activeDropdown === 'about';

  return (
    <>
      {/* Top Institutional Notification Bar */}
      <aside aria-label="Pengumuman Resmi" className="bg-dark text-white text-xs font-text">
        <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-6 lg:px-16 h-9 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            <p className="text-[11px] sm:text-xs tracking-tight text-white/80">
              {dict.topbar?.announcement} <strong className="text-white font-medium">{dict.topbar?.partnerName}</strong>
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-5 text-[11px] text-white/70">
            <span>
              {dict.topbar?.hotlineLabel}{' '}
              <a href="tel:081216251213" className="text-white hover:text-green transition-colors font-medium">
                0812-1625-1213
              </a>
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="tracking-wide text-white/90 font-medium">{dict.topbar?.entityName}</span>
          </div>
        </div>
      </aside>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-6 lg:px-16">
          <div className="flex items-center h-[76px]">
            
            <div className="flex-1 flex justify-start">
              <Link href={`/${lang}`} className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue rounded-lg">
                <Image
                  src="/logo/logo-lumintuglobal-horizontal-black.png"
                  alt="Lumintu Global Logo"
                  width={180}
                  height={44}
                  priority
                  className="h-9 w-auto object-contain"
                />
              </Link>
            </div>

            <nav className="hidden lg:flex items-center justify-center gap-1 font-text text-[13.5px]">
              
              <Link 
                href={`/${lang}`} 
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  pathname === `/${lang}` ? 'bg-slate-100 text-blue font-semibold' : 'text-slate-700 hover:text-dark hover:bg-slate-50'
                }`}
              >
                {dict.nav?.home}
              </Link>

              {/* Peluang Kerja Hub */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('jobs')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  aria-expanded={isJobsActive}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-medium transition-all ${
                    isJobsActive ? 'bg-slate-100 text-blue' : 'text-slate-700 hover:text-dark hover:bg-slate-50'
                  }`}
                >
                  <span>{dict.nav?.jobs}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isJobsActive ? 'rotate-180 text-blue' : 'text-slate-400'}`} />
                </button>

                <AnimatePresence>
                  {isJobsActive && (
                    <motion.div 
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[520px]"
                    >
                      {/* Thinner border and softer shadow */}
                      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 grid grid-cols-2 gap-5 relative overflow-hidden">
                        
                        <div className="space-y-3 relative">
                          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-text">
                            {dict.nav?.jobsMenu?.categoryTitle || 'Kategori Program'}
                          </p>
                          <div className="space-y-1">
                            <Link href={`/${lang}/peluang-kerja/skilled`} className="group flex flex-col p-3 rounded-xl hover:bg-slate-50 transition-colors">
                              <div className="flex items-center justify-between mb-1">
                                {/* Changed to font-text font-semibold */}
                                <span className="font-text font-semibold text-sm text-dark group-hover:text-blue transition-colors">Skilled Worker</span>
                                <span className="text-[9px] font-bold bg-blue/5 text-blue px-2 py-0.5 rounded-full uppercase tracking-wider border border-blue/10">Formal</span>
                              </div>
                              <span className="text-xs text-slate-500 font-text leading-relaxed">Keperawatan, hospitaliti, IT & teknisi bersertifikat.</span>
                            </Link>
                            <Link href={`/${lang}/peluang-kerja/general`} className="group flex flex-col p-3 rounded-xl hover:bg-slate-50 transition-colors">
                              <div className="flex items-center justify-between mb-1">
                                {/* Changed to font-text font-semibold */}
                                <span className="font-text font-semibold text-sm text-dark group-hover:text-blue transition-colors">General Worker</span>
                                <span className="text-[9px] font-bold bg-green/10 text-dark px-2 py-0.5 rounded-full uppercase tracking-wider border border-green/20">Vokasi</span>
                              </div>
                              <span className="text-xs text-slate-500 font-text leading-relaxed">Manufaktur pabrik, konstruksi, & agrikultur.</span>
                            </Link>
                          </div>
                        </div>

                        <div className="space-y-3 pl-4 border-l border-slate-100">
                          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-text">
                            {dict.nav?.jobsMenu?.destinationsTitle || 'Destinasi Utama'}
                          </p>
                          <div className="space-y-1">
                            <Link href={`/${lang}/peluang-kerja/jepang`} className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                              <span className="text-xs font-semibold text-slate-700 group-hover:text-blue">🇯🇵 Jepang (SSW)</span>
                              <span className="text-[10px] font-medium text-slate-400">¥180k+</span>
                            </Link>
                            <Link href={`/${lang}/peluang-kerja/jerman`} className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                              <span className="text-xs font-semibold text-slate-700 group-hover:text-blue">🇩🇪 Jerman</span>
                              <span className="text-[10px] font-medium text-slate-400">€1.1k+</span>
                            </Link>
                            <Link href={`/${lang}/peluang-kerja/timur-tengah`} className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                              <span className="text-xs font-semibold text-slate-700 group-hover:text-blue">🇦🇪 Timur Tengah</span>
                              <span className="text-[10px] font-medium text-slate-400">Pajak 0%</span>
                            </Link>
                          </div>
                          <Link href={`/${lang}/peluang-kerja`} className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue hover:text-dark transition-colors px-2.5">
                            Lihat Semua Lowongan <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Panduan Mini Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('guide')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  aria-expanded={isGuideActive}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-medium transition-all ${
                    isGuideActive ? 'bg-slate-100 text-blue' : 'text-slate-700 hover:text-dark hover:bg-slate-50'
                  }`}
                >
                  <span>{dict.nav?.guide || 'Panduan'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isGuideActive ? 'rotate-180 text-blue' : 'text-slate-400'}`} />
                </button>

                <AnimatePresence>
                  {isGuideActive && (
                    <motion.div 
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[460px]"
                    >
                      {/* Thinner border and softer shadow */}
                      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-3 grid grid-cols-2 gap-2">
                        
                        <Link href={`/${lang}/panduan#alur`} className="flex gap-3 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue/5 text-blue shrink-0">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div>
                            {/* Changed to font-text font-semibold */}
                            <p className="font-text font-semibold text-sm text-dark mb-0.5">{dict.nav?.guideMenu?.workflowTitle}</p>
                            <p className="text-[11px] text-slate-500 leading-snug">{dict.nav?.guideMenu?.workflowDesc}</p>
                          </div>
                        </Link>

                        <Link href={`/${lang}/panduan#dokumen`} className="flex gap-3 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green/10 text-dark shrink-0">
                            <FileCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-text font-semibold text-sm text-dark mb-0.5">{dict.nav?.guideMenu?.docsTitle}</p>
                            <p className="text-[11px] text-slate-500 leading-snug">{dict.nav?.guideMenu?.docsDesc}</p>
                          </div>
                        </Link>

                        <Link href={`/${lang}/panduan#biaya`} className="flex gap-3 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors col-span-2 mt-1 bg-slate-50/50">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-200/50 text-slate-700 shrink-0">
                            <Landmark className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-text font-semibold text-sm text-dark mb-0.5">{dict.nav?.guideMenu?.financeTitle}</p>
                            <p className="text-[11px] text-slate-500 leading-snug">{dict.nav?.guideMenu?.financeDesc}</p>
                          </div>
                        </Link>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                href={`/${lang}/blog`} 
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  pathname === `/${lang}/blog` ? 'bg-slate-100 text-blue font-semibold' : 'text-slate-700 hover:text-dark hover:bg-slate-50'
                }`}
              >
                {dict.nav?.blog}
              </Link>

              {/* Tentang Kami Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('about')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  aria-expanded={isAboutActive}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-medium transition-all ${
                    isAboutActive ? 'bg-slate-100 text-blue' : 'text-slate-700 hover:text-dark hover:bg-slate-50'
                  }`}
                >
                  <span>{dict.nav?.about}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isAboutActive ? 'rotate-180 text-blue' : 'text-slate-400'}`} />
                </button>

                <AnimatePresence>
                  {isAboutActive && (
                    <motion.div 
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[260px]"
                    >
                      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-2 flex flex-col">
                        <Link href={`/${lang}/tentang-kami`} className="px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors">
                          <p className="font-text font-semibold text-sm text-dark mb-0.5">{dict.nav?.aboutMenu?.profileTitle}</p>
                          <p className="text-[10px] text-slate-500">{dict.nav?.aboutMenu?.profileDesc}</p>
                        </Link>
                        <Link href={`/${lang}/tentang-kami/mitra`} className="px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors">
                          <p className="font-text font-semibold text-sm text-dark mb-0.5">{dict.nav?.aboutMenu?.partnerTitle}</p>
                          <p className="text-[10px] text-slate-500">{dict.nav?.aboutMenu?.partnerDesc}</p>
                        </Link>
                        <div className="h-px bg-slate-100 my-1 mx-2" />
                        <Link href={`/${lang}/kontak`} className="px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors">
                          <p className="font-text font-semibold text-sm text-dark mb-0.5">{dict.nav?.aboutMenu?.contactTitle}</p>
                          <p className="text-[10px] text-slate-500">{dict.nav?.aboutMenu?.contactDesc}</p>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </nav>

            <div className="flex-1 hidden lg:flex items-center justify-end gap-5">
              
              <div role="radiogroup" aria-label="Pilihan Bahasa" className="flex items-center p-0.5 rounded-full border border-slate-200/80 bg-slate-50 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => switchLanguage('id')}
                  aria-checked={lang === 'id'}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                    lang === 'id' ? 'bg-white text-blue shadow-sm' : 'text-slate-400 hover:text-dark'
                  }`}
                >
                  ID
                </button>
                <button
                  type="button"
                  onClick={() => switchLanguage('en')}
                  aria-checked={lang === 'en'}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                    lang === 'en' ? 'bg-white text-blue shadow-sm' : 'text-slate-400 hover:text-dark'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Using standard semibold for CTA to balance with the new soft UI */}
              <Link
                href={`/${lang}/pendaftaran`}
                className="px-6 py-2.5 rounded-full bg-green text-dark font-text font-semibold text-sm tracking-wide transition-transform hover:scale-[1.03] active:scale-95 shadow-sm"
              >
                {dict.nav?.ctaRegister}
              </Link>
            </div>

            <div className="flex-1 flex lg:hidden items-center justify-end">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-dark hover:bg-slate-50 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="px-5 pt-3 pb-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{dict.common?.language || 'Language'}</span>
                  <div className="flex gap-2 text-xs font-bold">
                    <button onClick={() => switchLanguage('id')} className={`px-4 py-1.5 rounded-lg ${lang === 'id' ? 'bg-blue text-white' : 'bg-slate-100 text-slate-500'}`}>
                      ID
                    </button>
                    <button onClick={() => switchLanguage('en')} className={`px-4 py-1.5 rounded-lg ${lang === 'en' ? 'bg-blue text-white' : 'bg-slate-100 text-slate-500'}`}>
                      EN
                    </button>
                  </div>
                </div>

                <nav className="space-y-4 font-text">
                  <Link href={`/${lang}`} className="block text-sm font-semibold text-dark">{dict.nav?.home}</Link>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-blue tracking-widest uppercase">{dict.nav?.jobs}</p>
                    <div className="pl-4 space-y-3 border-l-2 border-slate-100">
                      <Link href={`/${lang}/peluang-kerja/skilled`} className="block text-sm font-medium text-slate-700">Skilled Worker Program</Link>
                      <Link href={`/${lang}/peluang-kerja/general`} className="block text-sm font-medium text-slate-700">General Worker Program</Link>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <p className="text-[10px] font-bold text-blue tracking-widest uppercase">{dict.nav?.guide || 'Panduan'}</p>
                    <div className="pl-4 space-y-3 border-l-2 border-slate-100">
                      <Link href={`/${lang}/panduan#alur`} className="block text-sm font-medium text-slate-700">{dict.nav?.guideMenu?.workflowTitle}</Link>
                      <Link href={`/${lang}/panduan#dokumen`} className="block text-sm font-medium text-slate-700">{dict.nav?.guideMenu?.docsTitle}</Link>
                    </div>
                  </div>

                  <Link href={`/${lang}/blog`} className="block pt-2 text-sm font-semibold text-dark">{dict.nav?.blog}</Link>
                  <Link href={`/${lang}/tentang-kami`} className="block text-sm font-semibold text-dark">{dict.nav?.about}</Link>
                </nav>

                <div className="pt-4 flex flex-col gap-3">
                  <Link href={`/${lang}/pendaftaran`} className="w-full text-center py-3.5 rounded-full bg-green text-dark font-text font-semibold text-sm shadow-sm">
                    {dict.nav?.ctaRegister}
                  </Link>
                  <a href="tel:081216251213" className="w-full text-center py-3 rounded-full border border-slate-200 text-dark font-text text-sm font-semibold">
                    0812-1625-1213
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}