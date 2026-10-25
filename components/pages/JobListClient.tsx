'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Wallet, Briefcase } from 'lucide-react';

interface LocalizedJob {
  id: string;
  image: string;
  track: 'skilled' | 'general';
  country: string;
  program: string;
  salary: string;
  radarDesc: string;
}

interface JobListClientProps {
  lang: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
  jobs: LocalizedJob[];
}

export default function JobListClient({ lang, dict, jobs }: JobListClientProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'skilled' | 'general'>('all');

  if (!dict?.jobList) return null;
  const jl = dict.jobList;

  // Logika Filter
  const filteredJobs = jobs.filter(
    (job) => activeFilter === 'all' || job.track === activeFilter
  );

  return (
    <div className="w-full bg-white min-h-screen pt-12 pb-24 lg:pt-20">
      {/* Memori Layout: max-w-[1600px] dengan presisi padding */}
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-0">
        <div className="w-full lg:px-12 xl:px-16 2xl:px-20">
          
          {/* HEADER SECTION */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-[11px] font-text font-bold text-slate-500 tracking-widest uppercase mb-6"
            >
              <Briefcase className="w-3.5 h-3.5" />
              {jl.badge}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-style font-semibold text-5xl sm:text-6xl lg:text-7xl text-dark tracking-tight leading-[1.05] mb-6"
            >
              {jl.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-text text-base lg:text-lg text-slate-500 leading-relaxed"
            >
              {jl.subtitle}
            </motion.p>
          </div>

          {/* FILTER PILLS */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {(['all', 'skilled', 'general'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setActiveFilter(filterType)}
                className={`px-6 py-3 rounded-full font-text font-bold text-sm transition-all duration-300 ${
                  activeFilter === filterType 
                    ? 'bg-dark text-white shadow-md' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-dark border border-slate-200'
                }`}
              >
                {jl.filters[filterType]}
              </button>
            ))}
          </div>

          {/* GRID KARTU LOWONGAN (Identik dengan JobRadar Split Layout) */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((dest, index) => (
                <motion.div 
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex flex-col w-full rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden bg-[#0f172a] shadow-sm border border-black/20"
                >
                  {/* KOTAK ATAS: Gambar (Hard Split, Tanpa Zoom Hover) */}
                  <div className="relative w-full aspect-[6/3] shrink-0 bg-slate-800">
                    <Image
                      src={dest.image}
                      alt={`${dest.program} di ${dest.country}`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* KOTAK BAWAH: Konten Solid */}
                  <div className="flex flex-col flex-1 p-8 lg:p-10">
                    <div className="flex-1">
                      {/* Badge Lokasi */}
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-text font-bold text-white tracking-widest uppercase mb-5">
                        <MapPin className="w-3.5 h-3.5" />
                        {dest.country}
                      </div>
                      
                      {/* Program Title */}
                      <h3 className="font-style font-semibold text-3xl sm:text-4xl text-white mb-3 tracking-tight">
                        {dest.program}
                      </h3>
                      
                      {/* Salary Highlight */}
                      <div className="flex items-center gap-2.5 text-green font-text font-bold text-base sm:text-lg mb-6">
                        <Wallet className="w-5 h-5" />
                        {dest.salary}
                      </div>
                      
                      {/* Description */}
                      <p className="font-text text-sm sm:text-[15px] text-slate-400 leading-relaxed line-clamp-3">
                        {dest.radarDesc}
                      </p>
                    </div>
                    
                    {/* CTA Minimalis */}
                    <div className="pt-8 mt-8 border-t border-white/10">
                      <Link 
                        href={`/${lang}/peluang-kerja/${dest.id}`}
                        className="group inline-flex items-center gap-2 font-text font-bold text-sm text-white hover:text-green transition-colors"
                      >
                        {jl.exploreLabel}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State jika filter kosong (meski tidak mungkin dengan data saat ini) */}
          {filteredJobs.length === 0 && (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center">
              <p className="font-text text-lg text-slate-500">
                {lang === 'id' ? 'Belum ada lowongan untuk jalur ini.' : 'No jobs available for this track yet.'}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}