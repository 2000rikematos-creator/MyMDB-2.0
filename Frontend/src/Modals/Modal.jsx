import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = (props) => { 

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1 className='modal-title'>{props.title}</h1>
        {props.children}
      </div>
    </div>,
    document.getElementById('modal-root') 
  );
};

export default Modal;