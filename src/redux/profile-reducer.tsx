import {ActionType , PostsType , ProfilePageType} from "./state";

const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';


const profileReducer = (state: ProfilePageType , action: ActionType): ProfilePageType => {

    switch (action.type) {
        case ADD_POST:
            let newPost: PostsType = { id: '5' , message: action.newPostText , likesCount: '5' }
            state.posts.push ( newPost );
            state.newPostText = ''
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.postMessage
            return state
        default :
            return state
    }
};

export default profileReducer;

export const addPostActionCreator = (text: string) => ({
    type: ADD_POST ,
    newPostText: text
} as const)

export const updateNewPostTextCreator = (text: string) => ({
    type: UPDATE_NEW_POST_TEXT ,
    postMessage: text
} as const)