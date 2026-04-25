import { Link, NavLink } from "react-router-dom"
import "./NavBarItem.css"
function NavBarItem(props) {
   if(props.isHidden === true){return null}
    return (
        <li className="nav-bar-item"> 
            {props.children}
        </li>
    );
}
export default NavBarItem