import React, { useEffect, useRef } from "react";
import "./SideDrawer.css";
import ClosingIcon from "../Components/Icons/ClosingIcon";

function SideDrawer(props) {
  const sideDrawer = useRef(null);

  useEffect(() => {
    function clickAway(event) {
      if (sideDrawer.current && !sideDrawer.current.contains(event.target)) {
        props.onClose();
      }
    }

    if (props.isVisible) {

      document.addEventListener("mousedown", clickAway);
    }

  
    return () => {
      document.removeEventListener("mousedown", clickAway);
    };
  }, [props.isVisible, props.onClose]);

  if (!props.isVisible) return null;

  return (
    <div ref={sideDrawer} className={`side-drawer ${props.isVisible ? 'open': ''}`}>
      {props.children}<ClosingIcon closable={props.closingSignIsVisible} onClick={()=>{props.onClose()}}/>
    </div>
  );
}

export default SideDrawer;