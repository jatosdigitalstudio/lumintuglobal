'use client';

import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';

interface TermsSection {
  title: string;
  content: string;
}

interface TermsClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}

export default function TermsClient({ dict }: TermsClientProps) {
  const content = dict?.legal?.terms;
  if (!content) return null;

  return (
    <div className="w-full bg-slate-50 min-h-screen pt-24 pb-32 lg:pt-32">
      <div className="w-full max-w-3xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue/10 text-blue font-text text-[10px] font-bold uppercase tracking-widest mb-6">
            <Scale className="w-3.5 h-3.5" /> Legal
          </div>
          <h1 className="font-style font-semibold text-4xl sm:text-5xl text-dark tracking-tight mb-4">{content.title}</h1>
          <p className="font-text text-slate-500 text-sm">{content.lastUpdated}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white p-8 sm:p-12 rounded-[2rem] shadow-sm border border-slate-200">
          <div className="flex flex-col gap-10">
            {content.sections.map((sec: TermsSection, idx: number) => (
              <div key={idx}>
                <h2 className="font-text font-bold text-xl text-dark mb-3">{sec.title}</h2>
                <p className="font-text text-base text-slate-600 leading-relaxed">{sec.content}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}