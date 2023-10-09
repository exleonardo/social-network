import {ProfilePageType} from "./store";
import profileReducer , {addPostActionCreator , getUserProfile , setStatusAC , setUserProfile} from "./profile-reducer";
import {UsersContactType} from "../API/socialNetworkAPI";

let startState: ProfilePageType
beforeEach ( () => {
    startState = {
        posts: [
            { id: 1 , message: 'Hi how are you' , likesCount: '1' } ,
            { id: 2 , message: 'It\'s my post ' , likesCount: '23' }
        ] ,
        newPostText: 'It-kamasutra.com' ,
        profile: null ,
        status: ''
    }
} )
test ( "message should be added to correct post" , () => {

    const action = addPostActionCreator ( "test message" );
    const endState = profileReducer ( startState , action )
    expect ( endState.posts.length ).toEqual ( 3 );
    expect ( endState.posts[endState.posts.length - 1].id ).toBeDefined ()
    expect ( endState.posts[endState.posts.length - 1].message ).toBe ( "test message" )
} )
test ( "status should be changed" , () => {
    const action = setStatusAC ( 'New status' );
    const endState = profileReducer ( startState , action )
    expect ( endState.status ).toBeDefined ()
    expect ( endState.status ).toBe ( "New status" )
} )
test ( "users should be added" , () => {
    const action = setUserProfile ( {
        aboutMe: "student" ,
        userId: 1 ,
        lookingForAJob: true ,
        lookingForAJobDescription: "Ищу работу Frontend-react-dev" ,
        fullName: "Alex Khomenok" ,
        contacts: {
            github: "https://github.com/exleonardo" ,
            vk: 'vk.com/exleonardo' ,
            facebook: "undefined" ,
            instagram: "@Alexander_Khomenok" ,
            twitter: "undefined" ,
            website: "undefined" ,
            youtube: "undefined" ,
            mainLink: "undefined" ,
        } ,
        photos: {
            small: "No Photo" ,
            large: "No Photo"
        }
    } );
    const endState = profileReducer ( startState , action )
    expect ( endState.profile ).toBeDefined ()
    expect ( endState.profile?.fullName ).toBe ( "Alex Khomenok" );
    expect ( endState.profile?.lookingForAJob ).toBeTruthy ();
    expect ( endState.profile?.userId ).toBeDefined ()
} )


