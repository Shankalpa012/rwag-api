import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react'
import {Hydrate,QueryClientProvider,QueryClient} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'


function MyApp({ Component, pageProps }) {

  const [queryClient] = useState(()=> new QueryClient())


  return (
      <QueryClientProvider client = {queryClient} >
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen ={false} position="bottom-right"/>
      </QueryClientProvider>
  )
}

export default MyApp