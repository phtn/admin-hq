import tw from 'tailwind-styled-components'

const BrandContainer = tw.div`
  w-20
  flex
  items-center
  border-r-stone-800
  border-r-[0.33px]
`

const Container = tw.div`
  flex
  w-full
  items-center
  justify-between
  h-16
  backdrop-blur-3xl
  bg-transparent
  top-0
  z-50
  pr-4
  border-b-[.33px]
  border-stone-800
  sticky
`

const MenubarContainer = tw.div`
  flex
  scale-0
  w-0
  lg:scale-100
  lg:w-full
  transition-all
  duration-500
  items-center
  justify-center
`

export { BrandContainer, Container, MenubarContainer }
