import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route , withRouter} from 'react-router-dom';
import News from './components/News/News';
import Setting from './components/Setting/Setting';
import Music from './components/Music/Music';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";


class App extends React.Component<AppTypeProps> {
    componentDidMount() {
        this.props.initializeApp ()
    }

    render() {
        if ( !this.props.initialized ) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                    <Route path="/profile/:userId?"
                           render={() => <ProfileContainer/>}/>
                    <Route path="/users" render={() => <UsersContainer/>}/>
                    <Route path="/login" render={() => <Login/>}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/setting" render={() => <Setting/>}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): AppMapStateToProps => {
    return {
        initialized: state.app.initialized
    }
}
export default compose<React.ComponentType> (
    connect ( mapStateToProps , { initializeApp } ) , withRouter ) ( App );

//type
type AppMapDispatchToProps = {
    initializeApp: () => void
}
type AppMapStateToProps = {
    initialized: boolean
}
export type AppTypeProps = RouteComponentProps & AppMapDispatchToProps & AppMapStateToProps
