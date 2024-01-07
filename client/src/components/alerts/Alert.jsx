import { AiFillCloseSquare } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeAlert } from "../../actions/alert";

const Alert = ({ type, msg, ID }) => {
    const dispatch = useDispatch();

    const handleCloseAlert = () => {
        dispatch(removeAlert(ID));
    }

    return (
        <div className={`alert alert-${type}`}>
            {msg}
            <a className="close-button" onClick={handleCloseAlert}>
                <AiFillCloseSquare size={22} />
            </a>
        </div>
    )
}

export default Alert;