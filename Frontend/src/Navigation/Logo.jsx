import React from "react"
import "./Logo.css"
import { useNavigate } from "react-router-dom"

function Logo(props){

    const navigate = useNavigate()

    function onClickHandler(){
        navigate("/")
    }

    return <div className="logo-container">
        <div> <img className="logo-image" alt="logo" src="../assets/images/logo.png" onClick={onClickHandler} /> </div>
        
      </div> 

}

export default Logo