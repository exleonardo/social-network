import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {Route} from 'react-router-dom';
import News from './components/News/News';
import Setting from './components/Setting/Setting';
import Music from './components/Music/Music';
import DialogsContainer from "./components/Dialogs/DialogsContainer";


export type AppTypeProps = {}

function App(props: AppTypeProps) {

    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                <Route path="/profile"
                       render={() => <Profile/>}/>
                <Route path="/news" render={() => <News/>}/>
                <Route path="/music" render={() => <Music/>}/>
                <Route path="/setting" render={() => <Setting/>}/>
            </div>
        </div>
    );
}

export default App;
