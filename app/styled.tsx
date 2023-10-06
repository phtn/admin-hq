import tw from 'tailwind-styled-components'

const Backdrop = tw.div`
  opacity-100] flex h-[calc(100vh-64px)] w-full bg-[url("/images/polygrid-v2.svg")] opacity-50 hover:opacity-25 bg-cover overflow-hidden transition-all duration-1000 transform-gpu
`

const Blur = tw.div`
  flex-1 backdrop-blur-3xl bg-transparent h-full overflow-hidden items-center justify-center z-10
`
const Body = tw.div`
  flex-1 w-full transition-all transform-gpu duration-1000 top-16 absolute z-10 overflow-hidden
`

export { Backdrop, Blur, Body }
