import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus , getUserProfile , savePhoto , saveProfile , updateStatus} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";

import {compose} from "redux";
import {ProfileDataForm} from "./ProfileInfo/ProfileDataForm";
import {ProfileUserType} from "../../API/profile-api";


class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if ( !userId ) {
      userId = !userId ? "29819" : String ( this.props.authorizedUserId )
      if ( !userId ) {
        this.props.history.push ( '/login' )
      }
    }
    this.props.getUserProfile ( userId )
    this.props.getStatus ( userId )
  }

  componentDidMount() {

    this.refreshProfile ()
  }

  componentDidUpdate(prevProps: Readonly<PropsType> , prevState: Readonly<{}>) {
    if ( this.props.match.params.userId !== this.props.match.params.userId ) {
      this.refreshProfile ()
    }

  }

  render() {
    return (
      <div>
        <Profile isOwner={!this.props.match.params.userId} {...this.props}
                 profile={this.props.profile}
                 status={this.props.status}
                 updateStatus={this.props.updateStatus}
                 savePhoto={this.props.savePhoto}
                 saveProfile={this.props.saveProfile}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType): MapStateToProps => {
  return {
    profile: state.profilePage.profile ,
    status: state.profilePage.status ,
    authorizedUserId: state.auth.id ,
    isAuth: state.auth.isAuth ,
  }
}

export default compose<React.ComponentType> ( connect ( mapStateToProps , {
  getUserProfile ,
  getStatus ,
  updateStatus ,
  savePhoto ,
  saveProfile ,
} ) , withRouter ) ( ProfileContainer )

//types
type ProfileType = MapStateToProps & MapDispatchToProps;
type PropsType = RouteComponentProps<PathParamsType> & ProfileType
type MapStateToProps = {
  profile: null | ProfileUserType;
  status: string;
  authorizedUserId: number | null;
  isAuth: boolean;
}
type PathParamsType = {
  userId: string
}
type MapDispatchToProps = {
  getUserProfile: (userId: string) => void;
  getStatus: (userId: string) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileDataForm) => Promise<void>
}