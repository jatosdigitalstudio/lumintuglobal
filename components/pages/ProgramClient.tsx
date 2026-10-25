'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Briefcase, MapPin, Wallet } from 'lucide-react';

interface LocalizedJob {
  id: string;
  image: string;
  track: 'skilled' | 'general';
  country: string;
  program: string;
  salary: string;
  radarDesc: string;
}

interface ProgramClientProps {
  lang: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
  type: 'skilled' | 'general';
  jobs: LocalizedJob[];
}

export default function ProgramClient({ lang, dict, type, jobs }: ProgramClientProps) {
  const content = dict?.programs?.[type];
  const global = dict?.programs;
  
  if (!content) return null;

  return (
    <div className="w-full bg-white flex flex-col">
      
      {/* 1. HERO & EXPLANATION (Dark Section) */}
      <section className="w-full bg-[#0f172a] pt-24 pb-20 lg:pt-32 lg:pb-32">
        <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            
            {/* Title & Desc */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-7 flex flex-col"
            >
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-8 self-start ${type === 'skilled' ? 'bg-blue/10 text-blue border border-blue/20' : 'bg-green/10 text-green border border-green/20'}`}>
                <Briefcase className="w-3.5 h-3.5" />
                {content.badge}
              </div>
              <h1 className="font-style font-semibold text-5xl sm:text-6xl text-white tracking-tight leading-[1.05] mb-8">
                {content.title}
              </h1>
              <p className="font-text text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl">
                {content.description}
              </p>
            </motion.div>

            {/* Requirements Box */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-5 bg-white/5 border border-white/10 p-8 sm:p-10 rounded-[2rem]"
            >
              <h3 className="font-text font-bold text-xl text-white mb-6">
                {content.reqTitle}
              </h3>
              <ul className="flex flex-col gap-5">
                {content.requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${type === 'skilled' ? 'text-blue' : 'text-green'}`} />
                    <span className="font-text text-slate-300 leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. HOW TO APPLY (Workflow Steps) */}
      <section className="w-full bg-slate-50 py-20 lg:py-28 border-b border-slate-200">
        <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
          <h2 className="font-text font-bold text-3xl sm:text-4xl text-dark mb-12 lg:mb-16 text-center">
            {content.flowTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {content.flow.map((step: {title: string, desc: string}, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Connecting Line for Desktop */}
                {index !== content.flow.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[60%] w-full h-px bg-slate-200" />
                )}
                
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-text font-bold text-lg mb-6 shadow-sm ${type === 'skilled' ? 'bg-blue text-white' : 'bg-green text-dark'}`}>
                  {index + 1}
                </div>
                <h3 className="font-text font-bold text-lg text-dark mb-3">{step.title}</h3>
                <p className="font-text text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AVAILABLE JOBS LIST (Reusing JobRadar Card Style) */}
      <section className="w-full bg-white py-20 lg:py-32">
        <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
          <h2 className="font-style font-semibold text-4xl sm:text-5xl text-dark mb-12 lg:mb-16">
            {content.jobsTitle}
          </h2>
          
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
              {jobs.map((dest, index) => (
                <motion.div 
                  key={dest.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col w-full rounded-[2rem] overflow-hidden bg-[#0f172a] shadow-sm"
                >
                  <div className="relative w-full aspect-[6/3] shrink-0 bg-slate-800">
                    <Image
                      src={dest.image}
                      alt={dest.program}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-8">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-text font-bold text-white tracking-widest uppercase mb-5 self-start">
                      <MapPin className="w-3.5 h-3.5" />
                      {dest.country}
                    </div>
                    <h3 className="font-style font-semibold text-3xl text-white mb-3 tracking-tight">
                      {dest.program}
                    </h3>
                    <div className="flex items-center gap-2.5 text-green font-text font-bold text-base mb-6">
                      <Wallet className="w-5 h-5" />
                      {dest.salary}
                    </div>
                    <p className="font-text text-sm text-slate-400 leading-relaxed mb-8 flex-1">
                      {dest.radarDesc}
                    </p>
                    <Link 
                      href={`/${lang}/peluang-kerja/${dest.id}`}
                      className="group inline-flex items-center gap-2 font-text font-bold text-sm text-white hover:text-green transition-colors mt-auto pt-6 border-t border-white/10"
                    >
                      {lang === 'id' ? 'Lihat Detail & Lamar' : 'View Details & Apply'}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="w-full p-12 text-center bg-slate-50 rounded-3xl border border-slate-200">
              <p className="font-text text-slate-500">
                {lang === 'id' ? 'Belum ada lowongan terbuka untuk kategori ini saat ini.' : 'No open positions for this category currently.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. MASSIVE CTA */}
      <section className="w-full bg-blue/5 py-24 lg:py-32">
        <div className="w-full max-w-4xl mx-auto px-5 text-center flex flex-col items-center">
          <h2 className="font-style font-semibold text-4xl sm:text-5xl lg:text-6xl text-dark mb-6">
            {global?.ctaTitle}
          </h2>
          <p className="font-text text-lg sm:text-xl text-slate-500 mb-10 max-w-2xl">
            {global?.ctaDesc}
          </p>
          <Link 
            href={`/${lang}/pendaftaran`}
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-green text-dark font-text font-bold text-base hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-green/20"
          >
            <span>{global?.ctaButton}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}