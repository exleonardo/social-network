import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import { BrowserRouter, Route } from "react-router-dom";
import News from "./components/News/News";
import Setting from "./components/Setting/Setting";
import Music from "./components/Music/Music";

import {DialogsType, MessagesType, PostsType} from './index';


export type AppTypeProps = {
  posts: PostsType[];
  messages: MessagesType[];
  dialogs: DialogsType[];
}

function App (props:AppTypeProps) {

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header/>
        <Navbar/>
        <div className="app-wrapper-content">
          <Route path="/dialogs" render={ () => <Dialogs dialogs={props.dialogs} messages={props.messages}/> }/>
          <Route path="/profile" render={ () => <Profile posts={props.posts}/> }/>
          <Route path="/news" render={ () => <News/> }/>
          <Route path="/music" render={ () => <Music/> }/>
          <Route path="/setting" render={ () => <Setting/> }/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
