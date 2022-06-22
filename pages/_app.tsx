import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react'
import {Hydrate,QueryClientProvider,QueryClient} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'


function MyApp({ Component, pageProps }) {

  const [queryClient] = useState(()=> new QueryClient())


  return (
    <ChakraProvider>
     <QueryClientProvider client = {queryClient} >
        <Hydrate state= {pageProps.dehydratedState}>
            <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen ={false} position="bottom-right"/>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp