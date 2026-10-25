'use client';

import { motion } from 'framer-motion';
import { BookOpen, FileCheck, Landmark, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface GuideClientProps {
  lang: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}

export default function GuideClient({ lang, dict }: GuideClientProps) {
  const gd = dict?.guide;
  if (!gd) return null;

  return (
    <div className="w-full bg-white min-h-screen pt-12 pb-24 lg:pt-20">
      
      {/* 1. HERO HEADER */}
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20 mb-16 lg:mb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-500 tracking-widest uppercase mb-6"
          >
            <BookOpen className="w-4 h-4" />
            {gd.title}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-style font-semibold text-4xl sm:text-5xl lg:text-6xl text-dark tracking-tight mb-6"
          >
            {gd.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-text text-base sm:text-lg text-slate-500 leading-relaxed"
          >
            {gd.subtitle}
          </motion.p>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20 space-y-24 lg:space-y-32">
        
        {/* 2. ALUR KERJA (#alur) */}
        <section id="alur" className="scroll-mt-32 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="font-text font-bold text-2xl sm:text-3xl text-dark">{gd.workflow.title}</h2>
          </div>
          
          <div className="relative border-l-2 border-slate-100 ml-6 pl-8 space-y-12">
            {gd.workflow.steps.map((step: { title: string, desc: string }, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[43px] top-1 w-6 h-6 rounded-full bg-white border-4 border-blue flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue" />
                </div>
                <h3 className="font-text font-bold text-lg text-dark mb-2">{step.title}</h3>
                <p className="font-text text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. PERSYARATAN DOKUMEN (#dokumen) */}
        <section id="dokumen" className="scroll-mt-32 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-green/10 flex items-center justify-center text-green shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <h2 className="font-text font-bold text-2xl sm:text-3xl text-dark">{gd.documents.title}</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gd.documents.items.map((item: string, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-5 rounded-2xl border border-slate-200 bg-slate-50"
              >
                <CheckCircle2 className="w-5 h-5 text-green shrink-0 mt-0.5" />
                <span className="font-text text-[15px] font-medium text-dark leading-snug">{item}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. TRANSPARANSI BIAYA (#biaya) */}
        <section id="biaya" className="scroll-mt-32 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
              <Landmark className="w-6 h-6" />
            </div>
            <h2 className="font-text font-bold text-2xl sm:text-3xl text-dark">{gd.finance.title}</h2>
          </div>
          
          <p className="font-text text-lg text-slate-500 mb-10 leading-relaxed">
            {gd.finance.desc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gd.finance.points.map((point: { title: string, desc: string }, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] bg-dark text-white shadow-xl flex flex-col"
              >
                <h3 className="font-text font-bold text-xl mb-4 text-white">{point.title}</h3>
                <p className="font-text text-sm text-slate-400 leading-relaxed flex-1">{point.desc}</p>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link href={`/${lang}/peluang-kerja`} className="inline-flex items-center gap-2 text-sm font-bold text-[#84cc16] hover:text-white transition-colors">
                    {lang === 'id' ? 'Cek Lowongan' : 'View Jobs'} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}