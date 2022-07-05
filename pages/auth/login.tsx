import {useState,useContext,createContext} from 'react' 
import { useRouter } from 'next/router'

import {FcGoogle} from 'react-icons/fc'

//importing the chakra Ui components
import { Text } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Auth } from '../../context/AuthContext'

//importing ant design components
import { SmileOutlined,CheckOutlined } from '@ant-design/icons';
import { notification } from 'antd';

//importing react query client
import {useMutation} from 'react-query'

import axios from "axios"
import { message } from '../../node_modules/antd/lib/index'
import { createUser } from '../../services/api'

import { UserContext } from '../../context/UserContext'

const Login = ()=>{

    const [show, setShow] = useState(true)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')

    const router = useRouter()

    const {setUser} = useContext(UserContext)


    
    const { mutate:addUser } = useMutation(["add-user"],createUser,{
        onSuccess: (res) => {
            message.success("Registered",3)
            setUser(res.data.id)
            localStorage.setItem("user",res.data.id)
            
        }
    })
    
    
    const handelSignUp = (e) => {
        e.preventDefault()   
        const newUser :any = {"firstName":firstName,"lastName":lastName,"email":email} 
        addUser(newUser)
        clear()
        router.push("/account")
        

    }

    // const handelLogIn = (e) =>{
    //     e.preventDefault()   
    //     login(email,password)
    //     message.success("Logged In ",3)
    //     router.push('/account')
    // }
    
    const clear = ()=>{
        setEmail("")
        setFirstName("")
        setPassword("")
        setLastName("")
        
    }
 

    return(
        <div className='w-[100%] h-[100vh] flex flex-col gap-y-7 justify-center items-center bg-[#FAFAFA]'>
            <div className=' w-[80%] sm:w-[60%] m:w-[40%] lg:w-[23%] rounded-lg py-6 px-5 border-[1px] border-black-100 bg-[#FFFFFF]'>
                    <div className='flex justify-center items-center border-[1px] rounded-lg border-[#efefef] py-4 my-2 gap-x-2'>
                        <FcGoogle/>
                        <h1 className='text-[10px] font-bold'>Sign In with Google</h1>
                    </div>
                    
                    <h1 className='text-center text-slate-300'>or</h1>

                    <div className='py-1 flex flex-col gap-x-5'>
                        <form action="">
                                {
                                    show
                                    ?
                                    <>
                                        <div>
                                            <h1 className='font-bold mx-[4px] my-2 text-[#111111] '>FirstName</h1>
                                            <Input className='bg-[#F5F5F5] border-[#C8C8C8]' value = {firstName} onChange = {(e) => setFirstName(e.target.value)} focusBorderColor="#42db6b" variant='filled' placeholder='Username' size='lg' />
                                        </div>
                                        <div>
                                            <h1 className='font-bold mx-[4px] my-2 text-[#111111] '>LastName</h1>
                                            <Input className='bg-[#F5F5F5] border-[#C8C8C8]' value = {lastName} onChange = {(e) => setLastName(e.target.value)} focusBorderColor="#42db6b" variant='filled' placeholder='Username' size='lg' />
                                        </div>
                                    </>
                                    : null
                                }   
                            <div>
                                <h1 className='font-bold mx-[4px] my-2 text-[#111111] '>Email</h1>
                                <Input className='bg-[#F5F5F5] border-[#C8C8C8]' value = {email} onChange = {(e) => setEmail(e.target.value)} focusBorderColor="#42db6b" variant='filled' placeholder='Email' size='lg' />
                            </div>
                            <div>
                                <h1 className='font-bold mx-[4px] my-2 text-[#111111] '>Password</h1>
                                <Input className='bg-[#F5F5F5] border-[#C8C8C8]'  value = {password}   onChange = {(e) => setPassword(e.target.value)}  focusBorderColor="#42db6b" variant='filled' placeholder='Password' size='lg' />
                            </div>
                        </form>
                    </div>

                    <div>
                            {
                                show 
                                ? <Button className="w-[100%] my-7 bg-[#06C755]" size="lg" colorScheme="" variant='solid' onClick ={handelSignUp}>Create Profile</Button> 
                                : <Button className="w-[100%] my-7 bg-[#06C755]" size="lg" colorScheme="" variant='solid'>LogIn</Button>
                            }    
                    </div>
{/* 
                    <div className='m-1'>
                        <h1 className='text-center font-bold text-[#111111] cursor-pointer'>Forget Password?</h1>
                    </div> */}
            </div>

            {/* <div>
                {
                    show
                    ?
                    <h1 className='font-bold'><span className='text-[#06C755] underline cursor-pointer' onClick={()=>setShow(!show)}> To login click here</span></h1>
                    :
                    <h1 className='font-bold'>No Account? <span className='text-[#06C755] underline cursor-pointer'> Sign Up</span></h1>

                }
            </div> */}
        </div>
    )
}

export default Login