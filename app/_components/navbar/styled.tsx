import tw from 'tailwind-styled-components'

const BrandContainer = tw.div`
  w-44
  flex
  items-center
`

const Container = tw.div`
  flex
  w-full
  items-center
  justify-between
  h-16
  backdrop-blur-3xl
  absolute
  top-0
  z-50
  pr-4
  border-b-[.75px]
  border-t-[1.5px]
  border-stone-800
`

const MenubarContainer = tw.div`
  scale-0
  lg:scale-100
  transition-all
  duration-500
`

export { BrandContainer, Container, MenubarContainer }
