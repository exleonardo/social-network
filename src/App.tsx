import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import { BrowserRouter, Route } from "react-router-dom";
import News from "./components/News/News";
import Setting from "./components/Setting/Setting";
import Music from "./components/Music/Music";


function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header/>
        <Navbar/>
        <div className="app-wrapper-content">
          <Route path="/dialogs" component={ Dialogs }/>
          <Route path="/profile" component={ Profile }/>
          <Route path="/news" component={ News}/>
          <Route path="/music" component={ Music}/>
          <Route path="/setting" component={ Setting}/>
        </div>


      </div>
    </BrowserRouter>
  );
}
// https://w7.pngwing.com/pngs/29/684/png-transparent-stormtrooper-boba-fett-star-wars-original-trilogy-helmet-stormtrooper-star-wars-episode-vii-sports-equipment-motorcycle-helmet.png

export default App;
