import { getDictionary, type Locale } from '@/dictionaries/get-dictionary';
import destinationsData from '@/data/destinations.json';
import ProgramClient from '@/components/pages/ProgramClient';

type PageProps = {
  params: Promise<{ lang: string }> | { lang: string };
};

export async function generateMetadata(props: PageProps) {
  const resolvedParams = await props.params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'id';
  return { title: lang === 'id' ? 'Skilled Worker Program | Lumintu Global' : 'Skilled Worker Program' };
}

export default async function SkilledJobPage(props: PageProps) {
  const resolvedParams = await props.params;
  const lang = (resolvedParams.lang || 'id') as Locale;
  const dict = await getDictionary(lang);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const destinations = destinationsData as any[];
  const localizedJobs = destinations
    .filter((dest) => dest.track === 'skilled') // FILTER HANYA SKILLED
    .map((dest) => ({
      id: dest.id,
      image: dest.image,
      track: dest.track,
      ...dest.translations[lang],
    }));

  return <ProgramClient lang={lang} dict={dict} type="skilled" jobs={localizedJobs} />;
}