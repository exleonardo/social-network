export type PostsType = {
    id: string;
    message: string;
    likesCount: string
}
export type DialogsType = { id: string, name: string }
export type MessagesType = { id: string; message: string }
export type ProfilePageType ={
    posts:PostsType[];
}
export type DialogsPageType = {
    dialogs:DialogsType[];
    messages:MessagesType[];
}
export type SidebarType = {}

export type RootStateType = {
    profilePage : ProfilePageType;
    dialogsPage : DialogsPageType;
    sidebar:SidebarType
}
 let state:RootStateType = {
     profilePage:{
        posts: [
            {id: "1", message: "Hi how are you", likesCount: "1"},
            {id: "2", message: "It's my post ", likesCount: "23"}
        ]
    },
     dialogsPage:{
         dialogs:[
             {id: "1", name: "Dimych"},
             {id: "2", name: "Andrey"},
             {id: "3", name: "Svaeta"},
             {id: "4", name: "Victor"},
             {id: "5", name: "Valera"}
         ],
         messages:[
             {id: "1", message: "Hi"},
             {id: "2", message: "How is you it-camasutra"},
             {id: "3", message: "yo"}
         ]
     },
sidebar : {}
}
export let addPost = (postMessage:string)=>{
    let newPost:PostsType = {id:"5",message:postMessage,likesCount:"5"}
    state.profilePage.posts.push(newPost);
}
export default state