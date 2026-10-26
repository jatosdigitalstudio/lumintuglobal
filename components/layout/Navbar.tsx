'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

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
  
  const closeMenus = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const switchLanguage = (newLang: string) => {
    if (newLang === lang) return;
    closeMenus();
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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-6 lg:px-16">
          <div className="flex items-center h-[76px]">
            
            {/* Logo */}
            <div className="flex-1 flex justify-start">
              <Link href={`/${lang}`} onClick={closeMenus} className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue rounded-lg">
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center gap-2 font-text text-[13.5px]">
              
              <Link 
                href={`/${lang}`} 
                onClick={closeMenus}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  pathname === `/${lang}` ? 'bg-slate-100 text-blue font-semibold' : 'text-slate-700 hover:text-dark hover:bg-slate-50'
                }`}
              >
                {dict.nav.home}
              </Link>

              {/* 1. Peluang Kerja (Simplified Dropdown) */}
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
                  <span>{dict.nav.jobs}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isJobsActive ? 'rotate-180 text-blue' : 'text-slate-400'}`} />
                </button>

                <AnimatePresence>
                  {isJobsActive && (
                    <motion.div 
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[320px]"
                    >
                      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 flex flex-col">
                        <Link href={`/${lang}/peluang-kerja/skilled`} onClick={closeMenus} className="px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="font-text font-semibold text-sm text-dark group-hover:text-blue transition-colors">
                              {dict.nav.jobsMenu?.skilledTitle}
                            </p>
                            <span className="text-[9px] font-bold bg-blue/5 text-blue px-2 py-0.5 rounded-md uppercase">
                              {dict.nav.jobsMenu?.skilledBadge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">{dict.nav.jobsMenu?.skilledDesc}</p>
                        </Link>
                        
                        <Link href={`/${lang}/peluang-kerja/general`} onClick={closeMenus} className="px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="font-text font-semibold text-sm text-dark group-hover:text-blue transition-colors">
                              {dict.nav.jobsMenu?.generalTitle}
                            </p>
                            <span className="text-[9px] font-bold bg-green/10 text-dark px-2 py-0.5 rounded-md uppercase">
                              {dict.nav.jobsMenu?.generalBadge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">{dict.nav.jobsMenu?.generalDesc}</p>
                        </Link>
                        
                        <div className="h-px bg-slate-100 my-1 mx-2" />
                        
                        <Link href={`/${lang}/peluang-kerja`} onClick={closeMenus} className="px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between group">
                          <span className="font-text font-semibold text-xs text-blue">
                            {dict.nav.jobsMenu?.viewAll?.replace(' →', '')}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-blue transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 2. Panduan (Simplified Normal Menu) */}
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
                  <span>{dict.nav.guide}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isGuideActive ? 'rotate-180 text-blue' : 'text-slate-400'}`} />
                </button>

                <AnimatePresence>
                  {isGuideActive && (
                    <motion.div 
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[260px]"
                    >
                      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 flex flex-col">
                        <Link href={`/${lang}/panduan#alur`} onClick={closeMenus} className="px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors">
                          <p className="font-text font-semibold text-sm text-dark mb-0.5">{dict.nav.guideMenu?.workflowTitle}</p>
                          <p className="text-[11px] text-slate-500">{dict.nav.guideMenu?.workflowDesc}</p>
                        </Link>
                        <Link href={`/${lang}/panduan#dokumen`} onClick={closeMenus} className="px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors">
                          <p className="font-text font-semibold text-sm text-dark mb-0.5">{dict.nav.guideMenu?.docsTitle}</p>
                          <p className="text-[11px] text-slate-500">{dict.nav.guideMenu?.docsDesc}</p>
                        </Link>
                        <Link href={`/${lang}/panduan#biaya`} onClick={closeMenus} className="px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors">
                          <p className="font-text font-semibold text-sm text-dark mb-0.5">{dict.nav.guideMenu?.financeTitle}</p>
                          <p className="text-[11px] text-slate-500">{dict.nav.guideMenu?.financeDesc}</p>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. Tentang Kami (Profil & Kontak Only) */}
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
                  <span>{dict.nav.about}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isAboutActive ? 'rotate-180 text-blue' : 'text-slate-400'}`} />
                </button>

                <AnimatePresence>
                  {isAboutActive && (
                    <motion.div 
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[240px]"
                    >
                      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 flex flex-col">
                        <Link href={`/${lang}/tentang-kami`} onClick={closeMenus} className="px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors">
                          <p className="font-text font-semibold text-sm text-dark mb-0.5">{dict.nav.aboutMenu?.profileTitle}</p>
                          <p className="text-[11px] text-slate-500">{dict.nav.aboutMenu?.profileDesc}</p>
                        </Link>
                        <Link href={`/${lang}/kontak`} onClick={closeMenus} className="px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors">
                          <p className="font-text font-semibold text-sm text-dark mb-0.5">{dict.nav.aboutMenu?.contactTitle}</p>
                          <p className="text-[11px] text-slate-500">{dict.nav.aboutMenu?.contactDesc}</p>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </nav>

            {/* Desktop Right Side: Lang & CTA */}
            <div className="flex-1 hidden lg:flex items-center justify-end gap-5">
              <div role="radiogroup" aria-label="Language Selection" className="flex items-center p-0.5 rounded-full border border-slate-200/80 bg-slate-50 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => switchLanguage('id')}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                    lang === 'id' ? 'bg-white text-blue shadow-sm' : 'text-slate-400 hover:text-dark'
                  }`}
                >
                  ID
                </button>
                <button
                  type="button"
                  onClick={() => switchLanguage('en')}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                    lang === 'en' ? 'bg-white text-blue shadow-sm' : 'text-slate-400 hover:text-dark'
                  }`}
                >
                  EN
                </button>
              </div>

              <Link
                href={`/${lang}/pendaftaran`}
                onClick={closeMenus}
                className="px-6 py-2.5 rounded-full bg-green text-dark font-text font-semibold text-sm tracking-wide transition-transform hover:scale-[1.03] active:scale-95 shadow-sm"
              >
                {dict.nav.ctaRegister}
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex-1 flex lg:hidden items-center justify-end">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl text-dark hover:bg-slate-50 focus:outline-none"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MODERN MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenus}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
            />
            
            {/* Side Drawer (Slide from Right) */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85vw] sm:w-[360px] bg-white shadow-2xl z-[60] lg:hidden flex flex-col h-full"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <Image
                  src="/logo/logo-lumintuglobal-horizontal-black.png"
                  alt="Lumintu Global Logo"
                  width={140}
                  height={34}
                  className="h-7 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={closeMenus}
                  className="p-2 rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-dark transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* Language Switcher Mobile */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {lang === 'id' ? 'Bahasa' : 'Language'}
                  </span>
                  <div className="flex gap-2 text-xs font-bold">
                    <button onClick={() => switchLanguage('id')} className={`px-4 py-1.5 rounded-lg ${lang === 'id' ? 'bg-blue text-white' : 'bg-slate-100 text-slate-500'}`}>ID</button>
                    <button onClick={() => switchLanguage('en')} className={`px-4 py-1.5 rounded-lg ${lang === 'en' ? 'bg-blue text-white' : 'bg-slate-100 text-slate-500'}`}>EN</button>
                  </div>
                </div>

                {/* Main Navigation Mobile */}
                <nav className="space-y-6 font-text">
                  <Link href={`/${lang}`} onClick={closeMenus} className="block text-[15px] font-semibold text-dark">
                    {dict.nav.home}
                  </Link>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-blue tracking-widest uppercase">{dict.nav.jobs}</p>
                    <div className="pl-4 space-y-4 border-l-2 border-slate-100">
                      <Link href={`/${lang}/peluang-kerja/skilled`} onClick={closeMenus} className="block text-sm font-medium text-slate-600">
                        {dict.nav.jobsMenu?.skilledTitle}
                      </Link>
                      <Link href={`/${lang}/peluang-kerja/general`} onClick={closeMenus} className="block text-sm font-medium text-slate-600">
                        {dict.nav.jobsMenu?.generalTitle}
                      </Link>
                      <Link href={`/${lang}/peluang-kerja`} onClick={closeMenus} className="block text-sm font-semibold text-blue">
                        {dict.nav.jobsMenu?.viewAll?.replace(' →', '')}
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-blue tracking-widest uppercase">{dict.nav.guide}</p>
                    <div className="pl-4 space-y-4 border-l-2 border-slate-100">
                      <Link href={`/${lang}/panduan#alur`} onClick={closeMenus} className="block text-sm font-medium text-slate-600">
                        {dict.nav.guideMenu?.workflowTitle}
                      </Link>
                      <Link href={`/${lang}/panduan#dokumen`} onClick={closeMenus} className="block text-sm font-medium text-slate-600">
                        {dict.nav.guideMenu?.docsTitle}
                      </Link>
                      <Link href={`/${lang}/panduan#biaya`} onClick={closeMenus} className="block text-sm font-medium text-slate-600">
                        {dict.nav.guideMenu?.financeTitle}
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-blue tracking-widest uppercase">{dict.nav.about}</p>
                    <div className="pl-4 space-y-4 border-l-2 border-slate-100">
                      <Link href={`/${lang}/tentang-kami`} onClick={closeMenus} className="block text-sm font-medium text-slate-600">
                        {dict.nav.aboutMenu?.profileTitle}
                      </Link>
                      <Link href={`/${lang}/kontak`} onClick={closeMenus} className="block text-sm font-medium text-slate-600">
                        {dict.nav.aboutMenu?.contactTitle}
                      </Link>
                    </div>
                  </div>
                </nav>
              </div>

              {/* Drawer Footer (Fixed CTA) */}
              <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
                <Link href={`/${lang}/pendaftaran`} onClick={closeMenus} className="w-full text-center block py-4 rounded-xl bg-green text-dark font-text font-bold text-[15px] shadow-sm">
                  {dict.nav.ctaRegister}
                </Link>
                <a href="tel:081216251213" className="w-full text-center block py-3.5 rounded-xl border border-slate-200 bg-white text-dark font-text font-semibold text-sm">
                  0812-1625-1213
                </a>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}