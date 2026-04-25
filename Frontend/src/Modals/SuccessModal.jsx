import React from "react";
import Modal from "./Modal";

function SuccessModal(props){
    const message = props.failureMessage || props.successMessage
    if (!message) return null
    return <Modal title={message}/>
}

export default SuccessModal