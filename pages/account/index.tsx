import { Auth } from "../../context/AuthContext"
import axios from "axios"
import {useQuery} from 'react-query'
import { useContext, useState,useEffect } from "react";

//ant design details
import { UserOutlined } from '@ant-design/icons';
import { Avatar,Modal,Input,Select,Radio  } from 'antd';
import type { RadioChangeEvent } from 'antd';

//importing the react hooks form
import { useForm,SubmitHandler,Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import {useMutation} from 'react-query'

import { message } from '../../node_modules/antd/lib/index'
import AddPostModel from "../../Shared/AddPostModel"

//importing services
import { createUser, getSingleUser,createPost,getSingleUserPost,editUserData } from "../../services/api"
//importing context
import {UserContext} from "../../context/UserContext"
//importing model 
import { User,Post } from "../../models/dataModels"



type formData = {
    firstName: string,
    lastName:string,
    title:{value:string},
    gender:{value:string},
    number:number,
    picture:string
}

const schema = yup.object({ 
    firstName: yup.string().required("**First Name Should be There**"),
    lastName: yup.string().required("**Last Name should be There**"),
    title:yup.string().required("**Title must be Selected**"),
    gender:yup.string().required("**Gender is required**"),
    number:yup.number().required("**Number is Required**"),
    picture:yup.string().required("**Add a Profile Picture**")
})

const Account = () =>{  

    const [visible,setVisible] = useState(false)
    const [postVisible,setPostVisible] =useState(false)
    const [value, setValue] = useState("Male");

    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")

   
    const { Option } = Select
    const  { user,setUser } = useContext(UserContext)

    useEffect(()=>{
        setUser(localStorage.getItem("user"))
    })
    
   
    console.log("this is the user",user)

   //getting the data of user 
    const {data:userData ,isLoading} = useQuery <User> (["account-data"],() => getSingleUser (user),{
        enabled:!!user
    })

    const {mutate:userDataUpdate} = useMutation ("edit-user",()=>editUserData(user,editUserData),{
        onSuccess:()=>{
            message.success("User Data Edited",3)
        }
    })

    //getting post of specific user
    const {data:userPostData} = useQuery <Post> (["post-data"],()=>getSingleUserPost(user),{
        enabled : !!user
    })


    //creating the user post
    const {mutate:createPostData} = useMutation((postData)=>createPost(postData),{
        onSuccess:()=>{
            message.success("Post Successfuly Created",3)
        }
    })


    // console.log("this is the data",user)

    //this is for the react-hooks forms
    const {register,handleSubmit,watch,control, reset, formState : { errors }} = useForm <formData> ({resolver:yupResolver(schema)})
    

    const showModal = () => {
        setVisible(true);
        setFirstName(userData?.firstName)
        setLastName(userData?.lastName)

    };

    const handleCancel = () =>{
        setVisible(false)
    }

    const handelChange = (value:string) => {
        console.log("the value is ",value)
        reset()

    }


    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        console.log('radio checked', e.target.value);
        // console.log(value)
    };

   //this is for editing the user
   const EditUser = (editData) =>{
        userDataUpdate(user,editData)
        setVisible(false)
        reset()

   }

    const onSubmit :SubmitHandler<formData> = (data)=>{
        console.log(data)
    }

    //this is for creating a new post
    const addPost = (postData) => {
        console.log(postData)
        postData.likes = 0
        postData.owner = user
        createPostData(postData)
        setPostVisible(false)
    }

    const PostModel = () =>{
        setPostVisible(true)
    }
    


    return(
        <div className="w-[100%]  md:w-[80%] lg:w-[70%] m-auto py-2"  >
            <div className="w-[98%] m-auto my-2  px-[5px] lg:px-[50px] py-3 flex justify-between items-center border-2 border-slate-200 rounded-md">
                <div>
                    {
                        userData?.picture != ""
                        ?
                        <Avatar  style={{ verticalAlign: 'middle' }} size={64} shape= "circle" icon={<UserOutlined/>}/>
                        :
                        <Avatar  style={{ verticalAlign: 'middle' }} size={64} shape= "circle" src={userData?.picture}/>
                    }
                </div>
                {
                    isLoading
                    ?
                    <h1>data is Loading</h1>
                    :
                    <div className="leading-10">
                        <h1 className="font-semibold text-[18px]" >{userData?.firstName} {userData?.lastName}</h1> 
                        <h1>{userData?.email}</h1>
                        <h1>{userData?.gender}</h1>
                        <h1>{userData?.phone}</h1>
                    </div>
                }
            </div>

            <div className="border-2 border-slate-200 rounded-md p-1 cursor-pointer w-[98%] text-center mx-auto my-2"  onClick={showModal}>
                <h1 className="font-semibold text-[12px] tracking-wider">Edit</h1>
            </div>
            <Modal 
                title="Edit User Info" 
                visible = {visible}
                width ={350}
                onCancel={handleCancel}
                footer={null}
                okButtonProps={{ color: "#06C755" }}
                >
                    <form className="flex flex-col gap-y-2" onSubmit ={handleSubmit(EditUser)} >
                        {/* This is firstName Input**/}
                        <div className="">
                            <h1 className="font-semibold text-[14px]" >First Name</h1>
                            <Controller
                                name='firstName'
                                control={control}
                                rules={{required:true}}
                                defaultValue ={firstName}
                                render ={({field})=> <Input {...field} size="medium" placeholder="First Name"/>   }
                            />
                            <p className="text-red-500 italic text-sm">{errors.firstName?.message}</p>
                            {/* {errors.firstName?.type === 'required' && <p className="text-red-500 italic text-sm">**First name is required**</p>} */}
                            {/* {errors.firstName?.type === 'minLength' && <p className="text-red-500 italic text-sm">**First name is too small**</p>} */}
                            
                        </div>

                        <div className="">
                            <h1 className="font-semibold text-[14px]" >Last Name</h1>
                            <Controller
                                name='lastName'
                                control={control}
                                rules = {{required:true}}
                                defaultValue ={lastName}
                                render ={({field})=> <Input {...field} size="medium" placeholder="Last Name"/>   }
                            />
                            <p className="text-red-500 italic text-sm">{errors.lastName?.message}</p>
                            {/* {errors.lastName?.type === 'required' && <p className="text-red-500 italic text-sm">**Last name is required**</p>} */}
                            {/* {errors.lastName?.type === 'minLength' && <p className="text-red-500 italic text-sm">**First name is too small**</p>} */}
                        </div>
                        
                        <div className="flex items-center gap-x-2 py-2">
                            <h1 className="font-semibold text-[14px]" >Title:</h1>
                            <Controller
                                name="title"
                                control ={control}
                                defaultValue =""
                                rules ={{required:true}}
                                render ={({field})=><Select {...field} defaultValue = "" style={{ width: 120 }} size="small" >
                                    <Option value = "Mr">Mr</Option>
                                    <Option value = "Ms">Ms</Option>
                                    <Option value = "Mrs">Mrs</Option>
                                    <Option value = "Miss">Miss</Option>
                                    <Option value = "Dr">dr</Option> 
                                </Select>}
                            />
                            <p className="text-red-500 italic text-sm">{errors.title?.message}</p>
                            {/* {errors.title?.type === 'required' && <p className="text-red-500 italic text-sm">**Title is required**</p>} */}
                        </div>

                        <div>
                            <h1 className="font-semibold text-[14px] py-1">Gender</h1>
                            <Controller
                                name="gender"
                                control ={control}
                                defaultValue=""
                                rules ={{required:true}}
                                render = {({field})=>  <Radio.Group {...field} >
                                    <Radio value={"Male"}>Male</Radio>
                                    <Radio value={"Female"}>Female</Radio>
                                </Radio.Group>}
                            />
                            <p className="text-red-500 italic text-sm">{errors.gender?.message}</p>
                            {/* {errors.gender?.type === "required"&&<p className="text-red-500 italic text-sm">**Gender is not selected**</p>} */}
                           
                        </div>

                        <div className="">
                            <h1 className="font-semibold text-[14px]">Number</h1>
                            <Controller
                                name="number"
                                control ={control}
                                defaultValue=""
                                rules ={{required:true}}
                                render={({field})=> <Input {...field} size="sm" placeholder="Number"/> }
                            />
                            <p className="text-red-500 italic text-sm">{errors.number?.message}</p>
                            {/* {errors.number?.type==="required" && <p className="text-red-500 italic text-sm">** Gender is not selected**</p>} */}
                            
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <h1 className="font-semibold text-[14px]" >Select Picture</h1>
                            <Controller
                                name='picture'
                                control={control}
                                rules={{required:true}}
                                defaultValue =""
                                render ={({field})=> <Input {...field} size="medium" placeholder="Profile Image"/>   }
                            />
                            <p className="text-red-500 italic text-sm">{errors.image?.message}</p>
                        </div>

                        <input type="submit" className="bg-[#06C755] py-2 text-slate-200 my-2 rounded" />
                        {/* <button type="submit" >Submit</button> */}
                    </form>
                </Modal>

            <div className="border-2 border-slate-200 rounded-md p-1 cursor-pointer  w-[98%] text-center mx-auto my-2" onClick ={PostModel} >
                <h1 className="font-semibold text-[12px] tracking-wider">Add Post</h1>
            </div>

            <AddPostModel value={postVisible} setValue={setPostVisible} data= {addPost} />
            
            <div className="grid grid-cols-3 gap-x-2 gap-y-2 p-2 w-[100%] lg:w-[95%] m-auto">
                {
                    userPostData?.data.map((data)=>{
                        return(
                            <>
                                <img className=" w-[300px] lg:w-[350px]" src={data.image} alt="" />                                           
                            </>
                        )
                    })
                }
            </div>
                
        </div> 
    )

}

export default Account