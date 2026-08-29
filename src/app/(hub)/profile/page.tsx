import { pageMetadata } from '@/lib/seo'
import { ProfilePanel } from '@/components/profile/ProfilePanel'

export const metadata = pageMetadata({
  title: 'Профіль',
  description: 'Локальний профіль користувача: прогрес, експорт та імпорт JSON.',
  path: '/profile',
  robots: { index: false, follow: true },
})

export default function ProfilePage() {
  return <ProfilePanel />
}
