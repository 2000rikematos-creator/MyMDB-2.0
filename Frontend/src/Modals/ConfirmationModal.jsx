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

    return <Modal title={props.question}> <div className="button-container"><button className="button confirm-button" onClick={handleClickYes}>yes</button><button className="button cancel-delete-button" onClick={handleClickNo}>No</button></div> </Modal>
}

export default ConfirmationModal