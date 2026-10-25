import { getDictionary, type Locale } from '@/dictionaries/get-dictionary';
import AboutClient from '@/components/pages/AboutClient';

type PageProps = {
  params: Promise<{ lang: string }> | { lang: string };
};

export async function generateMetadata(props: PageProps) {
  const resolvedParams = await props.params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'id';
  
  return {
    title: lang === 'id' ? 'Tentang Kami | Lumintu Global' : 'About Us | Lumintu Global',
    description: lang === 'id' 
      ? 'Profil PT Limpah Luhur Lumintu, visi misi, legalitas Kemenaker & BP2MI, serta kemitraan dengan Kadin Kabupaten Sukabumi.'
      : 'Profile of PT Limpah Luhur Lumintu, vision & mission, legalities, and partnership with Kadin Sukabumi.',
  };
}

export default async function AboutPage(props: PageProps) {
  const resolvedParams = await props.params;
  const lang = (resolvedParams.lang || 'id') as Locale;
  const dict = await getDictionary(lang);

  return <AboutClient lang={lang} dict={dict} />;
}