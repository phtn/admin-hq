import { FormItem, FormLabel } from '@/components/ui/form'
import { Settings2Icon } from 'lucide-react'
import tw from 'tailwind-styled-components'

const FieldItem = tw(FormItem)`
  flex flex-row items-center justify-between border p-4
`

const FieldLabel = tw(FormLabel)`
  text-lg font-bold items-center flex
`

const FormContainer = tw.div`
  space-y-4
`

const HeaderTitle = tw.h3`
  text-xs text-stone-500 font-medium tracking-wider uppercase
`

const iconStyle = 'h-[20px] fill-stone-100 text-stone-500 mx-3 stroke-1'

const Tweak = tw(Settings2Icon)`
  ${(_) => iconStyle}
`

export { FieldItem, FieldLabel, FormContainer, HeaderTitle, Tweak }
