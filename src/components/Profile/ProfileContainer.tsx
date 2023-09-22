import React from "react";
import Profile from "./Profile";
import {ProfileUserType , socialNetworkAPI} from "../API/socialNetworkAPI";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";


class ProfileContainer extends React.Component<ProfileType> {
    componentDidMount() {
        socialNetworkAPI.getProfileUser ( '2' ).then ( (response) => {
            this.props.setUserProfile ( response.data )

        } )
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

type ProfileType = MapStateToProps & MapDispatchToProps
type MapStateToProps = {
    profile: null | ProfileUserType
}
const mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {
        profile: state.profilePage.profile
    }
}
type MapDispatchToProps = {
    setUserProfile: (profile: ProfileUserType) => void
}
export default connect ( mapStateToProps , { setUserProfile } ) ( ProfileContainer )