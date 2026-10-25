import { getDictionary, type Locale } from '@/dictionaries/get-dictionary';
import destinationsData from '@/data/destinations.json';
import JobListClient from '@/components/pages/JobListClient';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'id';
  
  return {
    title: lang === 'id' ? 'Daftar Lowongan Kerja Luar Negeri | Lumintu Global' : 'Overseas Job Listings | Lumintu Global',
    description: lang === 'id' 
      ? 'Eksplorasi peluang kerja resmi ke Jepang, Jerman, Timur Tengah, dan Malaysia.'
      : 'Explore official job opportunities to Japan, Germany, Middle East, and Malaysia.',
  };
}

// Interface Type-Safe
interface JobTranslation {
  country: string;
  program: string;
  salary: string;
  radarDesc: string;
}

interface DestinationData {
  id: string;
  track: 'skilled' | 'general';
  image: string;
  translations: {
    id: JobTranslation;
    en: JobTranslation;
  };
}

export default async function JobListPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang || 'id') as Locale;
  const dict = await getDictionary(lang);

  const destinations = destinationsData as DestinationData[];

  // 1. Ekstrak data sesuai bahasa
  const localizedJobs = destinations.map((dest) => ({
    id: dest.id,
    image: dest.image,
    track: dest.track,
    ...dest.translations[lang],
  }));

  // 2. Oper ke Client Component
  return <JobListClient lang={lang} dict={dict} jobs={localizedJobs} />;
}