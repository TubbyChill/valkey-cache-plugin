import { LoginPage } from '@/components/pages/login'

export default function Page({ params }: { params: { lang: string } }) {
  return <LoginPage lang={params.lang} />
} 