import { useState } from "react";
import "./ForgotPassword.css";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { api } from "../../../utils/api";
import { setAlert } from "../../../actions/alert";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [enterCodeState, setEnterCodeState] = useState(false);

    const user = useSelector((state) => state.user);
    if (user.isAuthenticated) {
        return <Navigate to="/main" replace />
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const submit = async () => {
        try {
            const res = await api.post("/users/send-verification-code", { email })
            if (res.status === 200) {
                setEnterCodeState(true);
            }
        } catch (err) {
            const errors = err.response?.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
            }
        }
    }

    return (
        <div className="landing">
            <div className="forgot-password retro-style">
                {
                    enterCodeState ? 
                    <>
                    </> :
                    <>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">email to send verification code to</label>
                            <input className="form-input" id="email" name="email" onChange={(e) => handleEmailChange(e)}></input>
                        </div>
                        <div className="form-group">
                            <button onClick={submit} className="btn-submit">send</button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default ForgotPassword;