import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";


function App() {
  return (
    <div className="app-wrapper">
      <Header/>
      <Navbar/>
      <div className="app-wrapper-content">
        <Profile/>
        {/*<Dialogs/>*/}
      </div>


    </div>
  );
}
// https://w7.pngwing.com/pngs/29/684/png-transparent-stormtrooper-boba-fett-star-wars-original-trilogy-helmet-stormtrooper-star-wars-episode-vii-sports-equipment-motorcycle-helmet.png

export default App;
