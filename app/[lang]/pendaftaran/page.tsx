import { Suspense } from 'react';
import { getDictionary, type Locale } from '@/dictionaries/get-dictionary';
import RegistrationClient from '@/components/pages/RegistrationClient';

type PageProps = {
  params: Promise<{ lang: string }> | { lang: string };
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
  const lang = (resolvedParams.lang || 'id') as Locale;
  const dict = await getDictionary(lang);
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] w-full" />}>
      <RegistrationClient lang={lang} dict={dict} />
    </Suspense>
  );
}