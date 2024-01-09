import "./Modal.css";
import { RiCloseFill as CloseIcon } from "react-icons/ri";

const Modal = ({ children, color, open, setOpen }) => {
    return open && (
        <div className="modal">
            <div className="modal-header">
                <CloseIcon 
                    size={50} 
                    color="white" 
                    style={{ float: "right", cursor: "pointer" }} 
                    onClick={() => setOpen(false)}    
                />
            </div>
            <div className="modal-body retro-style" style={{ backgroundColor: color }}>
                {children}
            </div>
        </div>
    )
}

export default Modal;