'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building2, ShieldCheck, Target, CheckCircle2, Handshake } from 'lucide-react';

interface AboutClientProps {
  lang: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}

export default function AboutClient({ lang, dict }: AboutClientProps) {
  const ab = dict?.about;
  if (!ab) return null;

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. HERO PROFILE SECTION */}
      <section className="w-full bg-white pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue/5 border border-blue/10 text-xs font-bold text-blue tracking-widest uppercase mb-6"
            >
              <Building2 className="w-4 h-4" />
              {ab.badge}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-style font-semibold text-4xl sm:text-5xl lg:text-7xl text-dark tracking-tight leading-[1.05] mb-6"
            >
              {ab.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-text text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto"
            >
              {ab.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. VISI & MISI (Card Layout - Strictly Blue & Green) */}
      <section className="w-full bg-slate-50 py-20 lg:py-32 border-y border-slate-200">
        <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-6xl mx-auto">
            
            {/* Visi */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue text-white flex items-center justify-center shadow-lg shadow-blue/20">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="font-text font-bold text-2xl sm:text-3xl text-dark">{ab.vision.title}</h2>
              </div>
              <p className="font-text text-lg text-slate-600 leading-relaxed p-6 sm:p-8 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                {ab.vision.desc}
              </p>
            </motion.div>

            {/* Misi */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-green text-dark flex items-center justify-center shadow-lg shadow-green/20">
                  <Handshake className="w-6 h-6" />
                </div>
                <h2 className="font-text font-bold text-2xl sm:text-3xl text-dark">{ab.mission.title}</h2>
              </div>
              <ul className="flex flex-col gap-4">
                {ab.mission.items.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-green shrink-0 mt-0.5" />
                    <span className="font-text text-base text-slate-700 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. LEGALITAS & KEMITRAAN KADIN 
          (Section Background Light Blue agar terpisah dari Footer, tapi Card Kadin Dark) */}
      <section className="w-full bg-blue/10 py-20 lg:py-32">
        <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 max-w-6xl mx-auto items-center">
            
            {/* Kiri: Legalitas Pemerintah (Tema Terang) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 flex flex-col"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue/10 border border-blue/20 text-xs font-bold text-blue tracking-widest uppercase mb-6 self-start">
                <ShieldCheck className="w-4 h-4 text-blue" />
                Legalitas
              </div>
              <h2 className="font-style font-semibold text-4xl sm:text-5xl text-dark mb-6 tracking-tight">
                {ab.legality.title}
              </h2>
              <p className="font-text text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                {ab.legality.desc}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {ab.legality.licenses.map((license: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-sm font-text text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green" />
                    {license}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Kanan: Kemitraan Kadin (Tema Gelap Eksklusif agar Logo Terlihat) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="w-full bg-[#0f172a] rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                
                {/* Badge */}
                <span className="relative z-10 inline-block px-3 py-1 bg-green/10 text-green border border-green/20 font-text text-[10px] font-bold uppercase tracking-widest rounded-lg mb-6">
                  {ab.partnership.badge}
                </span>
                
                {/* Text White */}
                <h3 className="relative z-10 font-text font-bold text-2xl text-white mb-4">
                  {ab.partnership.title}
                </h3>
                
                {/* Text Slate-400 */}
                <p className="relative z-10 font-text text-[15px] text-slate-400 leading-relaxed mb-8">
                  {ab.partnership.desc}
                </p>

                {/* Logo Kadin HD langsung di atas background gelap */}
                <div className="relative z-10 w-full max-w-[300px] h-20 sm:h-24 flex items-center justify-start mt-2">
                  <Image 
                    src="/logo/logo-kadinsukabumi.png" 
                    alt="Kadin Sukabumi" 
                    fill
                    priority
                    className="object-contain object-left"
                    sizes="(max-width: 768px) 300px, 400px"
                  />
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

    </div>
  );
}