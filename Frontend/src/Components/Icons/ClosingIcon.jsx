import { X } from "lucide-react";
import React from "react";
import "./ClosingIcon.css";

function ClosingIcon(props){
    if (!props.closable) return null
 return (<X className="closing-icon" onClick={props.onClick} />)  
}

export default ClosingIcon