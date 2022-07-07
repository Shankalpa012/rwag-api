import Navbar from "../../components/Navbar";
import Comment from "../../components/Comment";

//importing the react query 
import { dehydrate, QueryClient, useQuery } from 'react-query';

//importing axios
import axios from "axios"

//importing react icons data
import {AiOutlineHeart} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
import {BsEmojiSmile} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {FiSend} from 'react-icons/fi'

//importing charkra UI components
import { Spinner } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { PhoneIcon, DeleteIcon,  AddIcon, WarningIcon } from '@chakra-ui/icons'
import { Input,InputGroup,InputLeftElement,InputRightElement,InputRightAddon  } from '@chakra-ui/react'
import { useState,useEffect,useContext } from "react";
import { Auth } from "../../context/AuthContext";
import { getSingleUser, getUserPost } from "../../services/api";
import { UserContext } from "../../context/UserContext";





export default function Home(props) {

  const [color,setColor] = useState(true)
  const [heart,setHeart] =useState(false)
  // const [user,setUser] = useState("")
   // var user 

   const {user} = useContext(UserContext)
  
  const imgData = () =>{
    setColor(false)
    setHeart(true)
  }

  const {data:userData,isLoading} = useQuery(["getUserPost"],() => getUserPost())
  console.log(userData)

  // console.log(data)

  setTimeout(()=>{
    setHeart(false)
  },3000)

  return (
    <>
        <Navbar></Navbar>      
        {
          isLoading
          ?
          <h1>Data is loading</h1>
          :
          <div className="bg-[#FAFAFA]">
          {            
              userData?.data?.map(post => {
                const pic = userData[Math.floor(Math.random() * userData.data.length)]
                
                const { owner } = post

                return(

                    <div key = {post.id} className= 'bg-[#FFFFFF] border rounded-[5px] border-slate-200 lg:w-[40%] sm:w-[60%] w-[90%] mx-auto my-2'>
                      <div className= 'mx-2 p-2'>

                        <div className='flex flex-col flex-y-2'>
                            <div className='flex justify-between items-center px-2 flex-x-5 p-1 '>
                              <div className="flex items-center">
                                <Avatar size ='md' name= {owner.firstName} src={owner?.picture} />
                                <h1 className='mx-4 tracking-wide text-[13.5px] font-medium'>{owner.firstName}{owner.lastName}</h1>
                              </div>
                              <div>
                                <DeleteIcon w={4} h={4} color='black.200'/>
                              </div>
                            </div>
                            
                          </div>

                          <div onDoubleClick={imgData} className="h-[80%] w-[100%]  mx-auto my-2 bg-red-500 relative ">
                            <Center w='100%' h='80%'  className= "ma-auto"  bg='tomato' color='white'>
                              <img  className="m-auto" src={post.image} alt="" />
                            </Center>
                            {
                              heart ? <AiFillHeart className='  transition ease-in-out duration-400 -translate-y-1 text-[100px] absolute top-[150px] left-[140px] text-slate-100 opacity-80 '/> : null
                            }
                            
                            
                          </div>

                          <div onClick = {(()=>setColor(!color))} className=" my-2 flex gap-x-5 items-center">
                            {
                              color ? <AiOutlineHeart className='text-[24px]'/> : <AiFillHeart className='text-[#ED4956] text-[24px]'/>
                            }

                            <FaRegComment className='text-[21px]'/>
                            <FiSend className='text-[21px]' />

                            
                          </div>

                          <div className="my-3 flex items-center gap-x-2"> 
                            <Avatar size ='sm' name= {owner.firstName} src={owner?.picture} />
                            <h1 className="text-[12px]">Like By <span className="font-semibold">{owner?.firstName}{owner?.lastName}</span> and <span className="font-semibold">{post.likes} others </span></h1>
                          </div>

                          <div className="flex gap-x-2">
                              <h1 className="font-semibold">{post.owner.firstName}{post.owner.lastName}:</h1>
                              <h1 className='text-[11px] uppercase'>{post.text}</h1>
                            </div>

                          <div>
                            <Comment id = {post.id} name ={post.likes}/>
                          </div>

                          <div className="w-[100%] my-2">
                            <InputGroup size='lg'>
                              <InputLeftElement
                                size='lg'
                                pointerEvent='cursor'
                                children ={<BsEmojiSmile color='black.500'/>}
                              />
                              <Input placeholder='Add a Comment...' />

                              <InputRightAddon
                                size='lg'
                                color='blue.200'
                                children ="Post"  
                              />
                            </InputGroup>

                          </div>
                        </div>
                        
                    </div>
                  )
                }) 
            }
      </div>
        }   
        
    </>
  )
}

const fetchPosts = async () => {
  return await fetch("https://dummyapi.io/data/v1/post",{
    method:'GET',
    headers:{
      'app-id':'62b29d7caca98c233bb0bf4c'
    }
  }).then(res => res.json())
}


export async function getServerSideProps(){

  const posts = await fetchPosts()

  return {
    props:{
      posts
    }
  }

}


