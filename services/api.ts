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
export const editUserData = async (user_id,userData) => {
    const responce = await axios.put(`${base_url}/user/${user_id}?page=2&limit=50`,userData,{headers}).then((res)=>res.data)
    return responce
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