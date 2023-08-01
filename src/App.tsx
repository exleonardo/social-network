import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import News from './components/News/News';
import Setting from './components/Setting/Setting';
import Music from './components/Music/Music';
import {AddPostType, RootStateType, UpdateNewPostTextType} from './redux/state';


export type AppTypeProps = {
    dispatch: (action: AddPostType | UpdateNewPostTextType) => void
    state: RootStateType
}

function App(props: AppTypeProps) {

    return (

        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Route path="/dialogs" render={() => <Dialogs state={props.state.dialogsPage}/>}/>
                <Route path="/profile"
                       render={() => <Profile profilePage={props.state.profilePage} dispatch={props.dispatch}/>}/>
                <Route path="/news" render={() => <News/>}/>
                <Route path="/music" render={() => <Music/>}/>
                <Route path="/setting" render={() => <Setting/>}/>
            </div>
        </div>
    );
}

export default App;
