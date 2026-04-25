import React from "react";
import "./NavBarItems.css"

function NavBarItems(props){
    
    return <ul className="nav-bar-items">
    {props.children}
    </ul>
}

export default NavBarItems