import { notFound } from 'next/navigation';
import destinationsData from '@/data/destinations.json';
import JobDetailClient from '@/components/pages/JobDetailClient';

// 1. Definisi TypeScript Interfaces yang Ketat (Membasmi 'any')
interface JobTranslation {
  country: string;
  program: string;
  salary: string;
  radarDesc: string;
  title: string;
  location: string;
  jobDescription: string;
  requirements: string[];
  benefits: string[];
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

// Type Casting data JSON ke Interface
const destinations = destinationsData as DestinationData[];

// Generate static routes saat build time
export async function generateStaticParams() {
  const paths: { lang: string; id: string }[] = [];
  destinations.forEach((dest) => {
    paths.push({ lang: 'id', id: dest.id });
    paths.push({ lang: 'en', id: dest.id });
  });
  return paths;
}

// Generate Metadata untuk SEO secara dinamis
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string; id: string }> 
}) {
  const resolvedParams = await params;
  const { lang, id } = resolvedParams;
  
  const rawJob = destinations.find((dest) => dest.id === id);
  if (!rawJob) return { title: 'Not Found' };
  
  const jobTitle = rawJob.translations[lang as 'id' | 'en']?.title || 'Lowongan';
  
  return {
    title: `${jobTitle} | Lumintu Global`,
    description: `Peluang kerja ${jobTitle} resmi melalui Lumintu Global.`,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as 'id' | 'en';
  const { id } = resolvedParams;

  // Cari data lowongan
  const rawJob = destinations.find((dest) => dest.id === id);
  if (!rawJob) notFound(); 

  // Ekstrak terjemahan sesuai bahasa yang dipilih tanpa error tipe data
  const job = {
    id: rawJob.id,
    image: rawJob.image,
    track: rawJob.track,
    ...rawJob.translations[lang],
  };

  // Oper data ke Client Component
  return <JobDetailClient lang={lang} job={job} />;
}