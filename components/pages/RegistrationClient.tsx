'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Briefcase, CheckCircle2, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import destinationsData from '@/data/destinations.json';

interface RegistrationClientProps {
  lang: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}

export default function RegistrationClient({ lang, dict }: RegistrationClientProps) {
  // 1. Baca URL parameter secara langsung di client
  const searchParams = useSearchParams();
  const jobId = searchParams?.get('job');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    education: '',
    domicile: '',
  });
  const [agreed, setAgreed] = useState(false);

  const rg = dict?.registration;
  if (!rg) return null;

  // 2. Cari data pekerjaan berdasarkan ID yang didapat dari URL
  let appliedJob = null;
  if (jobId) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawJob = (destinationsData as any[]).find((dest) => dest.id === jobId);
    if (rawJob) {
      appliedJob = {
        title: rawJob.translations[lang]?.title || rawJob.translations['id'].title,
        country: rawJob.translations[lang]?.country || rawJob.translations['id'].country,
      };
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return alert(lang === 'id' ? 'Anda harus menyetujui Syarat & Ketentuan.' : 'You must agree to the Terms & Conditions.');

    const jobTitle = appliedJob ? `${appliedJob.title} (${appliedJob.country})` : 'General / Belum Menentukan';
    
    const message = `${rg.whatsappGreeting}

💼 *DETAIL LAMARAN*
▪️ Posisi: ${jobTitle}

👤 *DATA KANDIDAT*
▪️ Nama Lengkap: ${formData.name}
▪️ Usia: ${formData.age} Tahun
▪️ Pendidikan: ${formData.education}
▪️ Domisili: ${formData.domicile}
▪️ WhatsApp: ${formData.phone}

Saya siap untuk mengikuti tahapan verifikasi dan seleksi selanjutnya. Terima kasih.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${rg.whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const inputClassName = "w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-blue focus:ring-4 focus:ring-blue/10 px-4 py-3.5 rounded-xl font-text text-[15px] text-slate-900 transition-all outline-none placeholder:text-slate-400";

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col pt-12 pb-24 lg:pt-20">
      <div className="w-full max-w-lg mx-auto px-5">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="font-style font-semibold text-4xl sm:text-5xl text-dark tracking-tight mb-3">
            {rg.title}
          </h1>
          <p className="font-text text-[15px] sm:text-base text-slate-500">
            {rg.subtitle}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 sm:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
        >
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue text-white shrink-0 shadow-sm">
              <Briefcase className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col flex-1">
              <span className="font-text text-[10px] font-bold text-blue tracking-widest uppercase mb-0.5">
                {rg.applyingFor}
              </span>
              <span className="font-text font-semibold text-base text-slate-900 leading-tight">
                {appliedJob ? `${appliedJob.title} - ${appliedJob.country}` : (lang === 'id' ? 'Pilih Posisi Nanti' : 'Select Position Later')}
              </span>
            </div>
            {appliedJob && <CheckCircle2 className="w-5 h-5 text-blue shrink-0" />}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <input type="text" required placeholder={rg.fields.name} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={inputClassName} />
            </div>
            <div>
              <input type="tel" required placeholder={rg.fields.phone} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={inputClassName} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="number" required placeholder={rg.fields.age} value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className={inputClassName} />
              <input type="text" required placeholder={rg.fields.education} value={formData.education} onChange={(e) => setFormData({...formData, education: e.target.value})} className={inputClassName} />
            </div>
            <div>
              <input type="text" required placeholder={rg.fields.domicile} value={formData.domicile} onChange={(e) => setFormData({...formData, domicile: e.target.value})} className={inputClassName} />
            </div>

            <div className="flex items-start gap-3 mt-4 mb-2">
              <input type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#0d9488] focus:ring-[#0d9488] cursor-pointer" />
              <label htmlFor="terms" className="font-text text-[13px] sm:text-sm text-slate-500 leading-relaxed cursor-pointer">
                {lang === 'id' ? (
                  <>Saya telah membaca dan menyetujui <Link href={`/${lang}/terms-conditions`} className="text-dark font-semibold hover:text-[#0d9488] transition-colors">Syarat & Ketentuan</Link> serta <Link href={`/${lang}/privacy-policy`} className="text-dark font-semibold hover:text-[#0d9488] transition-colors">Kebijakan Privasi</Link>.</>
                ) : (
                  <>I have read and agree to the <Link href={`/${lang}/terms-conditions`} className="text-dark font-semibold hover:text-[#0d9488] transition-colors">Terms and Conditions</Link> and <Link href={`/${lang}/privacy-policy`} className="text-dark font-semibold hover:text-[#0d9488] transition-colors">Privacy Policy</Link>.</>
                )}
              </label>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-green text-black font-text font-bold text-[15px] hover:bg-blue hover:text-white active:scale-[0.98] transition-all shadow-md shadow-teal-600/20">
              <span>{rg.submit}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}