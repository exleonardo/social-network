import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Redirect , Route , Switch , withRouter} from 'react-router-dom';
import News from './components/News/News';
import Setting from './components/Setting/Setting';
import Music from './components/Music/Music';
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy ( () => import("./components/Dialogs/DialogsContainer") )
const ProfileContainer = React.lazy ( () => import("./components/Profile/ProfileContainer") )

class App extends React.Component<AppTypeProps> {
  catchAllUnhandleErrors = () => {
    alert ( "Some Error" )

  }

  componentDidMount() {
    this.props.initializeApp ();
    window.addEventListener ( 'unhandledrejection' , this.catchAllUnhandleErrors )
  }

  componentWillUnmount() {
    window.removeEventListener ( 'unhandledrejection' , this.catchAllUnhandleErrors )
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
          <Switch>
            <Route exact path="/"
                   render={() => <Redirect to={'/profile'}/>}/>
            <Route path="/dialogs" render={withSuspense ( DialogsContainer )}/>
            <Route path="/profile/:userId?"
                   render={withSuspense ( ProfileContainer )}/>
            <Route path="/users" render={() => <UsersContainer/>}/>
            <Route path="/login" render={() => <Login/>}/>
            <Route path="/news" render={() => <News/>}/>
            <Route path="/music" render={() => <Music/>}/>
            <Route path="/setting" render={() => <Setting/>}/>
            <Route path="*" render={() => <div>404 Not Found</div>}/>
          </Switch>
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
export type AppMapStateToProps = {
  initialized: boolean
}
export type AppTypeProps = RouteComponentProps & AppMapDispatchToProps & AppMapStateToProps
