import { Label } from '@/components/ui/label'
import { RefAttributes } from 'react'
import tw from 'tailwind-styled-components'

/*

Service Location Panel

*/

const SL_Container = tw.div`
  grid grid-cols-4
`

const Title = tw.div`
  font-bold
`

const Description = tw.div`
  text-xs text-muted-foreground
`

const InputLabel = tw(Label)<RefAttributes<HTMLLabelElement>>`
  tracking-wide text-xs text-stone-500 font-bold uppercase 
`

export { Description, InputLabel, SL_Container, Title }
