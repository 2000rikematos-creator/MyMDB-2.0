import React from "react";
import Modal from "./Modal";
import "./LoadingModal.css"

function LoadingModal(props){
    return <Modal> <div className="spinner"></div> <h1> {props.text} </h1> </Modal>
}

export default LoadingModal