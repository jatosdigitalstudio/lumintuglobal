'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, MapPin, Wallet } from 'lucide-react';

interface Destination {
  id: string;
  image: string;
  country: string;
  program: string;
  salary: string;
  radarDesc: string; 
}

interface JobRadarDict {
  sectionTitle: string;
  sectionSubtitle: string;
  viewAll: string;
  exploreLabel: string;
}

interface JobRadarProps {
  lang: string;
  dict: { jobRadar: JobRadarDict };
  destinations: Destination[];
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function JobRadar({ lang, dict, destinations }: JobRadarProps) {
  if (!dict?.jobRadar || !destinations) return null;

  const jr = dict.jobRadar;

  return (
    <section className="w-full bg-blue/10 py-20 lg:py-32">
      {/* Memori Layout: max-w-[1600px] dengan presisi inner padding */}
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-0">
        <div className="w-full lg:px-12 xl:px-16 2xl:px-20">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
            <div className="max-w-2xl">
              <motion.h2 
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="font-style font-semibold text-4xl sm:text-5xl lg:text-6xl text-dark tracking-tight mb-4 lg:mb-5"
              >
                {jr.sectionTitle}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-text text-base lg:text-lg text-slate-500 leading-relaxed"
              >
                {jr.sectionSubtitle}
              </motion.p>
            </div>
            
            <motion.div
              variants={slideLeftVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Link 
                href={`/${lang}/peluang-kerja`}
                className="group hidden lg:inline-flex items-center gap-2 font-text font-bold text-sm text-dark hover:text-blue transition-colors px-6 py-3.5 rounded-full border border-slate-200 bg-white shadow-sm hover:shadow-md"
              >
                <span>{jr.viewAll}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Cards Grid: True Split Layout (Tegas dan Editorial) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
            {/* Penambahan .slice(0, 3) di sini agar selalu mengunci maksimal 3 kartu */}
            {destinations.slice(0, 3).map((dest, index) => (
              <motion.div 
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col w-full rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden bg-[#0f172a] shadow-sm"
              >
                {/* 1. KOTAK ATAS: Murni Gambar (Tanpa Zoom, Tanpa Gradient Overlap) */}
                <div className="relative w-full aspect-[6/3] shrink-0 bg-slate-800">
                  <Image
                    src={dest.image}
                    alt={`${dest.program} di ${dest.country}`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* 2. KOTAK BAWAH: Murni Konten dengan Background Solid */}
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
                  
                  {/* Internal Link / CTA (Dengan minimal motion pada panah saja) */}
                  <div className="pt-8 mt-8 border-t border-white/10">
                    <Link 
                      href={`/${lang}/peluang-kerja/${dest.id}`}
                      className="group inline-flex items-center gap-2 font-text font-bold text-sm text-white hover:text-green transition-colors"
                    >
                      {jr.exploreLabel}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Only CTA */}
          <div className="mt-10 flex justify-center lg:hidden">
            <Link 
              href={`/${lang}/peluang-kerja`}
              className="inline-flex items-center gap-2 font-text font-bold text-sm text-dark px-8 py-4 rounded-full border border-slate-200 bg-white shadow-sm"
            >
              <span>{jr.viewAll}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}