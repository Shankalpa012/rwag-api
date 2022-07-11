import Navbar from "../../components/Navbar";
import Comment from "../../components/Comment";

//importing the react query 
import { dehydrate, QueryClient, useQuery ,useMutation,useQueryClient } from 'react-query';

//importing axios
import axios from "axios"
import { message } from '../../node_modules/antd/lib/index'
import { Divider, Tag } from 'antd';


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
import { PhoneIcon, DeleteIcon,  AddIcon, WarningIcon ,ExternalLinkIcon } from '@chakra-ui/icons'
import { Input,InputGroup,InputLeftElement,InputRightElement,InputRightAddon ,FormErrorMessage,Button } from '@chakra-ui/react'
import { useState,useEffect,useContext } from "react";
import { Auth } from "../../context/AuthContext";
import { createPost, getSingleUser, getUserPost } from "../../services/api";
import { UserContext } from "../../context/UserContext";

//react hooks forms
import { useForm,SubmitHandler,Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

//getting the post modal
import AddPostModel from "../../Shared/Organism/AddPostModel";
import ViewPostModal from "../../Shared/Organism/ViewPostModal"


type commentData = {
  comment:string
}

const schema  = yup.object({
  comment :yup.string().required("Form Field is Required")
})


export default function Home(props) {

  const [color,setColor] = useState(true)
  const [heart,setHeart] =useState(false)
  const [postVisible,setPostVisible] = useState(false)
  const [postViewVisible,setPostViewVisible] = useState(false)

   const {user} = useContext(UserContext)
   const queryClient = useQueryClient()
  
  //  console.log(user)

  const imgData = () =>{
    setColor(false)
    setHeart(true)
  }

  const {data:userData,isLoading} = useQuery(["getUserPost"],() => getUserPost())

  const {register,control,reset, formState : {errors} ,handleSubmit} = useForm <commentData> ({resolver:yupResolver(schema)})

  // console.log(userData)

  setTimeout(()=>{
    setHeart(false)
  },3000)

  const openViewPostModal =() => {
    setPostViewVisible(true)
  }

  //creating a post
  const {mutate:createPostData} = useMutation((postData)=>createPost(postData),{
    onSuccess:(res)=>{
        queryClient.invalidateQueries('getUserPost')   
        message.success("Post Successfuly Created",3)
    }
})
  
const addPost =(postData) => {
  postData.likes = 0
  postData.owner = user
  createPostData(postData)
  setPostVisible(false)
}

const commentData = (data) => {
    console.log(data)
}  
  return (
    <>
        <Navbar value={postVisible} setValue={setPostVisible} data={userData?.data} user={user}  />      
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
                  <>

                    <div className= 'bg-[#FFFFFF] border rounded-[5px] border-slate-200 lg:w-[40%] sm:w-[60%] w-[90%] mx-auto my-2'>
                      <div key = {post.id} className= 'mx-2 p-2'>

                        <div className='flex flex-col flex-y-2'>
                            <div className='flex justify-between items-center px-2 flex-x-5 p-1 '>
                              <div className="flex items-center">
                                <Avatar size ='md' name= {owner.firstName} src={owner?.picture} />
                                <h1 className='mx-4 tracking-wide text-[13.5px] font-medium'>{owner.firstName}{owner.lastName}</h1>
                              </div>
                              <div className="cursor-pointer">
                                {
                                  <ExternalLinkIcon w={4} h={4} color='black.200' onClick = {openViewPostModal}/>
                                }
                              </div>
                            </div>
                            
                          </div>

                          <div onDoubleClick={imgData} className="h-[80%] w-[100%]  mx-auto my-2 py-2 bg-slate-200 relative ">
                            <Center w='100%' h='80%'  className= "ma-auto"  color='white'>
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

                          <div className="flex items-center gap-x-2">
                              <h1 className="font-semibold">{post.owner.firstName}{post.owner.lastName}:</h1>
                              <h1 className='text-[11px] uppercase'>{post.text}</h1>
                          </div>

                          <div className="flex gap-x-1 my-2">
                            {
                              post.tags.map((tag)=>{
                                return(
                                  <Tag color='green'>{tag}</Tag>
                                )
                              })
                            }
                          </div>

                          <div>
                            <Comment id = {post.id} name ={post.likes}/>
                          </div>

                          <div className="w-[100%] my-2 flex justify-bewteen">
                            <form  className="w-[100%] flex justify-bewteen" onSubmit= {handleSubmit(commentData)}>
                            <InputGroup size='lg'>
                              {/* <InputLeftElement size='lg' pointerEvent='cursor'>
                                <BsEmojiSmile color='black.500'/> 
                              </InputLeftElement> */}

                              <div className="w-[100%]">
                                <Controller
                                  name="comment"
                                  control ={control}
                                  rules = {{required:true}}
                                  render = {({field})=> <Input {...field} size="lg" focusBorderColor='white.100' placeholder='Add a Comment...' /> }
                                />
                                <p className="text-red-700 text-[12px] italic m-2">{errors.comment?.message}</p> 
                              </div>

                              {/* <div className="w-[100%]">
                                <Input 
                                  size="lg" 
                                  placeholder='Add a Comment...' 
                                  {...regi  ster('comment',{required:"This is required"})}
                                />
                                <p>{errors.comment?.message}</p> 
                              </div> */}

                                <InputRightElement width='4.5rem'>
                                  <Button variant='ghost' type='submit'  h='100%' w='100%' size='sm'>
                                    <p className ='text-[12px] text-cyan-200'>Post</p>
                                  </Button>
                                </InputRightElement>
                            </InputGroup>
                            </form>
                          </div>
                        </div>
                        
                    </div>

                  </>
                  )
                } 
                )
                
            }

        <AddPostModel value={postVisible} setValue={setPostVisible} data={addPost}  />
        {/* <ViewPostModal value ={postViewVisible} setValue = {setPostViewVisible} /> */}
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


