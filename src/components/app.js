import React, { useState, useEffect } from "react";
import { FortAwesomeIcon, FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"

import Icons from "./helpers/icons"
Icons()


function App() {
  const [ secondNavSideBarStyles, setSecondNavSideBarStyles ] = useState({width: "0", marginLeft: "0"})
  const [ formSideBarStyles, setFormSideBarStyles ] = useState({width: "0", marginLeft: "0"})
  const [ SearchSpaceStyle, setSearchSpaceStyle ] = useState({width: "100vw", marginLeft: "0"})
  const [ loggedInStatus, setLoggedInStatus ] = useState("NOT_LOGGED_IN")

  const [ storeName, setStoreName ] = useState("")
  const [ address, setAddress ] = useState("")
  const [ city, setCity ] = useState("")
  const [ state, setState ] = useState("")
  const [ zipCode, setZipCode ] = useState("")
  
  const [ storeId, setStoreId ] = useState("")
  const [ productName, setProductName ] = useState("")
  const [ price, setPrice ] = useState("")


  

  function openNav() {
    setFormSideBarStyles({width: "100vw", marginRight: "100vw"})
    setSearchSpaceStyle({width: "0vw", marginLeft: "0vw"})    
  }

  function closeNav() {
    setFormSideBarStyles({width: "0", marginRigh: "0"})
    setSearchSpaceStyle({width: "100vw", marginLeft: "0"})
  }

  function openNavSecond() {
    setSecondNavSideBarStyles({width: "100vw", marginRight: "100vw"})
    setFormSideBarStyles({width: "0", marginRight: "0"})
    setSearchSpaceStyle({width: "0", marginLeft: "0"})
  }

  function closeNavSecond() {
    setSecondNavSideBarStyles({width: "0", marginRight: "100Vw"})
    setFormSideBarStyles({width: "100vw", marginLeft: "0"})
    setSearchSpaceStyle({width: "0", marginLeft: "-100vw"})
  }



  function handleStoreSubmit(event) {
    axios
    .post("localhost:5000/add-store", {
      "store_name" : storeName,
      "address" : address,
      "city" : city,
      "state" : state,
      "zip_code" : zipCode
    })
    .then(response => {
      setStoreName('')
      setAddress('')
      setCity('')
      setState('')
      setZipCode('')
      })
    .catch(err => {
      console.log("POST new store error:", err)
    })
  }

  function handleProductSubmit(event) {
    axios
    .post("localhost:5000/add-product", {
      "store_id" : storeId,
      "product_name" : productName,
      "price" : price
    })
    .then(response => {
      setStoreId('')
      setProductName('')
      setPrice('')
      })
    .catch(err => {
      console.log("POST new store error:", err)
    })
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

        <div className="sidebar form" style={secondNavSideBarStyles}>
          <a href="#" className="closebtn" onClick={() => closeNavSecond()}>&times;</a>
          <h3>Add a Product</h3>

          <form onSubmit={handleProductSubmit} className="product-form">
            <div className="store-form-wrapper">
                <input
                  className="form-input"
                  type="text"
                  onChange={(e) => setStoreId(e.target.value)}
                  name="setStoreId"
                  placeholder="store id:"
                  value={storeId}
                />

                <input
                  className="form-input"
                  type="text"
                  onChange={(e) => setProductName(e.target.value)}
                  name="productName"
                  placeholder="product name:"
                  value={productName}
                />

                <input
                  className="form-input"
                  type="text"
                  onChange={(e) => setPrice(e.target.value)}
                  name="price"
                  placeholder="price $"
                  value={price}
                />
              </div>
          </form>
        </div>
        

        <div id="mySidebar" className="sidebar form" style={formSideBarStyles}> 
          <a href="#" className="openSecond" onClick={() => openNavSecond()}>add Product</a>          
          <a href="#" className="closebtn" onClick={() => closeNav()}>&times;</a>          
          <h3>Add a Store</h3>

          
          {/* FORM FOR SUBMITTING NEW PRODUCTS */}
          <form onSubmit={handleStoreSubmit} className="store-form">
          <div className="store-form-wrapper">
            <input
              className="form-input"
              type="text"
              onChange={(e) => setStoreName(e.target.value)}
              name="storeName"
              placeholder="store name:"
              value={storeName}
            />

            <input
              className="form-input"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              name="address"
              placeholder="address:"
              value={address}
            />

            <input
              className="form-input"
              type="text"
              onChange={(e) => setCity(e.target.value)}
              name="city"
              placeholder="city:"
              value={city}
            />

            <input
              className="form-input"
              type="text"
              onChange={(e) => setState(e.target.value)}
              name="state"
              placeholder="State:"
              value={state}
            />


            <input
              className="form-input"
              type="text"
              onChange={(e) => setZipCode(e.target.value)}
              name="zipCode"
              placeholder="zip code:"
              value={zipCode}
            />


          </div>
          <button className="nav-link-btn" onClick={(e) => { e.preventDefault}}>Save</button>
        </form>

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