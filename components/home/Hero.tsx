// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { motion, Variants } from 'framer-motion';
// import { ArrowRight, CheckCircle2 } from 'lucide-react';

// interface HeroProps {
//   lang: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   dict: any;
// }

// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.1
//     }
//   }
// };

// const fadeUpVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
//   }
// };

// const imageRevealVariants: Variants = {
//   hidden: { opacity: 0, scale: 0.96 },
//   visible: { 
//     opacity: 1, 
//     scale: 1, 
//     transition: { duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
//   }
// };

// export default function Hero({ lang, dict }: HeroProps) {
//   if (!dict || !dict.hero) return <section className="h-screen w-full bg-white" />;

//   return (
//     <section className="relative w-full bg-white h-auto lg:h-[calc(100vh-76px)] min-h-[650px] flex items-center overflow-hidden py-10 lg:py-0">
      
//       {/* Container 1600px tanpa padding horizontal di LG ke atas */}
//       <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-0">
//         <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-10 lg:gap-12 2xl:gap-16 items-center h-full">
          
//           {/* LEFT COLUMN: Clean Editorial Copy */}
//           <motion.div 
//             className="w-full lg:col-span-7 xl:col-span-6 flex flex-col items-start lg:pl-12 xl:pl-16"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <motion.div variants={fadeUpVariants} className="w-full">
//               <h1 className="font-style font-semibold text-[3.25rem] leading-[1.05] sm:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] text-dark tracking-tight">
//                 {dict.hero?.titlePrefix ?? 'Peluang Kerja'} <br />
//                 <span className="text-blue">{dict.hero?.titleHighlight ?? 'Luar Negeri'}</span>
//               </h1>
//             </motion.div>

//             <motion.p variants={fadeUpVariants} className="mt-5 lg:mt-6 font-text text-base sm:text-lg xl:text-xl text-slate-500 max-w-xl leading-relaxed">
//               {dict.hero?.subtitle ?? 'PT Limpah Luhur Lumintu (Lumintu Global) menjembatani kandidat Indonesia untuk program Skilled dan General Worker ke Jepang, Jerman, dan Timur Tengah. Penempatan transparan, terlatih, dan berizin resmi.'}
//             </motion.p>

//             <motion.div variants={fadeUpVariants} className="mt-8 lg:mt-10 w-full max-w-lg flex flex-col sm:flex-row gap-3 sm:gap-4">
//               <Link
//                 href={`/${lang}/peluang-kerja/skilled`}
//                 className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-blue text-white font-text font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-95 shadow-md shadow-blue/10"
//               >
//                 <span>{dict.hero?.ctaSkilled ?? 'Skilled Worker Program'}</span>
//                 <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" />
//               </Link>
              
//               <Link
//                 href={`/${lang}/peluang-kerja/general`}
//                 className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-green text-dark font-text font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-95 shadow-md shadow-green/10"
//               >
//                 <span>{dict.hero?.ctaGeneral ?? 'General Worker Program'}</span>
//                 <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" />
//               </Link>
//             </motion.div>

//             <motion.div variants={fadeUpVariants} className="mt-10 lg:mt-12 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6 border-t border-slate-100 pt-6 lg:pt-8 w-full max-w-2xl">
//               {[
//                 dict.hero?.trustPoints?.noBrokers ?? '100% Transparan & Bebas Calo',
//                 dict.hero?.trustPoints?.integratedTraining ?? 'Fasilitas Pelatihan Terpadu',
//                 dict.hero?.trustPoints?.officialPlacement ?? 'Izin Penempatan Resmi'
//               ].map((point, index) => (
//                 <div key={index} className="flex items-center gap-2.5 text-slate-700 font-text text-[13px] sm:text-sm font-semibold">
//                   <CheckCircle2 className="w-4 h-4 text-green shrink-0" strokeWidth={2.5} />
//                   <span>{point}</span>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>

//           {/* RIGHT COLUMN: Minimalist Arch Layout */}
//           <motion.div 
//             className="w-full lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end items-center lg:pr-12 xl:pr-16"
//             variants={imageRevealVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {/* 
//               Tinggi dibatasi (max-h-[70vh]) agar tidak menabrak batas layar vertikal 
//               saat ukuran section dikunci di 100vh 
//             */}
//             <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] h-[55vh] lg:h-[65vh] max-h-[700px]">
              
//               <div className="absolute top-4 -right-4 lg:top-6 lg:-right-6 w-full h-full bg-blue/5 border border-blue/10 rounded-t-[180px] lg:rounded-t-[240px] rounded-b-[40px] -z-10" />
              
//               <div className="relative w-full h-full overflow-hidden rounded-t-[180px] lg:rounded-t-[240px] rounded-b-[40px] shadow-sm">
//                 <Image
//                   src="/images/hero-lumintu.jpg"
//                   alt="Lumintu Global Professional Placement"
//                   fill
//                   priority
//                   className="object-cover object-center"
//                   sizes="(max-width: 1024px) 100vw, 50vw"
//                 />
//               </div>

//             </div>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe2, ShieldCheck, BadgeCheck } from 'lucide-react';

interface HeroProps {
  lang: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const imageRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
  }
};

// Variants untuk Benefit Melayang yang sangat tipis dan subtle
const floatingVariants1: Variants = {
  hidden: { opacity: 0, x: -20, y: 10 },
  visible: { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, delay: 0.7 } 
  }
};

const floatingVariants2: Variants = {
  hidden: { opacity: 0, x: 20, y: -10 },
  visible: { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, delay: 0.9 } 
  }
};

export default function Hero({ lang, dict }: HeroProps) {
  if (!dict || !dict.hero) return <section className="h-[80vh] w-full bg-white" />;

  return (
    <section className="relative w-full bg-blue/10 h-auto lg:h-[calc(100vh-76px)] min-h-[650px] flex items-center overflow-hidden py-10 lg:py-0">
      
      {/* Container 1600px tanpa padding di LG ke atas */}
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-0">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-20 items-center h-full">
          
          {/* LEFT COLUMN: Clean Editorial Copy */}
          <motion.div 
            className="w-full lg:col-span-7 xl:col-span-6 flex flex-col items-start lg:pl-12 xl:pl-16 2xl:pl-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Headline with Plus Jakarta Sans */}
            <motion.div variants={fadeUpVariants} className="w-full">
              <h1 className="font-style font-semibold text-[3rem] sm:text-6xl lg:text-[4.25rem] xl:text-[5.25rem] text-dark tracking-tight leading-[1.05]">
                {dict.hero?.titlePrefix ?? 'Peluang Kerja'} <br />
                <span className="text-blue">{dict.hero?.titleHighlight ?? 'Luar Negeri'}</span>
              </h1>
            </motion.div>

            {/* Subtitle (Copywriting Optimal untuk SEO/GEO/AEO)[cite: 1] */}
            <motion.p variants={fadeUpVariants} className="mt-5 lg:mt-6 font-text text-base sm:text-lg xl:text-xl text-slate-500 max-w-xl leading-relaxed">
              {dict.hero?.subtitle ?? 'PT Limpah Luhur Lumintu (Lumintu Global) menjembatani kandidat Indonesia untuk program Skilled dan General Worker ke Jepang, Jerman, dan Timur Tengah. Penempatan transparan, terlatih, dan berizin resmi.'}
            </motion.p>

            {/* Actions: Clean Pill Buttons */}
            <motion.div variants={fadeUpVariants} className="mt-8 lg:mt-10 w-full max-w-lg flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href={`/${lang}/peluang-kerja/skilled`}
                className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-blue text-white font-text font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-95 shadow-md shadow-blue/10"
              >
                <span>{dict.hero?.ctaSkilled ?? 'Skilled Worker Program'}</span>
                <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href={`/${lang}/peluang-kerja/general`}
                className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-green text-dark font-text font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-95 shadow-md shadow-green/10"
              >
                <span>{dict.hero?.ctaGeneral ?? 'General Worker Program'}</span>
                <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Trust Markers */}
            {/* <motion.div variants={fadeUpVariants} className="mt-10 lg:mt-12 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6 border-t border-slate-100 pt-6 lg:pt-8 w-full max-w-2xl">
              {[
                dict.hero?.trustPoints?.noBrokers ?? '100% Transparan & Bebas Calo',
                dict.hero?.trustPoints?.integratedTraining ?? 'Fasilitas Pelatihan Terpadu',
                dict.hero?.trustPoints?.officialPlacement ?? 'Izin Penempatan Resmi'
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2.5 text-slate-700 font-text text-[13px] sm:text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-green shrink-0" strokeWidth={2.5} />
                  <span>{point}</span>
                </div>
              ))}
            </motion.div> */}
          </motion.div>

          {/* RIGHT COLUMN: Modern Arch Image with Subtly Floating Aligned Benefits */}
          <motion.div 
            className="w-full lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end items-center lg:pr-12 xl:pr-16 2xl:pr-20 relative"
            variants={imageRevealVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Visual Container */}
            <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] h-[55vh] lg:h-[65vh] max-h-[700px]">
              
              {/* Subtle Offset Shadow/Border */}
              <div className="absolute top-4 -right-4 lg:top-6 lg:-right-6 w-full h-full bg-blue/5 border border-blue/10 rounded-t-[180px] lg:rounded-t-[240px] rounded-b-[40px] -z-10" />
              
              {/* Aspirational Collage Image Masked in Arch[cite: 5] */}
              <div className="relative w-full h-full overflow-hidden rounded-t-[180px] lg:rounded-t-[240px] rounded-b-[40px] shadow-sm">
                <Image
                  src="/images/global-worker.webp" // Menggunakan visual cinematic "dream jobs overseas" (image_6.png)
                  alt="Ragam karir impian di luar negeri bersama Lumintu Global"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* 
                ✨ FLOATING BENEFIT 1: Gaji & Proteksi (Kiri Atas)
                Sangat subtle, datar (border tipis), semi-transparan, tanpa shadow tebal/AI-slop.
              */}
              <motion.div 
                variants={floatingVariants1}
                className="absolute top-1/4 -left-6 sm:-left-12 z-20 flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/85 shadow-sm"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue/5 text-blue shrink-0">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Standar Gaji Global</p>
                  <p className="text-xs font-bold text-dark mt-1 leading-none">IDR 15jt - 35jt+ / Bulan</p>
                </div>
              </motion.div>

              {/* 
                ✨ FLOATING BENEFIT 2: Legalitas Jaminan Kerja (Kanan Bawah)
                Subtle & Aligned di sudut luar arch.
              */}
              <motion.div 
                variants={floatingVariants2}
                className="absolute bottom-16 -right-4 lg:-right-8 z-20 flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/85 shadow-sm"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-green/10 text-dark shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5 text-green" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Proteksi Legal Penuh</p>
                  <p className="text-xs font-bold text-dark mt-1 leading-none">BP2MI & Kemnaker Resmi</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}