import { getDictionary, type Locale } from '@/dictionaries/get-dictionary';
import ContactClient from '@/components/pages/ContactClient';

type PageProps = {
  params: Promise<{ lang: string }> | { lang: string };
};

export async function generateMetadata(props: PageProps) {
  const resolvedParams = await props.params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'id';
  
  return {
    title: lang === 'id' ? 'Hubungi Kami | Lumintu Global' : 'Contact Us | Lumintu Global',
    description: lang === 'id' 
      ? 'Hubungi tim Lumintu Global atau kunjungi kantor pusat kami di Sukabumi untuk konsultasi gratis.'
      : 'Contact the Lumintu Global team or visit our head office in Sukabumi for a free consultation.',
  };
}

export default async function ContactPage(props: PageProps) {
  const resolvedParams = await props.params;
  const lang = (resolvedParams.lang || 'id') as Locale;
  const dict = await getDictionary(lang);

  return <ContactClient lang={lang} dict={dict} />;
}