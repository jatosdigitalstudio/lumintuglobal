'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Plus, Minus, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqDict {
  badge: string;
  title: string;
  subtitle: string;
  contactCta: string;
  items: FaqItem[];
}

interface FaqProps {
  lang: string;
  dict: { faq: FaqDict };
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Faq({ lang, dict }: FaqProps) {
  // State untuk melacak Accordion mana yang terbuka
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default item pertama terbuka

  if (!dict?.faq) return null;
  const faq = dict.faq;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-blue/10 py-20 lg:py-32">
      {/* Memori Layout: max-w-[1600px] dengan presisi inner padding */}
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-0">
        <div className="w-full lg:px-12 xl:px-16 2xl:px-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* KIRI: Header & Sticky CTA */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <motion.div 
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-[10px] font-text font-bold text-slate-500 tracking-widest uppercase mb-6"
                >
                  {faq.badge}
                </motion.div>
                
                <motion.h2 
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="font-style font-semibold text-4xl sm:text-5xl lg:text-6xl text-dark tracking-tight mb-5"
                >
                  {faq.title}
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-text text-base lg:text-lg text-slate-500 leading-relaxed mb-10"
                >
                  {faq.subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link 
                    href={`/${lang}/kontak`}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 font-text font-semibold text-sm text-dark transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-blue" />
                    {faq.contactCta}
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* KANAN: FAQ Accordion List */}
            <div className="lg:col-span-7">
              <div className="flex flex-col border-t border-slate-200">
                {faq.items.map((item, index) => {
                  const isOpen = openIndex === index;
                  
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border-b border-slate-200"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="flex items-center justify-between w-full py-6 sm:py-8 text-left group focus:outline-none"
                        aria-expanded={isOpen}
                      >
                        <h3 className="font-text font-semibold text-lg sm:text-xl text-dark pr-8 group-hover:text-blue transition-colors">
                          {item.q}
                        </h3>
                        
                        {/* Icon Toggle (Plus/Minus) */}
                        <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-colors duration-300 ${isOpen ? 'border-blue bg-blue/5 text-blue' : 'border-slate-200 text-slate-400 group-hover:border-blue group-hover:text-blue'}`}>
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </button>

                      {/* Animated Answer Body */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pb-8 pr-12">
                              <p className="font-text text-base text-slate-600 leading-relaxed">
                                {item.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}