import { getDictionary, type Locale } from '@/dictionaries/get-dictionary';
import TermsClient from './TermsClient';

type PageProps = {
  params: Promise<{ lang: string }> | { lang: string };
};

export async function generateMetadata(props: PageProps) {
  const resolvedParams = await props.params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'id';
  return { title: lang === 'id' ? 'Syarat & Ketentuan | Lumintu Global' : 'Terms & Conditions | Lumintu Global' };
}

export default async function TermsPage(props: PageProps) {
  const resolvedParams = await props.params;
  const lang = (resolvedParams.lang || 'id') as Locale;
  const dict = await getDictionary(lang);
  return <TermsClient dict={dict} />;
}