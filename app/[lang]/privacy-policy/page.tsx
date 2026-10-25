import { getDictionary, type Locale } from '@/dictionaries/get-dictionary';
import PrivacyClient from '@/components/pages/PrivacyClient';


type PageProps = {
  params: Promise<{ lang: string }> | { lang: string };
};

export async function generateMetadata(props: PageProps) {
  const resolvedParams = await props.params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'id';
  return { title: lang === 'id' ? 'Kebijakan Privasi | Lumintu Global' : 'Privacy Policy | Lumintu Global' };
}

export default async function PrivacyPage(props: PageProps) {
  const resolvedParams = await props.params;
  const lang = (resolvedParams.lang || 'id') as Locale;
  const dict = await getDictionary(lang);
  return <PrivacyClient dict={dict} />;
}