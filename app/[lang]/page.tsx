
import { getDictionary, type Locale } from '@/dictionaries/get-dictionary';
import destinationsData from '@/data/destinations.json';
import Hero from '@/components/home/Hero';
import TrackSplitter from '@/components/home/TrackSplitter';
import JobRadar from '@/components/home/JobRadar';
import PlacementRoadmap from '@/components/home/PlacementRoadmap';
import Faq from '@/components/home/Faq';


export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string };
}) {
  // Resolving params untuk Next.js 15+ (Params berbentuk Promise)
  const resolvedParams = await params;
  const lang = (resolvedParams.lang || 'id') as Locale;
  const dict = await getDictionary(lang);

  // Mapping data JSON "Database" agar sesuai dengan bahasa yang aktif (ID/EN)
  const localizedDestinations = destinationsData.map((dest) => ({
    id: dest.id,
    image: dest.image,
    track: dest.track,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(dest.translations as Record<string, any>)[lang],
  }));

  return (
    <div className="flex flex-col w-full">
      <Hero lang={lang} dict={dict} />
      <TrackSplitter lang={lang} dict={dict} />
      <JobRadar lang={lang} dict={dict} destinations={localizedDestinations} />
      <PlacementRoadmap lang={lang} dict={dict} /> 
      <Faq lang={lang} dict={dict} /> 
    </div>
  );
}