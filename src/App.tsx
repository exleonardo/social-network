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


export type AppType = {}

function App (props: AppType) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header/>
        <Navbar/>
        <div className="app-wrapper-content">
          <Route path="/dialogs" render={ () => <Dialogs/> }/>
          <Route path="/profile" render={ () => <Profile/> }/>
          <Route path="/news" render={ () => <News/> }/>
          <Route path="/music" render={ () => <Music/> }/>
          <Route path="/setting" render={ () => <Setting/> }/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
