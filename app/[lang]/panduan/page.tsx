import { getDictionary, type Locale } from '@/dictionaries/get-dictionary';
import GuideClient from '@/components/pages/GuideClient';

type PageProps = {
  params: Promise<{ lang: string }> | { lang: string };
};

export async function generateMetadata(props: PageProps) {
  const resolvedParams = await props.params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'id';
  
  return {
    title: lang === 'id' ? 'Panduan Proses | Lumintu Global' : 'Process Guide | Lumintu Global',
    description: lang === 'id' 
      ? 'Pelajari alur kerja, persyaratan dokumen, dan transparansi biaya penempatan Lumintu Global.'
      : 'Learn the workflow, document requirements, and cost transparency of Lumintu Global placements.',
  };
}

export default async function GuidePage(props: PageProps) {
  const resolvedParams = await props.params;
  const lang = (resolvedParams.lang || 'id') as Locale;
  const dict = await getDictionary(lang);

  return <GuideClient lang={lang} dict={dict} />;
}