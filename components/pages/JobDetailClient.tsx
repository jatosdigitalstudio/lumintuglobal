'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Wallet, CheckCircle2, ChevronLeft, ArrowRight, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

// Definisi Tipe Props yang Ketat
interface JobData {
  id: string;
  image: string;
  track: 'skilled' | 'general';
  country: string;
  program: string;
  salary: string;
  title: string;
  location: string;
  jobDescription: string;
  requirements: string[];
  benefits: string[];
}

interface JobDetailClientProps {
  lang: 'id' | 'en';
  job: JobData;
}

export default function JobDetailClient({ lang, job }: JobDetailClientProps) {
  
  return (
    <div className="w-full bg-white min-h-screen pb-24 pt-8">
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Breadcrumb Back */}
        <Link 
          href={`/${lang}/peluang-kerja`}
          className="inline-flex items-center gap-2 font-text text-sm font-semibold text-slate-500 hover:text-blue transition-colors mb-10 lg:mb-12"
        >
          <ChevronLeft className="w-4 h-4" />
          {lang === 'id' ? 'Kembali ke Daftar Lowongan' : 'Back to Job List'}
        </Link>

        {/* Editorial Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mb-12"
        >
          <h1 className="font-style font-semibold text-4xl sm:text-5xl lg:text-[4rem] text-dark tracking-tight leading-[1.1] mb-6">
            {job.title}
          </h1>
          <p className="font-text text-lg sm:text-xl text-slate-500 leading-relaxed">
            {lang === 'id' 
              ? `Peluang karir resmi di ${job.country} untuk program ${job.program}.` 
              : `Official career opportunity in ${job.country} for ${job.program} program.`}
          </p>
        </motion.div>

        {/* Hero Image Section - Panoramic Layout */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="w-full aspect-[16/9] lg:aspect-[21/9] relative rounded-[2rem] lg:rounded-[3rem] overflow-hidden mb-16 lg:mb-24 shadow-sm border border-slate-100"
        >
          <Image
            src={job.image}
            alt={job.title}
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>

        {/* Content Layout: 2 Columns (Main Content + Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* KIRI: Main Content (Deskripsi, Kualifikasi, Benefit) */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            
            {/* Deskripsi Pekerjaan */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-style font-semibold text-3xl sm:text-4xl text-dark mb-6 tracking-tight">
                {lang === 'id' ? 'Deskripsi Pekerjaan' : 'Job Description'}
              </h2>
              <p className="font-text text-base sm:text-lg text-slate-600 leading-relaxed">
                {job.jobDescription}
              </p>
            </motion.section>

            {/* Persyaratan (Requirements) */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-style font-semibold text-2xl sm:text-3xl text-dark mb-8 tracking-tight">
                {lang === 'id' ? 'Persyaratan & Kualifikasi' : 'Requirements & Qualifications'}
              </h3>
              <ul className="space-y-5">
                {job.requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue/10 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4.5 h-4.5 text-blue" />
                    </div>
                    <span className="font-text text-[15px] sm:text-base text-slate-700 leading-relaxed">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Benefit */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-style font-semibold text-2xl sm:text-3xl text-dark mb-8 tracking-tight">
                {lang === 'id' ? 'Fasilitas & Benefit' : 'Facilities & Benefits'}
              </h3>
              <ul className="space-y-5">
                {job.benefits.map((benefit: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-green/15 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4.5 h-4.5 text-green" />
                    </div>
                    <span className="font-text text-[15px] sm:text-base text-slate-700 leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>

          </div>

          {/* KANAN: Sticky Apply Sidebar */}
          <div className="lg:col-span-4 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-28 bg-blue/10 border border-slate-200/80 rounded-[2rem] p-8 sm:p-10 shadow-sm"
            >
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[10px] font-text font-bold text-slate-500 tracking-widest uppercase mb-6 shadow-sm">
                <Briefcase className="w-3.5 h-3.5" />
                {job.track === 'skilled' ? (lang === 'id' ? 'Jalur Formal' : 'Formal Track') : (lang === 'id' ? 'Jalur Vokasi' : 'Vocational Track')}
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <p className="font-text text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    {lang === 'id' ? 'Estimasi Gaji' : 'Estimated Salary'}
                  </p>
                  <p className="font-style font-semibold text-3xl sm:text-4xl text-green flex items-start gap-2 tracking-tight">
                    {job.salary}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-slate-200/80">
                  <p className="font-text text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    {lang === 'id' ? 'Lokasi Penempatan' : 'Location'}
                  </p>
                  <p className="font-text font-semibold text-base text-dark flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue" />
                    {job.location}
                  </p>
                </div>
              </div>

              <Link 
                href={`/${lang}/pendaftaran?job=${job.id}`}
                className="group flex items-center justify-center gap-2 w-full py-4 px-6 rounded-full bg-blue text-white font-text font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-95 shadow-md shadow-blue/20"
              >
                <span>{lang === 'id' ? 'Lamar Posisi Ini' : 'Apply Now'}</span>
                <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
              
              <p className="font-text text-xs text-center text-slate-400 mt-4 leading-relaxed">
                {lang === 'id' 
                  ? 'Kandidat terpilih akan dihubungi oleh tim rekrutmen Lumintu Global.' 
                  : 'Selected candidates will be contacted by the Lumintu Global team.'}
              </p>
            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
}