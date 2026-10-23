// app/[lang]/page.tsx
import { getDictionary, type Locale } from '@/dictionaries/get-dictionary';
import Hero from '@/components/home/Hero';
import TrackSplitter from '@/components/home/TrackSplitter';
export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string };
}) {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang || 'id') as Locale;
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col w-full">
      <Hero lang={lang} dict={dict} />
      <TrackSplitter lang={lang} dict={dict} />
      
      {/* 
        Section berikutnya akan dirender di bawah Hero:
        <TrustPartners dict={dict} />
        <TrackSplitter lang={lang} dict={dict} />
        <JobRadar lang={lang} dict={dict} />
      */}
    </div>
  );
}