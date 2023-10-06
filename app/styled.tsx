import tw from 'tailwind-styled-components'

const Backdrop = tw.div`
  opacity-100] flex h-screen bg-[url("/images/polygrid-v2.svg")] opacity-50 hover:opacity-25 bg-cover overflow-hidden transition-all duration-1000 transform-gpu
`

const Blur = tw.div`
  flex-1 backdrop-blur-3xl h-screen overflow-hidden items-center justify-center z-10
`
const Body = tw.div`
  flex-1 w-full h-[90%] hover:bg-background/50 transition-all transform-gpu duration-1000 border-t border-stone-100  top-16 absolute z-10
`

export { Backdrop, Blur, Body }
