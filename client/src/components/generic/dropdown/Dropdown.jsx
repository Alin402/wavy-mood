import { useState } from "react";
import "./Dropdown.css";

const Dropdown = ({ header, children }) => {
    const [openContent, setOpenContent] = useState(false);

    const handleOpenContent = () => {
        setOpenContent(!openContent);
    }

    return (
        <div className="dropdown">
            <div style={{ cursor: "pointer", color: openContent ? "#ef5aa0" : "white" }} onClick={handleOpenContent}>
                {header}
            </div>
            {
                openContent &&
                    <div className="dropdown-content">
                        {children}
                    </div>
            }
        </div>
    )
}

export default Dropdown;