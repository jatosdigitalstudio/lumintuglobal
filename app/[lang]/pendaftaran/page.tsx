import { getDictionary, type Locale } from '@/dictionaries/get-dictionary';
import destinationsData from '@/data/destinations.json';
import RegistrationClient from '@/components/pages/RegistrationClient';

// 1. Buat tipe data Universal untuk mengatasi bentrok versi Next.js 14 vs 15
type PageProps = {
  params: Promise<{ lang: string }> | { lang: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
};

// 2. Metadata SEO juga harus aman
export async function generateMetadata(props: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = await props.params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'id';
  
  return {
    title: lang === 'id' ? 'Pendaftaran | Lumintu Global' : 'Registration | Lumintu Global',
  };
}

export default async function RegistrationPage(props: PageProps) {
  // 3. Await parameter secara aman 
  const resolvedParams = await props.params;
  const resolvedSearchParams = await props.searchParams;
  
  const lang = (resolvedParams.lang || 'id') as Locale;
  const dict = await getDictionary(lang);
  
  // Ambil query "?job=..." dari URL
  const jobId = typeof resolvedSearchParams.job === 'string' ? resolvedSearchParams.job : null;

  // Cari data pekerjaan jika user datang membawa parameter ?job=id
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

  return <RegistrationClient lang={lang} dict={dict} appliedJob={appliedJob} />;
}