import React, { useState, useEffect } from "react";
import { FortAwesomeIcon, FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"

import Icons from "./helpers/icons"
Icons()


function App() {
  const [ formSideBarStyles, setFormSideBarStyles] = useState({width: "0", marginLeft: "0"})
  const [SearchSpaceStyle, setSearchSpaceStyle] = useState({width: "100vw", marginLeft: "0"})
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN")
  

  function openNav() {
    setFormSideBarStyles({width: "100vw", marginRight: "100vw"})
    setSearchSpaceStyle({width: "0vw", marginLeft: "0vw"})    
  }

  function closeNav() {
    setFormSideBarStyles({width: "0", margimarginRightnLeft: "0"})
    setSearchSpaceStyle({width: "100vw", marginLeft: "0"})
  }

  // useEffect(() => {
  //   checkLoginStatus()
  // }, [])


  return (
    <div className="app">
      <div className="nav-bar-wrapper">
        <div className="Form">
        <button className="openbtn nav-link-btn" onClick={() => openNav()}><FontAwesomeIcon icon="bars" className="side-bar-bars"/><span className="side-bar-button-text">Search</span></button>
        </div>

        <div className="logo-wrapper">
          <span className="logoOne">Grocery</span><span className="logoTwo">Buddy</span>
        </div>

        <div className="login">
          {loggedInStatus}
        </div>
      </div>


      <div className="app-body">

        <div id="mySidebar" className="sidebar form" style={formSideBarStyles}>
          <a href="#" className="closebtn" onClick={() => closeNav()}>&times;</a>          
          <a href="#">Services</a>
          <input className="form-input" type="text" placeholder="FORM INPUT"/>
        </div>

        <div className="search" style={SearchSpaceStyle}>
          HELLO FROM SEARCH PAGE
          <input className="serachBar" type="text" placeholder="Search"/>
        </div>

      </div>
  </div>
  )
}

export default App