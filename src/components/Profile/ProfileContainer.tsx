import React from "react";
import Profile from "./Profile";
import {ProfileUserType} from "../API/socialNetworkAPI";
import {connect} from "react-redux";
import {userProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";


class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if ( !userId ) userId = "2"
        this.props.userProfile ( userId )
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
    userProfile: (userId: string) => void
}
const withUrlDataContainerComponent = withRouter ( ProfileContainer )
export default connect ( mapStateToProps , { userProfile } ) ( withUrlDataContainerComponent )