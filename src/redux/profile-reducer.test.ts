
import  { ProfilePageType} from "./store";
import profileReducer , {addPostActionCreator , updateNewPostTextCreator} from "./profile-reducer";

    test("message should be added to correct post",()=>{
        let startState:ProfilePageType = {
            posts: [
                { id: '1' , message: 'Hi how are you' , likesCount: '1' } ,
                { id: '2' , message: 'It\'s my post ' , likesCount: '23' }
            ] ,
            newPostText: 'It-kamasutra.com'
        }
        const action = addPostActionCreator("test message");
        const endState = profileReducer(startState, action)
        expect(endState.posts.length).toEqual(3);
        expect(endState.posts[endState.posts.length-1].id).toBeDefined()
        expect(endState.posts[endState.posts.length-1].message).toBe("test message")
    })

test("newPostText should be added",()=>{
    let startState:ProfilePageType = {
        posts: [
            { id: '1' , message: 'Hi how are you' , likesCount: '1' } ,
            { id: '2' , message: 'It\'s my post ' , likesCount: '23' }
        ] ,
        newPostText: 'It-kamasutra.com'
    }
    const action = updateNewPostTextCreator("test message");
    const endState = profileReducer(startState, action)

    expect(endState.newPostText).toBe("test message");
})

