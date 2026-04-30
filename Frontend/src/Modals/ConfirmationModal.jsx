import React from "react";
import Modal from "./Modal";
import "./ConfirmationModal.css"

function ConfirmationModal(props){

    function handleClickYes(){
        props.onConfirm()
    }

    function handleClickNo(){
        props.onCancel()
    }

    return <Modal title={props.question}> <div className="button-container"><button className={`button confirm-button ${props.confirmClassName}`} onClick={handleClickYes}><h2>Yes</h2></button><button className={`button cancel-button ${props.cancelClassName}`} onClick={handleClickNo}><h2>No</h2></button></div> </Modal>
}

export default ConfirmationModal