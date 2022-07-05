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


//importing services
import { createUser, getSingleUser } from "../../services/api"
//importing context
import {UserContext} from "../../context/UserContext"
//importing model 
import { User } from "../../models/dataModels"


type formData = {
    firstName: string,
    lastName:string,
    title:{value:string},
    gender:{value:string},
    number:number
}

const schema = yup.object({ 
    firstName: yup.string().required("**First Name Should be There**"),
    lastName: yup.string().required("**Last Name should be There**"),
    title:yup.string().required("**Title must be Selected**"),
    gender:yup.string().required("**Gender is required**"),
    number:yup.number().required("**Number is Required**")
})

const Account = () =>{  

    const [visible,setVisible] = useState(false)
    const [value, setValue] = useState("Male");

   
    const { Option } = Select
    const  { user,setUser } = useContext(UserContext)

    useEffect(()=>{
        setUser(localStorage.getItem("user"))
    })
    
   
    // console.log("this is the user",user)s

   
    const {data:userData ,isLoading} = useQuery <User> (["account-data"],() => getSingleUser (user),{
        enabled:!!user
    })

    // console.log("this is the data",user)

    //this is for the react-hooks forms
    const {register,handleSubmit,watch,control, formState : { errors}} = useForm <formData> ({resolver:yupResolver(schema)})
    
    const handelOk = () =>{
        setVisible(!visible)
    }
    const handleCancel = () =>{
        setVisible(!visible)
    }

    const showModal = () => {
        setVisible(true);
      };

    const handelChange = (value:string) => {
        console.log("the value is ",value)
    }


    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        console.log('radio checked', e.target.value);
        // console.log(value)
    };

   //this is for editing the user
   const EditUser = (data) =>{
        console.log(data)
   }

    const onSubmit :SubmitHandler<formData> = (data)=>{
        console.log(data)
    }

    


    return(
        <div className="w-[100%]  md:w-[80%] lg:w-[70%] m-auto" >
            <div className="w-[90%] m-auto my-2  px-[5px] lg:px-[50px] py-3 flex justify-between items-center border-2 border-slate-200 rounded-md">
                <div>
                    <Avatar  style={{ verticalAlign: 'middle' }} size={64} shape= "circle" icon={<UserOutlined/>}/>
                </div>
                {
                    isLoading
                    ?
                    <h1>data is Loading</h1>
                    :
                    <div className="leading-10">
                        <h1 className="font-semibold text-[18px]" >{userData?.firstName}{userData?.lastName}</h1> 
                        <h1>{userData?.email}</h1>
                        <h1>{userData?.gender}</h1>
                        <h1>{userData?.phone}</h1>
                        <h1>{userData?.location.country}</h1>
                    </div>
                }
            </div>

            <div className="border-2 border-slate-200 rounded-md p-1 cursor-pointer  w-[90%] text-center mx-auto my-2"  onClick={showModal}>
                <h1 className="font-semibold text-[12px] tracking-wider">Edit</h1>
            </div>
            <Modal 
                title="Edit User Info" 
                onOk ={handelOk}
                onCancel = {handleCancel}
                visible = {visible}
                width ={350}
                footer={null}
                okButtonProps={{ color: "#06C755" }}
                >
                    <form className="flex flex-col gap-y-2" onSubmit ={handleSubmit(data=>EditUser(data))} >
                        {/* This is firstName Input**/}
                        <div className="">
                            <h1 className="font-semibold text-[14px]" >First Name</h1>
                            <Controller
                                name='firstName'
                                control={control}
                                rules={{required:true}}
                                defaultValue =""
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
                                defaultValue =""
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

                        <input type="submit" className="bg-[#06C755] py-2 text-slate-200 my-2 rounded" />
                        {/* <button type="submit" >Submit</button> */}
                    </form>
                </Modal>
           
                
        </div> 
    )

}

export default Account