import { SignupPage } from '@/components/pages/signup'

export default function Page({ params }: { params: { lang: string } }) {
  return <SignupPage lang={params.lang} />
} 