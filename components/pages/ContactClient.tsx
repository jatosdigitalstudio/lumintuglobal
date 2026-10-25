'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface ContactClientProps {
  lang: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}

export default function ContactClient({ lang, dict }: ContactClientProps) {
  const ct = dict?.contact;
  if (!ct) return null;

  return (
    <div className="w-full bg-white flex flex-col">
      
      <section className="w-full bg-[#0f172a] pt-24 pb-20 lg:pt-32 lg:pb-32 relative overflow-hidden rounded-b-[2.5rem] lg:rounded-b-[4rem] z-10 shadow-sm">
        <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* KIRI: Editorial Typography (Konten Utama) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex flex-col pt-4 lg:pt-8"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue/10 border border-blue/20 text-[10px] font-bold text-blue tracking-widest uppercase mb-8 lg:mb-12 self-start">
                <MapPin className="w-3.5 h-3.5" />
                {ct.badge}
              </div>
              
              <h1 className="font-style font-semibold text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] mb-8">
                {ct.title}
              </h1>
              
              <p className="font-text text-lg sm:text-xl text-slate-400 leading-relaxed max-w-lg mb-12">
                {ct.subtitle}
              </p>

              {/* Rincian Kontak (Sleek List) */}
              <div className="flex flex-col gap-10 mt-4">
                
                {/* Email */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-blue group-hover:border-blue group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-text text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{ct.info.emailTitle}</h3>
                    <a href={`mailto:${ct.info.email}`} className="font-text text-xl sm:text-2xl text-white font-medium hover:text-blue transition-colors">
                      {ct.info.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-green group-hover:border-green group-hover:text-dark transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-text text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{ct.info.phoneTitle}</h3>
                    <a href={`tel:${ct.info.phone.replace(/[^0-9]/g, '')}`} className="font-text text-xl sm:text-2xl text-white font-medium hover:text-green transition-colors">
                      {ct.info.phone}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-text text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{ct.info.addressTitle}</h3>
                    <p className="font-text text-lg sm:text-xl text-white font-medium max-w-[280px] leading-snug">
                      {ct.info.address}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* KANAN: Embed Google Maps */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 w-full h-[400px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-slate-800 border border-white/10 relative"
            >
              {/* Note: Iframe ini menggunakan koordinat umum Kabupaten Sukabumi. Nanti bisa diganti dengan link Embed Gmaps spesifik kantor aslinya */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d106.84559895!3d-6.9174639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68482084c8a24b%3A0xc3f7a421b4a3a697!2sKabupaten%20Sukabumi%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="filter contrast-125 saturate-50"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Pendukung Bawah */}
      <section className="w-full bg-white py-16 lg:py-24">
        <div className="w-full max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20 text-center flex flex-col items-center">
          <p className="font-text text-base lg:text-lg text-slate-500 max-w-lg mb-8">
            {ct.cta}
          </p>
          <Link 
            href={`/${lang}/pendaftaran`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green text-dark font-text font-bold text-sm hover:scale-[1.02] active:scale-95 transition-transform"
          >
            <span>{lang === 'id' ? 'Daftar Sekarang' : 'Register Now'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}