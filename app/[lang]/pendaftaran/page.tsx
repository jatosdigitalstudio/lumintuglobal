import { getDictionary, type Locale } from '@/dictionaries/get-dictionary';
import destinationsData from '@/data/destinations.json';
import RegistrationClient from '@/components/pages/RegistrationClient';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ lang: string }> | { lang: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(props: PageProps) {
  const resolvedParams = await props.params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'id';
  
  return {
    title: lang === 'id' ? 'Pendaftaran | Lumintu Global' : 'Registration | Lumintu Global',
  };
}

export default async function RegistrationPage(props: PageProps) {
  const resolvedParams = await props.params;
  const resolvedSearchParams = await props.searchParams;
  
  const lang = (resolvedParams.lang || 'id') as Locale;
  const dict = await getDictionary(lang);
  
  const jobId = typeof resolvedSearchParams.job === 'string' ? resolvedSearchParams.job : null;

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