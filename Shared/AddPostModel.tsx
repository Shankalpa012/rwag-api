import {useState} from 'react'

//this is the imports from react-hooks-form
import { useForm,SubmitHandler,Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

//getting the components from ant design
import { Avatar,Modal,Input,Select,Radio  } from 'antd';


const schema = yup.object({
    text:yup.string().required("**Please Fill the Required Field **")

})

 const AddPostModel = (props) => {

    //getting the value true or false to opem window
    const  { value : postVisible, setValue: setPostVisible } = props

    //regeserting in react hook form
    const {register,control,formState:{errors},handleSubmit} = useForm({resolver:yupResolver(schema)})

    //these are the window modal function 
    const handleOk = () =>{
        setPostVisible(false)
    }    
    const handleCancel = () =>{
        setPostVisible(false)
    }
    const formData = (data) =>{
        console.log(data)
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
                width={250}
            >
                <form onSubmit={handleSubmit((data)=>formData(data))}>
                   <div className="">
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

                    <input type='submit' className="bg-[#06C755] py-2 text-slate-500 pointer my-2 rounded w-[100%]"/>
                </form>

            </Modal>
        </>
    )   
}

export default AddPostModel