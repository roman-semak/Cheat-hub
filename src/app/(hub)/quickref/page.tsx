import { quickRefContent } from '@/lib/cheatsheet/quickref'
import { QuickRefView } from '@/components/cheatsheet/QuickRefView'

export default function Page() {
  return <QuickRefView content={quickRefContent} />
}
