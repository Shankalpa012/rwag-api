import { Button, ButtonGroup } from '@chakra-ui/react'
//
import {useQuery} from 'react-query'
import {  AddIcon } from '@chakra-ui/icons'

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import { message  } from '../../node_modules/antd/lib/index'
import { useState } from 'react'
import { useRouter } from 'next/router'
// import { Avatar } from 'antd';

function Navbar(props) {

  const [img,setImage] = useState(null)

  const router = useRouter()

  const  { value : postVisible, setValue: setPostVisible,data:addPost, user : user } = props

  // console.log("this is the data from navbar",addPost)

  // const imgData = addPost?.filter((data)=>{
  //     if(data.owner.id === user){
  //       return data.owner.picture
  //     }
  //     return
  // })

  // const data = imgData[0]

  const clickHandler = () => {
     setPostVisible(true)
  }

  const profilehandler = () =>{
    router.push("/account")
  }

  return (
    <div className="w-[100%] border-b-2 border-slate-200 shadow-md shadow-red bg-slate-50 sticky top-0 z-10 ">
        <div className="md:w-[60%] w-[90%] m-auto flex justify-between items-center p-3 ">
          <div>
            <h1 className='font-headingFont text-4xl font-medium tracking-wider '>InstaKilo</h1>
          </div>

          <div className='flex justtify-around items-center gap-x-6'>
            
            <div className='border-2 p-[1px] rounded-md cursor-pointer  border-black  flex items-center'>
              <AddIcon w={4} h={5} color='black.200' onClick = {clickHandler}/>
            </div>

            <div className='cursor-pointer' onClick = {profilehandler}>
              <Avatar size={24} icon={<UserOutlined />} />             
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar