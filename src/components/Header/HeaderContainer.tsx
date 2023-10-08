import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logOut} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component<HeaderPropsType> {


    render() {
        return (
            <Header login={this.props.login} isAuth={this.props.isAuth} logOut={this.props.logOut}/>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {
        isAuth: state.auth.isAuth ,
        login: state.auth.login
    }
}
type HeaderPropsType = MapStateToProps & MapDispatchToProps
type MapDispatchToProps = {
    logOut: () => void
}
type MapStateToProps = {
    isAuth: boolean,
    login: string | null
}
export default connect ( mapStateToProps , { logOut } ) ( HeaderContainer )