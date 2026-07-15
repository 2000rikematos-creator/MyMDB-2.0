import React from "react";
import Modal from "./Modal";
import "./LoadingModal.css"

function LoadingModal(props){
    return <Modal> <div className="spinner"></div></Modal>
}

export default LoadingModal