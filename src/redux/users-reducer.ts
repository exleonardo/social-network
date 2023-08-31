const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
type ActionType = ReturnType<typeof followAC> | ReturnType<typeof unfollowAC> | ReturnType<typeof setUsersAC>
type UsersLocationType = {
    city: string;
    country: string
}
export type UsersInfoType = {
    id: string,
    photoUrl: string
    followed: boolean,
    fullName: string,
    status: string,
    location: UsersLocationType
}
type UsersType = {
    users: UsersInfoType[]
}
const initialState: UsersType = {
    users: [{
        id: "1" ,
        photoUrl: "https://cdn.icon-icons.com/icons2/2126/PNG/72/yoda_star_wars_icon_131348.png" ,
        followed: false ,
        fullName: "Dmitry" ,
        status: "I'm a boss" ,
        location: { city: "Minsk" , country: "Belarus" }
    } , {
        id: "2" ,
        photoUrl: 'https://cdn.icon-icons.com/icons2/2126/PNG/72/darth_maul_star_wars_icon_131347.png' ,
        followed: true ,
        fullName: "Sasha" ,
        status: "I'm a boss" ,
        location: { city: "Moscow" , country: "Russia" }
    } ,
        {
            id: "3" ,
            photoUrl: "https://cdn.icon-icons.com/icons2/2126/PNG/72/the_emperor_star_wars_icon_131346.png" ,
            followed: true ,
            fullName: "Andrey" ,
            status: "I'm a boss too" ,
            location: { city: "Kiev" , country: "Ukraine" }
        }]
}
const usersReducer = (state: UsersType = initialState , action: ActionType): UsersType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state ,
                users: state.users.map ( el => el.id === action.userId ? { ...el , followed: true } : el )
            }
        case UNFOLLOW:
            return {
                ...state ,
                users: state.users.map ( el => el.id === action.userId ? { ...el , followed: false } : el )
            }
        case SET_USERS:
            return { ...state , users: [...state.users , ...action.users] }
        default :
            return state
    }
};

export const followAC = (userId: string) => {
    return {
        type: FOLLOW ,
        userId
    } as const
}
export const unfollowAC = (userId: string) => {
    return {
        type: UNFOLLOW ,
        userId
    } as const
}
export const setUsersAC = (users: UsersInfoType[]) => {
    return {
        type: SET_USERS ,
        users
    } as const
}
export default usersReducer;