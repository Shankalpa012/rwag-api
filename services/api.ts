import axios from 'axios'

const headers = {
    "app-id": '62b29d7caca98c233bb0bf4c',
}
const base_url="https://dummyapi.io/data/v1"


//create user 
export const createUser = async(newUser) => {
    return await axios.post(`${base_url}/user/create`,newUser,{headers})
}

//get single user data
export const getSingleUser = async(user_id) => {
    const responce = await axios.get(`${base_url}/user/${user_id}`,{headers}).then((res) => res.data)
    return responce
}

//get individual users post
export const getUserPost = async() =>{
    const responce = await axios.get(`${base_url}/post`,{headers}).then((res)=>res.data)
    return responce
}

//edit the users data
export const editUserData = async (user_id, editData) => {
    console.log("This is the data",editData)
    return await axios.put(`${base_url}/user/${user_id}?page=2&limit=50`,editData,{headers}).then((res)=>res.data)
}

//create post by user
export const createPost = async(userData) => {
    const responce = await axios.post(`${base_url}/post/create`,userData,{headers}).then((res)=>res.data)
    return responce
}

//get post by specific user
export const getSingleUserPost = async (user_id) => {
    const responce = await axios.get(`${base_url}/user/${user_id}/post`,{headers}).then((res)=>res.data)
    return responce
}

//delete the psot 
export const deletePost = async (post_id)=>{
    const responce = await axios.delete(`${base_url}/post/${post_id}`,{headers}).then((res)=>res.data)
    return responce
}

//add the comment to the post
export const addComment = async (comment_data) => {
    const responce = await axios.post(`${base_url}/comment/create`,comment_data,{headers}).then(res => res.data)
}

