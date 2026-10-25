'use client';

import { motion, Variants } from 'framer-motion';

interface Step {
  num: string;
  title: string;
  desc: string;
}

interface RoadmapDict {
  badge: string;
  title: string;
  subtitle: string;
  steps: Step[];
}

interface PlacementRoadmapProps {
  lang: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function PlacementRoadmap({ dict }: PlacementRoadmapProps) {
  if (!dict?.placementRoadmap) return null;

  const pr = dict.placementRoadmap as RoadmapDict;

  return (
    <section className="w-full bg-white py-20 lg:py-32">
      {/* Memori Layout: max-w-[1600px] dengan presisi inner padding */}
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-0">
        <div className="w-full lg:px-12 xl:px-16 2xl:px-20">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-16 lg:mb-24">
            <motion.div 
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-[10px] font-text font-bold text-slate-500 tracking-widest uppercase mb-6"
            >
              {pr.badge}
            </motion.div>
            
            <motion.h2 
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="font-style font-semibold text-4xl sm:text-5xl lg:text-6xl text-dark tracking-tight mb-5"
            >
              {pr.title}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-text text-base lg:text-lg text-slate-500 leading-relaxed"
            >
              {pr.subtitle}
            </motion.p>
          </div>

          {/* Roadmap Grid (4 Kolom) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-12">
            {pr.steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col"
              >
                {/* Garis Timeline (Tampil sebagai garis penghubung di Desktop) */}
                <div className="hidden xl:block absolute top-0 left-0 w-full h-[1px] bg-slate-200" />
                
                {/* Nomor Raksasa (Oversized Typography) */}
                <div className="pt-6 xl:pt-8 mb-6">
                  <span className="font-style font-semibold text-5xl lg:text-6xl text-slate-200 tracking-tighter">
                    {step.num}
                  </span>
                </div>

                {/* Konten Tahapan */}
                <h3 className="font-style font-semibold text-2xl text-dark mb-4">
                  {step.title}
                </h3>
                <p className="font-text text-sm sm:text-base text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}