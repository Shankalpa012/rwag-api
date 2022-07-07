import {useState,useContext,useEffect} from 'react'

//this is the imports from react-hooks-form
import { useForm,SubmitHandler,Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

//getting the components from ant design
import { Avatar,Modal,Input,Select,Radio  } from 'antd';
import { UserContext } from '../context/UserContext';

type postFormData= {
    text:string,
    tage:[string],
    image:string,

}

const schema = yup.object({
    text:yup.string().required("**Please Fill the Required Field **"),
    tags:yup.array().required("**Please Enter the tags field**"),
    image:yup.string().required("**Please Enter the Image Url**"),

}).required()


const AddPostModel = (props) => {

    const  { user,setUser } = useContext(UserContext)

    useEffect(()=>{
        setUser(localStorage.getItem("user"))
    })

    //getting the value true or false to opem window
    const  { value : postVisible, setValue: setPostVisible,data:addPost } = props
    const {Option} = Select
    // const children: React.ReactNode[] = [];

    //regeserting in react hook form
    const {register,control,reset,formState:{errors},handleSubmit} = useForm <postFormData> ({resolver:yupResolver(schema)})

    //these are the window modal function 
    const handleOk = () =>{
        setPostVisible(false)
        reset()
    }    
    const handleCancel = () =>{
        setPostVisible(false)
        reset()
    }
    const formData = (data) =>{
        data.owner =user
        console.log(data)
        reset()
    }

    const submit = (data) =>{
        addPost(data)
    }

    const clear = ()=> {
        
    }


    return(        
        <>
            <Modal
                title="Add Post"
                centered
                visible = {postVisible}
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={null}
                width={350}
            >
                <form onSubmit={handleSubmit(submit)}>
                   <div className="flex flex-col gap-y-2">
                        <h1 className="font-semibold text-[14px]" >Title</h1>
                        <Controller
                            name='text'
                            control={control}
                            rules={{required:true}}
                            defaultValue =""
                            render ={({field})=> <Input {...field} size="medium" placeholder="Title"/>   }
                        />
                        <p className="text-red-500 italic text-sm">{errors.text?.message}</p>
                    </div>

                    <div className="flex flex-col gap-y-2 py-2">
                        <h1 className="font-semibold text-[14px]" >Select Tags</h1>
                        <Controller
                        name="tags"
                        control ={control}
                        rules = {{required:true}}
                        render={({field})=>
                            <Select
                            {...field}
                            mode="tags"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Add Your Picture tags"
                            >
                                <Option value="animal">Animal</Option>
                                <Option value="mountains">Mountains</Option>
                                <Option value="Nature">Nature</Option>
                                <Option value="Ocane">Ocean</Option>
                            </Select>
                        }
                        />
                        <p className="text-red-500 italic text-sm">{errors.tags?.message}</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <h1 className="font-semibold text-[14px]" >Image Url</h1>
                        <Controller
                            name='image'
                            control={control}
                            rules={{required:true}}
                            defaultValue =""
                            render ={({field})=> <Input {...field} size="medium" placeholder="Image Url"/>   }
                        />
                        <p className="text-red-500 italic text-sm">{errors.image?.message}</p>
                    </div>

                    <input type='submit' className="bg-[#06C755] py-2 text-slate-500 pointer my-2 rounded w-[100%]"/>

                </form>

            </Modal>
        </>
    )   
}

export default AddPostModel