import React from "react";
import Profile from "./Profile";
import {ProfileUserType , socialNetworkAPI} from "../API/socialNetworkAPI";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";


class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if ( !userId ) userId = "2"
        socialNetworkAPI.getProfileUser ( userId ).then ( (response) => {
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

type ProfileType = MapStateToProps & MapDispatchToProps;
type PropsType = RouteComponentProps<PathParamsType> & ProfileType
type MapStateToProps = {
    profile: null | ProfileUserType
}
type PathParamsType = {
    userId: string
}

const mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {
        profile: state.profilePage.profile
    }
}
type MapDispatchToProps = {
    setUserProfile: (profile: ProfileUserType) => void
}
const withUrlDataContainerComponent = withRouter ( ProfileContainer )
export default connect ( mapStateToProps , { setUserProfile } ) ( withUrlDataContainerComponent )