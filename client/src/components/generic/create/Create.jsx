import "./Create.css";
import { FaPlus as PlusIcon } from "react-icons/fa";
import { RiCloseFill as CloseIcon } from "react-icons/ri";

const Create = ({ children, open, setOpen }) => {
    return (
        <div className="create-container">
            {
                open &&
                <div className="create-content retro-style">
                    {children}
                </div>
            }
            <div 
                className="plus-container retro-style" 
                style={{ width: "65px", height: "65px", backgroundColor: open ? "#fff" : "#1E1D1B" }}
                onClick={() => { setOpen(!open) }}
            >
                {
                    open ? 
                    <CloseIcon 
                        size={55} 
                        color={"#1E1D1B"}
                    /> :
                    <PlusIcon 
                        size={40} 
                        color={"#fff"}
                    />
                }
            </div>
        </div>
    );
}

export default Create;