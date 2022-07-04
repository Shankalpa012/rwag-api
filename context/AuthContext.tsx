import {createContext,useContext,useEffect,useState} from 'react'
import {getAuth,onAuthStateChanged,signInWithEmailAndPassword,createUserWithEmailAndPassword  } from 'firebase/auth'
import {auth} from '../config'

//this is creating the context for auth
const authContext = createContext({})
export const Auth = () => useContext <any> (authContext)

//this is to provide auth parameter to check the auth state

export const AuthContextProvider = ({children}) =>{

    const [user,setUser] = useState <any>(null) 
    const [loading,setLoading] = useState(true)

    useEffect(()=>{

        const unsubscribe = onAuthStateChanged(auth,(user) =>{
            if(user){
                setUser({
                    id:user.uid,
                    email:user.email,
                })
            }else{
                setUser(null)
            }
        })
        setLoading(false)

        return unsubscribe()

    },[])


    const signUp = (email:string,password:string) => {
        return createUserWithEmailAndPassword(auth,email,password)
    } 


    const login = (email:string,password:string) => {   
        return signInWithEmailAndPassword(auth,email,password)
    }

    return (
        <authContext.Provider value = { { user,signUp,login } }> { loading ? null : children} </authContext.Provider>
    )
}