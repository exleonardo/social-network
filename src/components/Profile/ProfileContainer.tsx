import React from "react";
import Profile from "./Profile";
import {ProfileUserType} from "../../API/socialNetworkAPI";
import {connect} from "react-redux";
import {getStatus , getUserProfile , updateStatus} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";

import {compose} from "redux";


class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if ( !userId ) userId = "29819"
        this.props.getUserProfile ( userId )
        this.props.getStatus ( userId )
    }

    render() {

        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                         updateStatus={this.props.updateStatus}/>
            </div>
        )
    }
}


type ProfileType = MapStateToProps & MapDispatchToProps;
type PropsType = RouteComponentProps<PathParamsType> & ProfileType
type MapStateToProps = {
    profile: null | ProfileUserType;
    status: string
}
type PathParamsType = {
    userId: string
}

const mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {
        profile: state.profilePage.profile ,
        status: state.profilePage.status
    }
}
type MapDispatchToProps = {
    getUserProfile: (userId: string) => void;
    getStatus: (userId: string) => void;
    updateStatus: (status: string) => void;
}
export default compose<React.ComponentType> ( connect ( mapStateToProps , {
    getUserProfile ,
    getStatus ,
    updateStatus
} ) , withRouter ) ( ProfileContainer )