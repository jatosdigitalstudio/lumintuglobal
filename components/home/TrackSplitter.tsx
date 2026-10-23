'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Wrench, Check } from 'lucide-react';

interface TrackSplitterProps {
  lang: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}

export default function TrackSplitter({ lang, dict }: TrackSplitterProps) {
  if (!dict || !dict.trackSplitter) return null;

  const ts = dict.trackSplitter;

  return (
    <section className="w-full bg-white py-20 lg:py-32 border-t border-slate-100">
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-0">
        <div className="w-full lg:px-12 xl:px-16 2xl:px-20">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-12 lg:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="font-style font-semibold text-center text-4xl sm:text-5xl lg:text-6xl text-dark tracking-tight mb-5"
            >
              {ts.sectionTitle ?? 'Pilih Jalur Karir'}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="font-text text-base text-center lg:text-lg text-slate-500 leading-relaxed"
            >
              {ts.sectionSubtitle ?? 'Kualifikasi dan tujuan yang berbeda membutuhkan jalur penempatan yang spesifik.'}
            </motion.p>
          </div>

          {/* Splitter Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Card 1: SKILLED WORKER (Light / Blue Theme) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col justify-between p-8 sm:p-12 lg:p-14 bg-slate-50 border border-slate-200/80 rounded-[2rem] lg:rounded-[3rem] overflow-hidden transition-colors hover:bg-slate-100/60"
            >
              {/* Subtle Background Icon */}
              <div className="absolute top-0 right-0 p-12 opacity-[0.04] pointer-events-none transform translate-x-1/4 -translate-y-1/4 group-hover:scale-105 transition-transform duration-700">
                <GraduationCap className="w-64 h-64 text-blue" strokeWidth={1.5} />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue/15 bg-white text-[11px] font-text font-bold text-blue tracking-widest uppercase mb-6 shadow-sm">
                  {ts.skilled?.badge ?? 'Jalur Formal'}
                </div>
                
                <h3 className="font-style font-semibold text-3xl sm:text-4xl text-dark mb-4 tracking-tight">
                  {ts.skilled?.title ?? 'Skilled Worker'}
                </h3>
                
                <p className="font-text text-sm sm:text-base text-slate-500 leading-relaxed max-w-md mb-10">
                  {ts.skilled?.description ?? 'Diperuntukkan bagi profesional dengan gelar akademik, lisensi, atau sertifikasi kompetensi spesifik (SSW/Profesi).'}
                </p>

                <ul className="space-y-4 mb-12">
                  {(ts.skilled?.points ?? [
                    "Lulusan D3/S1 (Keperawatan, IT, Teknik, Hospitality)",
                    "Wajib sertifikasi bahasa tingkat menengah (N4/B1)",
                    "Kontrak kerja jangka panjang & visibilitas karir"
                  ]).map((point: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3.5">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue/10 text-blue shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                      <span className="font-text text-sm sm:text-[15px] text-slate-700 font-medium leading-snug">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 pt-8 border-t border-slate-200/80">
                <Link 
                  href={`/${lang}/peluang-kerja/skilled`}
                  className="inline-flex items-center gap-2 font-text font-bold text-sm text-blue hover:text-dark transition-colors"
                >
                  {ts.skilled?.cta ?? 'Eksplorasi Jalur Skilled'}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Card 2: GENERAL WORKER (Dark / Green Theme) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col justify-between p-8 sm:p-12 lg:p-14 bg-dark border border-dark rounded-[2rem] lg:rounded-[3rem] overflow-hidden"
            >
              {/* Subtle Background Icon */}
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none transform translate-x-1/4 -translate-y-1/4 group-hover:scale-105 transition-transform duration-700">
                <Wrench className="w-64 h-64 text-white" strokeWidth={1.5} />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-green/20 bg-green/10 text-[11px] font-text font-bold text-green tracking-widest uppercase mb-6">
                  {ts.general?.badge ?? 'Jalur Vokasi'}
                </div>
                
                <h3 className="font-style font-semibold text-3xl sm:text-4xl text-white mb-4 tracking-tight">
                  {ts.general?.title ?? 'General Worker'}
                </h3>
                
                <p className="font-text text-sm sm:text-base text-slate-400 leading-relaxed max-w-md mb-10">
                  {ts.general?.description ?? 'Kesempatan kerja teknis di sektor manufaktur, konstruksi, dan agrikultur untuk lulusan sekolah menengah.'}
                </p>

                <ul className="space-y-4 mb-12">
                  {(ts.general?.points ?? [
                    "Minimal lulusan SMA/SMK sederajat semua jurusan",
                    "Pelatihan bahasa & skill teknis intensif dari nol",
                    "Proses penempatan terstruktur & subsidi biaya awal"
                  ]).map((point: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3.5">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green/20 text-green shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                      <span className="font-text text-sm sm:text-[15px] text-slate-300 font-medium leading-snug">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 pt-8 border-t border-white/10">
                <Link 
                  href={`/${lang}/peluang-kerja/general`}
                  className="inline-flex items-center gap-2 font-text font-bold text-sm text-green hover:text-white transition-colors"
                >
                  {ts.general?.cta ?? 'Eksplorasi Jalur General'}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}