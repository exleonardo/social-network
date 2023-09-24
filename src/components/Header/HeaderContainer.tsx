import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {authMe} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.authMe ()
    }

    render() {
        return (
            <Header login={this.props.login} isAuth={this.props.isAuth}/>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {
        isAuth: state.auth.isAuth ,
        login: state.auth.login
    }
}
type PropsType = MapStateToProps & MapDispatchToProps
type MapDispatchToProps = {
    authMe: () => void
}
type MapStateToProps = {
    isAuth: boolean,
    login: string | null
}
export default connect ( mapStateToProps , { authMe } ) ( HeaderContainer )