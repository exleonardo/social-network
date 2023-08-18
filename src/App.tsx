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
import {ActionType, RootStateType, StoreType} from './redux/store';
import {StoreReduxType} from "./redux/redux-store";


export type AppTypeProps = {
    dispatch: (action: ActionType) => void
    state: RootStateType
    store: StoreReduxType
}

function App(props: AppTypeProps) {

    return (

        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Route path="/dialogs" render={() => <Dialogs store={props.store}/>}/>
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
