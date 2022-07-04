import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { createContext, useState } from 'react'
import {Hydrate,QueryClientProvider,QueryClient} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import {AuthContextProvider} from '../context/AuthContext'
import {UserContext} from "../context/UserContext"


function MyApp({ Component, pageProps }) {

  const [queryClient] = useState(()=> new QueryClient())
  const [user, setUser] = useState("")


  // const dispatchUserEvent= (actionType,payload) =>{
  //   switch(actionType){
  //     case "New_User":
  //       setNewUser(payload)
  //       return
  //   }
  // }


  return (
      <UserContext.Provider value ={{user,setUser}}>     
      <QueryClientProvider client = {queryClient} >
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen ={false} position="bottom-right"/>
      </QueryClientProvider>
      </UserContext.Provider>
  )
}

export default MyApp