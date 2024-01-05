import React , {useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Redirect , Route , Switch} from 'react-router-dom';
import News from './components/News/News';
import Setting from './components/Setting/Setting';
import Music from './components/Music/Music';
import {UsersPage} from "./components/Users/UsersPage";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";
import {initializeApp} from "./redux/app-reducer";
import {useAppDispatch , useAppSelector} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import {getInitialized} from "./components/Login/login-selectors";

const DialogsContainer = React.lazy ( () => import("./components/Dialogs/DialogsContainer") )
const ProfileContainer = React.lazy ( () => import("./components/Profile/ProfileMain") )

export const App = () => {
  const initialized = useAppSelector ( getInitialized )
  const dispatch = useAppDispatch ()
  const catchAllUnhandleErrors = () => {
    alert ( "Some Error" )
  }
  useEffect ( () => {
    dispatch ( initializeApp () )
    window.addEventListener ( 'unhandledrejection' , catchAllUnhandleErrors )
    return () => {
      window.removeEventListener ( 'unhandledrejection' , catchAllUnhandleErrors )
    }
  } , [] );


  if ( initialized ) {
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
          <Route path="/users" render={() => <UsersPage/>}/>
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
