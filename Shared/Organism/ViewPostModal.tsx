//this is the imports from react-hooks-form
import { useForm,SubmitHandler,Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

//getting the components from ant design
import { Avatar,Modal,Input,Select,Radio  } from 'antd';
import { UserContext } from '../../context/UserContext';


const ViewPostModal = (props) => {

    const {value:postViewVisible ,setValue: setPostViewVisible} = props

    const handleCancel = () =>{
        setPostViewVisible(false)
    }
    
    return (
       <>
        <Modal
            title="Add Post"
            centered
            visible = {postViewVisible}
            onCancel ={handleCancel}
            footer={null}
            width={350}
        >
            <form>
                <h1>This is the data</h1>
            </form>
        </Modal>
       </>
    )
}

export default ViewPostModal