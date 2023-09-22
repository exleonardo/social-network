import React from "react";
import Header from "./Header";
import {socialNetworkAPI} from "../API/socialNetworkAPI";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserData} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component<PropsType> {
    componentDidMount() {
        socialNetworkAPI.getAuthMe ().then ( (res) => {
            if ( res.data.resultCode === 0 ) {
                const { id , login , email } = res.data.data
                this.props.setAuthUserData ( id , login , email )
            }
        } )
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
    setAuthUserData: (userId: number , login: string , email: string) => void
}
type MapStateToProps = {
    isAuth: boolean,
    login: string | null
}
export default connect ( mapStateToProps , { setAuthUserData } ) ( HeaderContainer )