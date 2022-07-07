export interface User {
    firstName:string,
    lastName:string,
    email:string
}

export interface Post{
    image:string,
    likes:number,
    tags:string[],
    text:string,
}