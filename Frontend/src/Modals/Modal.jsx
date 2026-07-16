import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = (props) => { 

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
       {props.title? <h1>{props.title}</h1>:null} 
        {props.children}
      </div>
    </div>,
    document.getElementById('modal-root') 
  );
};

export default Modal;